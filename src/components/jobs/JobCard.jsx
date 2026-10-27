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
import { IMAGES, handleImageError } from "../../services/images";

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

  // Fallback image based on job category
  const jobThumbnail = job.imageUrl || IMAGES.categories[job.category] || IMAGES.jobs.masonryVilla;

  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group ${
      job.isFlagged 
        ? "border-rose-300 bg-rose-50/20" 
        : "border-slate-200/90 shadow-sm hover:border-brand-300"
    }`}>
      
      {/* 1. PHOTOGRAPHIC HEADER THUMBNAIL */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={jobThumbnail}
          alt={job.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => handleImageError(e, IMAGES.fallbackPlaceholder)}
        />

        {/* Gradient Overlay for Top and Bottom Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Match score badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black rounded-full shadow-md backdrop-blur-md ${
              matchScore >= 85
                ? "bg-emerald-600/95 text-white"
                : matchScore >= 70
                ? "bg-brand-600/95 text-white"
                : "bg-slate-900/80 text-white"
            }`}>
              <Sparkles className="w-3 h-3 text-emerald-200" />
              <span>{matchScore}% {t("matchScore")}</span>
            </span>

            {/* Distance badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-white/95 backdrop-blur-md text-slate-800 rounded-full shadow-md">
              <MapPin className="w-3 h-3 text-brand-600" />
              <span>{job.distanceKm} {t("distanceKm")}</span>
            </span>
          </div>

          {/* Action icons: Audio & Bookmark */}
          <div className="flex items-center gap-1.5 shrink-0">
            <AudioHelper textToRead={audioSummary} className="bg-white/90 backdrop-blur-md shadow-sm" />
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
                isSaved
                  ? "bg-amber-500 text-white"
                  : "bg-white/90 text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
              title={isSaved ? "Saved to your list" : "Save this job"}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Tags over image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-bold">
            {job.categoryLabel || "Daily Wage Job"}
          </span>

          {job.isSample && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 rounded-md shadow-xs">
              {t("sampleDataBadge")}
            </span>
          )}
        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Job Title & Employer */}
          <div className="cursor-pointer" onClick={() => onOpenDetail(job)}>
            <h3 className="text-base font-extrabold text-slate-900 hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
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
          <div className="my-3.5 p-3 bg-gradient-to-r from-blue-50/80 to-slate-50 rounded-2xl border border-brand-100 flex items-center justify-between">
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
          <div className="mb-3">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Required Skills:</p>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills.slice(0, 3).map((skill) => {
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
              {job.requiredSkills.length > 3 && (
                <span className="px-2 py-0.5 text-xs text-slate-400 font-semibold">
                  +{job.requiredSkills.length - 3} more
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

        {/* 3. BOTTOM BUTTON ROW */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
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
              className="px-3 py-2 text-xs font-bold text-brand-700 hover:bg-brand-50 rounded-xl transition-colors"
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

    </div>
  );
};
