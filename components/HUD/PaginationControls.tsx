'use client';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  disabled = false,
}: PaginationControlsProps) {
  if (disabled || totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 py-6">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        suppressHydrationWarning
        className="px-6 py-2 bg-slate-800/60 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700/60 hover:border-cyan-500/50 hover:text-cyan-400 disabled:bg-slate-900/40 disabled:border-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition-all duration-300 font-medium"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-slate-800/40 border border-slate-700 rounded-lg text-slate-300 font-medium">
        Page <span className="text-cyan-400">{currentPage}</span> of <span className="text-cyan-400">{totalPages}</span>
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        suppressHydrationWarning
        className="px-6 py-2 bg-slate-800/60 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700/60 hover:border-cyan-500/50 hover:text-cyan-400 disabled:bg-slate-900/40 disabled:border-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition-all duration-300 font-medium"
      >
        Next
      </button>
    </div>
  );
}
