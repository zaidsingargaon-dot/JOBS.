import React, { useState } from "react";
import { 
  UserCheck, 
  MapPin, 
  Wallet, 
  FileText, 
  Users, 
  CheckCircle2, 
  HardHat, 
  Building2,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Coins
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { IMAGES, handleImageError } from "../../services/images";

export const HowItWorks = ({ openAuthModal }) => {
  const { t } = useLanguage();
  const [activeRole, setActiveRole] = useState("worker");

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-bold mb-3">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Designed for effortless use, high trust, visual clarity, and direct daily payouts without middlemen.
          </p>

          {/* Role Toggle Pills */}
          <div className="mt-6 inline-flex p-1.5 bg-slate-200/80 rounded-2xl shadow-inner">
            <button
              onClick={() => setActiveRole("worker")}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeRole === "worker"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>{t("howItWorksWorker")}</span>
            </button>
            <button
              onClick={() => setActiveRole("employer")}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeRole === "employer"
                  ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t("howItWorksEmployer")}</span>
            </button>
          </div>
        </div>

        {/* WORKER FLOW */}
        {activeRole === "worker" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fadeIn">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={IMAGES.steps.step1Register}
                    alt="Worker creating profile on mobile"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-lg">
                    1
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Quick 1-Minute Registration</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t("step1Worker")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t("step1WorkerDesc")}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero registration fees • Aadhaar verified</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={IMAGES.steps.step2Matching}
                    alt="Worker matching with nearby jobs"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-black text-lg shadow-lg">
                    2
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-400" />
                    <span>Within 2 to 15 km Radius</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t("step2Worker")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t("step2WorkerDesc")}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-brand-700">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>Instant voice audio reader in Hindi & Kannada</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={IMAGES.steps.step3DailyPayout}
                    alt="Daily wage worker receiving on-time payout"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shadow-lg">
                    3
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-300" />
                    <span>Daily Evening Cash or UPI</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t("step3Worker")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t("step3WorkerDesc")}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>100% full wage without deductions</span>
              </div>
            </div>

          </div>
        )}

        {/* EMPLOYER FLOW */}
        {activeRole === "employer" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fadeIn">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={IMAGES.steps.step1Register}
                    alt="Contractor posting job requirement"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-black text-lg shadow-lg">
                    1
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-300" />
                    <span>Post Opening in 60 Seconds</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t("step1Employer")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t("step1EmployerDesc")}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-brand-700">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>Instant dispatch to local worker network</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={IMAGES.steps.step2Matching}
                    alt="Reviewing worker profiles"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg">
                    2
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-300" />
                    <span>Skill Compatibility %</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t("step2Employer")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t("step2EmployerDesc")}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-indigo-700">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Distance and previous gig ratings verified</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={IMAGES.steps.step3DailyPayout}
                    alt="Direct site deployment and hiring"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-lg">
                    3
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4 text-emerald-300" />
                    <span>Direct Call & On-Site Arrival</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {t("step3Employer")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t("step3EmployerDesc")}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero agency markup or hidden commissions</span>
              </div>
            </div>

          </div>
        )}

        {/* Separate CTA Cards */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-7 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3">
                <HardHat className="w-3.5 h-3.5" />
                <span>Daily Wage Earner</span>
              </div>
              <h4 className="text-xl font-black">{t("workerCtaTitle")}</h4>
              <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                Join 12,500+ local masons, painters, and helpers earning honest wages directly every day.
              </p>
            </div>
            <button
              onClick={() => openAuthModal("worker", "register")}
              className="mt-6 px-6 py-3 bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-between"
            >
              <span>{t("workerCtaBtn")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-7 bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>Contractor / Employer</span>
              </div>
              <h4 className="text-xl font-black">{t("employerCtaTitle")}</h4>
              <p className="text-xs text-brand-100 mt-2 leading-relaxed">
                Post your requirement now and find reliable, verified skilled hands for your site or home in minutes.
              </p>
            </div>
            <button
              onClick={() => openAuthModal("employer", "register")}
              className="mt-6 px-6 py-3 bg-white text-brand-900 hover:bg-brand-50 active:scale-95 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-between"
            >
              <span>{t("employerCtaBtn")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
