// hooks/useTheme.ts
import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Intentar obtener el tema desde localStorage (si existe)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Establecer el tema por defecto en "light"
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    // Cambiar el tema del body cuando cambia el estado del tema
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
