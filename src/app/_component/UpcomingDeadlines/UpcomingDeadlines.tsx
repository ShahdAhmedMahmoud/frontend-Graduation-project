"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Clock } from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Deadline {
  _id: string;
  title: string;
  courseCode: string;
  courseName: string;
  type: string;
  deadline: string;
  daysLeft: number;
}

// ============================================================
// SKELETON
// ============================================================
function DeadlineSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between animate-pulse">
          <div className="space-y-1.5 flex-1">
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-2 bg-gray-100 rounded w-1/3" />
          </div>
          <div className="h-5 w-16 bg-gray-100 rounded-full ml-3" />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// BADGE COLOR based on type
// ============================================================
function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    Assignment: "bg-blue-100 text-blue-600",
    Quiz:       "bg-purple-100 text-purple-600",
    Project:    "bg-green-100 text-green-600",
    Exam:       "bg-red-100 text-red-600",
  };
  const style = styles[type] || "bg-gray-100 text-gray-600";

  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${style}`}>
      {type}
    </span>
  );
}

// ============================================================
// DAYS LEFT COLOR
// ============================================================
function daysColor(days: number) {
  if (days <= 3) return "text-red-500";
  if (days <= 7) return "text-orange-400";
  return "text-gray-400";
}

// ============================================================
// COMPONENT
// ============================================================
export default function UpcomingDeadlines() {
  const { data: session } = useSession();
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    async function fetchDeadlines() {
      if (!session?.token) {
        setLoading(false);
        return;
      }

      // ✅ reset state كل مرة
      setLoading(true);
      setDeadlines([]);
      setError(false);

      try {
        const res = await fetch(
          `http://localhost:5000/api/students/deadlines?t=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${session.token}` },
            cache: "no-store",
          }
        );

        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Failed");
        setDeadlines(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Deadlines fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDeadlines();
  }, [session?.token]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Clock size={15} className="text-gray-400" />
        <h2 className="text-sm font-bold text-gray-800">Upcoming Deadlines</h2>
      </div>

      {/* Content */}
      {loading ? (
        <DeadlineSkeleton />
      ) : error ? (
        <p className="text-xs text-red-400 text-center py-6">
          Failed to load deadlines.
        </p>
      ) : deadlines.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-6">
          No upcoming deadlines 🎉
        </p>
      ) : (
        <div className="space-y-3">
          {deadlines.map((d) => (
            <div
              key={d._id}
              className="flex items-center justify-between gap-2 py-2 border-b border-gray-50 last:border-0"
            >
              {/* Left — title + course */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">
                  {d.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-400">{d.courseCode}</span>
                  <span className={`text-[10px] font-medium ${daysColor(d.daysLeft)}`}>
                    {d.daysLeft === 0
                      ? "Due today!"
                      : d.daysLeft === 1
                      ? "-1 day"
                      : `-${d.daysLeft} days`}
                  </span>
                </div>
              </div>

              {/* Right — badge */}
              <TypeBadge type={d.type} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
