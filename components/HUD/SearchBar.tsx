'use client';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: (query: string) => void;
  searchMode: 'name' | 'id';
  onModeChange: (mode: 'name' | 'id') => void;
}

export default function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit,
  searchMode,
  onModeChange 
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit && searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  return (
    <div className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => onModeChange('name')}
            suppressHydrationWarning
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              searchMode === 'name'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:border-slate-500'
            }`}
          >
            Name Search
          </button>
          <button
            type="button"
            onClick={() => onModeChange('id')}
            suppressHydrationWarning
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              searchMode === 'id'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:border-slate-500'
            }`}
          >
            ID Search
          </button>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={searchMode === 'id' ? 'Enter ID (e.g., 25)' : 'Search by name...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            suppressHydrationWarning
            className="flex-1 px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
          {onSearchSubmit && (
            <button
              type="submit"
              suppressHydrationWarning
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              Search
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
