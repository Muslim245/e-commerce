// import { createContext, useState, useEffect } from "react";

// export const DarkModeContext = createContext();

// export function DarkModeProvider({ children }) {
//   let getInitialMode = () => {
//     let storedMode = localStorage.getItem("dark-mode");
//     if (storedMode) {
//       return storedMode === "true";
//     }
//     return window.matchMedia("(prefers-color-scheme: dark)").matches;
//   };

//   let [isDarkMode, setIsDarkMode] = useState(getInitialMode);

//   useEffect(() => {
//     let html = document.documentElement;
//     if (isDarkMode) {
//       html.classList.add("dark");
//     } else {
//       html.classList.remove("dark");
//     }

//     localStorage.setItem("dark-mode", isDarkMode ? "true" : "false");
//   }, [isDarkMode]);

//   return (
//     <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }

import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const getInitialMode = () => {
    const storedMode = localStorage.getItem("dark-mode");
    if (storedMode !== null) {
      return storedMode === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialMode);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", isDarkMode.toString());
  }, [isDarkMode]);

  // عند تحميل الصفحة، نطبق الوضع المخزن مسبقًا
  useEffect(() => {
    const html = document.documentElement;
    if (getInitialMode()) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
