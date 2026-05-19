type KeyboardTitleProps = {
  text: string;
};

const KeyboardTitle = ({ text }: KeyboardTitleProps) => {
  return (
    <div className="absolute top-0 z-20 flex justify-center gap-2 flex-wrap mb-0">
      {text.split("").map((char, index) => (
        <div key={index} className="keyboard-key relative cursor-pointer">
          {/* key base */}
          <div className="absolute inset-0 translate-y-[4px] rounded-lg bg-zinc-950" />

          <div className="spark-particle spark-top-left" />
          <div className="spark-particle spark-top-right" />
          <div className="spark-particle spark-bottom-left" />
          <div className="spark-particle spark-bottom-right" />

          {/* key top */}
          <div
            className="key-top relative flex items-center justify-center
            w-14 h-14 md:w-16 md:h-16
            rounded-lg
            bg-gradient-to-b from-zinc-800 to-zinc-950
            border border-zinc-700
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
          >
            {/* highlight */}
            <div className="absolute top-1 left-2 right-2 h-[1px] bg-white/10 rounded-full" />

            <span className="text-2xl md:text-3xl font-bold text-yellow-400 select-none">
              {char}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyboardTitle;
