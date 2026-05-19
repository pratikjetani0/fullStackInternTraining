import { motion } from "framer-motion";

// 1. Increased particle density and enlarged sizes to make the smoke trail thicker
const particles = Array.from({ length: 30 }, (_, i) => ({
  left: `${i * 3.3}%`, // Tighter spacing for a more continuous stroke
  size: 30 + (i % 4) * 12, // Increased base and variance sizes (was 18 + i%4 * 6)
  delay: i * 0.12,
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
        <motion.div
          key={index}
          // 2. Changed blur-lg to blur-xl to create thicker, cloudier visual volumes
          className="absolute bottom-2 rounded-full bg-white/25 blur-xl"
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -90],
            // 3. Increased the initial starting opacity from 0.35 to 0.65 for a bolder stroke
            opacity: [0.65, 0.3, 0],
            scale: [1.0, 3.2], // Expanded scaling factor for broader dispersion
            x: [0, 12, -12],
          }}
          transition={{
            duration: 4.0, // Slowed down slightly so the smoke lingers longer in place
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default SmokeRoad;
