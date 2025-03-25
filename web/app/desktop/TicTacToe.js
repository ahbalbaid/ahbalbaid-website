import { useState, useEffect } from "react";

// TicTacToe Component with AI
export default function TicTacToe({ isMobile }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isAIThinking, setIsAIThinking] = useState(false);

  // Effect for AI's turn
  useEffect(() => {
    // If it's O's turn (AI) and no winner yet
    if (!isXNext && !winner && !board.every((cell) => cell !== null)) {
      setIsAIThinking(true);

      // Simulate AI "thinking" with a small delay
      const timeoutId = setTimeout(() => {
        makeAIMove();
        setIsAIThinking(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isXNext, winner, board]);

  const makeAIMove = () => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let move of board
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

  const minimax = (newBoard, depth, isMaximizing) => {
    const winner = calculateWinner(newBoard);
    if (winner === "O") return 1;
    if (winner === "X") return -1;
    if (newBoard.every((cell) => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "O";
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "X";
          const score = minimax(newBoard, depth + 1, true);
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
    if (isAIThinking || winner || board[index] || !isXNext) return;

    makeMove(index);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const getStatus = () => {
    if (winner === "X") {
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
      {(winner || board.every((cell) => cell !== null)) && (
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1] border border-[#7a7a7a] rounded text-sm shadow hover:from-[#e9e9e9] hover:to-[#d9d9d9] active:from-[#c1c1c1] active:to-[#e1e1e1] active:shadow-inner"
          onClick={resetGame}
        >
          Play Again
        </button>
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
