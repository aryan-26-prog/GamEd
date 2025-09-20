import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Floating Eco Icons */}
      <motion.span
        initial={{ x: -50, y: 0, opacity: 0 }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0], opacity: 0.5 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          fontSize: "2.5rem",
        }}
      >
        🌱
      </motion.span>
      <motion.span
        initial={{ x: 50, y: 0, opacity: 0 }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0], opacity: 0.5 }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "25%",
          right: "12%",
          fontSize: "2.5rem",
        }}
      >
        ♻️
      </motion.span>
      <motion.span
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, 15, 0], opacity: 0.5 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "15%",
          right: "20%",
          fontSize: "2.5rem",
        }}
      >
        ⚡
      </motion.span>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          y,
          scale,
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          marginTop:"4rem",
          fontWeight: "800",
          background:
            "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
          WebkitBackgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 0 4px rgba(34,197,94,0.3))",
          
        }}
      >
        🌍 Gamify. Learn. Save Earth.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        style={{
          maxWidth: 600,
          margin: "0 auto 2rem",
          fontSize: "1.2rem",
          color: "var(--muted)",
        }}
      >
        Missions, leaderboards, and interactive lessons that make learning
        sustainability FUN.
      </motion.p>
    </section>
  );
}
