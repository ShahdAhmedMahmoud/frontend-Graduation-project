
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Announcements from "../_component/Announcements/Announcements";
import Timetable from "../_component/Timetable/Timetable";
import UpcomingEvents from "../_component/UpcomingEvents/UpcomingEvents";

const quickActions = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="white" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    label: "Grades",
    href: "/dashboard/grades",
    iconBg: "bg-blue-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#1d4ed8" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    label: "Attendance",
    href: "/dashboard/attendance",
    iconBg: "bg-blue-50 dark:bg-blue-900",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#1d4ed8" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    label: "Tuition Fees",
    href: "/dashboard/fees",
    iconBg: "bg-blue-50 dark:bg-blue-900",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" strokeWidth={1.8}>
        <circle cx="5" cy="5" r="1.2" fill="#1d4ed8" />
        <circle cx="12" cy="5" r="1.2" fill="#1d4ed8" />
        <circle cx="19" cy="5" r="1.2" fill="#1d4ed8" />
        <circle cx="5" cy="12" r="1.2" fill="#1d4ed8" />
        <circle cx="12" cy="12" r="1.2" fill="#1d4ed8" />
        <circle cx="19" cy="12" r="1.2" fill="#1d4ed8" />
        <circle cx="5" cy="19" r="1.2" fill="#1d4ed8" />
        <circle cx="12" cy="19" r="1.2" fill="#1d4ed8" />
        <path stroke="#1d4ed8" strokeLinecap="round" strokeLinejoin="round" d="M17 17l2 2 4-4" />
      </svg>
    ),
    label: "Registration",
    href: "/dashboard/courses",
    iconBg: "bg-blue-50 dark:bg-blue-900",
  },
];

type AttendanceSummaryCourse = {
  courseId: string;
  courseName: string;
  present: number;
  absent: number;
  percentage: string | number;
  totalLectures: number;
};

function AttendanceDonut({ present }: { present: number }) {
  const size = 140;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const presentOffset = circumference - (present / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#9ca3af"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={presentOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">{present}%</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [avgAttendance, setAvgAttendance] = useState<number>(0);
  const [loadingAttendance, setLoadingAttendance] = useState(true);

  useEffect(() => {
    async function fetchAttendance() {
      if (!session?.token) {
        setLoadingAttendance(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/attendance/me/summary", {
          headers: { Authorization: `Bearer ${session.token}` },
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch attendance summary");
        }

        const courses: AttendanceSummaryCourse[] = Array.isArray(data.courses) ? data.courses : [];

        if (courses.length === 0) {
          setAvgAttendance(0);
          return;
        }

        const total = courses.reduce(
          (sum, course) => sum + Number(course.percentage || 0),
          0
        );
        const avg = Math.round(total / courses.length);
        setAvgAttendance(avg);
      } catch (err) {
        console.error("Attendance fetch error:", err);
        setAvgAttendance(0);
      } finally {
        setLoadingAttendance(false);
      }
    }

    fetchAttendance();
  }, [session?.token]);

  const handleNavigation = (href: string) => {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Quick Actions */}
        <div className="w-full lg:w-3/4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleNavigation(action.href)}
                className="flex flex-col items-center justify-center gap-3 py-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${action.iconBg} flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200`}
                >
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
          <h2 className="text-base font-bold text-gray-800 dark:text-white mb-3">Attendance</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Absent</span>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 py-2">
            {loadingAttendance ? (
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <AttendanceDonut present={avgAttendance} />
            )}
          </div>
        </div>

      </div>

      <Announcements />
      <Timetable />
      <UpcomingEvents />
    </div>
  );
}