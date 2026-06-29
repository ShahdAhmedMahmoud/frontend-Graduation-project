"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Video, Plus, X, ExternalLink, Clock, BookOpen, AlertCircle, CheckCircle } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

type MeetingCourse = {
  _id: string;
  code: string;
  name: string;
};

type Meeting = {
  _id: string;
  title: string;
  description: string;
  course: MeetingCourse;
  professor: string | { _id: string; name: string; email: string };
  meetingUrl: string;
  startsAt: string;
  endsAt: string;
  status: "scheduled" | "cancelled" | "completed";
  createdAt: string;
};

type Course = {
  _id: string;
  name: string;
  code: string;
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusBadge(status: string) {
  switch (status) {
    case "scheduled":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "cancelled":
      return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
    case "completed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
  }
}

// ============================================================
// CREATE MODAL
// ============================================================
function CreateMeetingModal({
  token,
  courses,
  onClose,
  onCreated,
}: {
  token: string;
  courses: Course[];
  onClose: () => void;
  onCreated: (meeting: Meeting) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    courseId: "",
    startsAt: "",
    endsAt: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  async function handleSubmit() {
    if (!form.title || !form.courseId || !form.startsAt || !form.endsAt) {
      setErr("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE_URL}/meetings/professor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          courseId: form.courseId,
          startsAt: new Date(form.startsAt).toISOString(),
          endsAt: new Date(form.endsAt).toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to create meeting");
      onCreated(data.data);
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Video size={18} className="text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">New Meeting</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Chapter 3 Online Lecture"
              className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="What will this session cover?"
              rows={3}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Course *</label>
            <select
              value={form.courseId}
              onChange={(e) => setForm((p) => ({ ...p, courseId: e.target.value }))}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            >
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>{c.code} – {c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Starts At *</label>
              <input
                type="datetime-local"
                value={form.startsAt}
                onChange={(e) => setForm((p) => ({ ...p, startsAt: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Ends At *</label>
              <input
                type="datetime-local"
                value={form.endsAt}
                onChange={(e) => setForm((p) => ({ ...p, endsAt: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
              />
            </div>
          </div>

          {err && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400">
              <AlertCircle size={14} />
              {err}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 dark:bg-blue-700 text-white text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Video size={14} />
            )}
            {saving ? "Creating..." : "Create Meeting"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MEETING CARD
// ============================================================
function MeetingCard({
  meeting,
  onCancel,
}: {
  meeting: Meeting;
  onCancel: (id: string) => void;
}) {
  const [cancelling, setCancelling] = useState(false);

  async function handleCancel() {
    setCancelling(true);
    await onCancel(meeting._id);
    setCancelling(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
            <Video size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{meeting.title}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <BookOpen size={11} className="text-gray-400" />
              <span className="text-xs text-gray-400 dark:text-gray-500">{meeting.course?.code} – {meeting.course?.name}</span>
            </div>
          </div>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadge(meeting.status)}`}>
          {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
        </span>
      </div>

      {meeting.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{meeting.description}</p>
      )}

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock size={12} className="shrink-0" />
          <span>Starts: {formatDateTime(meeting.startsAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock size={12} className="shrink-0" />
          <span>Ends: {formatDateTime(meeting.endsAt)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {meeting.status === "scheduled" && (
          <>
            <a
              href={meeting.meetingUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600 dark:bg-blue-700 text-white text-xs font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              <ExternalLink size={12} />
              Join Meeting
            </a>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition disabled:opacity-60"
            >
              {cancelling ? (
                <span className="w-3 h-3 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <X size={12} />
              )}
              {cancelling ? "Cancelling..." : "Cancel"}
            </button>
          </>
        )}
        {meeting.status === "cancelled" && (
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-xs font-medium">
            <X size={12} />
            Meeting Cancelled
          </div>
        )}
        {meeting.status === "completed" && (
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium">
            <CheckCircle size={12} />
            Completed
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function MeetingsPage() {
  const { data: session } = useSession();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState<"all" | "scheduled" | "cancelled" | "completed">("all");

  const fetchMeetings = useCallback(async () => {
    if (!session?.token) return;
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/meetings/professor`, {
        headers: { Authorization: `Bearer ${session.token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to load meetings");
      setMeetings(data.data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  const fetchCourses = useCallback(async () => {
    if (!session?.token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/professors/courses`, {
        headers: { Authorization: `Bearer ${session.token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const unique = Array.from(
          new Map((data.data || []).map((c: Course) => [c._id, c])).values()
        ) as Course[];
        setCourses(unique);
      }
    } catch (e) {
      console.error("Failed to fetch courses:", e);
    }
  }, [session?.token]);

  useEffect(() => {
    if (session?.token) {
      fetchMeetings();
      fetchCourses();
    }
  }, [session?.token, fetchMeetings, fetchCourses]);

  async function handleCancel(meetingId: string) {
    if (!session?.token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/meetings/professor/${meetingId}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${session.token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to cancel");
      setMeetings((prev) =>
        prev.map((m) => (m._id === meetingId ? { ...m, status: "cancelled" } : m))
      );
      setSuccessMsg("Meeting cancelled successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to cancel meeting");
    }
  }

  function handleCreated(meeting: Meeting) {
    setMeetings((prev) => [meeting, ...prev]);
    setSuccessMsg("Meeting created successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  const filtered = filter === "all" ? meetings : meetings.filter((m) => m.status === filter);

  const counts = {
    all: meetings.length,
    scheduled: meetings.filter((m) => m.status === "scheduled").length,
    cancelled: meetings.filter((m) => m.status === "cancelled").length,
    completed: meetings.filter((m) => m.status === "completed").length,
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Online Meetings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create and manage virtual sessions for your students.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 dark:bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          <Plus size={16} />
          New Meeting
        </button>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          <CheckCircle size={15} />
          {successMsg}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "scheduled", "cancelled", "completed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === tab
                ? "bg-blue-600 dark:bg-blue-700 text-white"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="ml-1.5 text-xs opacity-70">({counts[tab]})</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-20 text-center">
          <Video size={32} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {filter === "all" ? "No meetings yet. Create your first one!" : `No ${filter} meetings.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((meeting) => (
            <MeetingCard key={meeting._id} meeting={meeting} onCancel={handleCancel} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && session?.token && (
        <CreateMeetingModal
          token={session.token}
          courses={courses}
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}