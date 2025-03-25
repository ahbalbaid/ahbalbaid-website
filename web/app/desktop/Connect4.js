"use client";

import { useState, useEffect } from "react";

// Connect 4 Game Component with AI
export default function Connect4({ isMobile }) {
  // Game board: 7 columns x 6 rows, null = empty, 'red' = player, 'yellow' = AI
  const [board, setBoard] = useState(
    Array(7)
      .fill()
      .map(() => Array(6).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("red"); // Player always goes first
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  // Add a state to track the last played position
  const [lastPlayedPosition, setLastPlayedPosition] = useState(null);

  // Effect for AI's turn
  useEffect(() => {
    // If it's AI's turn and no winner yet and game has started
    if (currentPlayer === "yellow" && !winner && !isDraw && gameStarted) {
      setIsAIThinking(true);

      // Simulate AI "thinking" with a small delay
      const timeoutId = setTimeout(() => {
        makeAIMove();
        setIsAIThinking(false);
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer, winner, isDraw, gameStarted]);

  // Check if the board is full (draw)
  useEffect(() => {
    if (!gameStarted || winner) return;

    const isBoardFull = board.every((column) =>
      column.every((cell) => cell !== null)
    );
    if (isBoardFull) {
      setIsDraw(true);
      setGameOver(true);
    }
  }, [board, gameStarted, winner]);

  // Make AI move based on difficulty
  const makeAIMove = () => {
    switch (difficulty) {
      case "easy":
        makeEasyMove();
        break;
      case "medium":
        makeMediumMove();
        break;
      case "hard":
        makeHardMove();
        break;
      default:
        makeMediumMove();
    }
  };

  // Easy difficulty: Random valid moves
  const makeEasyMove = () => {
    const validColumns = getValidColumns();
    if (validColumns.length === 0) return;

    // 80% random move, 20% smarter move
    if (Math.random() < 0.8) {
      const randomColumn =
        validColumns[Math.floor(Math.random() * validColumns.length)];
      makeMove(randomColumn);
    } else {
      makeHardMove();
    }
  };

  // Medium difficulty: Look ahead 2-3 moves, but make occasional mistakes
  const makeMediumMove = () => {
    const validColumns = getValidColumns();
    if (validColumns.length === 0) return;

    // Check for immediate win
    for (const col of validColumns) {
      const tempBoard = copyBoard(board);
      const row = getNextEmptyRow(tempBoard, col);
      if (row === -1) continue;

      tempBoard[col][row] = "yellow";
      if (checkWin(tempBoard, col, row, "yellow")) {
        return makeMove(col);
      }
    }

    // Check for immediate block
    for (const col of validColumns) {
      const tempBoard = copyBoard(board);
      const row = getNextEmptyRow(tempBoard, col);
      if (row === -1) continue;

      tempBoard[col][row] = "red";
      if (checkWin(tempBoard, col, row, "red")) {
        return makeMove(col);
      }
    }

    // 30% chance of making a random move even if there's a better one
    if (Math.random() < 0.3) {
      const randomColumn =
        validColumns[Math.floor(Math.random() * validColumns.length)];
      return makeMove(randomColumn);
    }

    // Otherwise, use minimax with limited depth
    const maxDepth = 3;
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestMove = validColumns[0];

    for (const col of validColumns) {
      const tempBoard = copyBoard(board);
      const row = getNextEmptyRow(tempBoard, col);
      if (row === -1) continue;

      tempBoard[col][row] = "yellow";
      const score = minimax(
        tempBoard,
        maxDepth,
        false,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY
      );

      if (score > bestScore) {
        bestScore = score;
        bestMove = col;
      }
    }

    makeMove(bestMove);
  };

  // Hard difficulty: Use minimax with alpha-beta pruning
  const makeHardMove = () => {
    const validColumns = getValidColumns();
    if (validColumns.length === 0) return;

    let bestScore = Number.NEGATIVE_INFINITY;
    let bestMove = validColumns[0];
    const maxDepth = 5; // Deeper search for hard difficulty

    for (const col of validColumns) {
      const tempBoard = copyBoard(board);
      const row = getNextEmptyRow(tempBoard, col);
      if (row === -1) continue;

      tempBoard[col][row] = "yellow";
      const score = minimax(
        tempBoard,
        maxDepth,
        false,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY
      );

      if (score > bestScore) {
        bestScore = score;
        bestMove = col;
      }
    }

    makeMove(bestMove);
  };

  // Minimax algorithm with alpha-beta pruning
  const minimax = (board, depth, isMaximizing, alpha, beta) => {
    // Terminal conditions
    const validColumns = getValidColumnsForBoard(board);

    // Check for win/loss
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        if (board[col][row] === null) continue;

        if (checkWin(board, col, row, "yellow")) {
          return 100 + depth; // AI wins, prefer quicker wins
        }
        if (checkWin(board, col, row, "red")) {
          return -100 - depth; // Player wins, avoid quicker losses
        }
      }
    }

    // Draw or depth limit reached
    if (depth === 0 || validColumns.length === 0) {
      return evaluateBoard(board);
    }

    if (isMaximizing) {
      let maxEval = Number.NEGATIVE_INFINITY;
      for (const col of validColumns) {
        const tempBoard = copyBoard(board);
        const row = getNextEmptyRow(tempBoard, col);
        if (row === -1) continue;

        tempBoard[col][row] = "yellow";
        const evaluation = minimax(tempBoard, depth - 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return maxEval;
    } else {
      let minEval = Number.POSITIVE_INFINITY;
      for (const col of validColumns) {
        const tempBoard = copyBoard(board);
        const row = getNextEmptyRow(tempBoard, col);
        if (row === -1) continue;

        tempBoard[col][row] = "red";
        const evaluation = minimax(tempBoard, depth - 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return minEval;
    }
  };

  // Simple board evaluation for minimax
  const evaluateBoard = (board) => {
    let score = 0;

    // Horizontal evaluation
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const window = [
          board[col][row],
          board[col + 1][row],
          board[col + 2][row],
          board[col + 3][row],
        ];
        score += evaluateWindow(window);
      }
    }

    // Vertical evaluation
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        const window = [
          board[col][row],
          board[col][row + 1],
          board[col][row + 2],
          board[col][row + 3],
        ];
        score += evaluateWindow(window);
      }
    }

    // Diagonal evaluation (positive slope)
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        const window = [
          board[col][row],
          board[col + 1][row + 1],
          board[col + 2][row + 2],
          board[col + 3][row + 3],
        ];
        score += evaluateWindow(window);
      }
    }

    // Diagonal evaluation (negative slope)
    for (let col = 0; col < 4; col++) {
      for (let row = 3; row < 6; row++) {
        const window = [
          board[col][row],
          board[col + 1][row - 1],
          board[col + 2][row - 2],
          board[col + 3][row - 3],
        ];
        score += evaluateWindow(window);
      }
    }

    // Center column preference
    const centerColumn = 3;
    for (let row = 0; row < 6; row++) {
      if (board[centerColumn][row] === "yellow") {
        score += 3;
      }
    }

    return score;
  };

  // Evaluate a window of 4 cells
  const evaluateWindow = (window) => {
    const yellowCount = window.filter((cell) => cell === "yellow").length;
    const redCount = window.filter((cell) => cell === "red").length;
    const emptyCount = window.filter((cell) => cell === null).length;

    if (yellowCount === 4) return 100;
    if (yellowCount === 3 && emptyCount === 1) return 5;
    if (yellowCount === 2 && emptyCount === 2) return 2;
    if (redCount === 3 && emptyCount === 1) return -4;

    return 0;
  };

  // Get all valid columns for a move
  const getValidColumns = () => {
    return getValidColumnsForBoard(board);
  };

  const getValidColumnsForBoard = (board) => {
    const validColumns = [];
    for (let col = 0; col < 7; col++) {
      if (board[col][0] === null) {
        // If top cell is empty
        validColumns.push(col);
      }
    }
    return validColumns;
  };

  // Get the next empty row in a column
  const getNextEmptyRow = (board, col) => {
    for (let row = 5; row >= 0; row--) {
      if (board[col][row] === null) {
        return row;
      }
    }
    return -1; // Column is full
  };

  // Copy the board for simulation
  const copyBoard = (board) => {
    return board.map((column) => [...column]);
  };

  // Make a move in a column
  const makeMove = (col) => {
    const newBoard = copyBoard(board);
    const row = getNextEmptyRow(newBoard, col);

    if (row === -1) return; // Column is full

    newBoard[col][row] = currentPlayer;
    setBoard(newBoard);
    setLastPlayedPosition([col, row]); // Set the last played position

    // Check for win
    if (checkWin(newBoard, col, row, currentPlayer)) {
      setWinner(currentPlayer);
      setGameOver(true);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
  };

  // Handle player move
  const handleColumnClick = (col) => {
    if (
      isAIThinking ||
      winner ||
      !gameStarted ||
      currentPlayer !== "red" ||
      isDraw
    )
      return;

    const row = getNextEmptyRow(board, col);
    if (row === -1) return; // Column is full

    makeMove(col);
  };

  // Check for win condition
  const checkWin = (board, col, row, player) => {
    const directions = [
      [0, 1], // vertical
      [1, 0], // horizontal
      [1, 1], // diagonal /
      [1, -1], // diagonal \
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      const winningPositions = [[col, row]];

      // Check in positive direction
      for (let i = 1; i < 4; i++) {
        const newCol = col + dx * i;
        const newRow = row + dy * i;

        if (
          newCol >= 0 &&
          newCol < 7 &&
          newRow >= 0 &&
          newRow < 6 &&
          board[newCol][newRow] === player
        ) {
          count++;
          winningPositions.push([newCol, newRow]);
        } else {
          break;
        }
      }

      // Check in negative direction
      for (let i = 1; i < 4; i++) {
        const newCol = col - dx * i;
        const newRow = row - dy * i;

        if (
          newCol >= 0 &&
          newCol < 7 &&
          newRow >= 0 &&
          newRow < 6 &&
          board[newCol][newRow] === player
        ) {
          count++;
          winningPositions.push([newCol, newRow]);
        } else {
          break;
        }
      }

      if (count >= 4) {
        setWinningCells(winningPositions);
        return true;
      }
    }

    return false;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(
      Array(7)
        .fill()
        .map(() => Array(6).fill(null))
    );
    setCurrentPlayer("red");
    setWinner(null);
    setWinningCells([]);
    setLastPlayedPosition(null); // Reset last played position
    setGameOver(false);
    setIsDraw(false);
    setGameStarted(true);
  };

  // Get game status message
  const getStatus = () => {
    if (!gameStarted) {
      return "Select difficulty to start";
    } else if (winner === "red") {
      return "You win!";
    } else if (winner === "yellow") {
      return "AI wins!";
    } else if (isDraw) {
      return "Game ended in a draw!";
    } else if (isAIThinking) {
      return "AI is thinking...";
    } else {
      return currentPlayer === "red" ? "Your turn" : "AI turn";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#ece9d8] font-[Tahoma,sans-serif]">
      <div className="w-full bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1] p-1 mb-4 border-b border-[#a0a0a0]">
        <div className="font-bold text-center text-[#333]">{getStatus()}</div>
      </div>

      {!gameStarted ? (
        <div className="mb-4">
          <p className="text-sm mb-2 text-center">Select difficulty:</p>
          <div className="flex gap-2 justify-center">
            <button
              className={`px-3 py-1 text-sm border border-[#7a7a7a] rounded ${
                difficulty === "easy"
                  ? "bg-[#316ac5] text-white"
                  : "bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1]"
              }`}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={`px-3 py-1 text-sm border border-[#7a7a7a] rounded ${
                difficulty === "medium"
                  ? "bg-[#316ac5] text-white"
                  : "bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1]"
              }`}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={`px-3 py-1 text-sm border border-[#7a7a7a] rounded ${
                difficulty === "hard"
                  ? "bg-[#316ac5] text-white"
                  : "bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1]"
              }`}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>
          </div>

          <button
            className="mt-4 w-full py-2 bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1] border border-[#7a7a7a] rounded text-sm shadow hover:from-[#e9e9e9] hover:to-[#d9d9d9] active:from-[#c1c1c1] active:to-[#e1e1e1] active:shadow-inner"
            onClick={resetGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          {" "}
          <div className="bg-[#0054e3] p-2 rounded-lg border-2 border-[#7a7a7a] shadow-inner">
            <div className="grid grid-cols-7 gap-1 bg-[#0054e3]">
              {Array(7)
                .fill()
                .map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`flex flex-col cursor-pointer ${
                      !isAIThinking &&
                      !winner &&
                      !isDraw &&
                      gameStarted &&
                      currentPlayer === "red" &&
                      getNextEmptyRow(board, colIndex) !== -1
                        ? "hover:bg-[#1e68e8]"
                        : ""
                    }`}
                    onClick={() => handleColumnClick(colIndex)}
                    onMouseEnter={() => setHoveredColumn(colIndex)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    {/* Render rows from top (0) to bottom (5) */}
                    {Array(6)
                      .fill()
                      .map((_, rowIndex) => {
                        const cell = board[colIndex][rowIndex];
                        const isLastPlayed =
                          lastPlayedPosition &&
                          lastPlayedPosition[0] === colIndex &&
                          lastPlayedPosition[1] === rowIndex;
                        const showPreview =
                          hoveredColumn === colIndex &&
                          rowIndex === getNextEmptyRow(board, colIndex) &&
                          !isAIThinking &&
                          !winner &&
                          !isDraw &&
                          gameStarted &&
                          currentPlayer === "red";

                        return (
                          <div
                            key={rowIndex}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full m-1 flex items-center justify-center ${
                              isLastPlayed ? "animate-pulse" : ""
                            }`}
                          >
                            <div
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                                cell === "red"
                                  ? "bg-red-600 border-2 border-red-800"
                                  : cell === "yellow"
                                  ? "bg-yellow-400 border-2 border-yellow-600"
                                  : showPreview
                                  ? "bg-red-600/40 border-2 border-red-800/40"
                                  : "bg-white border-2 border-gray-300"
                              }`}
                            />
                          </div>
                        );
                      })}
                  </div>
                ))}
            </div>
          </div>
          {gameOver && (
            <button
              className="mt-4 px-4 py-2 bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1] border border-[#7a7a7a] rounded text-sm shadow hover:from-[#e9e9e9] hover:to-[#d9d9d9] active:from-[#c1c1c1] active:to-[#e1e1e1] active:shadow-inner"
              onClick={resetGame}
            >
              Play Again
            </button>
          )}
        </>
      )}
    </div>
  );
}
