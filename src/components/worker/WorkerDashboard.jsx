import React, { useState } from "react";
import { 
  HardHat, 
  Sparkles, 
  FileText, 
  Bookmark, 
  User, 
  MapPin, 
  Coins, 
  Phone, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Save, 
  Plus, 
  X,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useJobs } from "../../context/JobContext";
import { useLanguage } from "../../context/LanguageContext";
import { JobCard } from "../jobs/JobCard";
import { IMAGES, handleImageError } from "../../services/images";

export const WorkerDashboard = ({ onOpenDetail, onReportJob }) => {
  const { currentUser, updateProfile } = useAuth();
  const { jobs, applications, savedJobIds, calculateMatchScore } = useJobs();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("recommended"); // 'recommended' | 'applications' | 'saved' | 'profile'

  // Profile Edit State
  const [profileName, setProfileName] = useState(currentUser?.name || "");
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || "");
  const [profileLocality, setProfileLocality] = useState(currentUser?.locality || "");
  const [profileWage, setProfileWage] = useState(currentUser?.expectedDailyWage || 800);
  const [profileExp, setProfileExp] = useState(currentUser?.experienceYears || 3);
  const [profileBio, setProfileBio] = useState(currentUser?.bio || "");
  const [workerSkills, setWorkerSkills] = useState(currentUser?.skills || ["Bricklaying", "Cement Plastering"]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter applications for current worker
  const myApplications = applications.filter(
    (app) => currentUser && app.workerId === currentUser.id
  );

  // Saved jobs
  const mySavedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  // Recommended jobs sorted by matchScore
  const recommendedJobs = [...jobs]
    .map((j) => ({
      ...j,
      computedScore: calculateMatchScore(currentUser?.skills || [], j.requiredSkills)
    }))
    .sort((a, b) => b.computedScore - a.computedScore);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !workerSkills.includes(newSkillInput.trim())) {
      setWorkerSkills([...workerSkills, newSkillInput.trim()]);
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setWorkerSkills(workerSkills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      locality: profileLocality,
      expectedDailyWage: Number(profileWage),
      experienceYears: Number(profileExp),
      skills: workerSkills,
      bio: profileBio
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || IMAGES.workers.rameshKumar}
                alt={currentUser?.name || "Worker"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-center border-2 border-emerald-500 shadow-lg shadow-emerald-600/20"
                onError={handleImageError}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentUser?.name || "Daily Worker Hub"}
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Aadhaar Verified</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser?.locality || "Bengaluru"}</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">Expected: ₹{currentUser?.expectedDailyWage || 800}/day</span>
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <span className="text-base sm:text-lg font-black text-emerald-800">{myApplications.length}</span>
              <p className="text-[10px] text-emerald-600 font-bold uppercase">Applied</p>
            </div>
            <div className="flex-1 md:flex-none p-3 bg-blue-50 rounded-2xl border border-brand-200 text-center">
              <span className="text-base sm:text-lg font-black text-brand-800">
                {myApplications.filter((a) => a.status === "accepted").length}
              </span>
              <p className="text-[10px] text-brand-600 font-bold uppercase">Hired</p>
            </div>
            <div className="flex-1 md:flex-none p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
              <span className="text-base sm:text-lg font-black text-amber-800">{mySavedJobs.length}</span>
              <p className="text-[10px] text-amber-600 font-bold uppercase">Saved</p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("recommended")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "recommended"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Recommended Jobs ({recommendedJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "applications"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Applications ({myApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "saved"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Jobs ({mySavedJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "profile"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Worker Profile & Skills</span>
          </button>
        </div>

        {/* TAB 1: RECOMMENDED JOBS */}
        {activeTab === "recommended" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Jobs Matched to Your Skills & Location
                </h2>
                <p className="text-xs text-slate-500">
                  Ranked by compatibility with your registered skills: {currentUser?.skills?.join(", ") || "General Labour"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onOpenDetail={onOpenDetail}
                  onReportJob={onReportJob}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MY APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">
              Track Job Applications & Employer Decisions
            </h2>

            {myApplications.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No applications yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Browse nearby job listings and apply with 1 click to get daily wage gigs.
                </p>
                <button
                  onClick={() => setActiveTab("recommended")}
                  className="mt-4 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Find Matching Jobs
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myApplications.map((app) => {
                  const job = jobs.find((j) => j.id === app.jobId);

                  return (
                    <div
                      key={app.id}
                      className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-full ${
                            app.status === "accepted"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : app.status === "shortlisted"
                              ? "bg-blue-100 text-brand-800 border border-brand-300"
                              : app.status === "under_review"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : app.status === "rejected"
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : "bg-slate-100 text-slate-700 border border-slate-300"
                          }`}>
                            Status: {app.status.replace("_", " ")}
                          </span>

                          <span className="text-xs text-slate-400">
                            Applied: {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900">
                          {app.jobTitle}
                        </h3>

                        <p className="text-xs text-slate-500">
                          Employer: <span className="font-semibold text-slate-700">{app.employerName}</span>
                          {" • "}Daily Wage: <span className="font-bold text-emerald-700">₹{app.dailyWage}/day</span>
                        </p>

                        {/* Employer response note if present */}
                        {app.employerNote && (
                          <div className="p-3 bg-blue-50/70 rounded-xl border border-brand-100 text-xs text-slate-700">
                            <span className="font-bold text-brand-800">Employer Note: </span>
                            "{app.employerNote}"
                          </div>
                        )}

                        {/* If accepted, show direct call button */}
                        {app.status === "accepted" && job && (
                          <div className="pt-2 flex items-center gap-2">
                            <a
                              href={`tel:${job.employerContact}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-sm transition-all"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call Employer Directly ({job.employerContact})</span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Right Action */}
                      <div className="shrink-0 flex items-center gap-2">
                        {job && (
                          <button
                            onClick={() => onOpenDetail(job)}
                            className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                          >
                            View Job Posting
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED JOBS */}
        {activeTab === "saved" && (
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">
              Saved Jobs for Later ({mySavedJobs.length})
            </h2>

            {mySavedJobs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No saved jobs</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Bookmark jobs you like by clicking the ribbon icon on any card.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySavedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onOpenDetail={onOpenDetail}
                    onReportJob={onReportJob}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: WORKER PROFILE EDIT & DIGITAL ID CARD */}
        {activeTab === "profile" && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Digital Worker Skill Pass Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                      SC
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SkillConnect India</p>
                      <p className="text-xs font-black text-white">Digital Worker Pass</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">
                    VERIFIED
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={currentUser?.avatar || IMAGES.workers.rameshKumar}
                    alt={profileName}
                    className="w-20 h-20 rounded-2xl object-cover object-center border-2 border-emerald-400 shadow-md"
                    onError={handleImageError}
                  />
                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">{profileName || "Worker"}</h3>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">
                      {currentUser?.tradeTitle || "Mason & Plasterer"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profileLocality || "Bengaluru"}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-800/80 rounded-2xl border border-slate-700 mb-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Expected Daily Pay</span>
                    <span className="text-base font-black text-emerald-400">₹{profileWage}/day</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Experience</span>
                    <span className="text-base font-black text-white">{profileExp} Years</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Registered Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {workerSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 text-slate-200 border border-slate-700 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-700/80 mt-6 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Aadhaar Verified</span>
                </span>
                <span>ID: {currentUser?.id || "worker-101"}</span>
              </div>
            </div>

            {/* Right: Editable Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Edit Worker Profile</h2>
                  <p className="text-xs text-slate-500">
                    Update your skills and rate to improve employer match accuracy.
                  </p>
                </div>
              </div>

              {saveSuccess && (
                <div className="mb-6 p-3.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile updated successfully! New match scores calculated.</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Worker Full Name
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone (Kept Private)
                  </label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Locality / Preferred Area
                  </label>
                  <input
                    type="text"
                    value={profileLocality}
                    onChange={(e) => setProfileLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expected Daily Wage (₹)
                  </label>
                  <input
                    type="number"
                    min="400"
                    max="3000"
                    step="50"
                    value={profileWage}
                    onChange={(e) => setProfileWage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={profileExp}
                    onChange={(e) => setProfileExp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Skills Editor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  My Core Trade Skills (Used for Auto-Matching)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {workerSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="p-0.5 hover:text-rose-600 rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add a new skill (e.g., Tile Fitting, Wall Putty)..."
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Bio / Work Summary
                </label>
                <textarea
                  rows={3}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        )}

      </div>
    </div>
  );
};

