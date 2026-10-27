import React, { useState } from "react";
import { 
  UserCheck, 
  MapPin, 
  Wallet, 
  FileText, 
  Users, 
  CheckCircle2, 
  HardHat, 
  Building2 
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const HowItWorks = ({ openAuthModal }) => {
  const { t } = useLanguage();
  const [activeRole, setActiveRole] = useState("worker");

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Designed for effortless use, high trust, and direct payouts without middlemen.
          </p>

          {/* Role Toggle Pills */}
          <div className="mt-6 inline-flex p-1.5 bg-slate-200/80 rounded-2xl">
            <button
              onClick={() => setActiveRole("worker")}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
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
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("step1Worker")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("step1WorkerDesc")}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero registration fees</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-brand-700 flex items-center justify-center font-black text-xl mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("step2Worker")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("step2WorkerDesc")}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-brand-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant audio job reader</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xl mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("step3Worker")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("step3WorkerDesc")}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Cash / UPI on time</span>
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYER FLOW */}
        {activeRole === "employer" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fadeIn">
            {/* Step 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-black text-xl mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("step1Employer")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("step1EmployerDesc")}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-brand-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fast, simple job form</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xl mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("step2Employer")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("step2EmployerDesc")}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-indigo-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Smart skill matching %</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("step3Employer")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("step3EmployerDesc")}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reliable site deployment</span>
              </div>
            </div>
          </div>
        )}

        {/* Separate CTA Buttons */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold">{t("workerCtaTitle")}</h4>
              <p className="text-xs text-emerald-100 mt-1">
                Join 12,000+ local masons, painters, and helpers earning daily.
              </p>
            </div>
            <button
              onClick={() => openAuthModal("worker", "register")}
              className="mt-4 px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              {t("workerCtaBtn")}
            </button>
          </div>

          <div className="p-6 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-3xl shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold">{t("employerCtaTitle")}</h4>
              <p className="text-xs text-brand-100 mt-1">
                Post your requirement now and find reliable hands in minutes.
              </p>
            </div>
            <button
              onClick={() => openAuthModal("employer", "register")}
              className="mt-4 px-5 py-2.5 bg-white text-brand-800 hover:bg-brand-50 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              {t("employerCtaBtn")}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

