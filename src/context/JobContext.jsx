import React, { createContext, useContext, useState, useEffect } from "react";
import { localStorageRepo } from "../services/firebase";
import { initialJobs, sampleApplications, sampleReports } from "../services/sampleData";
import { IMAGES } from "../services/images";
import { useAuth } from "./AuthContext";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // 1. Jobs State
  const [jobs, setJobs] = useState(() => {
    return localStorageRepo.get(localStorageRepo.keys.JOBS, initialJobs);
  });

  // 2. Applications State
  const [applications, setApplications] = useState(() => {
    return localStorageRepo.get(localStorageRepo.keys.APPLICATIONS, sampleApplications);
  });

  // 3. Saved Jobs State (Array of job IDs)
  const [savedJobIds, setSavedJobIds] = useState(() => {
    return localStorageRepo.get(localStorageRepo.keys.SAVED_JOBS, ["job-sample-101"]);
  });

  // 4. Notifications State
  const [notifications, setNotifications] = useState(() => {
    return localStorageRepo.get(localStorageRepo.keys.NOTIFICATIONS, [
      {
        id: "notif-1",
        userId: "worker-demo-1",
        title: "Application Shortlisted!",
        message: "Sharma Infrastructure shortlisted your application for Mason & Bricklayer. Site briefing tomorrow 8:30 AM.",
        type: "success",
        read: false,
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: "notif-2",
        userId: "worker-demo-1",
        title: "New Job Match (95%)",
        message: "A new Painting & Whitewash job was posted 3.8 km away in Indiranagar matching your skills.",
        type: "info",
        read: true,
        timestamp: new Date(Date.now() - 3600000 * 20).toISOString()
      }
    ]);
  });

  // 5. Safety Reports State
  const [reports, setReports] = useState(() => {
    return localStorageRepo.get(localStorageRepo.keys.REPORTS, sampleReports);
  });

  // Persist to storage on change
  useEffect(() => {
    localStorageRepo.set(localStorageRepo.keys.JOBS, jobs);
  }, [jobs]);

  useEffect(() => {
    localStorageRepo.set(localStorageRepo.keys.APPLICATIONS, applications);
  }, [applications]);

  useEffect(() => {
    localStorageRepo.set(localStorageRepo.keys.SAVED_JOBS, savedJobIds);
  }, [savedJobIds]);

  useEffect(() => {
    localStorageRepo.set(localStorageRepo.keys.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    localStorageRepo.set(localStorageRepo.keys.REPORTS, reports);
  }, [reports]);

  // Skill-based matching algorithm
  const calculateMatchScore = (workerSkills = [], requiredSkills = []) => {
    if (!workerSkills.length || !requiredSkills.length) return 65; // baseline interest match
    
    const workerSkillsLower = workerSkills.map((s) => s.toLowerCase());
    let matchCount = 0;
    
    requiredSkills.forEach((req) => {
      const isMatched = workerSkillsLower.some(
        (ws) => ws.includes(req.toLowerCase()) || req.toLowerCase().includes(ws)
      );
      if (isMatched) matchCount++;
    });

    const ratio = matchCount / requiredSkills.length;
    // Scale between 60% and 98%
    const score = Math.round(60 + ratio * 38);
    return Math.min(score, 98);
  };

  // Add Notification Helper
  const addNotification = (userId, title, message, type = "info") => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      title,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Employer: Post New Job
  const createJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      isSample: false, // Real posting
      imageUrl: jobData.imageUrl || IMAGES.categories[jobData.category] || IMAGES.jobs.masonryVilla,
      employerId: currentUser?.id || "emp-anon",
      employerName: currentUser?.companyName || currentUser?.name || "Verified Contractor",
      employerContact: currentUser?.phone || "+91 98000 00000",
      isEmployerVerified: currentUser?.isVerified || true,
      workersApplied: 0,
      status: "active",
      isFlagged: false,
      distanceKm: (Math.random() * 4 + 1.2).toFixed(1), // Proximity estimation
      createdAt: new Date().toISOString()
    };

    setJobs((prev) => [newJob, ...prev]);
    addNotification(
      currentUser?.id,
      "Job Published Successfully",
      `Your listing "${newJob.title}" is now active and visible to local workers.`,
      "success"
    );
    return newJob;
  };

  // Update Job
  const updateJob = (jobId, updatedFields) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, ...updatedFields } : j))
    );
  };

  // Delete Job
  const deleteJob = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  // Close / Reopen Job
  const toggleJobStatus = (jobId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: j.status === "active" ? "closed" : "active" }
          : j
      )
    );
  };

  // Worker: Apply for Job
  const applyForJob = (jobId, workerNote = "") => {
    if (!currentUser) return { success: false, error: "Please log in to apply." };

    const job = jobs.find((j) => j.id === jobId);
    if (!job) return { success: false, error: "Job listing not found." };

    // Check if already applied
    const alreadyApplied = applications.some(
      (app) => app.jobId === jobId && app.workerId === currentUser.id
    );
    if (alreadyApplied) {
      return { success: false, error: "You have already applied for this job." };
    }

    const matchScore = calculateMatchScore(currentUser.skills, job.requiredSkills);

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      employerId: job.employerId,
      employerName: job.employerName,
      workerId: currentUser.id,
      workerName: currentUser.name,
      workerPhone: currentUser.phone,
      workerAvatar: currentUser.avatar || IMAGES.workers.rameshKumar,
      workerSkills: currentUser.skills || [],
      dailyWage: job.dailyWage,
      status: "applied", // applied -> under_review -> shortlisted -> accepted -> rejected
      appliedAt: new Date().toISOString(),
      matchScore,
      workerNote: workerNote.trim() || `Available for ${job.jobType}. Experienced in relevant tasks.`,
      employerNote: ""
    };

    setApplications((prev) => [newApp, ...prev]);

    // Increment applied count on job
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, workersApplied: (j.workersApplied || 0) + 1 } : j))
    );

    // Notify worker
    addNotification(
      currentUser.id,
      "Application Sent!",
      `Your application for "${job.title}" has been submitted to ${job.employerName}.`,
      "info"
    );

    // Notify employer
    addNotification(
      job.employerId,
      "New Worker Application Received",
      `${currentUser.name} applied for "${job.title}" (${matchScore}% Skill Match).`,
      "info"
    );

    return { success: true, application: newApp };
  };

  // Employer: Update Application Status
  const updateApplicationStatus = (appId, newStatus, employerNote = "") => {
    let targetApp = null;
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          targetApp = { ...a, status: newStatus, employerNote };
          return targetApp;
        }
        return a;
      })
    );

    if (targetApp) {
      const statusLabels = {
        under_review: "is now Under Review",
        shortlisted: "has been Shortlisted!",
        accepted: "was Accepted! You are Hired for this gig.",
        rejected: "was not selected this time."
      };
      
      const notifType = newStatus === "accepted" ? "success" : newStatus === "rejected" ? "error" : "info";

      addNotification(
        targetApp.workerId,
        `Application Update: ${newStatus.toUpperCase()}`,
        `Your application for "${targetApp.jobTitle}" ${statusLabels[newStatus] || "has been updated."} ${employerNote ? `Note: "${employerNote}"` : ""}`,
        notifType
      );
    }
  };

  // Toggle Save Job
  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  // Submit Safety / Fraud Report
  const submitReport = (reportData) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      jobId: reportData.jobId,
      jobTitle: reportData.jobTitle,
      reportedEmployer: reportData.reportedEmployer,
      reporterName: currentUser?.name || "Anonymous Worker",
      reporterRole: currentUser?.role || "worker",
      reason: reportData.reason,
      description: reportData.description,
      severity: reportData.severity || "Medium",
      status: "under_review",
      reportedAt: new Date().toISOString()
    };

    setReports((prev) => [newReport, ...prev]);

    // If severe, automatically add warning flag to job
    if (reportData.severity === "High" && reportData.jobId) {
      setJobs((prev) =>
        prev.map((j) => (j.id === reportData.jobId ? { ...j, isFlagged: true } : j))
      );
    }

    return newReport;
  };

  // Admin: Action on report
  const handleAdminReportAction = (reportId, action, jobId) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action } : r))
    );

    if (action === "resolved_removed" && jobId) {
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } else if (action === "dismissed" && jobId) {
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, isFlagged: false } : j))
      );
    }
  };

  // Reset / Clear Data
  const resetToSampleData = () => {
    setJobs(initialJobs);
    setApplications(sampleApplications);
    setReports(sampleReports);
    localStorageRepo.set(localStorageRepo.keys.JOBS, initialJobs);
    localStorageRepo.set(localStorageRepo.keys.APPLICATIONS, sampleApplications);
    localStorageRepo.set(localStorageRepo.keys.REPORTS, sampleReports);
  };

  const clearAllData = () => {
    setJobs([]);
    setApplications([]);
    setReports([]);
    localStorageRepo.set(localStorageRepo.keys.JOBS, []);
    localStorageRepo.set(localStorageRepo.keys.APPLICATIONS, []);
    localStorageRepo.set(localStorageRepo.keys.REPORTS, []);
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    if (!currentUser) return;
    setNotifications((prev) => prev.filter((n) => n.userId !== currentUser.id));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        savedJobIds,
        notifications,
        reports,
        calculateMatchScore,
        createJob,
        updateJob,
        deleteJob,
        toggleJobStatus,
        applyForJob,
        updateApplicationStatus,
        toggleSaveJob,
        isJobSaved,
        submitReport,
        handleAdminReportAction,
        resetToSampleData,
        clearAllData,
        markNotificationAsRead,
        clearAllNotifications
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);

