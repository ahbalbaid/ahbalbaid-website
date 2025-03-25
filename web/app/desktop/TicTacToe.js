"use client";

import { useState, useEffect } from "react";

// TicTacToe Component with AI and difficulty levels
export default function TicTacToe({ isMobile }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard

  // Effect for AI's turn
  useEffect(() => {
    // If it's O's turn (AI) and no winner yet and game has started
    if (
      !isXNext &&
      !winner &&
      !board.every((cell) => cell !== null) &&
      gameStarted
    ) {
      setIsAIThinking(true);

      // Simulate AI "thinking" with a small delay
      const timeoutId = setTimeout(() => {
        makeAIMove();
        setIsAIThinking(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isXNext, winner, board, gameStarted]);

  const makeAIMove = () => {
    // Different AI behavior based on difficulty
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

  // Easy difficulty: 70% random moves, 30% smart moves
  const makeEasyMove = () => {
    const availableMoves = board
      .map((val, i) => (val === null ? i : null))
      .filter((i) => i !== null);

    if (availableMoves.length === 0) return;

    // 70% chance of making a random move
    if (Math.random() < 0.7) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      makeMove(availableMoves[randomIndex]);
    } else {
      // 30% chance of making a smart move
      makeHardMove();
    }
  };

  // Medium difficulty: Limited depth minimax (less perfect)
  const makeMediumMove = () => {
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestMove = null;
    const maxDepth = 2; // Limit search depth

    for (const move of board
      .map((val, i) => (val === null ? i : null))
      .filter((i) => i !== null)) {
      const newBoard = [...board];
      newBoard[move] = "O";
      const score = minimax(newBoard, 0, false, maxDepth);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    // 20% chance of making a mistake even with the calculated best move
    if (Math.random() < 0.2) {
      const availableMoves = board
        .map((val, i) => (val === null ? i : null))
        .filter((i) => i !== null);
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      makeMove(availableMoves[randomIndex]);
    } else if (bestMove !== null) {
      makeMove(bestMove);
    }
  };

  // Hard difficulty: Full minimax (unbeatable)
  const makeHardMove = () => {
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestMove = null;

    for (const move of board
      .map((val, i) => (val === null ? i : null))
      .filter((i) => i !== null)) {
      const newBoard = [...board];
      newBoard[move] = "O";
      const score = minimax(newBoard, 0, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    if (bestMove !== null) {
      makeMove(bestMove);
    }
  };

  const minimax = (
    newBoard,
    depth,
    isMaximizing,
    maxDepth = Number.POSITIVE_INFINITY
  ) => {
    const winner = calculateWinner(newBoard);
    if (winner === "O") return 1;
    if (winner === "X") return -1;
    if (newBoard.every((cell) => cell !== null)) return 0;
    if (depth >= maxDepth) return 0; // Limit search depth for medium difficulty

    if (isMaximizing) {
      let bestScore = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "O";
          const score = minimax(newBoard, depth + 1, false, maxDepth);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Number.POSITIVE_INFINITY;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "X";
          const score = minimax(newBoard, depth + 1, true, maxDepth);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const makeMove = (index) => {
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const handleClick = (index) => {
    // Don't allow moves if AI is thinking, there's a winner, or the cell is already filled
    if (isAIThinking || winner || board[index] || !isXNext || !gameStarted)
      return;

    makeMove(index);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStarted(true);
  };

  const getStatus = () => {
    if (!gameStarted) {
      return "Select difficulty to start";
    } else if (winner === "X") {
      return "You win!";
    } else if (winner === "O") {
      return "AI wins!";
    } else if (board.every((cell) => cell !== null)) {
      return "Game ended in a draw!";
    } else if (isAIThinking) {
      return "AI is thinking...";
    } else {
      return isXNext ? "Your turn (X)" : "AI turn (O)";
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
          <div className="grid grid-cols-3 grid-rows-3 gap-1 w-[240px] h-[240px] p-1 bg-[#e0e0e0] border-[2px] border-[#7a7a7a] shadow-inner">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`flex items-center justify-center font-bold text-[36px] border border-[#7a7a7a] cursor-pointer transition-colors touch-manipulation ${
                  cell === "X"
                    ? "text-[#0054e3]"
                    : cell === "O"
                    ? "text-[#e81123]"
                    : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
          {(winner || board.every((cell) => cell !== null)) && gameStarted && (
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

// Helper function to determine winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
