import React, { useState } from "react";
import { 
  X, 
  UserCheck, 
  Briefcase, 
  Shield, 
  ArrowRight, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { jobCategories } from "../../services/translations";
import { IMAGES, handleImageError } from "../../services/images";

export const AuthModal = ({ isOpen, onClose, initialRole = "worker", initialMode = "demo" }) => {
  const { loginAsDemo, loginUser, registerUser, authError } = useAuth();
  const { t, lang } = useLanguage();

  const [mode, setMode] = useState(initialMode); // 'demo' | 'login' | 'register'
  const [role, setRole] = useState(initialRole); // 'worker' | 'employer' | 'admin'

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regLocality, setRegLocality] = useState("Koramangala, Bengaluru");
  const [regWage, setRegWage] = useState(750);
  const [regExp, setRegExp] = useState(2);
  const [regSelectedSkills, setRegSelectedSkills] = useState(["Bricklaying", "Wall Putty"]);
  const [regCompanyName, setRegCompanyName] = useState("");
  const [regBusinessType, setRegBusinessType] = useState("Civil Contractor");
  const [localError, setLocalError] = useState("");

  if (!isOpen) return null;

  const handleDemoSelect = (selectedRole) => {
    loginAsDemo(selectedRole);
    onClose();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!loginIdentifier) {
      setLocalError("Please enter your Phone number or Email.");
      return;
    }
    const res = await loginUser(loginIdentifier, loginPassword, role);
    if (res.success) {
      onClose();
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!regName.trim() || !regPhone.trim()) {
      setLocalError("Please enter your name and phone number.");
      return;
    }

    const payload = {
      name: regName,
      phone: regPhone,
      role: role,
      locality: regLocality,
      skills: regSelectedSkills,
      expectedDailyWage: Number(regWage),
      experienceYears: Number(regExp),
      companyName: regCompanyName || (role === "employer" ? `${regName} Enterprises` : ""),
      businessType: regBusinessType
    };

    const res = await registerUser(payload);
    if (res.success) {
      onClose();
    }
  };

  const toggleSkill = (skill) => {
    if (regSelectedSkills.includes(skill)) {
      setRegSelectedSkills(regSelectedSkills.filter((s) => s !== skill));
    } else {
      setRegSelectedSkills([...regSelectedSkills, skill]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-brand-600 to-brand-700 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </span>
              <h3 className="font-extrabold text-lg text-white">SkillConnect Portal</h3>
            </div>
            <p className="text-xs text-brand-100 mt-0.5">
              Local Job & Skill Matching for Daily-Wage Workers
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            onClick={() => setMode("demo")}
            className={`flex-1 py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              mode === "demo"
                ? "border-brand-600 text-brand-700 bg-white"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1-Click Demo Login
          </button>
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 px-2 text-center border-b-2 transition-all ${
              mode === "login"
                ? "border-brand-600 text-brand-700 bg-white"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            {t("navLogin")}
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 px-2 text-center border-b-2 transition-all ${
              mode === "register"
                ? "border-brand-600 text-brand-700 bg-white"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            {t("navRegister")}
          </button>
        </div>

        {/* Body content with scrolling */}
        <div className="p-6 overflow-y-auto">
          {(authError || localError) && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{localError || authError}</span>
            </div>
          )}

          {/* MODE 1: 1-CLICK DEMO LOGIN */}
          {mode === "demo" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm font-semibold text-slate-700">
                  Select a pre-configured role to immediately test SkillConnect:
                </p>
                <p className="text-xs text-slate-500">
                  Switch anytime using the top navigation bar.
                </p>
              </div>

              {/* Worker Card */}
              <div
                onClick={() => handleDemoSelect("worker")}
                className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={IMAGES.workers.rameshKumar}
                      alt="Ramesh Kumar"
                      className="w-12 h-12 rounded-xl object-cover object-center border-2 border-emerald-500 shadow-md"
                      onError={handleImageError}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">Ramesh Kumar</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-md">
                          Daily Worker
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Mason & Plasterer • 4 yrs exp • ₹800/day expected
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Employer Card */}
              <div
                onClick={() => handleDemoSelect("employer")}
                className="p-4 rounded-2xl border-2 border-brand-200 bg-blue-50/50 hover:bg-brand-50 hover:border-brand-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={IMAGES.employers.rajeshSharma}
                      alt="Sharma Infrastructure"
                      className="w-12 h-12 rounded-xl object-cover object-center border-2 border-brand-500 shadow-md"
                      onError={handleImageError}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">Sharma Infrastructure</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-brand-800 rounded-md">
                          Employer / Contractor
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Civil Contractor • Koramangala • 3 active postings
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Admin Card */}
              <div
                onClick={() => handleDemoSelect("admin")}
                className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-600/20">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">Portal Administrator</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 rounded-md">
                          Supervisor
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Manage users, safety complaints & monitor listings
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: STANDARD LOGIN */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Select Your Account Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("worker")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      role === "worker"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Worker
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("employer")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      role === "employer"
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" /> Employer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      role === "admin"
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" /> Admin
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number or Email
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. 98765 11223 or worker@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password or PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password or OTP"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Log In Securely</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-xs text-brand-600 hover:underline font-semibold"
                >
                  Don't have an account? Register now (Free)
                </button>
              </div>
            </form>
          )}

          {/* MODE 3: REGISTRATION */}
          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  I want to register as:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("worker")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      role === "worker"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Daily-Wage Worker
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("employer")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      role === "employer"
                        ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" /> Employer / Contractor
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location / Area Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={regLocality}
                    onChange={(e) => setRegLocality(e.target.value)}
                    placeholder="e.g. Koramangala 5th Block, Bengaluru"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              {role === "worker" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Expected Daily Wage (₹)
                      </label>
                      <input
                        type="number"
                        min="400"
                        max="3000"
                        step="50"
                        value={regWage}
                        onChange={(e) => setRegWage(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Years Experience
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="40"
                        value={regExp}
                        onChange={(e) => setRegExp(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Your Core Skills
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1.5 border border-slate-200 rounded-xl bg-slate-50">
                      {[
                        "Bricklaying",
                        "Cement Plastering",
                        "Wall Putty",
                        "Roller Painting",
                        "CPVC / PVC Piping",
                        "Drain Line Fitting",
                        "Wood Cutting",
                        "Hardware Fitting",
                        "Wire Pulling",
                        "Heavy Lifting",
                        "Loading & Unloading",
                        "Tree Pruning",
                        "Arc Welding",
                        "Delivery Driving"
                      ].map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                            regSelectedSkills.includes(skill)
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                              : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                          }`}
                        >
                          {skill} {regSelectedSkills.includes(skill) ? "✓" : "+"}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Firm Name
                    </label>
                    <input
                      type="text"
                      value={regCompanyName}
                      onChange={(e) => setRegCompanyName(e.target.value)}
                      placeholder="e.g. Apex Civil Contractors"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Type
                    </label>
                    <input
                      type="text"
                      value={regBusinessType}
                      onChange={(e) => setRegBusinessType(e.target.value)}
                      placeholder="e.g. Civil Contractor, Renovation"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  role === "worker"
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                    : "bg-brand-600 hover:bg-brand-700 shadow-brand-600/25"
                }`}
              >
                <span>Complete Registration & Enter</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

