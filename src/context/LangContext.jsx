import { createContext, useState, useEffect } from "react";
import { setNotifyLang } from "../hooks/useNotify";

export const LangContext = createContext();

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    setNotifyLang(lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
};

export default LangProvider;