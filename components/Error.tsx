interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="backdrop-blur-md bg-red-900/20 border border-red-500/50 rounded-xl p-6 max-w-md w-full shadow-lg shadow-red-500/20">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-400">Database Error</h3>
        </div>
        <p className="text-red-300 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600/80 text-white px-4 py-2 rounded-lg hover:bg-red-600 border border-red-500/50 transition-all duration-300 font-medium"
          >
            Retry Connection
          </button>
        )}
      </div>
    </div>
  );
}
