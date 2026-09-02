import { createContext, useState, useEffect } from "react";

export const LangContext = createContext();

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
};

export default LangProvider;
