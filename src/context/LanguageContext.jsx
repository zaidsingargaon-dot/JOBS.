import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../services/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("skillconnect_language") || "en";
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const setLang = (newLang) => {
    if (translations[newLang]) {
      setLangState(newLang);
      localStorage.setItem("skillconnect_language", newLang);
    }
  };

  const t = (key) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  // Accessibility Speech Helper for daily-wage workers
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Audio speech synthesis is not supported in this browser.");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose voice code based on current language
    if (lang === "hi") {
      utterance.lang = "hi-IN";
    } else if (lang === "kn") {
      utterance.lang = "kn-IN";
    } else {
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.9; // Slightly slower for clear comprehension
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, speakText, stopSpeaking, isSpeaking }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

