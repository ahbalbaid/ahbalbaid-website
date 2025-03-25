export default function Taskbar({
  onStartClick,
  showStartMenu,
  children,
  clock,
}) {
  return (
    <div className="h-[30px] flex items-center px-1 bg-gradient-to-b from-[#2584de] to-[#084d8e] z-[1000]">
      <div className="relative">
        <button
          className="flex items-center gap-1 text-white font-bold border border-[#155415] rounded px-2 h-[22px] mr-1 text-shadow shadow-black/50 bg-gradient-to-b from-[#3cb54a] to-[#1a7a1a] hover:from-[#44c653] hover:to-[#1f8f1f] active:from-[#1a7a1a] active:to-[#3cb54a]"
          onClick={onStartClick}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="20" height="20" rx="2" fill="#107C10" />
            <rect x="2" y="2" width="7" height="7" rx="1" fill="#FFFFFF" />
            <rect x="11" y="2" width="7" height="7" rx="1" fill="#FFFFFF" />
            <rect x="2" y="11" width="7" height="7" rx="1" fill="#FFFFFF" />
            <rect x="11" y="11" width="7" height="7" rx="1" fill="#FFFFFF" />
          </svg>
          <span>Start</span>
        </button>
        {showStartMenu && children}
      </div>

      <div className="flex-1 flex gap-[2px] px-1 overflow-x-hidden">
        {/* App buttons */}
      </div>

      <div className="flex items-center h-full px-2 bg-[#0e70c0] border-l border-[#3a91e2]">
        <div className="text-white text-[11px] bg-[#0e70c0] px-2 py-1 rounded">
          {clock}
        </div>
      </div>
    </div>
  );
}
