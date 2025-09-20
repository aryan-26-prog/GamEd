import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MissionSubmission() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });

  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleReportChange = (e) => setReport(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate upload
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  // Progress %
  const progress = ((step - 1) / 4) * 100;

  return (
    <section
      className="container"
      style={{
        
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: "2.5rem",
          maxWidth: "850px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
        }}
      >
        {!submitted ? (
          <>
            {/* Form Section */}
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                  background:
                    "linear-gradient(90deg, var(--accent1), var(--accent2))",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                🚀 Mission Submission
              </h1>

              {/* Progress Bar */}
              <div
                style={{
                  margin: "1.5rem 0",
                  height: "10px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.2)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(90deg,var(--accent1),var(--accent2))",
                  }}
                />
              </div>

              {/* Steps */}
              <form
                onSubmit={handleSubmit}
                style={{ display: "grid", gap: "1.2rem", textAlign: "left" }}
              >
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label
                      style={{ color: "var(--accent2)", fontWeight: "600" }}
                    >
                      Mission Title
                    </label>
                    <input
                      type="text"
                      placeholder="Eg: Tree Plantation"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "0.8rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        marginTop: "0.4rem",
                        background: "rgba(255,255,255,0.05)",
                        color: "white",
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="btn"
                      style={{ marginTop: "1.2rem" }}
                      onClick={nextStep}
                    >
                      Next ➡️
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label
                      style={{ color: "var(--accent2)", fontWeight: "600" }}
                    >
                      Description
                    </label>
                    <textarea
                      placeholder="Briefly describe what you did..."
                      value={formData.desc}
                      onChange={(e) =>
                        setFormData({ ...formData, desc: e.target.value })
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "0.8rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        marginTop: "0.4rem",
                        background: "rgba(255,255,255,0.05)",
                        color: "white",
                        minHeight: "120px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1.2rem",
                      }}
                    >
                      <button type="button" className="btn" onClick={prevStep}>
                        ⬅️ Back
                      </button>
                      <button type="button" className="btn" onClick={nextStep}>
                        Next ➡️
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label
                      style={{ color: "var(--accent2)", fontWeight: "600" }}
                    >
                      Upload Proof Image
                    </label>
                    <div
                      style={{
                        border: "2px dashed rgba(255,255,255,0.3)",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        textAlign: "center",
                        background: "rgba(255,255,255,0.05)",
                      }}
                    >
                      <label
                        htmlFor="fileUpload"
                        style={{
                          color: file ? "limegreen" : "var(--muted)",
                          cursor: "pointer",
                        }}
                      >
                        {file
                          ? `📁 ${file.name}`
                          : "📤 Drag & drop file or click to upload"}
                      </label>
                      <input
                        type="file"
                        id="fileUpload"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1.2rem",
                      }}
                    >
                      <button type="button" className="btn" onClick={prevStep}>
                        ⬅️ Back
                      </button>
                      <button type="button" className="btn" onClick={nextStep}>
                        Next ➡️
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label
                      style={{ color: "var(--accent2)", fontWeight: "600" }}
                    >
                      Upload Mission Report
                    </label>
                    <div
                      style={{
                        border: "2px dashed rgba(255,255,255,0.3)",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        textAlign: "center",
                        background: "rgba(255,255,255,0.05)",
                      }}
                    >
                      <label
                        htmlFor="reportUpload"
                        style={{
                          color: report ? "limegreen" : "var(--muted)",
                          cursor: "pointer",
                        }}
                      >
                        {report
                          ? `📄 ${report.name}`
                          : "📤 Upload report (PDF/DOC)"}
                      </label>
                      <input
                        type="file"
                        id="reportUpload"
                        style={{ display: "none" }}
                        onChange={handleReportChange}
                        required
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1.2rem",
                      }}
                    >
                      <button type="button" className="btn" onClick={prevStep}>
                        ⬅️ Back
                      </button>
                      <button type="submit" className="btn">
                        {loading ? "⏳ Submitting..." : "🚀 Submit Mission"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Live Preview */}
            <motion.div
              className="card"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                padding: "1rem",
                borderRadius: "16px",
                background: "rgba(0,0,0,0.3)",
                textAlign: "left",
              }}
            >
              <h3 style={{ color: "var(--accent2)", marginBottom: "1rem" }}>
                👀 Live Preview
              </h3>
              <h4
                style={{
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                {formData.title || "Mission Title Preview"}
              </h4>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                }}
              >
                {formData.desc ||
                  "Your mission description will appear here as you type."}
              </p>
              {file && (
                <p style={{ color: "limegreen", fontSize: "0.85rem" }}>
                  ✅ Proof Uploaded: {file.name}
                </p>
              )}
              {report && (
                <p style={{ color: "skyblue", fontSize: "0.85rem" }}>
                  📄 Report Uploaded: {report.name}
                </p>
              )}
            </motion.div>
          </>
        ) : (
          // ✅ Success Screen
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              gridColumn: "span 2",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "limegreen", marginBottom: "1rem" }}>
              🎉 Mission Submitted!
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
              XP & badge will be awarded after verification.  
              Your report and proof have been received.
            </p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              style={{
                fontSize: "3rem",
                marginBottom: "1.5rem",
              }}
            >
              🌍
            </motion.div>
            <button
              className="btn"
              onClick={() => navigate("/home")}
              style={{
                marginTop: "1rem",
                padding: "0.8rem 1.2rem",
              }}
            >
              ⬅️ Back to Home
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
