import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-8xl font-bold text-[var(--accent)] mb-4">404</h1>

        <h2 className="text-3xl font-semibold text-[var(--text)] mb-4">
          Page Not Found
        </h2>

        <p className="text-[var(--muted)] text-lg mb-10">
          Looks like this page sprinted away faster than your typing speed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-[var(--btn)] text-[var(--btn-text)] rounded-xl font-semibold hover:bg-[var(--btn-h)] hover:scale-105 transition-all cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;