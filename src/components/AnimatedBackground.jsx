import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function AnimatedBackground() {
  const controls = useAnimation();
  const ref = useRef(null);

  // Floating blobs
  const blobs = [
    { color: "rgba(34,197,94,0.25)", size: 400, top: "10%", left: "15%" },
    { color: "rgba(6,182,212,0.25)", size: 350, top: "60%", left: "70%" },
    { color: "rgba(139,92,246,0.25)", size: 300, top: "40%", left: "30%" },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: -1,
        background:
          "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05), transparent 70%)",
      }}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.9, y: 0 }}
          animate={{ scale: [1, 1.05, 1], y: [0, -30, 0] }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: b.color,
            filter: "blur(100px)",
          }}
        />
      ))}
    </div>
  );
}
