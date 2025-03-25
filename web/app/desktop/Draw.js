"use client";
import { useState, useEffect, useRef } from "react";

export default function Draw({ isMobile }) {
  const canvasRef = useRef(null);
  const colorPaletteRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState("brush");
  const [currentColor, setCurrentColor] = useState("#000000");

  // Initialize canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set initial canvas background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate color palette
    generateColorPalette();
  }, []);

  // Drawing functions
  const startDrawing = (e) => {
    e.stopPropagation(); // Prevent window dragging
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.stopPropagation(); // Prevent window dragging
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.lineTo(x, y);

    if (currentTool === "eraser") {
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 20;
    } else {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 2;
    }

    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (e) e.stopPropagation(); // Prevent window dragging
    setIsDrawing(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    e.stopPropagation(); // Prevent window dragging
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    startDrawing(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation(); // Prevent window dragging
    e.preventDefault();
    if (!isDrawing) return;

    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    draw(mouseEvent);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation(); // Prevent window dragging
    e.preventDefault();
    stopDrawing();
  };

  // Tool selection
  const selectTool = (tool) => {
    setCurrentTool(tool);
  };

  // Generate color palette
  const generateColorPalette = () => {
    const colors = [
      "#000000",
      "#808080",
      "#800000",
      "#808000",
      "#008000",
      "#008080",
      "#000080",
      "#800080",
      "#808040",
      "#004040",
      "#0080FF",
      "#004080",
      "#8000FF",
      "#804000",
      "#FFFFFF",
      "#C0C0C0",
      "#FF0000",
      "#FFFF00",
      "#00FF00",
      "#00FFFF",
      "#0000FF",
      "#FF00FF",
      "#FFFF80",
      "#00FF80",
      "#80FFFF",
      "#8080FF",
      "#FF0080",
      "#FF8040",
    ];

    const colorPaletteDiv = colorPaletteRef.current;
    if (!colorPaletteDiv) return;

    // Clear existing buttons
    colorPaletteDiv.innerHTML = "";

    colors.forEach((color) => {
      const btn = document.createElement("button");
      btn.className = "w-6 h-6 p-0 min-w-0";
      btn.style.backgroundColor = color;

      if (color === currentColor) {
        btn.classList.add("ring-1", "ring-gray-600");
      }

      btn.addEventListener("click", () => {
        setCurrentColor(color);

        // Remove active style from all color buttons
        document.querySelectorAll("#colorPalette button").forEach((button) => {
          button.classList.remove("ring-1", "ring-gray-600");
        });

        // Add active style to the selected button
        btn.classList.add("ring-1", "ring-gray-600");
      });

      colorPaletteDiv.appendChild(btn);
    });
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] font-[Tahoma,sans-serif]">
      {/* Menu Bar */}
      <div className="bg-gray-300 px-2 py-1 text-sm">
        <span className="mr-4 cursor-pointer hover:underline">File</span>
        <span className="mr-4 cursor-pointer hover:underline">Edit</span>
        <span className="mr-4 cursor-pointer hover:underline">View</span>
        <span className="mr-4 cursor-pointer hover:underline">Image</span>
        <span className="mr-4 cursor-pointer hover:underline">Options</span>
        <span className="cursor-pointer hover:underline">Help</span>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tools sidebar */}
        <div className="w-10 bg-gray-300 p-0.5 border-r border-gray-400">
          <button
            className={`w-9 h-9 p-0 min-w-0 mb-0.5 ${
              currentTool === "brush"
                ? "bg-gray-300 border border-gray-400 shadow-inner"
                : ""
            }`}
            onClick={() => selectTool("brush")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mx-auto"
            >
              <path d="M18 12l-8-8-6 6c-2 2-2 5 0 7s5 2 7 0l7-7"></path>
              <path d="M17 7l3 3"></path>
            </svg>
          </button>
          <button
            className={`w-9 h-9 p-0 min-w-0 mb-0.5 ${
              currentTool === "eraser"
                ? "bg-gray-300 border border-gray-400 shadow-inner"
                : ""
            }`}
            onClick={() => selectTool("eraser")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mx-auto"
            >
              <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z"></path>
              <path d="M17 17L7 7"></path>
            </svg>
          </button>
          <button className="w-9 h-9 p-0 min-w-0 mb-0.5" onClick={clearCanvas}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mx-auto"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-grow overflow-auto border border-gray-400 bg-white">
          <canvas
            id="canvas"
            ref={canvasRef}
            width={isMobile ? 1000 : 2000}
            height={isMobile ? 1000 : 2000}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="touch-none"
          ></canvas>
        </div>
      </div>

      {/* Color Palette */}
      <div
        id="colorPalette"
        ref={colorPaletteRef}
        className="flex flex-wrap bg-gray-300 p-1 border-t border-gray-400"
      >
        {/* Color buttons will be generated by JS */}
      </div>

      {/* Footer */}
      <div className="bg-gray-300 px-2 py-1 text-xs border-t border-gray-400">
        For Help, click Help Topics on the Help Menu.
      </div>
    </div>
  );
}
