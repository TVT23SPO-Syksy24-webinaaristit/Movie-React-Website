import { useState, useMemo, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(() => {
        // Check for saved theme in localStorage
        return localStorage.getItem("theme") || "light";
      });
    
      // Toggle theme function
      const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      };
    
      // Update the <html> element class dynamically
      useEffect(() => {
        document.documentElement.className = theme;
      }, [theme]);
    
      // Context values
      const contextVariables = useMemo(
        () => ({ theme, toggleTheme }),
        [theme]
      );
    return (
        <ThemeContext.Provider value={contextVariables}>
            {children}
        </ThemeContext.Provider>
    );
};