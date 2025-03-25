"use client";

import { useState } from "react";

export default function GameWindow({
  windowName,
  title,
  icon,
  children,
  position,
  isActive,
  onClick,
  onClose,
  onDragStop,
  onResizeStop,
  isMobile,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Handle window click
  const handleWindowClick = (e) => {
    if (!isDragging && !isResizing) {
      onClick(windowName);
    }
  };

  // Handle window close
  const handleClose = (e) => {
    e.stopPropagation();
    onClose(windowName);
  };

  return (
    <div
      className={`absolute flex flex-col rounded-t-lg border-2 shadow-lg overflow-hidden ${
        isActive ? "border-[#0054e3] z-[100]" : "border-[#7a7a7a] z-[50]"
      }`}
      style={{
        width: position.width,
        height: position.height,
        left: position.x,
        top: position.y,
      }}
      onClick={handleWindowClick}
    >
      {/* Window Title Bar */}
      <div
        className="window-title-bar flex items-center justify-between px-2 py-1 cursor-move"
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startY = e.clientY;
          const startLeft = position.x;
          const startTop = position.y;

          const handleMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            onDragStop(windowName, { x: startLeft + dx, y: startTop + dy });
          };

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            setIsDragging(false);
          };

          setIsDragging(true);
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
        style={{
          background: isActive
            ? "linear-gradient(to right, #0058e0, #3a93ff)"
            : "linear-gradient(to right, #7a7a7a, #b9b9b9)",
          color: isActive ? "white" : "#d9d9d9",
        }}
      >
        <div className="flex items-center gap-1">
          {icon && <div className="mr-1">{icon}</div>}
          <span className="text-sm font-bold truncate">{title}</span>
        </div>
        <div className="flex gap-1">
          <button
            className="w-[22px] h-[22px] flex items-center justify-center text-black bg-[#e9e9e9] rounded-sm hover:bg-[#c1c1c1] active:bg-[#e9e9e9] active:shadow-inner"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="window-content flex-1 bg-[#ece9d8] overflow-hidden"
        style={{ touchAction: "none" }}
      >
        {children}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startY = e.clientY;
          const startWidth = position.width;
          const startHeight = position.height;

          const handleMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            const newWidth = Math.max(280, startWidth + dx);
            const newHeight = Math.max(200, startHeight + dy);

            onResizeStop(
              windowName,
              { style: { width: newWidth, height: newHeight } },
              {}
            );
          };

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            setIsResizing(false);
          };

          setIsResizing(true);
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />
    </div>
  );
}
