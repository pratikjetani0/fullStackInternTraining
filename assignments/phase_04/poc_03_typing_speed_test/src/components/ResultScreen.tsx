interface ResultScreenProps {
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  duration: number;
  isSaved: boolean;
  onRetry: () => void;
  onSave: () => void;
}

const ResultScreen = ({
  wpm,
  cpm,
  accuracy,
  mistakes,
  duration,
  isSaved,
  onRetry,
  onSave,
}: ResultScreenProps) => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center animate-[fadeIn_0.6s_ease]">
        <p className="text-[var(--muted)] text-lg mb-4">Test Complete</p>

        <h1 className="text-7xl font-bold text-[var(--accent)] mb-12">
          {wpm}
          <span className="text-3xl ml-2">WPM</span>
        </h1>

        {/* Grid display states  */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <div className="bg-[var(--card)] rounded-xl p-6">
            <p className="text-[var(--muted)] mb-2">Accuracy</p>
            <p className="text-3xl font-bold text-[var(--accent)]">
              {accuracy}%
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6">
            <p className="text-[var(--muted)] mb-2">CPM</p>
            <p className="text-3xl font-bold text-[var(--accent)]">{cpm}</p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6">
            <p className="text-[var(--muted)] mb-2">Mistakes</p>
            <p className="text-3xl font-bold text-[var(--accent)]">
              {mistakes}
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6">
            <p className="text-[var(--muted)] mb-2">Duration</p>
            <p className="text-3xl font-bold text-[var(--accent)]">
              {duration}s
            </p>
          </div>
        </div>

        {/* button controls  */}

        <div className="flex justify-center gap-6">
          <button
            onClick={onRetry}
            className="px-8 py-4 bg-[var(--btn)] text-[var(--btn-text)] rounded-xl font-semibold hover:bg-[var(--btn-h)] transition-all cursor-pointer"
          >
            Retry Test
          </button>

          <button
            onClick={onSave}
            disabled={isSaved}
            className={`px-5 py-3 rounded-lg transition-all cursor-pointer
            ${
              isSaved
                ? "bg-green-500 text-white cursor-not-allowed"
                : "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--btn-text)]"
            }`}
          >
            {isSaved ? "Saved ✓" : "Save Result"}
          </button>
        </div>

        <p className="text-[var(--muted)] mt-8 text-sm">
          Press restart to try again
        </p>
      </div>
    </section>
  );
};

export default ResultScreen;
