import React, { useState } from "react";
import { 
  Building2, 
  PlusCircle, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  MapPin, 
  Coins, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  UserCheck, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useJobs } from "../../context/JobContext";
import { useLanguage } from "../../context/LanguageContext";
import { jobCategories } from "../../services/translations";
import { IMAGES, handleImageError } from "../../services/images";

export const EmployerDashboard = ({ onOpenDetail, onReportJob }) => {
  const { currentUser, updateProfile } = useAuth();
  const { 
    jobs, 
    createJob, 
    updateJob, 
    deleteJob, 
    toggleJobStatus, 
    applications, 
    updateApplicationStatus 
  } = useJobs();
  const { t, lang } = useLanguage();

  const [activeTab, setActiveTab] = useState("my-jobs"); // 'my-jobs' | 'applicants' | 'post-job' | 'profile'
  const [selectedJobFilter, setSelectedJobFilter] = useState("all");

  // Post Job Form State
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("construction");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSkills, setJobSkills] = useState(["Bricklaying", "Foundation Work"]);
  const [newSkill, setNewSkill] = useState("");
  const [jobLocation, setJobLocation] = useState("Koramangala 4th Block, Bengaluru");
  const [jobLandmark, setJobLandmark] = useState("Near BDA Complex");
  const [dailyWage, setDailyWage] = useState(850);
  const [wagePaymentMethod, setWagePaymentMethod] = useState("Daily Cash or UPI at 6:00 PM");
  const [workersNeeded, setWorkersNeeded] = useState(3);
  const [workTimings, setWorkTimings] = useState("8:30 AM - 5:30 PM (1 hr lunch)");
  const [jobType, setJobType] = useState("3-Day Project");
  const [safetyGearProvided, setSafetyGearProvided] = useState(true);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState("");

  // Applicant Status Update Modal/Note State
  const [activeApplicantNote, setActiveApplicantNote] = useState({});

  // Filter jobs for this employer (or show all if demo employer)
  const myJobs = jobs.filter(
    (j) => !currentUser || j.employerId === currentUser.id || currentUser.role === "employer"
  );

  // Filter applications for my jobs
  const myJobIds = myJobs.map((j) => j.id);
  const myApplicants = applications.filter((app) => 
    myJobIds.includes(app.jobId) && (selectedJobFilter === "all" || app.jobId === selectedJobFilter)
  );

  const handleAddSkillChip = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !jobSkills.includes(newSkill.trim())) {
      setJobSkills([...jobSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkillChip = (skillToRemove) => {
    setJobSkills(jobSkills.filter((s) => s !== skillToRemove));
  };

  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    setPostError("");

    if (!jobTitle.trim() || !jobDescription.trim() || !jobLocation.trim()) {
      setPostError("Please fill out all required fields.");
      return;
    }

    if (dailyWage < 450) {
      setPostError("Daily wage must meet the minimum wage baseline of at least ₹450/day.");
      return;
    }

    const selectedCatObj = jobCategories.find((c) => c.id === jobCategory);

    const newJob = createJob({
      title: jobTitle,
      category: jobCategory,
      categoryLabel: selectedCatObj ? selectedCatObj.en : "General Trade",
      description: jobDescription,
      requiredSkills: jobSkills,
      location: jobLocation,
      landmark: jobLandmark,
      dailyWage: Number(dailyWage),
      wagePaymentMethod,
      workersNeeded: Number(workersNeeded),
      workTimings,
      jobType,
      safetyGearProvided
    });

    setPostSuccess(true);
    // Reset form
    setJobTitle("");
    setJobDescription("");
    setTimeout(() => {
      setPostSuccess(false);
      setActiveTab("my-jobs");
    }, 1800);
  };

  const handleStatusChange = (appId, newStatus) => {
    const note = activeApplicantNote[appId] || "";
    updateApplicationStatus(appId, newStatus, note);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || IMAGES.employers.rajeshSharma}
                alt={currentUser?.companyName || "Contractor"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-center border-2 border-brand-500 shadow-lg shadow-brand-600/20"
                onError={handleImageError}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center border-2 border-white shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentUser?.companyName || currentUser?.name || "Contractor Hub"}
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-brand-100 text-brand-800 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Contractor</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser?.location || "Koramangala, Bengaluru"}</span>
                <span>•</span>
                <span>{myJobs.length} active listings</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("post-job")}
            className="px-5 py-3 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Daily Wage Job</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("my-jobs")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "my-jobs"
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>My Job Openings ({myJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("applicants")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "applicants"
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Review Applicants ({myApplicants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("post-job")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "post-job"
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "profile"
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Employer Profile</span>
          </button>
        </div>

        {/* TAB 1: MY JOB LISTINGS */}
        {activeTab === "my-jobs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Active Daily-Wage Postings</h2>
              <span className="text-xs text-slate-500">Manage openings and applicants</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myJobs.map((job) => {
                const jobApplicantsCount = applications.filter((a) => a.jobId === job.id).length;

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div>
                      {/* Job Trade Thumbnail */}
                      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                        <img
                          src={job.imageUrl || IMAGES.categories[job.category] || IMAGES.jobs.masonryVilla}
                          alt={job.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => handleImageError(e, IMAGES.fallbackPlaceholder)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full shadow-sm ${
                            job.status === "active"
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-700 text-white"
                          }`}>
                            {job.status}
                          </span>
                          <span className="px-2.5 py-0.5 text-xs font-black bg-white/95 text-brand-800 rounded-full shadow-sm">
                            ₹{job.dailyWage}/day
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-base font-extrabold text-slate-900 line-clamp-2 leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {job.location}
                        </p>

                        <div className="my-3.5 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px] font-bold uppercase">Required</span>
                            <span className="font-extrabold text-slate-800">{job.workersNeeded} Workers</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block text-[10px] font-bold uppercase">Received</span>
                            <span className="font-extrabold text-brand-600">{jobApplicantsCount} Applicants</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedJobFilter(job.id);
                          setActiveTab("applicants");
                        }}
                        className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs rounded-xl"
                      >
                        View {jobApplicantsCount} Applicants
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleJobStatus(job.id)}
                          className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                          {job.status === "active" ? "Close" : "Reopen"}
                        </button>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: APPLICANTS REVIEWER */}
        {activeTab === "applicants" && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">Review Worker Applications</h2>
                <p className="text-xs text-slate-500">
                  Inspect worker skills, match score %, and direct phone contact. Update status to inform the worker.
                </p>
              </div>

              {/* Filter by job */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Filter Job:</span>
                <select
                  value={selectedJobFilter}
                  onChange={(e) => setSelectedJobFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 outline-none"
                >
                  <option value="all">All Jobs ({applications.length})</option>
                  {myJobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {myApplicants.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No applicants for this selection</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Workers in your vicinity will apply once they discover your job listing.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myApplicants.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Worker Info with Portrait */}
                    <div className="flex items-start gap-4 max-w-xl">
                      <img
                        src={app.workerAvatar || IMAGES.workers.rameshKumar}
                        alt={app.workerName}
                        className="w-14 h-14 rounded-2xl object-cover object-center border-2 border-emerald-500 shadow-sm shrink-0 mt-1"
                        onError={handleImageError}
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-base text-slate-900">{app.workerName}</span>
                          <span className="px-2 py-0.5 text-xs font-extrabold bg-emerald-100 text-emerald-800 rounded-md">
                            {app.matchScore}% Skill Match
                          </span>
                          <span className="text-xs text-slate-400">
                            Applied: {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                        </div>

                      <p className="text-xs text-brand-700 font-semibold">
                        Applied for: {app.jobTitle}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <a
                          href={`tel:${app.workerPhone}`}
                          className="font-bold text-slate-900 flex items-center gap-1 hover:text-brand-600"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{app.workerPhone}</span>
                        </a>
                        <span>•</span>
                        <span>Expected: ₹{app.dailyWage}/day</span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {app.workerSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Worker Note */}
                      {app.workerNote && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                          <span className="font-bold text-slate-800">Worker Availability: </span>
                          "{app.workerNote}"
                        </div>
                      )}
                      </div>
                    </div>

                    {/* Status Changer Actions */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 shrink-0 lg:w-80">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Update Status
                        </label>
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl text-slate-800 outline-none"
                        >
                          <option value="applied">Applied (New)</option>
                          <option value="under_review">Under Review</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="accepted">Accepted / Hired (Site Confirmation)</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Optional feedback / site instructions note..."
                          value={activeApplicantNote[app.id] ?? (app.employerNote || "")}
                          onChange={(e) =>
                            setActiveApplicantNote({ ...activeApplicantNote, [app.id]: e.target.value })
                          }
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl outline-none"
                        />
                      </div>

                      <button
                        onClick={() => handleStatusChange(app.id, app.status)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                      >
                        Save Decision & Notify Worker
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: POST NEW JOB */}
        {activeTab === "post-job" && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-black text-slate-900">Post a New Daily-Wage Job</h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the details. Local verified workers will be notified instantly based on matching skills.
              </p>
            </div>

            {postSuccess && (
              <div className="mb-6 p-4 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Job posted successfully! It is now live on the local board.</span>
              </div>
            )}

            {postError && (
              <div className="mb-6 p-3.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{postError}</span>
              </div>
            )}

            <form onSubmit={handlePostJobSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Mason & Bricklayer for 3-Day Residential Villa Project"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trade Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    {jobCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c[lang] || c.en} (Min ₹{c.minWage})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Number of Workers Needed <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={workersNeeded}
                    onChange={(e) => setWorkersNeeded(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Daily Wage Rate (₹ / Day) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="450"
                    max="5000"
                    step="50"
                    value={dailyWage}
                    onChange={(e) => setDailyWage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-black text-brand-700"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Minimum legal wage: ₹450/day</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Wage Payment Frequency
                  </label>
                  <select
                    value={wagePaymentMethod}
                    onChange={(e) => setWagePaymentMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    <option value="Daily Cash or UPI at 6:00 PM">Daily Evening Cash / UPI</option>
                    <option value="Daily Cash with ₹50 Food Allowance">Daily Cash + Food Allowance</option>
                    <option value="Weekly Saturday Direct Bank Transfer">Weekly Saturday Settlement</option>
                    <option value="Project Completion Final Payout">Project Completion Payout</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Location / Locality <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    placeholder="e.g. Koramangala 4th Block, Bengaluru"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Landmark / Site Details
                  </label>
                  <input
                    type="text"
                    value={jobLandmark}
                    onChange={(e) => setJobLandmark(e.target.value)}
                    placeholder="e.g. Near BDA Complex / Gate 2"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Timings
                  </label>
                  <input
                    type="text"
                    value={workTimings}
                    onChange={(e) => setWorkTimings(e.target.value)}
                    placeholder="e.g. 8:30 AM - 5:30 PM (1 hr lunch)"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Duration
                  </label>
                  <input
                    type="text"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    placeholder="e.g. 1-Day Work or 3-Day Project"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Required Skills Chips */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Required Worker Skills (Matching Criteria)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {jobSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-800 border border-brand-200 rounded-xl text-xs font-bold"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillChip(skill)}
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
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Type skill & press Add (e.g. Bricklaying, Machine Sanding)..."
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkillChip}
                    className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl"
                  >
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Site Description & Task Requirements <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the exact tasks, tools provided, drinking water availability, and instructions for workers."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                  required
                />
              </div>

              {/* Safety Checkbox */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="safetyCheck"
                  checked={safetyGearProvided}
                  onChange={(e) => setSafetyGearProvided(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
                <label htmlFor="safetyCheck" className="text-xs font-semibold text-emerald-900 cursor-pointer">
                  Safety Gear (helmets, gloves, or boots) will be supplied to workers on site.
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-7 py-3 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Job Immediately</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: EMPLOYER PROFILE */}
        {activeTab === "profile" && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100 mb-6">
              <img
                src={currentUser?.avatar || IMAGES.employers.rajeshSharma}
                alt="Contractor Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-center border-2 border-brand-500 shadow-md shrink-0"
                onError={handleImageError}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {currentUser?.companyName || "Sharma Infrastructure & Projects"}
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-bold bg-brand-100 text-brand-800 rounded-md">
                    GST Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Contractor ID: {currentUser?.id || "employer-demo-1"} • Civil Contractor & Site Renovation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Firm Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.companyName || "Sharma Infrastructure & Projects"}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name || "Rajesh Sharma"}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    defaultValue={currentUser?.phone || "+91 98450 12345"}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Type</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.businessType || "Civil Contractor & Renovation"}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>GST and Trade License Verified. Your job postings appear with the "Verified Employer" trust badge.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

