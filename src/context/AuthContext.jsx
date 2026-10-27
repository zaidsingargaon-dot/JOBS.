import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  isFirebaseConfigured, 
  auth, 
  db, 
  localStorageRepo 
} from "../services/firebase";
import { sampleWorkers, sampleEmployers } from "../services/sampleData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check persisted session
    return localStorageRepo.get(localStorageRepo.keys.CURRENT_USER, sampleWorkers[0]);
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Sync session changes
  useEffect(() => {
    if (currentUser) {
      localStorageRepo.set(localStorageRepo.keys.CURRENT_USER, currentUser);
    } else {
      localStorage.removeItem(localStorageRepo.keys.CURRENT_USER);
    }
  }, [currentUser]);

  // Quick 1-Click Demo Logins for instant review & pair programming
  const loginAsDemo = (role = "worker") => {
    setLoading(true);
    setAuthError(null);
    try {
      if (role === "worker") {
        const demoWorker = sampleWorkers[0];
        setCurrentUser(demoWorker);
      } else if (role === "employer") {
        const demoEmployer = sampleEmployers[0];
        setCurrentUser(demoEmployer);
      } else if (role === "admin") {
        const demoAdmin = {
          id: "admin-master-1",
          name: "SkillConnect Admin Supervisor",
          email: "admin@skillconnect-portal.org",
          phone: "+91 80 2345 6789",
          role: "admin",
          isVerified: true
        };
        setCurrentUser(demoAdmin);
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Register worker or employer
  const registerUser = async (formData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const newUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email || `${formData.phone.replace(/[^0-9]/g, "")}@skillconnect.org`,
        phone: formData.phone,
        role: formData.role, // 'worker' or 'employer'
        locality: formData.locality || "Bengaluru Central",
        skills: formData.skills || [],
        experienceYears: Number(formData.experienceYears) || 0,
        expectedDailyWage: Number(formData.expectedDailyWage) || 700,
        companyName: formData.companyName || "",
        businessType: formData.businessType || "",
        bio: formData.bio || "",
        rating: 5.0,
        completedJobsCount: 0,
        isVerified: false,
        createdAt: new Date().toISOString()
      };

      // Save to registered users list
      const existingUsers = localStorageRepo.get(localStorageRepo.keys.USERS, []);
      localStorageRepo.set(localStorageRepo.keys.USERS, [...existingUsers, newUser]);

      // Set active session
      setCurrentUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Login with Email or Phone
  const loginUser = async (identifier, password, role) => {
    setLoading(true);
    setAuthError(null);
    try {
      // Look up registered users or match demo credentials
      const registeredUsers = localStorageRepo.get(localStorageRepo.keys.USERS, []);
      const matched = registeredUsers.find(
        (u) => (u.email === identifier || u.phone === identifier) && (role ? u.role === role : true)
      );

      if (matched) {
        setCurrentUser(matched);
        return { success: true, user: matched };
      }

      // If not in registered, fallback to demo preset matching
      if (role === "employer") {
        const emp = {
          ...sampleEmployers[0],
          phone: identifier.includes("@") ? "+91 98450 12345" : identifier
        };
        setCurrentUser(emp);
        return { success: true, user: emp };
      } else if (role === "admin") {
        loginAsDemo("admin");
        return { success: true };
      } else {
        const wrk = {
          ...sampleWorkers[0],
          name: identifier.includes("@") ? identifier.split("@")[0] : "Local Worker",
          phone: identifier
        };
        setCurrentUser(wrk);
        return { success: true, user: wrk };
      }
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);

    // Also update in registered users repository
    const users = localStorageRepo.get(localStorageRepo.keys.USERS, []);
    const index = users.findIndex((u) => u.id === currentUser.id);
    if (index >= 0) {
      users[index] = updated;
      localStorageRepo.set(localStorageRepo.keys.USERS, users);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(localStorageRepo.keys.CURRENT_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        authError,
        isFirebaseConfigured,
        loginAsDemo,
        registerUser,
        loginUser,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

