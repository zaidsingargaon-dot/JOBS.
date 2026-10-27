import React, { useState, useMemo } from "react";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { HeroSection } from "./components/landing/HeroSection";
import { CategoryGrid } from "./components/landing/CategoryGrid";
import { HowItWorks } from "./components/landing/HowItWorks";
import { DailyWageCalculator } from "./components/landing/DailyWageCalculator";
import { TrustAndSafety } from "./components/landing/TrustAndSafety";
import { JobCard } from "./components/jobs/JobCard";
import { JobFilters } from "./components/jobs/JobFilters";
import { JobDetailModal } from "./components/jobs/JobDetailModal";
import { ReportModal } from "./components/common/ReportModal";
import { AuthModal } from "./components/auth/AuthModal";
import { WorkerDashboard } from "./components/worker/WorkerDashboard";
import { EmployerDashboard } from "./components/employer/EmployerDashboard";
import { AdminDashboard } from "./components/admin/AdminDashboard";

import { useJobs } from "./context/JobContext";
import { useAuth } from "./context/AuthContext";
import { useLanguage } from "./context/LanguageContext";
import { Sparkles, Briefcase, Search, ArrowRight, RotateCcw } from "lucide-react";

export function App() {
  const { jobs } = useJobs();
  const { currentUser, loginAsDemo } = useAuth();
  const { t } = useLanguage();

  // Active top navigation tab: 'home' | 'jobs' | 'worker' | 'employer' | 'admin'
  const [activeTab, setActiveTab] = useState("home");

  // Job Filters state
  const [filters, setFilters] = useState({
    query: "",
    location: "",
    category: "all",
    maxDistance: 999,
    minWage: 400,
    experience: "all"
  });

  // Modals state
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [autoFocusApply, setAutoFocusApply] = useState(false);

  const [reportJobTarget, setReportJobTarget] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState("worker");
  const [authInitialMode, setAuthInitialMode] = useState("demo");

  // Reset filters
  const resetFilters = () => {
    setFilters({
      query: "",
      location: "",
      category: "all",
      maxDistance: 999,
      minWage: 400,
      experience: "all"
    });
  };

  // Filtered jobs memoization
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Status check: Only active unless admin
      if (job.status !== "active" && (!currentUser || currentUser.role !== "admin")) {
        return false;
      }

      // 2. Query search (Title, Description, or Skills)
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const titleMatch = job.title.toLowerCase().includes(q);
        const descMatch = job.description.toLowerCase().includes(q);
        const skillMatch = job.requiredSkills.some((s) => s.toLowerCase().includes(q));
        const catMatch = job.categoryLabel && job.categoryLabel.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !skillMatch && !catMatch) return false;
      }

      // 3. Location search
      if (filters.location.trim()) {
        const loc = filters.location.toLowerCase();
        const locationMatch = job.location.toLowerCase().includes(loc) ||
                              (job.landmark && job.landmark.toLowerCase().includes(loc));
        if (!locationMatch) return false;
      }

      // 4. Category filter
      if (filters.category !== "all" && job.category !== filters.category) {
        return false;
      }

      // 5. Max distance
      if (filters.maxDistance < 999 && job.distanceKm > filters.maxDistance) {
        return false;
      }

      // 6. Minimum wage
      if (job.dailyWage < filters.minWage) {
        return false;
      }

      // 7. Experience
      if (filters.experience !== "all") {
        if (filters.experience === "none" && !job.experienceRequired.toLowerCase().includes("no")) {
          return false;
        }
        if (filters.experience === "1" && !job.experienceRequired.includes("1")) {
          return false;
        }
        if (filters.experience === "2" && !job.experienceRequired.includes("2")) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters, currentUser]);

  // Handlers
  const handleOpenDetail = (job, autoApply = false) => {
    setSelectedJob(job);
    setAutoFocusApply(autoApply);
    setJobModalOpen(true);
  };

  const handleOpenReport = (job) => {
    setReportJobTarget(job);
    setReportModalOpen(true);
  };

  const handleCategorySelectFromHome = (categoryId) => {
    setFilters((prev) => ({ ...prev, category: categoryId }));
    setActiveTab("jobs");
  };

  const handleSearchFromHome = ({ query, location }) => {
    setFilters((prev) => ({ ...prev, query, location }));
    setActiveTab("jobs");
  };

  const handleOpenAuth = (role = "worker", mode = "demo") => {
    setAuthInitialRole(role);
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      
      {/* Responsive Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={handleOpenAuth}
        openPostJobModal={() => {
          setActiveTab("employer");
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME LANDING PAGE */}
        {activeTab === "home" && (
          <div>
            <HeroSection
              onSearch={handleSearchFromHome}
              onSelectRole={(role) => loginAsDemo(role)}
              openAuthModal={handleOpenAuth}
            />

            <CategoryGrid
              onSelectCategory={handleCategorySelectFromHome}
              selectedCategory={filters.category}
            />

            <HowItWorks openAuthModal={handleOpenAuth} />

            <DailyWageCalculator />

            <TrustAndSafety />
          </div>
        )}

        {/* VIEW 2: JOBS BROWSE & FILTER BOARD */}
        {activeTab === "jobs" && (
          <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Local Daily-Wage Jobs
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Showing verified gigs matching your location and skill preferences.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  Role: <span className="text-brand-600 font-extrabold capitalize">{currentUser?.role || "Guest"}</span>
                </span>
                {!currentUser && (
                  <button
                    onClick={() => handleOpenAuth("worker", "demo")}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl"
                  >
                    Login as Worker to Apply
                  </button>
                )}
              </div>
            </div>

            {/* Filters Box */}
            <div className="mb-8">
              <JobFilters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                totalResultsCount={filteredJobs.length}
              />
            </div>

            {/* Job Grid / Empty State */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  {t("noJobsFound")}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your distance radius, minimum daily wage, or clear the search keywords.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onOpenDetail={handleOpenDetail}
                    onReportJob={handleOpenReport}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: WORKER DASHBOARD */}
        {activeTab === "worker" && (
          <WorkerDashboard
            onOpenDetail={handleOpenDetail}
            onReportJob={handleOpenReport}
          />
        )}

        {/* VIEW 4: EMPLOYER DASHBOARD */}
        {activeTab === "employer" && (
          <EmployerDashboard
            onOpenDetail={handleOpenDetail}
            onReportJob={handleOpenReport}
          />
        )}

        {/* VIEW 5: ADMIN DASHBOARD */}
        {activeTab === "admin" && (
          <AdminDashboard onOpenDetail={handleOpenDetail} />
        )}

      </main>

      {/* Global Modals */}
      <JobDetailModal
        isOpen={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        job={selectedJob}
        autoFocusApply={autoFocusApply}
        onReportJob={(job) => {
          setJobModalOpen(false);
          handleOpenReport(job);
        }}
        openAuthModal={handleOpenAuth}
      />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        job={reportJobTarget}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authInitialRole}
        initialMode={authInitialMode}
      />

      {/* Modern Responsive Footer */}
      <Footer setActiveTab={setActiveTab} openAuthModal={handleOpenAuth} />

    </div>
  );
}

export default App;

