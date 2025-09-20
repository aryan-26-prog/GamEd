import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const learningData = [
  {
    type: "Course",
    title: "Waste Management 101",
    desc: "Learn sustainable waste management with practical case studies.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    category: "Environment",
    image: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
  },
  {
    type: "Course",
    title: "Energy Conservation Basics",
    desc: "Understand how to save energy in schools, homes & communities.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    category: "Energy",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
  },
  {
    type: "Video",
    title: "♻️ Recycling 101 Video",
    desc: "Beginner’s guide to recycling at home.",
    link: "https://www.youtube.com/watch?v=OasbYWF4_S8",
    image: "https://cdn-icons-png.flaticon.com/512/1165/1165674.png",
  },
  {
    type: "Article",
    title: "🌱 Sustainable Living Guide",
    desc: "Learn daily tips for eco-friendly lifestyle.",
    link: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828970.png",
  },
  {
    type: "PDF",
    title: "📄 Climate Change Report",
    desc: "Download official IPCC climate reports.",
    link: "https://www.ipcc.ch/reports/",
    image: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
  },
  {
    type: "Tool",
    title: "💡 Energy Saving Tools",
    desc: "Track and reduce your household energy usage.",
    link: "https://energystar.gov",
    image: "https://cdn-icons-png.flaticon.com/512/888/888064.png",
  },
];

export default function LearningHub() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("az");
  const [bookmarks, setBookmarks] = useState([]);

  // ✅ Filtering + Searching
  let filtered = learningData.filter(
    (item) =>
      (filter === "All" || item.type === filter) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Sorting
  filtered =
    sort === "az"
      ? filtered.sort((a, b) => a.title.localeCompare(b.title))
      : filtered.sort((a, b) => b.title.localeCompare(a.title));

  // ✅ Bookmark toggle
  const toggleBookmark = (item) => {
    if (bookmarks.includes(item.title)) {
      setBookmarks(bookmarks.filter((b) => b !== item.title));
    } else {
      setBookmarks([...bookmarks, item.title]);
    }
  };

  return (
    <section className="container" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      {/* ✅ Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "800",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          📚 Learning Hub
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Explore Courses, Videos, Articles, PDFs & Tools — all in one place 🚀
        </p>
      </motion.div>

      {/* ✅ Search + Filters + Sort */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search learning material..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "260px",
            padding: "0.8rem 1rem",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
          }}
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "0.8rem 1rem",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <option value="az">🔠 A-Z</option>
          <option value="za">🔡 Z-A</option>
        </select>
      </div>

      {/* Category Pills */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        {["All", "Course", "Video", "Article", "PDF", "Tool"].map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              margin: "0.3rem",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: "none",
              background:
                filter === cat
                  ? "linear-gradient(90deg,var(--accent1),var(--accent2))"
                  : "rgba(255,255,255,0.08)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* ✅ Cards Grid */}
      <AnimatePresence>
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                className="card"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 2,
                  rotateY: -2,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
                }}
                style={{
                  padding: "1.5rem",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Bookmark Button */}
                <motion.span
                  onClick={() => toggleBookmark(item)}
                  whileTap={{ scale: 0.8 }}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                >
                  {bookmarks.includes(item.title) ? "🔖" : "📑"}
                </motion.span>

                {/* Thumbnail */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "70px",
                      marginBottom: "1rem",
                      filter: "drop-shadow(0 0 8px rgba(0,0,0,0.3))",
                    }}
                  />
                )}

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.95rem",
                    lineHeight: "1.5rem",
                    flexGrow: 1,
                    marginBottom: "0.8rem",
                  }}
                >
                  {item.desc}
                </p>

                {/* Extra Info for Courses */}
                {item.type === "Course" && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      marginBottom: "1rem",
                    }}
                  >
                    <span>⏱️ {item.duration}</span>
                    <span>⭐ {item.difficulty}</span>
                    <span>📂 {item.category}</span>
                  </div>
                )}

                {/* Action Button */}
                {item.type === "Course" ? (
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn"
                  >
                    🚀 Enroll Now
                  </motion.button>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {item.type === "PDF" ? "📄 Download PDF" : "🔗 Open Resource"}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", marginTop: "3rem", color: "var(--muted)" }}
          >
            <h3 style={{ fontSize: "1.3rem" }}>😕 No resources found!</h3>
            <p>Try changing filters or search keywords</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
