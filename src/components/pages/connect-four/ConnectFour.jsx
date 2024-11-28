import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { minimax } from "./includes/Ai/Minimax";
import WinnerModal from "./includes/WinnerModal";
import NextSetModal from "./includes/NextSetModal";

const ROWS = 6;
const COLUMNS = 7;

function ConnectFour() {
  // I'm using the location state to get the mode and number of sets for the game.
  const location = useLocation();
  const { mode, sets } = location.state || { mode: "PVP", sets: 1 };

  // I initialize the game state. The grid is a 6x7 array, with each cell starting as null.
  const [grid, setGrid] = useState(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [nextStartingPlayer, setNextStartingPlayer] = useState("Player 2");
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ "Player 1": 0, "Player 2": 0 });
  const [nextSetModal, setNextSetModal] = useState(false);
  const [aiThinking, setAiThinking] = useState(false); // I track if the AI is thinking

  // Whenever the current player or mode changes, I check if it's AI's turn and trigger the AI's move.
  useEffect(() => {
    if (mode === "PVAI" && currentPlayer === "Player 2") {
      setAiThinking(true); // AI starts thinking
      setTimeout(aiMove, 500); // Let AI think for a short while
    } else {
      setAiThinking(false); // If it's not AI's turn, stop thinking
    }
  }, [currentPlayer, mode]);

  // The AI performs a move using the minimax algorithm.
  const aiMove = () => {
    setAiThinking(true); // Mark AI is thinking
    const playerColor = "yellow"; // I assume AI is always Player 2 and yellow
    const result = minimax(grid, 4, true, -Infinity, Infinity, playerColor); // Get the best move from AI
    if (result?.col !== undefined) {
      setTimeout(() => {
        dropPiece(result.col); // Make the AI's move after a delay
        setAiThinking(false); // AI finishes thinking
      }, 1000);
    }
  };

  // I check if the current move resulted in a win by checking all directions.
  const checkWinner = (grid, row, col) => {
    const color = grid[row][col]; // Get the color of the piece at this position
    return (
      checkDirection(grid, row, col, 1, 0, color) + checkDirection(grid, row, col, -1, 0, color) > 2 ||
      checkDirection(grid, row, col, 0, 1, color) + checkDirection(grid, row, col, 0, -1, color) > 2 ||
      checkDirection(grid, row, col, 1, 1, color) + checkDirection(grid, row, col, -1, -1, color) > 2 ||
      checkDirection(grid, row, col, 1, -1, color) + checkDirection(grid, row, col, -1, 1, color) > 2
    );
  };

  // I check in one direction (horizontal, vertical, or diagonal) for the same color.
  const checkDirection = (grid, row, col, rowDir, colDir, color) => {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && grid[r][c] === color) {
      count++;
      r += rowDir;
      c += colDir;
    }
    return count;
  };

  // This function handles dropping a piece into the selected column.
  const dropPiece = (column) => {
    if (winner || grid[0][column] !== null || (mode === "PVAI" && aiThinking)) return;
    const newGrid = grid.map((row) => row.slice()); // Create a copy of the grid
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newGrid[row][column]) {
        newGrid[row][column] = currentPlayer === "Player 1" ? "red" : "yellow"; // Drop the piece for the current player
        setGrid(newGrid); // Update the grid with the new piece
        if (checkWinner(newGrid, row, column)) {
          handleGameEnd(currentPlayer); // If a player won, end the game
        } else {
          const nextPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
          setCurrentPlayer(nextPlayer); // Switch to the next player
        }
        break;
      }
    }
  };

  // This function resets the board after each set.
  const resetBoard = () => {
    setGrid(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null))); // Reset the grid
    setWinner(null); // Reset winner state
    setAiThinking(false); // Reset AI thinking state
    setCurrentPlayer(nextStartingPlayer); // Set the next starting player
    setNextStartingPlayer(nextStartingPlayer === "Player 1" ? "Player 2" : "Player 1"); // Switch starting player

    // If it's AI's turn and it starts the set, make the AI move
    if (mode === "PVAI" && nextStartingPlayer === "Player 2") {
      setTimeout(aiMove, 500);
    }
  };

  // This function handles the end of a game. It updates the score and shows the next set modal if necessary.
  const handleGameEnd = (winningPlayer) => {
    const newScore = { ...score, [winningPlayer]: score[winningPlayer] + 1 };
    setScore(newScore);
    if (newScore[winningPlayer] > Math.floor(sets / 2)) {
      setWinner(`${winningPlayer} Wins the Match!`); // If a player wins the match, display the winner
    } else {
      setNextSetModal(true); // If the match isn't over, show the next set modal
    }
  };

  return (
    <div className="container h-screen flex flex-col items-center pt-10">
      <h1 className="text-5xl font-bold text-primary mb-5">Connect Four</h1>
      <div className="mb-4">
        <h2 className="text-xl mb-2">{winner ? winner : `${currentPlayer}'s Turn`}</h2>
        <div className="flex justify-center space-x-4">
          <p>Player 1: {score["Player 1"]}</p>
          <p>Player 2: {score["Player 2"]}</p>
          <p>Best of: {sets} Sets</p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-tertiary to-quaternary px-5 py-10 rounded-lg shadow-md shadow-neutral-700">
        <div className="grid grid-cols-7 gap-2 mb-6">
          {Array.from({ length: COLUMNS }).map((_, col) => (
            <button
              key={col}
              onClick={() => dropPiece(col)}
              disabled={mode === "PVAI" && currentPlayer === "Player 2" && aiThinking}
              className={`w-12 h-12 border-[3px] border-secondary bg-gray-200 rounded-lg shadow-inner shadow-neutral-800 ${
                currentPlayer === "Player 1" ? "hover:bg-red-500" : "hover:bg-yellow-500"
              } ${mode === "PVAI" && aiThinking ? "cursor-not-allowed" : ""}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-12 h-12 flex items-center justify-center rounded-full shadow-inner shadow-neutral-800 border-[3px] border-secondary ${
                  cell === "red"
                    ? "bg-red-500"
                    : cell === "yellow"
                    ? "bg-yellow-500"
                    : "bg-gray-200"
                }`}
              ></div>
            ))
          )}
        </div>
      </div>
      {nextSetModal && !winner && <NextSetModal setNextSetModal={setNextSetModal} resetBoard={resetBoard} winner={currentPlayer} />}
      {winner && (
        <WinnerModal
          winner={winner}
          setWinner={() => {
            setWinner(null);
            resetBoard();
          }}
        />
      )}
    </div>
  );
}

export default ConnectFour;