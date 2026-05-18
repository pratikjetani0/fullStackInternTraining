import { useAppSelector } from "../store/hooks";

const HistoryPage = () => {
  const results = useAppSelector((state) => state.results.results);

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const userResults = results.filter(
    (result) => result.userId === currentUser?.id,
  );

  return (
    <section className="min-h-[85vh] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-3">
          History
        </h1>

        <p className="text-[var(--muted)] mb-10">
          Track your past typing performance and monitor your improvement.
        </p>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-4 border-b border-[var(--border)] text-[var(--muted)] font-medium">
            <span>Date</span>
            <span>Duration</span>
            <span>WPM</span>
            <span>Accuracy</span>
            <span>Consistency</span>
          </div>

          {userResults.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold text-[var(--text)] mb-2">
                No test history yet
              </h2>

              <p className="text-[var(--muted)]">
                Complete a typing test to start tracking your results.
              </p>
            </div>
          ) : (
            userResults.map((result) => (
              <div
                key={result.id}
                className="grid grid-cols-5 px-6 py-4 border-b border-[var(--border)] text-[var(--text)]"
              >
                <span>{new Date(result.date).toLocaleDateString()}</span>
                <span>{result.duration}s</span>
                <span>{result.wpm}</span>
                <span>{result.accuracy}%</span>
                <span>--</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HistoryPage;
