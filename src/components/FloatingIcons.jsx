import { motion } from "framer-motion";

const icons = ["🌱", "🌍", "♻️", "🌊", "☀️"];

export default function FloatingIcons() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          initial={{ y: Math.random() * window.innerHeight }}
          animate={{
            y: [Math.random() * 600, -100],
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            fontSize: `${20 + i * 10}px`,
            opacity: 0.3,
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}
