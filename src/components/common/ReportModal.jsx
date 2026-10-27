import React, { useState } from "react";
import { AlertTriangle, X, ShieldAlert, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useJobs } from "../../context/JobContext";

export const ReportModal = ({ isOpen, onClose, job }) => {
  const { t } = useLanguage();
  const { submitReport } = useJobs();

  const [reason, setReason] = useState("Advance Fee Demanded");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReport({
      jobId: job.id,
      jobTitle: job.title,
      reportedEmployer: job.employerName,
      reason,
      description,
      severity: reason === "Advance Fee Demanded" || reason === "Physical / Verbal Harassment" ? "High" : "Medium"
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-rose-50 border-b border-rose-100">
          <div className="flex items-center gap-2.5 text-rose-700">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base text-rose-900">{t("reportModalTitle")}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 mx-auto mb-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Report Submitted Successfully</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                {t("reportSuccess")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reporting Job:</p>
                <p className="text-sm font-bold text-slate-800 line-clamp-1">{job.title}</p>
                <p className="text-xs text-slate-500">Employer: {job.employerName}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Reason for Reporting <span className="text-rose-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  required
                >
                  <option value="Advance Fee Demanded">Advance Registration Fee Demanded (Fraud Alert)</option>
                  <option value="Fake Job or Incorrect Address">Fake Job Listing / Incorrect Address</option>
                  <option value="Unpaid Wages / Wage Fraud">Refusal to pay agreed daily wage</option>
                  <option value="Unsafe Working Conditions">Hazardous or Unsafe Working Environment</option>
                  <option value="Harassment or Abuse">Verbal or Physical Harassment</option>
                  <option value="Misleading Job Details">Job tasks completely different from posting</option>
                  <option value="Other Policy Violation">Other Safety Concern</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Provide Specific Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("reportReasonPlaceholder")}
                  rows={4}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none resize-none"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Your identity is kept completely private. The employer will not be notified of who reported them.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {t("reportSubmit")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

