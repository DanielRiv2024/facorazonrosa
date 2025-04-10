// components/ThemeToggle.tsx
import useTheme from "../hooks/useTheme";
import { FaMoon,FaSun  } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:scale-105 transition"
    >
      {theme === "light" ? <FaMoon size={20} className="text-foreground"/> : <FaSun size={20} className="text-foreground"/>}
    </button>
  );
}
