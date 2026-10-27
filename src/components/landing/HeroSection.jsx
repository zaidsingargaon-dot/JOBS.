import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Coins, 
  ArrowRight,
  HardHat,
  Building2,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export const HeroSection = ({ onSearch, onSelectRole, openAuthModal }) => {
  const { t } = useLanguage();
  const { loginAsDemo, currentUser } = useAuth();

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, location });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-slate-200/60">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 -z-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-brand-800 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Connecting Unskilled & Semi-Skilled Workers Directly With Fair Gigs</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {t("heroTitle")}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Modern Search & Location Bar */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="p-2 sm:p-2.5 bg-white rounded-3xl shadow-xl shadow-brand-900/5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2 sm:gap-2"
          >
            {/* Query Input */}
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Search className="w-5 h-5 text-brand-600 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full px-3 py-3 text-sm sm:text-base font-medium text-slate-800 bg-transparent placeholder-slate-400 outline-none"
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-slate-200" />

            {/* Location Input */}
            <div className="relative flex-1 w-full flex items-center pl-3">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("locationPlaceholder")}
                className="w-full px-3 py-3 text-sm sm:text-base font-medium text-slate-800 bg-transparent placeholder-slate-400 outline-none"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              <span>{t("searchButton")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Search Tags */}
          <div className="mt-3 flex items-center justify-center flex-wrap gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular:</span>
            {["Mason", "Painter", "Plumber", "Warehouse Loader", "Welder", "Gardener"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  onSearch({ query: tag, location });
                }}
                className="px-2.5 py-1 bg-white hover:bg-brand-50 hover:text-brand-700 rounded-lg border border-slate-200 transition-colors text-slate-700 font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 1-Click Evaluation Bar (Role Switcher) */}
        <div className="mt-10 max-w-2xl mx-auto p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {t("quickDemoLogin")}:
              </span>
              <span className="text-[11px] text-slate-500">
                Test the platform immediately as a worker, employer, or admin
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loginAsDemo("worker")}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl transition-all"
              >
                Worker
              </button>
              <button
                onClick={() => loginAsDemo("employer")}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-brand-200 text-brand-800 font-bold text-xs rounded-xl transition-all"
              >
                Employer
              </button>
              <button
                onClick={() => loginAsDemo("admin")}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 font-bold text-xs rounded-xl transition-all"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Key Feature Stats Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">12,500+</p>
              <p className="text-xs text-slate-500 font-medium">Verified Workers</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">₹0 Fee</p>
              <p className="text-xs text-slate-500 font-medium">Zero Commission</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">100% Fair</p>
              <p className="text-xs text-slate-500 font-medium">Minimum Wage Adhered</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">Within 5 km</p>
              <p className="text-xs text-slate-500 font-medium">Hyperlocal Matching</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

