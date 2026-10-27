import React, { useState } from "react";
import { 
  X, 
  MapPin, 
  Coins, 
  Clock, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  Send, 
  Calendar,
  Lock,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useJobs } from "../../context/JobContext";
import { useAuth } from "../../context/AuthContext";
import { AudioHelper } from "../common/AudioHelper";

import { IMAGES, handleImageError } from "../../services/images";

export const JobDetailModal = ({ 
  isOpen, 
  onClose, 
  job, 
  autoFocusApply = false, 
  onReportJob,
  openAuthModal 
}) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { 
    applyForJob, 
    applications, 
    toggleSaveJob, 
    isJobSaved,
    calculateMatchScore 
  } = useJobs();

  const [workerNote, setWorkerNote] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen || !job) return null;

  const isSaved = isJobSaved(job.id);
  const userApplication = applications.find(
    (app) => app.jobId === job.id && currentUser && app.workerId === currentUser.id
  );
  const isApplied = Boolean(userApplication);

  const matchScore = calculateMatchScore(currentUser?.skills || [], job.requiredSkills);

  const handleApply = (e) => {
    e.preventDefault();
    if (!currentUser) {
      onClose();
      openAuthModal("worker", "login");
      return;
    }

    setIsApplying(true);
    setErrorMessage("");

    const res = applyForJob(job.id, workerNote);
    setIsApplying(false);

    if (res.success) {
      setApplySuccess(true);
      setTimeout(() => {
        setApplySuccess(false);
      }, 3000);
    } else {
      setErrorMessage(res.error || "Failed to submit application.");
    }
  };

  const audioSummary = `${job.title} at ${job.location}. Daily wage is ${job.dailyWage} rupees. Required skills are ${job.requiredSkills.join(", ")}. Description: ${job.description}`;
  const jobThumbnail = job.imageUrl || IMAGES.categories[job.category] || IMAGES.jobs.masonryVilla;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Photographic Header Banner */}
        <div className="relative h-48 sm:h-52 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={jobThumbnail}
            alt={job.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => handleImageError(e, IMAGES.fallbackPlaceholder)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-black/40" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/20">
              {job.categoryLabel || "Daily Wage Job"}
            </span>

            <div className="flex items-center gap-2">
              <AudioHelper textToRead={audioSummary} className="bg-white/90 text-slate-900 border-none shadow-md" />
              <button
                onClick={onClose}
                className="p-1.5 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Employer at Bottom of Banner */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              {job.isSample && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 rounded-md">
                  {t("sampleDataBadge")}
                </span>
              )}
              <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-emerald-500 text-white rounded-md">
                {matchScore}% Match
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug drop-shadow-md">
              {job.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <span className="font-semibold text-white">{job.employerName}</span>
              {job.isEmployerVerified && (
                <span className="inline-flex items-center gap-0.5 text-emerald-300 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Contractor</span>
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Daily Wage</span>
              <span className="text-xl font-black text-brand-600">₹{job.dailyWage}</span>
              <span className="text-[10px] text-slate-500 block">/ day</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Distance</span>
              <span className="text-base font-extrabold text-slate-800">{job.distanceKm} km</span>
              <span className="text-[10px] text-slate-500 block">from your area</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Timings</span>
              <span className="text-xs font-bold text-slate-800 line-clamp-1">{job.workTimings}</span>
              <span className="text-[10px] text-slate-500 block">Shift Duration</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Vacancies</span>
              <span className="text-base font-extrabold text-slate-800">{job.workersNeeded} Workers</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">{job.workersApplied || 0} applied</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Work Description & Site Tasks
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              {job.description}
            </p>
          </div>

          {/* Location & Landmark */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Exact Work Location & Reporting Landmark</span>
            </h3>
            <p className="text-sm font-semibold text-slate-900">{job.location}</p>
            {job.landmark && (
              <p className="text-xs text-slate-500 mt-0.5">Landmark: {job.landmark}</p>
            )}
            <p className="text-xs text-slate-500 mt-2">
              Estimated travel time: ~15-25 minutes by local bus or auto.
            </p>
          </div>

          {/* Skills Required */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Skills Required for This Job
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => {
                const workerHasSkill = currentUser?.skills?.some(
                  (ws) => ws.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 ${
                      workerHasSkill
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {skill} {workerHasSkill && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Safety & Gear */}
          <div className="flex items-center gap-3 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Site Safety Assured</p>
              <p className="text-emerald-800 text-[11px]">
                {job.safetyGearProvided
                  ? "Helmets, gloves, or high-visibility gear are provided on site by the employer."
                  : "Standard work shoes required. Normal site protocols followed."}
              </p>
            </div>
          </div>

          {/* Privacy Contact Policy Box */}
          <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-brand-200 text-xs text-brand-900">
            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold">Contact Privacy Protection</p>
                {isApplied ? (
                  <div className="mt-1">
                    <p className="text-slate-700">
                      You applied for this job! Direct Employer Line:
                    </p>
                    <a
                      href={`tel:${job.employerContact}`}
                      className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 bg-brand-600 text-white font-bold rounded-lg text-xs hover:bg-brand-700"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{job.employerContact}</span>
                    </a>
                  </div>
                ) : (
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Contact details are shielded to prevent spam. Once you click "Apply", your profile is sent to {job.employerName} and their direct contact phone is unlocked.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Application Form / Status */}
          <div className="pt-2">
            {applySuccess ? (
              <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 text-center animate-fadeIn">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                <p className="font-bold text-sm">Application Sent Successfully!</p>
                <p className="text-xs text-emerald-800 mt-0.5">
                  The employer has received your details. Track status in your Worker Hub.
                </p>
              </div>
            ) : isApplied ? (
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl text-center">
                <p className="text-xs font-bold text-slate-700">Current Application Status:</p>
                <span className="inline-block mt-1 px-3 py-1 bg-brand-100 text-brand-800 font-extrabold text-xs uppercase rounded-full">
                  {userApplication?.status || "Applied"}
                </span>
                {userApplication?.employerNote && (
                  <p className="text-xs text-slate-600 mt-2 bg-white p-2 rounded-xl border border-slate-200">
                    Employer Note: "{userApplication.employerNote}"
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3">
                {errorMessage && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Send a Message to the Contractor (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={workerNote}
                    onChange={(e) => setWorkerNote(e.target.value)}
                    placeholder="e.g. I live nearby in Koramangala. Have my own tools and ready to join tomorrow morning at 8:30 AM."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onReportJob(job)}
                    className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Report this job</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSaveJob(job.id)}
                      className="px-3.5 py-2.5 text-xs font-semibold text-slate-600 border border-slate-300 hover:bg-slate-50 rounded-xl flex items-center gap-1.5"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
                      <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isApplying}
                      className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isApplying ? "Submitting..." : t("applyNow")}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

