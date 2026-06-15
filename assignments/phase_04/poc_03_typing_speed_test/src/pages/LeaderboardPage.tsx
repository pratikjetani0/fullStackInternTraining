import { useAppSelector } from "../store/hooks";

const LeaderboardPage = () => {
  const results = useAppSelector((state) => state.results.results);

  // CHECK USER ONLY COMES ONCE AND IF USER TAKES MALTIPLE TEST THEN SHOW ONLY BEST ONE.
  const uniqueResults = Object.values(
    results.reduce(
      (acc, result) => {
        if (!acc[result.username] || result.wpm > acc[result.username].wpm) {
          acc[result.username] = result;
        }
        return acc;
      },
      {} as Record<string, (typeof results)[number]>,
    ),
  );

  //SORT USER IN DESC BY WPM AND ONLY KEEP 10 USER
  const leaderboard = uniqueResults.sort((a, b) => b.wpm - a.wpm).slice(0, 10);

  return (
    <section className="min-h-[85vh] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-3">
          Leaderboard
        </h1>

        <p className="text-[var(--muted)] mb-10">
          See the top typing performances and compete for the fastest score.
        </p>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-4 border-b border-[var(--border)] text-[var(--muted)] font-medium">
            <span>Rank</span>
            <span>User</span>
            <span>WPM</span>
            <span>Accuracy</span>
            <span>Date</span>
          </div>

          {leaderboard.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold text-[var(--text)] mb-2">
                No rankings available
              </h2>

              <p className="text-[var(--muted)]">
                Start typing to populate the leaderboard.
              </p>
            </div>
          ) : (
            leaderboard.map((result, index) => (
              <div
                key={result.id}
                className="grid grid-cols-5 px-6 py-4 border-b border-[var(--border)] text-[var(--text)]"
              >
                <span className="font-semibold text-[var(--accent)]">
                  #{index + 1}
                </span>
                <span>{result.username}</span>
                <span>{result.wpm}</span>
                <span>{result.accuracy}%</span>
                <span>{new Date(result.date).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPage;
