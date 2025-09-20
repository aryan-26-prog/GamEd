import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        position: "relative",
        marginTop: "4rem",
        padding: "2rem 2rem",
        borderRadius: "15px",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.01)", 
        backdropFilter: "blur(15px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      {/* Floating particles */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6 + Math.random() * 4,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
            }}
          ></motion.div>
        ))}
      </div>

      {/* Footer content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: "1.7rem",
              fontWeight: "800",
              background:
                "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
              WebkitBackgroundClip: "text",
              color: "transparent",
              margin: 0,
            }}
          >
            GameEd
          </h2>
          <p
            style={{
              color: "var(--muted)",
              marginTop: "0.5rem",
              maxWidth: "280px",
              fontSize: "0.95rem",
            }}
          >
            Learn. Play. Impact. 🌍 Together for a sustainable future.
          </p>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          style={{ textAlign: "right" }}
        >
          {/* Nav Links */}
          <nav
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginBottom: "1.2rem",
            }}
          >
            {["Home", "Dashboard", "Rewards", "Courses"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                style={{
                  color: "white",
                  fontSize: "0.95rem",
                  position: "relative",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {link}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: -2,
                    width: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
                    borderRadius: "2px",
                    transition: "0.3s",
                  }}
                  className="underline"
                ></span>
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1.3rem",
              fontSize: "1.4rem",
            }}
          >
            {[FaTwitter, FaLinkedin, FaGithub, FaInstagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                whileTap={{ scale: 0.9 }}
                style={{ color: "white", transition: "0.3s" }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          marginTop: "2.5rem",
          fontSize: "0.85rem",
          color: "var(--muted)",
        }}
      >
        © {new Date().getFullYear()} GameEd. All Rights Reserved.
      </motion.p>

      {/* Gradient underline hover */}
      <style>{`
        a:hover span.underline {
          width: 100%;
        }
      `}</style>
    </motion.footer>
  );
}
