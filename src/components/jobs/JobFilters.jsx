import React from "react";
import { 
  Search, 
  MapPin, 
  Filter, 
  RotateCcw, 
  Coins, 
  Navigation, 
  Briefcase, 
  ShieldCheck 
} from "lucide-react";
import { jobCategories } from "../../services/translations";
import { useLanguage } from "../../context/LanguageContext";

export const JobFilters = ({ 
  filters, 
  setFilters, 
  resetFilters, 
  totalResultsCount 
}) => {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="font-extrabold text-sm text-slate-900">Search & Filters</h3>
          <span className="px-2 py-0.5 text-xs font-bold bg-brand-50 text-brand-700 rounded-full">
            {totalResultsCount} Jobs
          </span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Row 1: Search and Location Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        {/* Location Input */}
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            placeholder={t("locationPlaceholder")}
            className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
      </div>

      {/* Row 2: Category and Distance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Job Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-800 font-medium"
          >
            <option value="all">All Categories</option>
            {jobCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c[lang] || c.en}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Radius */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t("filterDistance")}
          </label>
          <select
            value={filters.maxDistance}
            onChange={(e) => setFilters({ ...filters, maxDistance: Number(e.target.value) })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-800 font-medium"
          >
            <option value="999">Any Distance</option>
            <option value="3">Within 3 km</option>
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="15">Within 15 km</option>
          </select>
        </div>

        {/* Minimum Daily Wage */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Min Wage: <span className="text-brand-600 font-black">₹{filters.minWage}/day</span>
          </label>
          <input
            type="range"
            min="400"
            max="1200"
            step="50"
            value={filters.minWage}
            onChange={(e) => setFilters({ ...filters, minWage: Number(e.target.value) })}
            className="w-full accent-brand-600 cursor-pointer mt-1"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-0.5">
            <span>₹400</span>
            <span>₹800</span>
            <span>₹1200</span>
          </div>
        </div>

        {/* Experience Required */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t("filterExperience")}
          </label>
          <select
            value={filters.experience}
            onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-800 font-medium"
          >
            <option value="all">Any Experience</option>
            <option value="none">No experience needed</option>
            <option value="1">1+ Year Experience</option>
            <option value="2">2+ Years Experience</option>
          </select>
        </div>
      </div>

    </div>
  );
};

