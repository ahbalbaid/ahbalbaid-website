"use client";
import { useState, useEffect, useRef } from "react";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import GameWindow from "@/components/desktop/GameWindow";
import StartMenu from "@/components/desktop/StartMenu";
import Taskbar from "@/components/desktop/Taskbar";
import TicTacToe from "@/app/desktop/TicTacToe";
import Pong from "@/app/desktop/Pong";
import Connect4 from "@/app/desktop/Connect4";
import Draw from "@/app/desktop/Draw";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState({
    tictactoe: false,
    pong: false,
    connect4: false,
    draw: false,
  });
  const [activeWindow, setActiveWindow] = useState(null);
  const [windowPositions, setWindowPositions] = useState({
    tictactoe: { x: 100, y: 100, width: 320, height: 400 },
    pong: { x: 150, y: 150, width: 400, height: 350 },
    connect4: { x: 200, y: 120, width: 380, height: 450 },
    draw: { x: 250, y: 100, width: 800, height: 600 },
  });
  const [showStartMenu, setShowStartMenu] = useState(false);
  const startMenuRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  // 🔍 Mobile Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🔘 Close Start Menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target) &&
        !e.target.closest(".start-button")
      ) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🕒 Clock
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // 🧠 Window Logic
  const openWindow = (name) => {
    setOpenWindows((prev) => ({ ...prev, [name]: true }));
    setActiveWindow(name);
    if (isMobile) {
      const windowSizes = {
        tictactoe: { width: 320, height: 400 },
        pong: { width: 400, height: 350 },
        connect4: { width: 380, height: 450 },
        draw: { width: 350, height: 500 },
      };

      setWindowPositions((prev) => ({
        ...prev,
        [name]: {
          x: Math.max(10, (window.innerWidth - windowSizes[name].width) / 2),
          y: Math.max(10, (window.innerHeight - windowSizes[name].height) / 4),
          width: Math.min(windowSizes[name].width, window.innerWidth - 20),
          height: Math.min(windowSizes[name].height, window.innerHeight - 100),
        },
      }));
    }
  };

  const closeWindow = (name) => {
    setOpenWindows((prev) => ({ ...prev, [name]: false }));
    if (activeWindow === name) setActiveWindow(null);
  };

  const handleWindowClick = (name) => setActiveWindow(name);

  const handleDragStop = (name, d) => {
    setWindowPositions((prev) => ({
      ...prev,
      [name]: { ...prev[name], x: d.x, y: d.y },
    }));
  };

  const handleResizeStop = (name, ref, position) => {
    setWindowPositions((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        width: Number.parseInt(ref.style.width),
        height: Number.parseInt(ref.style.height),
      },
    }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full overflow-hidden font-[Tahoma,sans-serif]">
      {/* 💻 Desktop Background */}
      <div className="winxp-desktop flex-1 relative overflow-hidden z-[1] bg-gradient-to-b from-[#3a6ea5] via-[#6bb9f0] to-[#a1d8ff]">
        {/* 🖱️ Desktop Icons */}
        <div className="p-2 flex flex-col items-start gap-4 relative z-[5]">
          <DesktopIcon
            label="Tic Tac Toe"
            onClick={() => openWindow("tictactoe")}
            icon={
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#1E88E5" />
                <rect x="6" y="6" width="10" height="10" rx="1" fill="white" />
                <rect x="19" y="6" width="10" height="10" rx="1" fill="white" />
                <rect x="32" y="6" width="10" height="10" rx="1" fill="white" />
                <rect x="6" y="19" width="10" height="10" rx="1" fill="white" />
                <rect
                  x="19"
                  y="19"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="32"
                  y="19"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
                <rect x="6" y="32" width="10" height="10" rx="1" fill="white" />
                <rect
                  x="19"
                  y="32"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="32"
                  y="32"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
                <path
                  d="M9 9L13 13M13 9L9 13"
                  stroke="#1E88E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="24" r="3" fill="#1E88E5" />
                <path
                  d="M35 35L39 39M39 35L35 39"
                  stroke="#1E88E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />

          <DesktopIcon
            label="Pong"
            onClick={() => openWindow("pong")}
            icon={
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#4CAF50" />
                <rect x="8" y="12" width="6" height="24" rx="1" fill="white" />
                <rect x="34" y="12" width="6" height="24" rx="1" fill="white" />
                <circle cx="24" cy="24" r="4" fill="white" />
                <line
                  x1="24"
                  y1="6"
                  x2="24"
                  y2="42"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            }
          />

          <DesktopIcon
            label="Connect 4"
            onClick={() => openWindow("connect4")}
            icon={
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#0054e3" />
                <circle cx="12" cy="12" r="5" fill="white" />
                <circle cx="24" cy="12" r="5" fill="white" />
                <circle cx="36" cy="12" r="5" />
                <circle cx="24" cy="12" r="5" fill="white" />
                <circle cx="36" cy="12" r="5" fill="white" />
                <circle cx="12" cy="24" r="5" fill="white" />
                <circle cx="24" cy="24" r="5" fill="red" />
                <circle cx="36" cy="24" r="5" fill="yellow" />
                <circle cx="12" cy="36" r="5" fill="red" />
                <circle cx="24" cy="36" r="5" fill="yellow" />
                <circle cx="36" cy="36" r="5" fill="red" />
              </svg>
            }
          />

          <DesktopIcon
            label="Paint"
            onClick={() => openWindow("draw")}
            icon={
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#1E88E5" />
                <rect x="6" y="6" width="36" height="28" rx="2" fill="white" />
                <rect
                  x="8"
                  y="8"
                  width="32"
                  height="24"
                  rx="1"
                  fill="#F0F0F0"
                />
                <path d="M12 36H36" stroke="#1E88E5" strokeWidth="2" />
                <path d="M14 40H34" stroke="#1E88E5" strokeWidth="2" />
                <circle cx="14" cy="16" r="3" fill="#FF0000" />
                <circle cx="22" cy="16" r="3" fill="#00FF00" />
                <circle cx="30" cy="16" r="3" fill="#0000FF" />
                <rect x="12" cy="22" width="20" height="2" fill="#333" />
                <path
                  d="M36 12L32 16M32 12L36 16"
                  stroke="#FF0000"
                  strokeWidth="1.5"
                />
                <path
                  d="M14 26L22 26"
                  stroke="#333"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
        </div>

        {/* 🪟 Tic Tac Toe Window */}
        {openWindows.tictactoe && (
          <GameWindow
            windowName="tictactoe"
            title="Tic Tac Toe"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#1E88E5" />
                <rect x="6" y="6" width="10" height="10" rx="1" fill="white" />
                <rect x="19" y="6" width="10" height="10" rx="1" fill="white" />
                <rect x="32" y="6" width="10" height="10" rx="1" fill="white" />
                <rect x="6" y="19" width="10" height="10" rx="1" fill="white" />
                <rect
                  x="19"
                  y="19"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="32"
                  y="19"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
                <rect x="6" y="32" width="10" height="10" rx="1" fill="white" />
                <rect
                  x="19"
                  y="32"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="32"
                  y="32"
                  width="10"
                  height="10"
                  rx="1"
                  fill="white"
                />
              </svg>
            }
            position={windowPositions.tictactoe}
            isActive={activeWindow === "tictactoe"}
            onClick={handleWindowClick}
            onClose={closeWindow}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            isMobile={isMobile}
          >
            <TicTacToe isMobile={isMobile} />
          </GameWindow>
        )}

        {/* 🪟 Pong Window */}
        {openWindows.pong && (
          <GameWindow
            windowName="pong"
            title="Pong"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#4CAF50" />
                <rect x="8" y="12" width="6" height="24" rx="1" fill="white" />
                <rect x="34" y="12" width="6" height="24" rx="1" fill="white" />
                <circle cx="24" cy="24" r="4" fill="white" />
                <line
                  x1="24"
                  y1="6"
                  x2="24"
                  y2="42"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            }
            position={windowPositions.pong}
            isActive={activeWindow === "pong"}
            onClick={handleWindowClick}
            onClose={closeWindow}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            isMobile={isMobile}
          >
            <Pong isMobile={isMobile} />
          </GameWindow>
        )}

        {/* 🪟 Connect 4 Window */}
        {openWindows.connect4 && (
          <GameWindow
            windowName="connect4"
            title="Connect 4"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#0054e3" />
                <circle cx="12" cy="12" r="5" fill="white" />
                <circle cx="24" cy="12" r="5" fill="white" />
                <circle cx="36" cy="12" r="5" fill="white" />
                <circle cx="12" cy="24" r="5" fill="white" />
                <circle cx="24" cy="24" r="5" fill="red" />
                <circle cx="36" cy="24" r="5" fill="yellow" />
                <circle cx="12" cy="36" r="5" fill="red" />
                <circle cx="24" cy="36" r="5" fill="yellow" />
                <circle cx="36" cy="36" r="5" fill="red" />
              </svg>
            }
            position={windowPositions.connect4}
            isActive={activeWindow === "connect4"}
            onClick={handleWindowClick}
            onClose={closeWindow}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            isMobile={isMobile}
          >
            <Connect4 isMobile={isMobile} />
          </GameWindow>
        )}

        {/* 🪟 Paint Window */}
        {openWindows.draw && (
          <GameWindow
            windowName="draw"
            title="Paint"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="4" fill="#1E88E5" />
                <rect x="6" y="6" width="36" height="28" rx="2" fill="white" />
                <rect
                  x="8"
                  y="8"
                  width="32"
                  height="24"
                  rx="1"
                  fill="#F0F0F0"
                />
                <circle cx="14" cy="16" r="3" fill="#FF0000" />
                <circle cx="22" cy="16" r="3" fill="#00FF00" />
                <circle cx="30" cy="16" r="3" fill="#0000FF" />
              </svg>
            }
            position={windowPositions.draw}
            isActive={activeWindow === "draw"}
            onClick={handleWindowClick}
            onClose={closeWindow}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            isMobile={isMobile}
          >
            <Draw isMobile={isMobile} />
          </GameWindow>
        )}
      </div>

      {/* 🧱 Taskbar */}
      <Taskbar
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        showStartMenu={showStartMenu}
        clock={formatTime(currentTime)}
      >
        <StartMenu
          onAppClick={openWindow}
          onClose={() => setShowStartMenu(false)}
          refProp={startMenuRef}
        />
      </Taskbar>
    </div>
  );
}
