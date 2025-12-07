export default function Loading() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin shadow-lg shadow-cyan-500/20" />
        <div className="mt-4 text-center text-slate-400">Loading database...</div>
      </div>
    </div>
  );
}
