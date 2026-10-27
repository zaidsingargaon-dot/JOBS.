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
  CheckCircle2,
  PhoneCall,
  Clock,
  Star
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { IMAGES, handleImageError } from "../../services/images";

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
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-slate-200/60">
      
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 -z-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Headline, Search, Demo Logins & Stats */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-brand-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <Sparkles className="w-4 h-4 text-brand-600 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Connecting 15,000+ Skilled & Daily-Wage Workers Directly Across India</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {t("heroTitle")}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* Modern Search & Location Bar */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <form 
                onSubmit={handleSubmit}
                className="p-2 bg-white rounded-3xl shadow-xl shadow-brand-900/10 border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2"
              >
                {/* Query Input */}
                <div className="relative flex-1 w-full flex items-center pl-3">
                  <Search className="w-5 h-5 text-brand-600 shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("searchPlaceholder")}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 bg-transparent placeholder-slate-400 outline-none"
                  />
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-7 bg-slate-200" />

                {/* Location Input */}
                <div className="relative flex-1 w-full flex items-center pl-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t("locationPlaceholder")}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 bg-transparent placeholder-slate-400 outline-none"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
                >
                  <span>{t("searchButton")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Search Chips */}
              <div className="mt-3 flex items-center justify-center lg:justify-start flex-wrap gap-1.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Popular:</span>
                {["Mason", "Painter", "Plumber", "Electrician", "Loader", "Welder", "Gardener"].map((tag) => (
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

            {/* 1-Click Evaluation Bar (Role Switcher for College Hackathon) */}
            <div className="max-w-xl mx-auto lg:mx-0 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 justify-center sm:justify-start">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {t("quickDemoLogin")}:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Test immediately as worker, employer, or supervisor
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
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

          </div>

          {/* RIGHT COLUMN: Large Authentic Hero Image with Floating Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            
            {/* Ambient Background Glow behind Image */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-600/20 via-emerald-500/20 to-amber-500/20 rounded-[2.5rem] blur-xl opacity-70 transform -rotate-1 pointer-events-none" />

            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <img
                src={IMAGES.heroWorkers}
                alt="Authentic Indian construction and daily-wage workers at a site in Bengaluru"
                className="w-full h-[400px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                onError={handleImageError}
              />

              {/* Dark subtle gradient overlay at bottom for badge contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Badge 1: Top Right - Aadhaar & Police Verified */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trust Guarantee</p>
                  <p className="text-xs font-black text-slate-900">100% Aadhaar Verified</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left - Daily Payouts & Rating */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <img
                  src={IMAGES.workers.rameshKumar}
                  alt="Verified worker Ramesh Kumar"
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shrink-0"
                  onError={handleImageError}
                />
                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5.0</span>
                    <span className="text-[11px] text-slate-400 font-semibold">(42 Gigs)</span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-900 leading-tight">
                    Ramesh Kumar • Master Mason
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                    <span>₹850/day • Paid Daily Evening in Cash/UPI</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Floating Mini Pill: Bottom Right - Instant Direct Call */}
            <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 items-center gap-2 z-10">
              <PhoneCall className="w-4 h-4 text-emerald-400 animate-bounce" />
              <div className="text-left">
                <p className="text-[10px] font-semibold text-slate-400">Direct Contractor Line</p>
                <p className="text-xs font-black text-white">Zero Broker Commission</p>
              </div>
            </div>

          </div>

        </div>

        {/* Key Feature Stats Grid */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">12,500+</p>
              <p className="text-xs text-slate-500 font-medium">Verified Workers</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">₹0 Fee</p>
              <p className="text-xs text-slate-500 font-medium">Zero Commission</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">100% Fair</p>
              <p className="text-xs text-slate-500 font-medium">Minimum Wage Adhered</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
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
