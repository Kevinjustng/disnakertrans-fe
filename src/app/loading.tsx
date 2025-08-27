export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Enhanced backdrop with smoother transition */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md transition-opacity duration-500 ease-out" />
      
      {/* Main spinner with smoother animation */}
      <div className="relative flex flex-col items-center justify-center gap-4">
        {/* Dual-layer spinner for smoother visual */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin [animation-duration:1.2s]" />
        </div>
        
        {/* Optional text with fade animation */}
        <span className="text-gray-600 font-medium animate-pulse [animation-duration:1.5s]">
          Loading...
        </span>
      </div>
    </div>
  );
}