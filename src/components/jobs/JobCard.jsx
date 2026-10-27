import React, { useState } from "react";
import { 
  MapPin, 
  Coins, 
  Clock, 
  Users, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  HardHat,
  CheckCircle2,
  Phone
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useJobs } from "../../context/JobContext";
import { useAuth } from "../../context/AuthContext";
import { AudioHelper } from "../common/AudioHelper";

export const JobCard = ({ job, onOpenDetail, onReportJob }) => {
  const { t, lang } = useLanguage();
  const { currentUser } = useAuth();
  const { 
    calculateMatchScore, 
    toggleSaveJob, 
    isJobSaved, 
    applications 
  } = useJobs();

  const isSaved = isJobSaved(job.id);

  // Check if current user has already applied
  const isApplied = applications.some(
    (app) => app.jobId === job.id && currentUser && app.workerId === currentUser.id
  );

  const matchScore = calculateMatchScore(currentUser?.skills || [], job.requiredSkills);

  // Text for Speech audio accessibility
  const audioSummary = `${job.title}. Daily wage is ${job.dailyWage} rupees per day. Location is ${job.location}, approximately ${job.distanceKm} kilometers away. Work hours are ${job.workTimings}. Required skills include ${job.requiredSkills.join(", ")}.`;

  return (
    <div className={`relative bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
      job.isFlagged 
        ? "border-rose-300 bg-rose-50/20" 
        : "border-slate-200/90 shadow-sm hover:border-brand-300"
    }`}>
      
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          {/* Badges container */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Match score badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black rounded-full shadow-xs ${
              matchScore >= 85
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : matchScore >= 70
                ? "bg-blue-100 text-brand-800 border border-brand-300"
                : "bg-slate-100 text-slate-700 border border-slate-300"
            }`}>
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{matchScore}% {t("matchScore")}</span>
            </span>

            {/* Distance badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              <MapPin className="w-3 h-3 text-brand-600" />
              <span>{job.distanceKm} {t("distanceKm")}</span>
            </span>

            {/* Clearly labeled Sample indicator as requested */}
            {job.isSample && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                {t("sampleDataBadge")}
              </span>
            )}
          </div>

          {/* Action icons: Audio & Bookmark */}
          <div className="flex items-center gap-1.5 shrink-0">
            <AudioHelper textToRead={audioSummary} />
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? "bg-amber-50 border-amber-300 text-amber-600"
                  : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700"
              }`}
              title={isSaved ? "Saved to your list" : "Save this job"}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Job Title & Employer */}
        <div className="cursor-pointer" onClick={() => onOpenDetail(job)}>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-slate-600">{job.employerName}</span>
            {job.isEmployerVerified && (
              <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-600 font-bold" title="Verified Employer">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            )}
          </div>
        </div>

        {/* Location & Landmark */}
        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="line-clamp-1">{job.location} {job.landmark ? `(${job.landmark})` : ""}</span>
        </p>

        {/* Daily Wage Highlight Box */}
        <div className="my-4 p-3 bg-gradient-to-r from-blue-50/80 to-slate-50 rounded-2xl border border-brand-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              {t("dailyWage")}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-brand-700">₹{job.dailyWage}</span>
              <span className="text-xs font-bold text-slate-500">{t("perDay")}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {job.wagePaymentMethod || "Daily Cash or UPI"}
            </span>
            <p className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{job.workTimings}</span>
            </p>
          </div>
        </div>

        {/* Skills required tags */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Required Skills:</p>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills.slice(0, 4).map((skill) => {
              const workerHasSkill = currentUser?.skills?.some(
                (ws) => ws.toLowerCase() === skill.toLowerCase()
              );
              return (
                <span
                  key={skill}
                  className={`px-2 py-0.5 text-xs font-semibold rounded-lg border ${
                    workerHasSkill
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {skill} {workerHasSkill && "✓"}
                </span>
              );
            })}
            {job.requiredSkills.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-slate-400 font-semibold">
                +{job.requiredSkills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Extra Perks: Safety gear & workers needed */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {job.workersNeeded} {t("workersNeeded")}
            </span>
          </div>
          {job.safetyGearProvided && (
            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safety Gear Provided</span>
            </span>
          )}
        </div>
      </div>

      {/* Bottom Button Row */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onReportJob(job)}
          className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
          title="Report suspicious or fake job"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{t("reportJob")}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetail(job)}
            className="px-3.5 py-2 text-xs font-bold text-brand-700 hover:bg-brand-50 rounded-xl transition-colors"
          >
            Details
          </button>

          <button
            type="button"
            onClick={() => onOpenDetail(job, true)}
            disabled={isApplied}
            className={`px-4 py-2 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
              isApplied
                ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
                : "bg-brand-600 hover:bg-brand-700 active:scale-95 text-white shadow-brand-600/20"
            }`}
          >
            <span>{isApplied ? t("alreadyApplied") : t("applyNow")}</span>
            {!isApplied && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

    </div>
  );
};

