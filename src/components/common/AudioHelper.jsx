import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const AudioHelper = ({ textToRead, label, className = "" }) => {
  const { speakText, isSpeaking, stopSpeaking, t } = useLanguage();

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(textToRead);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-150 ${
        isSpeaking
          ? "bg-amber-100 text-amber-900 border-amber-300 animate-pulse"
          : "bg-blue-50 text-brand-700 border-brand-200 hover:bg-brand-100"
      } ${className}`}
      title={isSpeaking ? "Click to stop reading" : "Click to read job details aloud"}
      aria-label="Text to speech audio assistance"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-amber-700" />
          <span>{t("audioPlaying")}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-brand-600" />
          <span>{label || t("audioListen")}</span>
        </>
      )}
    </button>
  );
};

