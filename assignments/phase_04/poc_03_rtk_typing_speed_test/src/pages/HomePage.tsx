import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import KeyboardTitle from "../components/KeyboardTitle";
// import SmokeRoad from "../components/SmokeRoad";

const HomePage = () => {
  const [selectedTime, setSelectedTime] = useState(60);
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const durations = [15, 30, 60, 120];

  const handleStart = () => {
    if (currentUser) {
      navigate("/test", {
        state: { duration: selectedTime },
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <p className="text-[var(--muted)] text-lg mb-4">
          Improve speed. Accuracy. Consistency.
        </p>

        <div className="relative flex flex-col items-center h-44 w-[760px] max-w-full mx-auto mb-6">
          <KeyboardTitle text="TYPERUSH" />
          {/* <SmokeRoad /> */}
        </div>

        <p className="text-[var(--text)] text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Challenge your typing skills with real-time feedback, performance
          tracking, and detailed analytics designed to sharpen your speed.
        </p>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {durations.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-5 py-3 rounded-lg font-medium transition-all cursor-pointer border
                ${
                  selectedTime === time
                    ? "bg-[var(--accent)] text-[var(--btn-text)] border-[var(--accent)]"
                    : "bg-[var(--card)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--accent)]"
                }`}
            >
              {time}s
            </button>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="px-8 py-4 bg-[var(--btn)] hover:scale-105 text-[var(--btn-text)] rounded-xl text-lg font-semibold hover:bg-[var(--btn-h)] transition-all cursor-pointer"
        >
          Start Typing Test
        </button>
      </div>
    </section>
  );
};

export default HomePage;
