import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingIcons from "./components/FloatingIcons";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Dashboard from "./pages/TeacherDashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Leaderboard from "./pages/leaderboard";
import Students from "./pages/StudentsDashboard";
import MissionSubmission from "./pages/MissionSubmission";
import Notifications from "./pages/Notifications";
import HelpContact from "./pages/Contact";
import Rewards from "./pages/Reward";
import DailyQuiz from "./pages/DailyQuiz";
import ThemeToggle from "./pages/ThemeToggle";
import Games from "./pages/Games";

// Main App component
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// Separate component to use useLocation hook
function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Background Animations */}
      <AnimatedBackground />
      <FloatingIcons />

      {/* Navbar (common for all pages) */}
      <Navbar />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Animated Routes */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Landing />
              </PageWrapper>
            }
          />
          <Route
            path="/auth"
            element={
              <PageWrapper>
                <Auth />
              </PageWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <PageWrapper>
                <Profile />
              </PageWrapper>
            }
          />
          <Route
            path="/courses"
            element={
              <PageWrapper>
                <Courses />
              </PageWrapper>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PageWrapper>
                <Leaderboard />
              </PageWrapper>
            }
          />
          <Route
            path="/students"
            element={
              <PageWrapper>
                <Students />
              </PageWrapper>
            }
          />
          
          {/* ✅ FIXED MISSION ROUTE - Direct submit page */}
          <Route
            path="/mission/:id/submit"
            element={
              <PageWrapper>
                <MissionSubmission />
              </PageWrapper>
            }
          />
          
          <Route
            path="/notifications"
            element={
              <PageWrapper>
                <Notifications />
              </PageWrapper>
            }
          />
          <Route
            path="/help"
            element={
              <PageWrapper>
                <HelpContact />
              </PageWrapper>
            }
          />
          <Route
            path="/rewards"
            element={
              <PageWrapper>
                <Rewards />
              </PageWrapper>
            }
          />
          <Route
            path="/dailyquiz"
            element={
              <PageWrapper>
                <DailyQuiz />
              </PageWrapper>
            }
          />
          <Route
            path="/games"
            element={
              <PageWrapper>
                <Games />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </>
  );
}

// ✅ PageWrapper with Scroll-Top + Top-to-Bottom Animation
function PageWrapper({ children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}