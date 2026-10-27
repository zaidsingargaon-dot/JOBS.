import React from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  PhoneCall, 
  Lock, 
  FileCheck2, 
  Scale, 
  HeartHandshake 
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const TrustAndSafety = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Worker Protection & Anti-Exploitation Charter</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Safety, Respect & Guaranteed Payouts
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Daily-wage workers are the backbone of our communities. SkillConnect is engineered with strict safeguards to guarantee safety and prevent fraud.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="bg-slate-800/80 p-6 sm:p-7 rounded-3xl border border-slate-700/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Guaranteed Daily Payouts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Employers must agree to the platform daily payment charter. Wage dispute resolution team mediates any delayed cash or UPI payment immediately.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 sm:p-7 rounded-3xl border border-slate-700/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Tolerance for Advance Fees</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Any contractor or employer asking for an "advance deposit", "registration fee", or "uniform charge" is permanently blacklisted and banned.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 sm:p-7 rounded-3xl border border-slate-700/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Privacy Protected Contacts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Workers' phone numbers and home addresses are never published open to the public. They are only revealed when you apply and get matched.
            </p>
          </div>

        </div>

        {/* Emergency Help Banner */}
        <div className="mt-12 max-w-4xl mx-auto p-6 bg-gradient-to-r from-emerald-900/60 to-slate-800 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-900 flex items-center justify-center font-black shrink-0 mx-auto sm:mx-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Emergency Worker Helpline & Dispute Cell</p>
              <p className="text-xs text-slate-400">Available in Hindi, Kannada, Tamil, Telugu, and English</p>
            </div>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <a
              href="tel:18002009243"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/20 transition-all inline-block"
            >
              Call 1800-200-WAGE (Free)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

