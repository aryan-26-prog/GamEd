import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

// 🎁 Rewards Store Items
const rewardsList = [
  { id: 1, title: "🌟 Eco Hero Badge", cost: 300, type: "Badge", desc: "Special badge for completing 10+ missions." },
  { id: 2, title: "🎟️ Movie Coupon", cost: 500, type: "Coupon", desc: "Free movie ticket coupon for eco-warriors." },
  { id: 3, title: "📚 E-Book Access", cost: 250, type: "Digital", desc: "Unlock exclusive sustainability e-book." },
  { id: 4, title: "☕ Cafe Voucher", cost: 400, type: "Coupon", desc: "Enjoy a free drink at eco-friendly cafes." },
  { id: 5, title: "🎨 Avatar Pack", cost: 350, type: "Digital", desc: "Unlock exclusive eco-friendly avatars." },
  { id: 6, title: "🌍 Eco Wallpaper", cost: 200, type: "Digital", desc: "Download HD wallpapers promoting green living." },
  { id: 7, title: "🎧 Music Subscription Trial", cost: 450, type: "Digital", desc: "1-week free music streaming subscription." },
  { id: 8, title: "🎮 Game Pass (1 Week)", cost: 600, type: "Digital", desc: "Enjoy premium game pass for 1 week." },
];

// 🌟 Daily Streak Rewards
const streakRewards = [
  { day: 1, reward: "50 XP" },
  { day: 3, reward: "Eco Hero Badge" },
  { day: 5, reward: "100 XP" },
  { day: 7, reward: "Special Avatar Pack" },
];

export default function Rewards() {
  const [balance, setBalance] = useState(1200);
  const [myRewards, setMyRewards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [confetti, setConfetti] = useState(false);

  const [giftXP, setGiftXP] = useState("");
  const [recipient, setRecipient] = useState("");

  // Redeem Store Rewards
  const redeemReward = (reward) => {
    if (balance >= reward.cost) {
      setBalance(balance - reward.cost);
      setMyRewards([...myRewards, reward.title]);
      triggerPopup("success", `Redeemed ${reward.title}!`);
    } else {
      triggerPopup("error", `Not enough XP for ${reward.title}`);
    }
  };

  // Claim Streak Reward
  const claimStreakReward = () => {
    const today = new Date().toDateString();
    if (localStorage.getItem("lastClaim") === today) {
      triggerPopup("error", "Already claimed today's streak!");
      return;
    }
    const currentReward = streakRewards.find((r) => r.day === (myRewards.length % 7) + 1);
    if (currentReward) {
      setMyRewards([...myRewards, currentReward.reward]);
      if (currentReward.reward.includes("XP")) {
        setBalance(balance + parseInt(currentReward.reward));
      }
      triggerPopup("success", `🎉 Streak Reward: ${currentReward.reward}`);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2500);
    }
    localStorage.setItem("lastClaim", today);
  };

  // Gift XP
  const sendGift = () => {
    const xpAmount = parseInt(giftXP);
    if (!recipient || !xpAmount) {
      triggerPopup("error", "Enter valid recipient and XP amount");
      return;
    }
    if (xpAmount > balance) {
      triggerPopup("error", "Not enough XP to gift");
      return;
    }
    setBalance(balance - xpAmount);
    triggerPopup("success", `Gifted ${xpAmount} XP to ${recipient} 🎁`);
    setGiftXP("");
    setRecipient("");
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);
  };

  const triggerPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 2500);
  };

  return (
    <section className="container" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      {confetti && <Confetti recycle={false} numberOfPieces={350} />}

      {/* Header + Wallet */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{
            fontSize: "2.4rem", fontWeight: "800",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            WebkitBackgroundClip: "text", color: "transparent"
          }}>
            🎁 Rewards Hub
          </h1>
          <p style={{ color: "var(--muted)" }}>Redeem XP, claim streak rewards & gift XP to friends 🚀</p>
        </motion.div>

        {/* Wallet Floating Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            padding: "1rem 1.5rem",
            borderRadius: "14px",
            background: "linear-gradient(135deg,var(--accent1),var(--accent2))",
            color: "white",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            textAlign: "center",
            minWidth: "180px"
          }}
        >
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>💰 Wallet</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>{balance} XP</p>
        </motion.div>
      </div>

      {/* Daily Streak */}
      <motion.div className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "2rem", padding: "1.5rem" }}
      >
        <h2>🔥 Daily Streak</h2>
        <p style={{ marginBottom: "1rem", color: "var(--muted)" }}>Log in daily to unlock rewards</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={claimStreakReward}
          style={{
            padding: "0.7rem 1.2rem",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            color: "white",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Claim Today's Reward
        </motion.button>
      </motion.div>

      {/* Peer-to-Peer Gift XP */}
      <motion.div className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "2rem", padding: "1.5rem" }}
      >
        <h2>🤝 Gift XP</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="Recipient name"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={{
              flex: 1, padding: "0.7rem", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)", color: "white"
            }}
          />
          <input
            type="number"
            placeholder="XP Amount"
            value={giftXP}
            onChange={(e) => setGiftXP(e.target.value)}
            style={{
              width: "120px", padding: "0.7rem", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)", color: "white"
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendGift}
            style={{
              padding: "0.7rem 1.2rem", borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg,#43cea2,#185a9d)",
              color: "white",
              fontWeight: "600"
            }}
          >
            🎁 Send Gift
          </motion.button>
        </div>
      </motion.div>

      {/* Rewards Store */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: "1.5rem",
        marginBottom: "2rem"
      }}>
        {rewardsList.map((reward, i) => (
          <motion.div key={reward.id} className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "1.5rem",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)"
            }}
          >
            <h3>{reward.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>{reward.desc}</p>
            <p style={{ fontWeight: "600", color: "var(--accent1)" }}>Cost: {reward.cost} XP</p>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => redeemReward(reward)}
              style={{
                marginTop: "0.5rem", padding: "0.7rem 1.2rem",
                border: "none", borderRadius: "10px",
                background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
                color: "white", fontWeight: "600", cursor: "pointer"
              }}
            >
              Redeem
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* My Rewards */}
      {myRewards.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2>🏅 My Rewards</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {myRewards.map((r, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  minWidth: "140px",
                  textAlign: "center"
                }}
              >
                {r}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed", bottom: "2rem", right: "2rem",
              background: popup.type === "success"
                ? "linear-gradient(90deg,#4caf50,#81c784)"
                : "linear-gradient(90deg,#e53935,#ef5350)",
              color: "white", padding: "1rem 1.4rem",
              borderRadius: "10px", boxShadow: "0 6px 18px rgba(0,0,0,0.3)"
            }}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
