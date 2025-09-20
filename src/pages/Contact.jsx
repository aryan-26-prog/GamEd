import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      className="container"
      style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "800",
            background:
              "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          📩 Contact Us
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: 650, margin: "0 auto" }}>
          Have questions or suggestions? Reach out to us — we’d love to hear
          from you.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Contact Form */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            padding: "2rem",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem" }}>📬 Send us a Message</h2>
          <form
            style={{ display: "grid", gap: "1rem" }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message submitted ✅ (demo)");
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              style={{
                padding: "0.9rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.35)",
                color: "white",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              style={{
                padding: "0.9rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.35)",
                color: "white",
              }}
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              required
              style={{
                padding: "0.9rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.35)",
                color: "white",
                resize: "none",
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn"
              style={{
                marginTop: "0.5rem",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              🚀 Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            padding: "2rem",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          }}
        >
          <h2>📍 Get in Touch</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ fontSize: "1.5rem" }}>📧</span>
            <span>support@gamed.com</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ fontSize: "1.5rem" }}>📞</span>
            <span>+91 98765 43210</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🏫</span>
            <span>GameEd HQ, New Delhi, India</span>
          </div>

          {/* Socials */}
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.8rem" }}>🌐 Connect with us</h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[
                { icon: <FaLinkedin />, link: "https://linkedin.com" },
                { icon: <FaGithub />, link: "https://github.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    scale: 1.2,
                    rotate: 8,
                    borderColor: "limegreen",
                    color: "limegreen",
                  }}
                  transition={{ type: "spring", stiffness: 250 }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    border: "2px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    fontSize: "1.4rem",
                    color: "white",
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Google Maps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{
          marginTop: "3rem",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}
      >
        <iframe
          title="GameEd Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.89297597972!2d77.20902151502157!3d28.613939282423115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3605e36b2f%3A0xfdbf7cf0a76a8b!2sNew%20Delhi!5e0!3m2!1sen!2sin!4v1673959495342!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
}
