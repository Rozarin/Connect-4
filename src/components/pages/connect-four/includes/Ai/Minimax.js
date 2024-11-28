const ROWS = 6;
const COLUMNS = 7;

// Get all valid columns for possible moves
const getValidColumns = (grid) => {
  const validCols = grid[0]
    .map((cell, colIndex) => (cell === null ? colIndex : null))
    .filter((col) => col !== null);
  console.log("Valid columns:", validCols);
  return validCols;
};


// Simulate a move in a column for a given player
const simulateMove = (grid, col, player) => {
  const newGrid = grid.map(row => [...row]);
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!newGrid[row][col]) {
      newGrid[row][col] = player;
      break;
    }
  }
  return newGrid;
};

// Evaluate the board based on player's color
const evaluateBoard = (grid, playerColor) => {
  let score = 0;

  // Example scoring logic: favor center column
  const centerCol = Math.floor(COLUMNS / 2);
  const centerCount = grid.map(row => row[centerCol]).filter(cell => cell === playerColor).length;
  score += centerCount * 3;

  // More scoring logic like horizontal, vertical, diagonal patterns can be added
  return score;
};

// Check if the board is full
const isTerminalNode = (grid) => {
  return !getValidColumns(grid).length || grid.some((row, rowIndex) =>
    row.some((cell, colIndex) => cell !== null && checkWinner(grid, rowIndex, colIndex, cell))
  );
};

// Minimax algorithm with alpha-beta pruning
const minimax = (grid, depth, maximizingPlayer, alpha, beta, playerColor) => {
  const validColumns = getValidColumns(grid);

  if (depth === 0 || isTerminalNode(grid)) {
    return { score: evaluateBoard(grid, playerColor) };
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    let bestCol = validColumns[0];
    for (const col of validColumns) {
      const newGrid = simulateMove(grid, col, playerColor);
      const { score } = minimax(newGrid, depth - 1, false, alpha, beta, playerColor === "red" ? "yellow" : "red");
      if (score > maxEval) {
        maxEval = score;
        bestCol = col;
      }
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return { col: bestCol, score: maxEval };
  } else {
    let minEval = Infinity;
    let bestCol = validColumns[0];
    for (const col of validColumns) {
      const newGrid = simulateMove(grid, col, playerColor);
      const { score } = minimax(newGrid, depth - 1, true, alpha, beta, playerColor === "red" ? "yellow" : "red");
      if (score < minEval) {
        minEval = score;
        bestCol = col;
      }
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return { col: bestCol, score: minEval };
  }
};

const checkWinner = (grid, row, col, color) => {
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

export { minimax, getValidColumns };
