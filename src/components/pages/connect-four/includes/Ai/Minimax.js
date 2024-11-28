// I define the number of rows and columns for the Connect 4 grid
const ROWS = 6;
const COLUMNS = 7;

// I create a function to get all valid columns where a move can be made.
// A valid column is one where the topmost cell is empty (null).
const getValidColumns = (grid) => {
  const validCols = grid[0]
    .map((cell, colIndex) => (cell === null ? colIndex : null)) // I check each column's topmost cell for availability.
    .filter((col) => col !== null); // I filter out columns that are full.
  console.log("Valid columns:", validCols);
  return validCols;
};

// I create a function to simulate a move for a player in a specified column.
// The move will fall to the lowest available row in that column.
const simulateMove = (grid, col, player) => {
  const newGrid = grid.map(row => [...row]); // I create a deep copy of the grid to avoid mutating the original.
  for (let row = ROWS - 1; row >= 0; row--) { // I iterate from the bottom row upwards.
    if (!newGrid[row][col]) { // I check if the cell is empty.
      newGrid[row][col] = player; // I place the player's piece in the first available spot.
      break;
    }
  }
  return newGrid; // I return the modified grid after the move.
};

// I define a function to evaluate the board, scoring it based on the player's color.
// This can be expanded with more complex logic for assessing winning strategies.
const evaluateBoard = (grid, playerColor) => {
  let score = 0;

  // I favor the center column because it's the most strategic position in Connect 4.
  const centerCol = Math.floor(COLUMNS / 2);
  const centerCount = grid.map(row => row[centerCol]).filter(cell => cell === playerColor).length;
  score += centerCount * 3; // I give extra weight to pieces in the center column.

  // Additional scoring can be added, like considering horizontal, vertical, or diagonal patterns.

  return score; // I return the calculated score.
};

// I define a function to check if the board is a terminal node (i.e., the game is over).
// A terminal node is either a full board or one where a player has won.
const isTerminalNode = (grid) => {
  return !getValidColumns(grid).length || grid.some((row, rowIndex) =>
    row.some((cell, colIndex) => cell !== null && checkWinner(grid, rowIndex, colIndex, cell))
  );
};

// I implement the Minimax algorithm with alpha-beta pruning to decide the best move.
// The algorithm searches for the best move by simulating moves, evaluating the resulting board, and recursively exploring possible future states.
const minimax = (grid, depth, maximizingPlayer, alpha, beta, playerColor) => {
  const validColumns = getValidColumns(grid); // I get the valid columns where moves can be made.

  // If I've reached the maximum depth or the board is in a terminal state, I return the evaluation score.
  if (depth === 0 || isTerminalNode(grid)) {
    return { score: evaluateBoard(grid, playerColor) };
  }

  if (maximizingPlayer) { // I maximize the score for the player (Red).
    let maxEval = -Infinity;
    let bestCol = validColumns[0]; // I assume the first column is the best move initially.
    for (const col of validColumns) {
      const newGrid = simulateMove(grid, col, playerColor); // I simulate the move for the maximizing player.
      const { score } = minimax(newGrid, depth - 1, false, alpha, beta, playerColor === "red" ? "yellow" : "red");
      if (score > maxEval) { // If the score is better, I update the best column and score.
        maxEval = score;
        bestCol = col;
      }
      alpha = Math.max(alpha, score); // I update alpha to be the maximum of the current alpha and score.
      if (beta <= alpha) break; // Alpha-beta pruning: I stop exploring if the score is worse than the current alpha.
    }
    return { col: bestCol, score: maxEval }; // I return the best column and its score.
  } else { // I minimize the score for the opponent (Yellow).
    let minEval = Infinity;
    let bestCol = validColumns[0]; // I assume the first column is the best move initially.
    for (const col of validColumns) {
      const newGrid = simulateMove(grid, col, playerColor); // I simulate the move for the minimizing player.
      const { score } = minimax(newGrid, depth - 1, true, alpha, beta, playerColor === "red" ? "yellow" : "red");
      if (score < minEval) { // If the score is worse, I update the best column and score.
        minEval = score;
        bestCol = col;
      }
      beta = Math.min(beta, score); // I update beta to be the minimum of the current beta and score.
      if (beta <= alpha) break; // Alpha-beta pruning: I stop exploring if the score is worse than the current beta.
    }
    return { col: bestCol, score: minEval }; // I return the best column and its score.
  }
};

// I create a function to check if a player has won based on the current position.
const checkWinner = (grid, row, col, color) => {
  return (
    // I check if there's a winning sequence in any of the four possible directions: horizontal, vertical, and two diagonals.
    checkDirection(grid, row, col, 1, 0, color) + checkDirection(grid, row, col, -1, 0, color) > 2 ||
    checkDirection(grid, row, col, 0, 1, color) + checkDirection(grid, row, col, 0, -1, color) > 2 ||
    checkDirection(grid, row, col, 1, 1, color) + checkDirection(grid, row, col, -1, -1, color) > 2 ||
    checkDirection(grid, row, col, 1, -1, color) + checkDirection(grid, row, col, -1, 1, color) > 2
  );
};

// I check in a specific direction (rowDir, colDir) if the same colored pieces are connected.
const checkDirection = (grid, row, col, rowDir, colDir, color) => {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && grid[r][c] === color) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count; // I return the number of consecutive pieces found in that direction.
};

// I export the minimax function and getValidColumns function for use in other parts of my application.
export { minimax, getValidColumns };