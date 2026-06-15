import React, { useEffect, useRef, useState } from "react";
import { PARAGRAPHS } from "../constants/paragraphs";
import ResultScreen from "../components/ResultScreen";
import {
  calculateAccuracy,
  calculateCPM,
  calculateMistakes,
  calculateWPM,
} from "../utils/typing";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addResult } from "../store/slices/resultsSlice";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  setIsTestStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const TestPage = () => {
  const location = useLocation();
  const TEST_DURATION = location.state?.duration || 60;

  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const keySound = useRef<HTMLAudioElement | null>(null);

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const dispatch = useAppDispatch();

  const { setIsTestStarted } = useOutletContext<OutletContextType>();

  // PARAGRAPH STRTING FROM 0 // UPDATE WITH MORE PARA..
  const paragraph = PARAGRAPHS[paragraphIndex];

  // MISTAKES
  const mistakes = calculateMistakes(typedText, paragraph);

  // CPM = characters per minute
  const correctChars = typedText.length - mistakes;
  const elapsedTime = TEST_DURATION - timeLeft || 1;
  const cpm = calculateCPM(correctChars, elapsedTime);

  // WPM = word per minute
  const wpm = calculateWPM(cpm);

  // ACCURACY
  const accuracy = calculateAccuracy(typedText.length, correctChars);

  // TIMER START
  useEffect(() => {
    if (!isStarted || timeLeft <= 0) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev === 1) {
          setIsFinished(true);
          setIsStarted(false);

          setIsTestStarted(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  // FOR THE SOUND
  useEffect(() => {
    const audio = new Audio("/sounds/key.wav");
    audio.volume = 0.25;
    audio.preload = "auto";

    keySound.current = audio;
  }, []);

  // SCROLL THE LONG PARAGRPAH TEXT
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [typedText]);

  // TEXTAREA + TIMER STOP WHEN PARA.. END
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (isFinished) return;

    if (!isStarted) {
      setIsStarted(true);
      setIsTestStarted(true);
    }

    if (value.length > paragraph.length) return;

    const currentIndex = value.length - 1;
    const typedChar = value[currentIndex];
    const expectedChar = paragraph[currentIndex];

    if (typedChar === expectedChar) {
      if (keySound.current) {
        keySound.current.pause();
        keySound.current.currentTime = 0;

        keySound.current.play().catch(() => {});
      }
    }

    // if there is space, only allow real space
    if (expectedChar === " " && typedChar !== " ") {
      return;
    }

    setTypedText(value);

    if (value.length === paragraph.length) {
      setIsFinished(true);
      setIsStarted(false);
    }
  };

  // HANDLE RESTART TEST
  const handleRestart = () => {
    setIsTestStarted(false);

    setTypedText("");
    setTimeLeft(TEST_DURATION);
    setIsStarted(false);
    setIsFinished(false);
    setIsSaved(false);

    textareaRef.current?.focus();
  };

  // NEW PARAGRAPH HANDLE
  const handleNewParagraph = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * PARAGRAPHS.length);
    } while (randomIndex === paragraphIndex);

    handleRestart();
    setParagraphIndex(randomIndex);
  };

  // SAVE THE RESULT SCREEN
  const handleSaveResult = () => {
    if (!currentUser?.id || !currentUser?.username) return;

    dispatch(
      addResult({
        id: crypto.randomUUID(),
        userId: currentUser?.id,
        username: currentUser?.username,
        wpm,
        cpm,
        accuracy,
        mistakes,
        duration: TEST_DURATION,
        date: new Date().toISOString(),
      }),
    );

    setIsSaved(true);

    setTimeout(() => {
      handleRestart();
    }, 800);
  };

  // FOCUS IN TO TEXT AREA
  useEffect(() => {
    const handleKeyDown = () => {
      if (!isFinished) {
        textareaRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFinished]);

  //CLEANUP FOR THE BLUR HEADER REMOVE
  useEffect(() => {
    return () => {
      setIsTestStarted(false);
    };
  }, []);

  // AFTER FNISHED TEST THE RESULT SCREEN SHOW
  if (isFinished) {
    return (
      <ResultScreen
        wpm={wpm}
        cpm={cpm}
        accuracy={accuracy}
        mistakes={mistakes}
        duration={TEST_DURATION}
        isSaved={isSaved}
        onRetry={handleRestart}
        onSave={handleSaveResult}
      />
    );
  }

  return (
    <section className="min-h-[85vh] px-6 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Timer Stats */}

        <div
          className={`flex items-center gap-3 text-6xl font-bold text-[var(--accent)] transition-all duration-500
          ${isStarted ? "opacity-100" : "opacity-60"}`}
        >
          <span className="text-[var(--muted)] text-sm uppercase tracking-widest">
            Time
          </span>

          <span className="text-6xl font-bold text-[var(--accent)] tabular-nums">
            {timeLeft}
          </span>
        </div>

        {/* Paragraph Display */}
        <div
          className={`bg-[var(--card)] cursor-text rounded-2xl pt-10 border text-2xl leading-relaxed pl-20 pr-20 tracking-wide relative transition-all duration-500 overflow-hidden h-[150px] 
            ${
              isStarted
                ? "border-[var(--accent)] shadow-[0_0_20px_rgba(226,183,20,0.15)]"
                : "border-[var(--border)]"
            }`}
        >
          <div
            className=" select-none whitespace-pre-wrap break-words h-full overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {paragraph.split("").map((char, index) => {
              let className = "text-[var(--muted)]";

              if (index < typedText.length) {
                className =
                  typedText[index] === char
                    ? "text-[var(--text)]"
                    : "text-[var(--error)]";
              }

              const isCurrentCursor = index === typedText.length;
              if (isCurrentCursor) {
                className += " relative";
              }

              return (
                <span
                  key={index}
                  className={className}
                  ref={isCurrentCursor ? cursorRef : null}
                >
                  {isCurrentCursor && (
                    <span className="absolute left-0 top-1 h-[70%] w-[2px] bg-[var(--accent)] animate-pulse rounded-full" />
                  )}
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Typing Input */}
        <textarea
          ref={textareaRef}
          value={typedText}
          onChange={handleTextarea}
          placeholder={isFinished ? "Test finished" : "Start typing here..."}
          disabled={isFinished}
          autoFocus
          className="absolute opacity-0 pointer-events-none bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_12px_rgba(226,183,20,0.15)] resize-none transition-all duration-300"
        />

        <p className="text-center text-[var(--muted)] text-sm">
          Start typing to begin
        </p>

        {/* Bottom Controls */}
        <div className="flex justify-center gap-6">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-[var(--btn)]  text-[var(--btn-text)] rounded-lg font-semibold hover:bg-[var(--btn-h)] transition-all cursor-pointer"
          >
            Restart Test
          </button>

          <button
            onClick={handleNewParagraph}
            className="px-6 py-3 bg-[var(--card)] border border-[var(--border)] text-[var(--text)] rounded-lg hover:border-[var(--accent)] transition-all cursor-pointer"
          >
            New Paragraph
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestPage;
