"use client";

export default function StartMenu({ onAppClick, onClose, refProp }) {
  return (
    <div
      className="absolute bottom-[30px] left-0 w-[320px] sm:w-[250px] flex flex-col overflow-hidden rounded-tr-lg bg-white border border-[#0054e3] shadow-[2px_2px_10px_rgba(0,0,0,0.3)] z-[1001]"
      ref={refProp}
    >
      <div className="bg-gradient-to-r from-[#215cca] to-[#2682e3] text-white p-2 h-[60px] border-b border-[#084d8e]">
        <div className="flex items-center gap-3 font-bold drop-shadow-sm">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="#0078D7" />
            <circle cx="24" cy="19" r="8" fill="white" />
            <path
              d="M10 42C10 34.268 16.268 28 24 28C31.732 28 38 34.268 38 42H10Z"
              fill="white"
            />
          </svg>{" "}
          <span>User</span>
        </div>
      </div>

      <div className="flex-1 p-1 bg-white">
        <div
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#316ac5] hover:text-white"
          onClick={() => {
            onAppClick("tictactoe");
            onClose();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="4" fill="#1E88E5" />
            <rect x="6" y="6" width="10" height="10" rx="1" fill="white" />
            <rect x="19" y="6" width="10" height="10" rx="1" fill="white" />
            <rect x="32" y="6" width="10" height="10" rx="1" fill="white" />
            <rect x="6" y="19" width="10" height="10" rx="1" fill="white" />
            <rect x="19" y="19" width="10" height="10" rx="1" fill="white" />
            <rect x="32" y="19" width="10" height="10" rx="1" fill="white" />
            <rect x="6" y="32" width="10" height="10" rx="1" fill="white" />
            <rect x="19" y="32" width="10" height="10" rx="1" fill="white" />
            <rect x="32" y="32" width="10" height="10" rx="1" fill="white" />
          </svg>{" "}
          <span>Tic Tac Toe</span>
        </div>

        <div
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#316ac5] hover:text-white"
          onClick={() => {
            onAppClick("pong");
            onClose();
          }}
        >
          <svg
            width="24"
            height="24"
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
          </svg>{" "}
          <span>Pong</span>
        </div>

        <div
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#316ac5] hover:text-white"
          onClick={() => {
            onAppClick("connect4");
            onClose();
          }}
        >
          <svg
            width="24"
            height="24"
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
          </svg>{" "}
          <span>Connect 4</span>
        </div>

        <div
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#316ac5] hover:text-white"
          onClick={() => {
            onAppClick("draw");
            onClose();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="4" fill="#1E88E5" />
            <rect x="6" y="6" width="36" height="28" rx="2" fill="white" />
            <rect x="8" y="8" width="32" height="24" rx="1" fill="#F0F0F0" />
            <circle cx="14" cy="16" r="3" fill="#FF0000" />
            <circle cx="22" cy="16" r="3" fill="#00FF00" />
            <circle cx="30" cy="16" r="3" fill="#0000FF" />
          </svg>{" "}
          <span>Paint</span>
        </div>
      </div>

      <div className="bg-[#d3d3d3] p-1 border-t border-[#a0a0a0]">
        <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[#316ac5] hover:text-white rounded">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2V10M15 5.5C16.3333 6.83333 17 8.5 17 10C17 14.1421 13.866 17.5 10 17.5C6.13401 17.5 3 14.1421 3 10C3 8.5 3.66667 6.83333 5 5.5"
              stroke="#FF0000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>{" "}
          <span>Shut Down</span>
        </div>
      </div>
    </div>
  );
}
