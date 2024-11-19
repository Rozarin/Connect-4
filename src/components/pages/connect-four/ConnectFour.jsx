// src/components/connect-four/ConnectFour.jsx
import React, { useState, useEffect } from "react";
import WinnerModal from "./includes/WinnerModal";

const ROWS = 6;
const COLUMNS = 7;
const DEPTH = 4; // Max depth for minimax

// Custom hook for AI using minimax algorithm
function useConnectFourAI({ grid, currentPlayer, setGrid, setCurrentPlayer, setWinner, winner }) {
  useEffect(() => {
    if (currentPlayer === "Player 2" && !winner) {
      const bestMove = getBestMove(grid, DEPTH, true);
      if (bestMove !== null) {
        makeAIMove(bestMove);
      }
    }
  }, [currentPlayer, grid, winner]);

  const makeAIMove = (column) => {
    if (winner || grid[0][column] !== null) return;

    const newGrid = grid.map(row => row.slice());
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newGrid[row][column]) {
        newGrid[row][column] = "yellow";
        setGrid(newGrid);

        if (checkWinner(newGrid, row, column)) {
          setWinner("Player 2");
        } else {
          setCurrentPlayer("Player 1"); // Switch back to Player 1 after AI's move
        }
        break;
      }
    }
  };

  const getBestMove = (grid, depth, maximizingPlayer) => {
    let bestScore = maximizingPlayer ? -Infinity : Infinity;
    let bestColumn = null;

    for (let col = 0; col < COLUMNS; col++) {
      if (grid[0][col] === null) {
        const tempGrid = grid.map(row => row.slice());
        for (let row = ROWS - 1; row >= 0; row--) {
          if (tempGrid[row][col] === null) {
            tempGrid[row][col] = maximizingPlayer ? "yellow" : "red";
            break;
          }
        }
        const score = minimax(tempGrid, depth - 1, !maximizingPlayer, -Infinity, Infinity);
        if ((maximizingPlayer && score > bestScore) || (!maximizingPlayer && score < bestScore)) {
          bestScore = score;
          bestColumn = col;
        }
      }
    }
    return bestColumn;
  };

  const minimax = (grid, depth, maximizingPlayer, alpha, beta) => {
    if (depth === 0) return 0;

    let bestScore = maximizingPlayer ? -Infinity : Infinity;
    for (let col = 0; col < COLUMNS; col++) {
      if (grid[0][col] === null) {
        const tempGrid = grid.map(row => row.slice());
        for (let row = ROWS - 1; row >= 0; row--) {
          if (tempGrid[row][col] === null) {
            tempGrid[row][col] = maximizingPlayer ? "yellow" : "red";
            break;
          }
        }
        const score = minimax(tempGrid, depth - 1, !maximizingPlayer, alpha, beta);
        if (maximizingPlayer) {
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
        } else {
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore);
        }
        if (beta <= alpha) break;
      }
    }
    return bestScore;
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
}

function ConnectFour({ mode }) {
  const [grid, setGrid] = useState(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [winner, setWinner] = useState(null);
  const [hoveredColumn, setHoveredColumn] = useState(null);

  if (mode === "PVAI") {
    useConnectFourAI({ grid, currentPlayer, setGrid, setCurrentPlayer, setWinner, winner });
  }

  const dropPiece = (column) => {
    if (winner || grid[0][column] !== null) return;

    const newGrid = grid.map(row => row.slice());
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newGrid[row][column]) {
        newGrid[row][column] = currentPlayer === "Player 1" ? "red" : "yellow";
        setGrid(newGrid);

        if (checkWinner(newGrid, row, column)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === "Player 1" ? "Player 2" : "Player 1");
        }
        break;
      }
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

  return (
    <div className="container h-screen flex flex-col items-center pt-10">
      <h1 className="text-5xl font-bold text-primary font mb-5">Connect Four</h1>
      <div>
        <h2 className="text-xl mb-2">{currentPlayer}'s Turn</h2>
      </div>

      {/* Game board */}
      <div className="bg-gradient-to-b from-tertiary to-quaternary px-5 py-10 rounded-lg shadow-md shadow-neutral-700">
        <div className="grid grid-cols-7 gap-2 mb-6">
          {Array.from({ length: COLUMNS }).map((_, col) => (
            <button
              key={col}
              onMouseEnter={() => setHoveredColumn(col)}
              onMouseLeave={() => setHoveredColumn(null)}
              onClick={() => dropPiece(col)}
              className={`w-12 h-12 border-[3px] border-secondary bg-gray-200 rounded-lg hover:border-white ${currentPlayer === 'Player 1' ? "hover:bg-red-500" : "hover:bg-yellow-500"}`}
            />
          ))}
        </div>

        {/* Render grid */}
        <div className="grid grid-cols-7 gap-2">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-12 h-12 flex items-center justify-center rounded-full shadow-inner shadow-black border-[3px] border-secondary ${
                  cell === "red"
                    ? "bg-red-500"
                    : cell === "yellow"
                    ? "bg-yellow-500"
                    : colIndex === hoveredColumn
                    ? currentPlayer === "Player 1"
                      ? "bg-red-200"
                      : "bg-yellow-200"
                    : "bg-gray-200"
                }`}
              ></div>
            ))
          )}
        </div>
      </div>

      {winner && (
        <WinnerModal winner={winner} setWinner={setWinner} />
      )}
    </div>
  );
}

export default ConnectFour;
