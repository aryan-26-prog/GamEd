import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
