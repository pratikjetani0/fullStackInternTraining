import type{ CSSProperties } from "react";

const particles = Array.from({ length: 30 }, (_, i) => ({
  left: `${i * 3.3}%`,
  size: 30 + (i % 4) * 12,
  delay: `${i * 0.12}s`,
}));

const SmokeRoad = () => {
  return (
    <div className="relative w-[760px] max-w-full mx-auto h-28 -mt-1">
      {/* full road */}
      <div className="absolute bottom-0 w-full h-[10px] rounded-full bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.65)]" />

      {/* road center line */}
      <div className="absolute bottom-[4px] w-full h-[2px] bg-white/40 rounded-full" />

      {/* smoke all over */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="smoke-particle absolute bottom-2 rounded-full bg-white/25 blur-xl"
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            // Type-safe custom property declaration
            ["--particle-delay" as string]: particle.delay,
          } as CSSProperties}
        />
      ))}
    </div>
  );
};

export default SmokeRoad;
