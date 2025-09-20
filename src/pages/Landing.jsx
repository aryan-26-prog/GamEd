import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <section className="container" style={{ paddingTop: "6rem" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: "800",
            background:
              "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "1rem",
          }}
        >
          🌍 Welcome to GameEd
        </h1>
        <p
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            fontSize: "1.15rem",
            color: "var(--muted)",
            lineHeight: "1.7rem",
          }}
        >
          A <strong>Gamified Environmental Education Platform</strong> where
          learning meets action. Students complete eco-missions, earn rewards,
          and become real-life changemakers.
        </p>

        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            gap: "1.2rem",
            justifyContent: "center",
          }}
        >
          <Link to="/auth">
            <button className="btn">🚀 Get Started</button>
          </Link>
          
        </div>
      </motion.div>

      {/* Highlights Section */}
      <div
        className="grid grid-3"
        style={{ marginTop: "3rem", marginBottom: "4rem" }}
      >
        {[
          {
            title: "🎯 Our Missions",
            desc: "To inspire students to actively engage in environmental sustainability bycompleting fun, gamified eco-missions and tracking their progress in real-time.",
          },
          {
            title: "🌟 Our Vision",
            desc: "To build the largest community of young eco-warriors who are motivated,educated, and rewarded for making the planet greener and healthier.",
          },
          {
            title: "📊 Smart Analytics",
            desc: "Track your contribution to sustainability in real-time.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            style={{ padding: "1.8rem" }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
            <p style={{ color: "var(--muted)" }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{
          padding: "2.5rem",
          textAlign: "center",
          marginBottom: "4rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "0.8rem",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Why Choose GameEd? 🌱
        </h2>
        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            marginBottom: "1.5rem",
            color: "var(--muted)",
          }}
        >
          Because learning should be impactful, fun, and rewarding! GreenEd
          inspires students to act, rewards their efforts, and connects them to
          a global sustainability movement.
        </p>
        <Link to="/auth">
          <button className="btn">Join the Movement</button>
        </Link>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{
          padding: "2.2rem",
          borderRadius: "var(--radius)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "0.8rem",
            background: "linear-gradient(90deg,var(--accent2),var(--accent3))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          🌟 Ready to Make a Difference?
        </h2>
        <p
          style={{
            color: "var(--muted)",
            marginBottom: "1.5rem",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Sign up now and become part of a growing eco-community shaping the
          future of our planet.
        </p>
        <Link to="/auth">
          <button className="btn">Sign Up Now</button>
        </Link>
      </motion.div>
    </section>
  );
}
