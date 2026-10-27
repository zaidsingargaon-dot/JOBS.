import React from "react";
import { 
  Briefcase, 
  Phone, 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  Lock, 
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer = ({ setActiveTab, openAuthModal }) => {
  const { t, lang, setLang } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Skill<span className="text-brand-400">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t("heroSubtitle")}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Middlemen Commission • Direct Daily Payouts</span>
              </div>
            </div>
          </div>

          {/* For Workers */}
          <div>
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-4">
              {t("howItWorksWorker")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab("jobs")} 
                  className="hover:text-white transition-colors"
                >
                  {t("navFindJobs")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openAuthModal("worker", "register")} 
                  className="hover:text-white transition-colors"
                >
                  Worker Free Registration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("worker")} 
                  className="hover:text-white transition-colors"
                >
                  My Applied Jobs & Payouts
                </button>
              </li>
              <li>
                <span className="text-brand-400 font-medium">Daily Cash / UPI At Shift End</span>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-4">
              {t("howItWorksEmployer")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab("employer")} 
                  className="hover:text-white transition-colors"
                >
                  Post a Daily-Wage Job
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("employer")} 
                  className="hover:text-white transition-colors"
                >
                  Browse Available Workers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openAuthModal("employer", "register")} 
                  className="hover:text-white transition-colors"
                >
                  Contractor Verification
                </button>
              </li>
              <li>
                <span className="text-slate-400">Site Safety Guidelines</span>
              </li>
            </ul>
          </div>

          {/* Worker Support & Helpline */}
          <div>
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-4">
              Support & Safety
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <p className="text-[11px] text-slate-400 font-medium">Toll-Free Worker Helpline</p>
                <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm mt-0.5">
                  <Phone className="w-4 h-4" />
                  <span>1800-200-WAGE</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Available 7:00 AM - 9:00 PM (Daily)</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>Encrypted & Privacy Protected</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillConnect Platform. Local Job & Skill Matching for Daily-Wage Workers.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang("en")} className={`hover:text-white ${lang === "en" ? "text-brand-400 font-bold" : ""}`}>
              English
            </button>
            <span>•</span>
            <button onClick={() => setLang("hi")} className={`hover:text-white ${lang === "hi" ? "text-brand-400 font-bold" : ""}`}>
              हिंदी
            </button>
            <span>•</span>
            <button onClick={() => setLang("kn")} className={`hover:text-white ${lang === "kn" ? "text-brand-400 font-bold" : ""}`}>
              ಕನ್ನಡ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

