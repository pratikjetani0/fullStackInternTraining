interface StatsBarProps {
  timeLeft: number;
  wpm: number;
  mistakes: number;
  accuracy: number;
}

const StatsBar = ({
  timeLeft,
  wpm,
  mistakes,
  accuracy,
}: StatsBarProps) => {
  return (
    <div className="flex justify-center gap-10 text-lg font-medium">
      <div className="text-[var(--text)]">
        Time: <span className="text-[var(--accent)]">{timeLeft}s</span>
      </div>

      <div className="text-[var(--text)]">
        WPM: <span className="text-[var(--accent)]">{wpm}</span>
      </div>

      <div className="text-[var(--text)]">
        Mistakes: <span className="text-[var(--accent)]">{mistakes}</span>
      </div>

      <div className="text-[var(--text)]">
        Accuracy: <span className="text-[var(--accent)]">{accuracy}%</span>
      </div>
    </div>
  );
};

export default StatsBar;