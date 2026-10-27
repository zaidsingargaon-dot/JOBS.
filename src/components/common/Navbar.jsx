import React, { useState } from "react";
import { 
  Briefcase, 
  Globe, 
  Bell, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Shield, 
  PlusCircle, 
  HardHat, 
  Building2, 
  ChevronDown,
  Sparkles,
  Database
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useJobs } from "../../context/JobContext";
import { NotificationDropdown } from "./NotificationDropdown";
import { handleImageError } from "../../services/images";

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  openAuthModal, 
  openPostJobModal 
}) => {
  const { currentUser, logout, isFirebaseConfigured, loginAsDemo } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { notifications } = useJobs();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(
    (n) => (!currentUser || n.userId === currentUser.id) && !n.read
  ).length;

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro banner for Minimum Wage & Firebase Connectivity Status */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
          <span className="font-medium text-slate-200">
            {t("minWageAlert")}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-slate-400">
          <span className="hidden md:inline-flex items-center gap-1">
            <Database className="w-3 h-3 text-brand-400" />
            {isFirebaseConfigured ? (
              <span className="text-emerald-400 font-semibold">Firebase Cloud Connected</span>
            ) : (
              <span className="text-slate-300 font-medium">Local Persistent Storage (Firebase Ready)</span>
            )}
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="font-medium text-slate-200">Worker Helpline: 1800-200-9243</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Skill<span className="text-brand-600">Connect</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-brand-100 text-brand-800 rounded">
                  India
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-medium -mt-0.5">
                Local Daily-Wage Portal
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => handleNavClick("home")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === "home"
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              {t("navHome")}
            </button>
            <button
              onClick={() => handleNavClick("jobs")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === "jobs"
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              {t("navFindJobs")}
            </button>
            <button
              onClick={() => handleNavClick("worker")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                activeTab === "worker"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-white/50"
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              {t("navWorkerDashboard")}
            </button>
            <button
              onClick={() => handleNavClick("employer")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                activeTab === "employer"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-brand-700 hover:bg-white/50"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              {t("navEmployerDashboard")}
            </button>
            <button
              onClick={() => handleNavClick("admin")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                activeTab === "admin"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-purple-700 hover:bg-white/50"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              {t("navAdmin")}
            </button>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div className="relative">
              <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                    lang === "en" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                  title="English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("hi")}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                    lang === "hi" ? "bg-white text-brand-700 shadow-xs" : "text-slate-500"
                  }`}
                  title="Hindi (हिंदी)"
                >
                  हिं
                </button>
                <button
                  onClick={() => setLang("kn")}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                    lang === "kn" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-500"
                  }`}
                  title="Kannada (ಕನ್ನಡ)"
                >
                  ಕನ್ನ
                </button>
              </div>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 text-slate-600 hover:text-brand-600 bg-slate-100/80 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationDropdown
                isOpen={notifOpen}
                onClose={() => setNotifOpen(false)}
                onViewApplications={() => setActiveTab(currentUser?.role === "employer" ? "employer" : "worker")}
              />
            </div>

            {/* User Session or 1-Click Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-2xl border border-slate-200 transition-colors"
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-500 shadow-xs shrink-0"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                      currentUser.role === "worker"
                        ? "bg-emerald-600"
                        : currentUser.role === "employer"
                        ? "bg-brand-600"
                        : "bg-purple-600"
                    }`}>
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight max-w-[120px] truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 py-2 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser.phone || currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-slate-100 text-slate-700">
                        Role: {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab(currentUser.role === "employer" ? "employer" : currentUser.role === "admin" ? "admin" : "worker");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Dashboard & Profile
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openAuthModal("worker", "demo");
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-brand-600 hover:bg-brand-50 flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-brand-500" />
                        Switch Role / Demo User
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        {t("navLogout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("worker", "demo")}
                  className="px-3.5 py-2 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Demo Login</span>
                </button>
                <button
                  onClick={() => openAuthModal("worker", "login")}
                  className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/20 transition-all"
                >
                  {t("navLogin")}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNavClick("home")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
              activeTab === "home" ? "bg-brand-50 text-brand-700" : "text-slate-700"
            }`}
          >
            {t("navHome")}
          </button>
          <button
            onClick={() => handleNavClick("jobs")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
              activeTab === "jobs" ? "bg-brand-50 text-brand-700" : "text-slate-700"
            }`}
          >
            {t("navFindJobs")}
          </button>
          <button
            onClick={() => handleNavClick("worker")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
              activeTab === "worker" ? "bg-emerald-50 text-emerald-700" : "text-slate-700"
            }`}
          >
            <HardHat className="w-4 h-4 text-emerald-600" />
            {t("navWorkerDashboard")}
          </button>
          <button
            onClick={() => handleNavClick("employer")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
              activeTab === "employer" ? "bg-brand-50 text-brand-700" : "text-slate-700"
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-600" />
            {t("navEmployerDashboard")}
          </button>
          <button
            onClick={() => handleNavClick("admin")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
              activeTab === "admin" ? "bg-purple-50 text-purple-700" : "text-slate-700"
            }`}
          >
            <Shield className="w-4 h-4 text-purple-600" />
            {t("navAdmin")}
          </button>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal("worker", "demo");
              }}
              className="w-full py-2.5 bg-brand-50 border border-brand-200 text-brand-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              1-Click Demo Login
            </button>
            {!currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal("worker", "login");
                }}
                className="w-full py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl"
              >
                {t("navLogin")} / {t("navRegister")}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

