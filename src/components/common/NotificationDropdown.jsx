import React from "react";
import { Bell, CheckCheck, Trash2, X, Clock, ExternalLink } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import { useAuth } from "../../context/AuthContext";

export const NotificationDropdown = ({ isOpen, onClose, onViewApplications }) => {
  const { currentUser } = useAuth();
  const { 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications 
  } = useJobs();

  if (!isOpen) return null;

  const userNotifications = notifications.filter(
    (n) => !currentUser || n.userId === currentUser.id
  );

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-600" />
          <h4 className="font-bold text-sm text-slate-800">Notifications</h4>
          <span className="px-1.5 py-0.5 text-xs font-semibold bg-brand-100 text-brand-700 rounded-full">
            {userNotifications.filter((n) => !n.read).length} new
          </span>
        </div>
        <div className="flex items-center gap-1">
          {userNotifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-xs text-slate-500 hover:text-rose-600 p-1 rounded transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {userNotifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-xs font-medium">No notifications right now</p>
          </div>
        ) : (
          userNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (onViewApplications) {
                  onViewApplications();
                  onClose();
                }
              }}
              className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                !n.read ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-slate-800">{n.title}</p>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  {new Date(n.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {userNotifications.length > 0 && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              userNotifications.forEach((n) => markNotificationAsRead(n.id));
            }}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1.5 mx-auto"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

