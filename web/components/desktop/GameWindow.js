import { Rnd } from "react-rnd";

export default function GameWindow({
  windowName,
  position,
  isActive,
  onClick,
  onClose,
  onDragStop,
  onResizeStop,
  isMobile,
  title,
  icon,
  children,
}) {
  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,
      }}
      minWidth={300}
      minHeight={350}
      bounds=".winxp-desktop"
      onDragStop={(e, d) => onDragStop(windowName, d)}
      onResizeStop={(e, direction, ref, delta, pos) =>
        onResizeStop(windowName, ref, pos)
      }
      className={`absolute overflow-hidden rounded-t-lg shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${
        isActive ? "z-[20]" : "z-[10]"
      }`}
      onClick={() => onClick(windowName)}
      disableDragging={isMobile}
      enableResizing={!isMobile}
    >
      <div className="flex flex-col h-full bg-[#ece9d8] border border-[#0054e3] shadow-[2px_2px_8px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center px-1 py-[3px] h-[25px] cursor-move bg-gradient-to-r from-[#0078d7] via-[#26a0da] to-[#0078d7] text-white font-bold text-xs">
          <div className="flex items-center gap-1 text-xs">
            {icon} {title}
          </div>
          <div className="flex gap-[2px]">
            <button
              className="w-[22px] h-[22px] bg-transparent bg-center bg-no-repeat border border-transparent rounded hover:bg-white/20 hover:border-white/40"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><rect x='3' y='7' width='10' height='2' fill='white'/></svg>\")",
              }}
            ></button>
            <button
              className="w-[22px] h-[22px] bg-transparent bg-center bg-no-repeat border border-transparent rounded hover:bg-yellow-300/60 hover:border-white/40"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><rect x='3' y='3' width='10' height='10' stroke='white' fill='none' strokeWidth='2'/></svg>\")",
              }}
            ></button>
            <button
              className="w-[22px] h-[22px] bg-transparent bg-center bg-no-repeat border border-transparent rounded hover:bg-red-600/60 hover:border-white/40"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path d='M3,3 L13,13 M13,3 L3,13' stroke='white' strokeWidth='2'/></svg>\")",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onClose(windowName);
              }}
            />
          </div>
        </div>
        <div className="flex-1 p-2 overflow-auto bg-[#ece9d8] border-t border-white">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
