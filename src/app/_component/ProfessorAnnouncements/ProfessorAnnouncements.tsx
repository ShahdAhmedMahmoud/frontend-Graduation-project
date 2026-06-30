"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bell, BookOpen, CheckCircle, AlertCircle, Archive, Loader2, ExternalLink, Calendar } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

type Announcement = {
  _id: string;
  title: string;
  content: string;
  type: "meeting" | "general" | "assignment" | "grades";
  course: { _id: string; name: string; code: string };
  posted_by: { _id: string; name: string; email: string };
  meeting?: { _id: string; title: string; startsAt: string; endsAt: string; meetingUrl: string };
  created_at: string;
  status: string;
};

const typeBadge: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  assignment: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  grades: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  general: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300",
};

const typeIcon: Record<string, React.ReactNode> = {
  meeting: <Bell className="w-3.5 h-3.5" />,
  assignment: <BookOpen className="w-3.5 h-3.5" />,
  grades: <CheckCircle className="w-3.5 h-3.5" />,
  general: <AlertCircle className="w-3.5 h-3.5" />,
};

function formatRelativeTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function ProfessorAnnouncements() {
  const { data: session } = useSession();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [archiving, setArchiving] = useState<string | null>(null);

  const authHeaders = {
    Authorization: `Bearer ${session?.token}`,
    "Content-Type": "application/json",
  };

  const fetchAnnouncements = async () => {
    if (!session?.token) { setLoading(false); return; }
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/announcements/professor`, {
        headers: authHeaders,
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to load");
      setAnnouncements(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnnouncements(); }, [session?.token]);

  const handleArchive = async (id: string) => {
    setArchiving(id);
    try {
      await fetch(`${API_BASE_URL}/announcements/professor/${id}/archive`, {
        method: "PATCH",
        headers: authHeaders,
      });
      fetchAnnouncements();
    } catch { /* silent */ }
    finally { setArchiving(null); }
  };

  const display = announcements.slice(0, 6);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Announcements</h2>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-3 h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : display.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          No announcements yet.
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {display.map((item) => {
            const badgeClass = typeBadge[item.type] || "bg-gray-100 text-gray-600";
            const icon = typeIcon[item.type] || typeIcon.general;

            return (
              <div key={item._id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      {item.title || "Announcement"}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
                      {icon}
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    {item.status === "archived" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                        archived
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatRelativeTime(item.created_at)}
                    </span>
                    {item.status !== "archived" && (
                      <button
                        onClick={() => handleArchive(item._id)}
                        disabled={archiving === item._id}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
                      >
                        {archiving === item._id ? <Loader2 size={11} className="animate-spin" /> : <Archive size={11} />}
                        Archive
                      </button>
                    )}
                  </div>
                </div>

                <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded mb-2">
                  {item.course.code} - {item.course.name}
                </span>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  {item.content || "No message provided."}
                </p>

                {item.meeting && (
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell size={14} className="text-blue-500" />
                      <h4 className="text-xs font-semibold text-gray-900 dark:text-white">{item.meeting.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-2">
                      <Calendar size={12} />
                      <span>{formatDateTime(item.meeting.startsAt)}</span>
                    </div>
                    <a
                      href={item.meeting.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      Join Meeting <ExternalLink size={11} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}