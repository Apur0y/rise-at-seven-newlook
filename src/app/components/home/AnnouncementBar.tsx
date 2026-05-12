export default function AnnouncementBar() {
  return (
    <div className="group relative overflow-hidden bg-teal-200/70 text-black py-2 px-4 text-center text-sm font-medium mx-2 my-2 rounded-4xl cursor-pointer">
      
      {/* Default Text */}
      <span className="block transition-transform duration-300 group-hover:-translate-y-10">
        🚨The Category Leaderboard - Live now
      </span>

      {/* Hover Text */}
      <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        🚨The Category Leaderboard - Live now
      </span>
    </div>
  );
}