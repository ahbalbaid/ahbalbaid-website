"use client";
import { useState, useEffect, useRef } from "react";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import GameWindow from "@/components/desktop/GameWindow";
import StartMenu from "@/components/desktop/StartMenu";
import Taskbar from "@/components/desktop/Taskbar";
import TicTacToe from "@/app/desktop/TicTacToe";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState({ tictactoe: false });
  const [activeWindow, setActiveWindow] = useState(null);
  const [windowPositions, setWindowPositions] = useState({
    tictactoe: { x: 100, y: 100, width: 320, height: 400 },
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
      setWindowPositions((prev) => ({
        ...prev,
        [name]: {
          x: Math.max(10, (window.innerWidth - 320) / 2),
          y: Math.max(10, (window.innerHeight - 400) / 4),
          width: Math.min(320, window.innerWidth - 20),
          height: Math.min(400, window.innerHeight - 100),
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
        width: parseInt(ref.style.width),
        height: parseInt(ref.style.height),
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
