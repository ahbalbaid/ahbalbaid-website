"use client";

import { useState, useEffect, useRef } from "react";

// Pong Game Component with AI
export default function Pong({ isMobile }) {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard

  // Game state refs (using refs to avoid re-renders during game loop)
  const gameStateRef = useRef({
    ball: { x: 0, y: 0, dx: 0, dy: 0, speed: 5, radius: 8 },
    playerPaddle: { x: 0, y: 0, width: 10, height: 80 },
    aiPaddle: { x: 0, y: 0, width: 10, height: 80 },
    canvasWidth: 0,
    canvasHeight: 0,
    lastTime: 0,
    aiReactionTime: 0.1, // Reaction time factor (lower = faster)
    aiErrorMargin: 30, // Error margin in pixels
  });

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const gameState = gameStateRef.current;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const containerWidth = canvas.parentElement.clientWidth;
      const containerHeight = canvas.parentElement.clientHeight;

      // Keep aspect ratio 4:3
      const aspectRatio = 4 / 3;
      let width = containerWidth - 20;
      let height = width / aspectRatio;

      if (height > containerHeight - 20) {
        height = containerHeight - 20;
        width = height * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      gameState.canvasWidth = width;
      gameState.canvasHeight = height;

      // Update paddle and ball sizes based on canvas size
      gameState.playerPaddle.width = Math.max(8, Math.floor(width * 0.015));
      gameState.playerPaddle.height = Math.max(60, Math.floor(height * 0.2));
      gameState.aiPaddle.width = gameState.playerPaddle.width;
      gameState.aiPaddle.height = gameState.playerPaddle.height;
      gameState.ball.radius = Math.max(6, Math.floor(width * 0.01));

      resetGame();
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Set difficulty
    updateDifficulty(difficulty);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [difficulty]);

  // Update difficulty settings
  const updateDifficulty = (level) => {
    const gameState = gameStateRef.current;

    switch (level) {
      case "easy":
        gameState.aiReactionTime = 0.2;
        gameState.aiErrorMargin = 50;
        gameState.ball.speed = 4;
        break;
      case "medium":
        gameState.aiReactionTime = 0.1;
        gameState.aiErrorMargin = 30;
        gameState.ball.speed = 5;
        break;
      case "hard":
        gameState.aiReactionTime = 0.05;
        gameState.aiErrorMargin = 10;
        gameState.ball.speed = 6;
        break;
      default:
        gameState.aiReactionTime = 0.1;
        gameState.aiErrorMargin = 30;
        gameState.ball.speed = 5;
    }
  };

  // Reset game state
  const resetGame = () => {
    const gameState = gameStateRef.current;

    // Reset ball position to center
    gameState.ball.x = gameState.canvasWidth / 2;
    gameState.ball.y = gameState.canvasHeight / 2;

    // Random direction, but ensure horizontal movement is significant
    const angle = (Math.random() * Math.PI) / 4 - Math.PI / 8; // -22.5 to 22.5 degrees
    const direction = Math.random() > 0.5 ? 1 : -1; // Left or right

    gameState.ball.dx = Math.cos(angle) * gameState.ball.speed * direction;
    gameState.ball.dy = Math.sin(angle) * gameState.ball.speed;

    // Reset paddle positions
    gameState.playerPaddle.x = 20;
    gameState.playerPaddle.y =
      (gameState.canvasHeight - gameState.playerPaddle.height) / 2;

    gameState.aiPaddle.x =
      gameState.canvasWidth - 20 - gameState.aiPaddle.width;
    gameState.aiPaddle.y =
      (gameState.canvasHeight - gameState.aiPaddle.height) / 2;
  };

  // Handle mouse/touch movement for player paddle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gameState = gameStateRef.current;

    const handleMouseMove = (e) => {
      if (!gameStarted) return;

      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;

      // Calculate paddle position, keeping it within canvas bounds
      let newY = mouseY - gameState.playerPaddle.height / 2;
      newY = Math.max(
        0,
        Math.min(newY, gameState.canvasHeight - gameState.playerPaddle.height)
      );

      gameState.playerPaddle.y = newY;
    };

    const handleTouchMove = (e) => {
      if (!gameStarted) return;
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const touchY = e.touches[0].clientY - rect.top;

      // Calculate paddle position, keeping it within canvas bounds
      let newY = touchY - gameState.playerPaddle.height / 2;
      newY = Math.max(
        0,
        Math.min(newY, gameState.canvasHeight - gameState.playerPaddle.height)
      );

      gameState.playerPaddle.y = newY;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gameStarted]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const gameState = gameStateRef.current;

    let animationFrameId;

    const render = (time) => {
      if (!gameState.lastTime) {
        gameState.lastTime = time;
      }

      const deltaTime = (time - gameState.lastTime) / 1000; // Convert to seconds
      gameState.lastTime = time;

      // Clear canvas
      ctx.clearRect(0, 0, gameState.canvasWidth, gameState.canvasHeight);

      // Draw background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, gameState.canvasWidth, gameState.canvasHeight);

      // Draw center line
      ctx.strokeStyle = "#FFFFFF";
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(gameState.canvasWidth / 2, 0);
      ctx.lineTo(gameState.canvasWidth / 2, gameState.canvasHeight);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw score
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `${Math.max(
        16,
        Math.floor(gameState.canvasWidth * 0.04)
      )}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(score.player.toString(), gameState.canvasWidth * 0.25, 30);
      ctx.fillText(score.ai.toString(), gameState.canvasWidth * 0.75, 30);

      // Draw paddles
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(
        gameState.playerPaddle.x,
        gameState.playerPaddle.y,
        gameState.playerPaddle.width,
        gameState.playerPaddle.height
      );

      ctx.fillRect(
        gameState.aiPaddle.x,
        gameState.aiPaddle.y,
        gameState.aiPaddle.width,
        gameState.aiPaddle.height
      );

      // Draw ball
      ctx.beginPath();
      ctx.arc(
        gameState.ball.x,
        gameState.ball.y,
        gameState.ball.radius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.closePath();

      // Update ball position
      gameState.ball.x += gameState.ball.dx;
      gameState.ball.y += gameState.ball.dy;

      // Ball collision with top and bottom walls
      if (
        gameState.ball.y - gameState.ball.radius < 0 ||
        gameState.ball.y + gameState.ball.radius > gameState.canvasHeight
      ) {
        gameState.ball.dy = -gameState.ball.dy;

        // Keep ball within bounds
        if (gameState.ball.y - gameState.ball.radius < 0) {
          gameState.ball.y = gameState.ball.radius;
        } else {
          gameState.ball.y = gameState.canvasHeight - gameState.ball.radius;
        }
      }

      // Ball collision with paddles
      // Player paddle
      if (
        gameState.ball.x - gameState.ball.radius <
          gameState.playerPaddle.x + gameState.playerPaddle.width &&
        gameState.ball.x + gameState.ball.radius > gameState.playerPaddle.x &&
        gameState.ball.y > gameState.playerPaddle.y &&
        gameState.ball.y <
          gameState.playerPaddle.y + gameState.playerPaddle.height
      ) {
        // Calculate normalized hit position (-0.5 to 0.5)
        const hitPosition =
          (gameState.ball.y -
            (gameState.playerPaddle.y + gameState.playerPaddle.height / 2)) /
          (gameState.playerPaddle.height / 2);

        // Calculate new angle based on hit position
        const angle = hitPosition * (Math.PI / 4); // Max 45 degrees

        // Update ball direction and slightly increase speed
        gameState.ball.dx = Math.cos(angle) * gameState.ball.speed;
        gameState.ball.dy = Math.sin(angle) * gameState.ball.speed;

        // Ensure ball moves away from paddle
        if (gameState.ball.dx < 0) {
          gameState.ball.dx = -gameState.ball.dx;
        }

        // Move ball outside paddle to prevent multiple collisions
        gameState.ball.x =
          gameState.playerPaddle.x +
          gameState.playerPaddle.width +
          gameState.ball.radius;
      }

      // AI paddle
      if (
        gameState.ball.x + gameState.ball.radius > gameState.aiPaddle.x &&
        gameState.ball.x - gameState.ball.radius <
          gameState.aiPaddle.x + gameState.aiPaddle.width &&
        gameState.ball.y > gameState.aiPaddle.y &&
        gameState.ball.y < gameState.aiPaddle.y + gameState.aiPaddle.height
      ) {
        // Calculate normalized hit position (-0.5 to 0.5)
        const hitPosition =
          (gameState.ball.y -
            (gameState.aiPaddle.y + gameState.aiPaddle.height / 2)) /
          (gameState.aiPaddle.height / 2);

        // Calculate new angle based on hit position
        const angle = hitPosition * (Math.PI / 4); // Max 45 degrees

        // Update ball direction and slightly increase speed
        gameState.ball.dx = -Math.cos(angle) * gameState.ball.speed;
        gameState.ball.dy = Math.sin(angle) * gameState.ball.speed;

        // Move ball outside paddle to prevent multiple collisions
        gameState.ball.x = gameState.aiPaddle.x - gameState.ball.radius;
      }

      // Ball out of bounds (scoring)
      if (gameState.ball.x + gameState.ball.radius < 0) {
        // AI scores
        setScore((prev) => {
          const newScore = { ...prev, ai: prev.ai + 1 };

          // Check for game over
          if (newScore.ai >= 5) {
            setGameOver(true);
            setWinner("AI");
            return newScore;
          }

          return newScore;
        });

        resetGame();
      } else if (
        gameState.ball.x - gameState.ball.radius >
        gameState.canvasWidth
      ) {
        // Player scores
        setScore((prev) => {
          const newScore = { ...prev, player: prev.player + 1 };

          // Check for game over
          if (newScore.player >= 5) {
            setGameOver(true);
            setWinner("Player");
            return newScore;
          }

          return newScore;
        });

        resetGame();
      }

      // AI movement
      moveAI(deltaTime);

      animationFrameId = requestAnimationFrame(render);
    };

    const moveAI = (deltaTime) => {
      // AI follows the ball with some delay and error margin
      const targetY = gameState.ball.y - gameState.aiPaddle.height / 2;

      // Add some "thinking" delay based on difficulty
      const aiSpeed =
        (gameState.canvasHeight / 2) * (1 - gameState.aiReactionTime);

      // Add some randomness to AI movement
      const errorFactor =
        Math.random() * gameState.aiErrorMargin - gameState.aiErrorMargin / 2;
      const aiTarget = targetY + errorFactor;

      // Move AI paddle towards target
      const distance = aiTarget - gameState.aiPaddle.y;
      const movement =
        Math.sign(distance) * Math.min(Math.abs(distance), aiSpeed * deltaTime);

      // Update AI paddle position, keeping it within canvas bounds
      gameState.aiPaddle.y = Math.max(
        0,
        Math.min(
          gameState.aiPaddle.y + movement,
          gameState.canvasHeight - gameState.aiPaddle.height
        )
      );
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gameState.lastTime = 0;
    };
  }, [gameStarted, gameOver, score]);

  // Start a new game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore({ player: 0, ai: 0 });
    setWinner(null);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#ece9d8] font-[Tahoma,sans-serif]">
      <div className="w-full bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1] p-1 mb-4 border-b border-[#a0a0a0]">
        <div className="font-bold text-center text-[#333]">
          {gameStarted && !gameOver
            ? `Player: ${score.player} - AI: ${score.ai}`
            : gameOver
            ? `Game Over - ${winner} wins!`
            : "Classic Pong"}
        </div>
      </div>

      <div className="relative flex-1 w-full flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border-[2px] border-[#7a7a7a] shadow-inner bg-black touch-manipulation"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />

        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
            <div className="bg-[#ece9d8] p-4 rounded border-2 border-[#7a7a7a] shadow-md">
              <h2 className="text-xl font-bold text-center mb-4">
                {gameOver ? `${winner} wins!` : "Classic Pong"}
              </h2>

              {!gameStarted && (
                <div className="mb-4">
                  <p className="text-sm mb-2">Select difficulty:</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      className={`px-3 py-1 text-sm border border-[#7a7a7a] rounded ${
                        difficulty === "easy"
                          ? "bg-blue-600 text-white"
                          : "bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1]"
                      }`}
                      onClick={() => setDifficulty("easy")}
                    >
                      Easy
                    </button>
                    <button
                      className={`px-3 py-1 text-sm border border-[#7a7a7a] rounded ${
                        difficulty === "medium"
                          ? "bg-blue-600 text-white"
                          : "bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1]"
                      }`}
                      onClick={() => setDifficulty("medium")}
                    >
                      Medium
                    </button>
                    <button
                      className={`px-3 py-1 text-sm border border-[#7a7a7a] rounded ${
                        difficulty === "hard"
                          ? "bg-blue-600 text-white"
                          : "bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1]"
                      }`}
                      onClick={() => setDifficulty("hard")}
                    >
                      Hard
                    </button>
                  </div>
                </div>
              )}

              <div className="text-sm mb-4 text-center">
                {gameOver ? (
                  <p>
                    Final Score: Player {score.player} - AI {score.ai}
                  </p>
                ) : (
                  <p>Use your mouse or touch to move the paddle</p>
                )}
              </div>

              <button
                className="w-full py-2 bg-gradient-to-b from-[#e1e1e1] to-[#c1c1c1] border border-[#7a7a7a] rounded text-sm shadow hover:from-[#e9e9e9] hover:to-[#d9d9d9] active:from-[#c1c1c1] active:to-[#e1e1e1] active:shadow-inner"
                onClick={startGame}
              >
                {gameOver ? "Play Again" : "Start Game"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
