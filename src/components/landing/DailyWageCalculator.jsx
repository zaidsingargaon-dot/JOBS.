import React, { useState } from "react";
import { Calculator, Coins, ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import { jobCategories } from "../../services/translations";
import { useLanguage } from "../../context/LanguageContext";

export const DailyWageCalculator = () => {
  const { lang, t } = useLanguage();

  const [selectedTrade, setSelectedTrade] = useState("construction");
  const [skillLevel, setSkillLevel] = useState("semi"); // 'unskilled' | 'semi' | 'skilled'
  const [shiftType, setShiftType] = useState("day"); // 'day' | 'night'

  const currentCategory = jobCategories.find((c) => c.id === selectedTrade) || jobCategories[0];
  const baseRate = currentCategory.minWage;

  const multiplier = skillLevel === "unskilled" ? 1.0 : skillLevel === "semi" ? 1.25 : 1.5;
  const shiftMultiplier = shiftType === "night" ? 1.2 : 1.0;

  const calculatedDailyWage = Math.round((baseRate * multiplier * shiftMultiplier) / 50) * 50;
  const monthlyEstimate = calculatedDailyWage * 26; // 26 working days

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-bold mb-3">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>Fair Wage Advisory & Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Check Fair Daily Wage In Your Trade
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            SkillConnect enforces transparent wage benchmarks so workers are never underpaid and employers know prevailing fair rates.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-5">
              {/* Select Trade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  1. Select Work Trade / Category
                </label>
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  {jobCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c[lang] || c.en} (Base ₹{c.minWage})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Skill Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  2. Skill & Experience Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSkillLevel("unskilled")}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      skillLevel === "unskilled"
                        ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Helper / Trainee
                  </button>
                  <button
                    type="button"
                    onClick={() => setSkillLevel("semi")}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      skillLevel === "semi"
                        ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    1-2 Yrs Experience
                  </button>
                  <button
                    type="button"
                    onClick={() => setSkillLevel("skilled")}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      skillLevel === "skilled"
                        ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Master Craftsman (3+ Yrs)
                  </button>
                </div>
              </div>

              {/* Shift Timing */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  3. Work Shift
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShiftType("day")}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      shiftType === "day"
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Standard Day Shift (8h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShiftType("night")}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      shiftType === "night"
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Night Shift (+20% Allowance)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-brand-900/20 text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-200">
                  Fair Benchmark Daily Wage
                </span>
                <div className="my-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black">₹{calculatedDailyWage}</span>
                  <span className="text-sm font-semibold text-brand-200">/ day</span>
                </div>
                <p className="text-xs text-brand-100 font-medium">
                  Guaranteed statutory minimum baseline: ₹{baseRate}/day
                </p>
              </div>

              <div className="my-5 py-4 border-y border-white/10 text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-100">Monthly Earning (26 days):</span>
                  <span className="font-extrabold text-white">₹{monthlyEstimate.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-100">Middleman Deduction:</span>
                  <span className="font-extrabold text-emerald-300">₹0 (Zero)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-100">Payment Schedule:</span>
                  <span className="font-extrabold text-white">Daily by 6:30 PM</span>
                </div>
              </div>

              <div className="text-[11px] text-brand-100 bg-white/10 p-2.5 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-300" />
                <span>Verified rate supported by local trade associations.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

