import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { minimax } from "./includes/Ai/Minimax";
import WinnerModal from "./includes/WinnerModal";
import NextSetModal from "./includes/NextSetModal";

const ROWS = 6;
const COLUMNS = 7;

function ConnectFour() {
  const location = useLocation();
  const { mode, sets } = location.state || { mode: "PVP", sets: 1 };

  const [grid, setGrid] = useState(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [nextStartingPlayer, setNextStartingPlayer] = useState("Player 2");
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ "Player 1": 0, "Player 2": 0 });
  const [nextSetModal, setNextSetModal] = useState(false);
  const [aiThinking, setAiThinking] = useState(false); // NEW: State for AI's turn

  useEffect(() => {
    if (mode === "PVAI" && currentPlayer === "Player 2") {
      setAiThinking(true);
      setTimeout(aiMove, 500);
    } else {
      setAiThinking(false);
    }
  }, [currentPlayer, mode]);

  const aiMove = () => {
    setAiThinking(true); // AI starts thinking
    const playerColor = "yellow"; // Assuming AI is always Player 2 and yellow
    const result = minimax(grid, 4, true, -Infinity, Infinity, playerColor);
    if (result?.col !== undefined) {
      setTimeout(() => {
        dropPiece(result.col);
        setAiThinking(false); // AI finishes thinking
      }, 1000);
    }
  };

  const checkWinner = (grid, row, col) => {
    const color = grid[row][col];
    return (
      checkDirection(grid, row, col, 1, 0, color) + checkDirection(grid, row, col, -1, 0, color) > 2 ||
      checkDirection(grid, row, col, 0, 1, color) + checkDirection(grid, row, col, 0, -1, color) > 2 ||
      checkDirection(grid, row, col, 1, 1, color) + checkDirection(grid, row, col, -1, -1, color) > 2 ||
      checkDirection(grid, row, col, 1, -1, color) + checkDirection(grid, row, col, -1, 1, color) > 2
    );
  };
  
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
  
  const dropPiece = (column) => {
    if (winner || grid[0][column] !== null || (mode === "PVAI" && aiThinking)) return;
    const newGrid = grid.map((row) => row.slice());
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newGrid[row][column]) {
        newGrid[row][column] = currentPlayer === "Player 1" ? "red" : "yellow";
        setGrid(newGrid);
        if (checkWinner(newGrid, row, column)) {
          handleGameEnd(currentPlayer);
        } else {
          const nextPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
          setCurrentPlayer(nextPlayer);
        }
        break;
      }
    }
  };
  
  const resetBoard = () => {
    setGrid(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null)));
    setWinner(null);
    setAiThinking(false); // Reset AI thinking
    setCurrentPlayer(nextStartingPlayer);
    setNextStartingPlayer(nextStartingPlayer === "Player 1" ? "Player 2" : "Player 1");
  
    if (mode === "PVAI" && nextStartingPlayer === "Player 2") {
      setTimeout(aiMove, 500);
    }
  };
  

  const handleGameEnd = (winningPlayer) => {
    const newScore = { ...score, [winningPlayer]: score[winningPlayer] + 1 };
    setScore(newScore);
    if (newScore[winningPlayer] > Math.floor(sets / 2)) {
      setWinner(`${winningPlayer} Wins the Match!`);
    } else {
      setNextSetModal(true);
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
