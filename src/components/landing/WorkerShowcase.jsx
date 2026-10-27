import React from "react";
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Briefcase, 
  Clock,
  Sparkles
} from "lucide-react";
import { sampleWorkers } from "../../services/sampleData";
import { handleImageError } from "../../services/images";
import { useLanguage } from "../../context/LanguageContext";

export const WorkerShowcase = ({ onSelectWorker, openAuthModal }) => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Local Talent</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Verified Workers Near You
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Connect directly with verified local tradespeople. Transparent daily wages, police/Aadhaar verified, and ready for work today.
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Showing College Hackathon Demo Callout:
            </span>
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold">
              Demo Profiles • Non-Commercial Sample
            </span>
          </div>
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Avatar & Status */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-16 h-16 rounded-2xl object-cover object-center border-2 border-emerald-500 shadow-md group-hover:scale-105 transition-transform"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    {worker.verifiedAadhaar && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-xs" title="Aadhaar Verified">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>{worker.availabilityStatus || "Available Today"}</span>
                    </span>
                    <div className="flex items-center justify-end gap-1 mt-1.5 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{worker.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({worker.completedJobsCount} gigs)</span>
                    </div>
                  </div>
                </div>

                {/* Worker Identity */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {worker.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">
                    {worker.tradeTitle || "Skilled Craftsman"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{worker.locality}</span>
                    <span>•</span>
                    <span>{worker.experienceYears} Yrs Exp</span>
                  </p>
                </div>

                {/* Expected Daily Wage Box */}
                <div className="my-3.5 p-3 bg-white rounded-2xl border border-slate-200/90 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Daily Wage Rate</span>
                    <span className="text-lg font-black text-slate-900">₹{worker.expectedDailyWage}</span>
                    <span className="text-[10px] text-slate-500 font-semibold"> / day</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Zero Deductions
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Paid evening by Cash/UPI</p>
                  </div>
                </div>

                {/* Core Skills Chips */}
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Trade Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {worker.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs font-semibold bg-white text-slate-700 border border-slate-200 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                    {worker.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[11px] text-slate-400 font-semibold">
                        +{worker.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Transparent Demo Tag & Hire Button */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {worker.isDemoProfile ? "Demo Profile" : "Verified"}
                </span>

                <button
                  type="button"
                  onClick={() => openAuthModal("employer", "demo")}
                  className="px-4 py-2 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Connect & Hire</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

