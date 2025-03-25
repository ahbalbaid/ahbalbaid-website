export default function DesktopIcon({ label, onClick, icon }) {
  return (
    <div
      className="flex flex-col items-center w-20 cursor-pointer p-1 border border-transparent rounded hover:bg-white/20 hover:border-white/40 active:bg-white/30"
      onClick={onClick}
    >
      <div className="mb-1">{icon}</div>
      <div className="text-white text-center text-xs drop-shadow-[1px_1px_1px_rgba(0,0,0,0.7)] break-words w-full">
        {label}
      </div>
    </div>
  );
}
