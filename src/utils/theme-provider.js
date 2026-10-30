import React, { useState, useEffect, useContext } from "react";

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
} 
// This function is used to provide the theme context, you can use it to request the current theme (dark or light) and make changes accordingly
export default function ThemeProvider({ children}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function setDarkMode() {
    document.querySelector("body").setAttribute("data-theme", "dark");
    window.localStorage.setItem("theme", "dark");
    setIsDarkMode(true);
  }

  function setLightMode() {
    document.querySelector("body").setAttribute("data-theme", "light");
    window.localStorage.setItem("theme", "light");
    setIsDarkMode(false);
  }

  function toggleTheme() {
    isDarkMode ? setLightMode() : setDarkMode();
  }

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    theme === "dark" ? setDarkMode() : setLightMode();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}