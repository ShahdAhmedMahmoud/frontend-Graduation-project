"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// ============================================================
// TYPES (نفس اللي في Timetable.tsx)
// ============================================================
export interface ScheduleItem {
  id: string;
  course_name: string;
  course_code: string;
  instructor: string;
  room: string;
  day: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday";
  start_time: string;
  end_time: string;
}

// ============================================================
// COLORS
// ============================================================
const COURSE_COLORS = [
  { bg: "bg-blue-500",   text: "text-white", light: "bg-blue-50 dark:bg-blue-900/30",   lightText: "text-blue-700 dark:text-blue-300",   dot: "bg-blue-500"   },
  { bg: "bg-green-500",  text: "text-white", light: "bg-green-50 dark:bg-green-900/30",  lightText: "text-green-700 dark:text-green-300",  dot: "bg-green-500"  },
  { bg: "bg-red-500",    text: "text-white", light: "bg-red-50 dark:bg-red-900/30",    lightText: "text-red-700 dark:text-red-300",    dot: "bg-red-500"    },
  { bg: "bg-yellow-500", text: "text-white", light: "bg-yellow-50 dark:bg-yellow-900/30", lightText: "text-yellow-700 dark:text-yellow-300", dot: "bg-yellow-500" },
  { bg: "bg-purple-500", text: "text-white", light: "bg-purple-50 dark:bg-purple-900/30", lightText: "text-purple-700 dark:text-purple-300", dot: "bg-purple-500" },
  { bg: "bg-pink-500",   text: "text-white", light: "bg-pink-50 dark:bg-pink-900/30",   lightText: "text-pink-700 dark:text-pink-300",   dot: "bg-pink-500"   },
  { bg: "bg-indigo-500", text: "text-white", light: "bg-indigo-50 dark:bg-indigo-900/30", lightText: "text-indigo-700 dark:text-indigo-300", dot: "bg-indigo-500" },
  { bg: "bg-teal-500",   text: "text-white", light: "bg-teal-50 dark:bg-teal-900/30",   lightText: "text-teal-700 dark:text-teal-300",   dot: "bg-teal-500"   },
  { bg: "bg-orange-500", text: "text-white", light: "bg-orange-50 dark:bg-orange-900/30", lightText: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500" },
  { bg: "bg-cyan-500",   text: "text-white", light: "bg-cyan-50 dark:bg-cyan-900/30",   lightText: "text-cyan-700 dark:text-cyan-300",   dot: "bg-cyan-500"   },
];

function getCourseColor(courseName: string) {
  let hash = 0;
  for (let i = 0; i < courseName.length; i++) {
    hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COURSE_COLORS[Math.abs(hash) % COURSE_COLORS.length];
}

// ============================================================
// HELPERS
// ============================================================
const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"] as const;
const NUM_DAYS = DAYS.length;
const START_HOUR = 8;
const END_HOUR = 18;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const SLOT_HEIGHT = 60;

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:00 ${suffix}`;
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}:${m.toString().padStart(2, "0")} ${suffix}`;
}

function getTopOffset(startTime: string) {
  const minutes = timeToMinutes(startTime) - START_HOUR * 60;
  return (minutes / 60) * SLOT_HEIGHT;
}

function getHeight(startTime: string, endTime: string) {
  const diff = timeToMinutes(endTime) - timeToMinutes(startTime);
  return (diff / 60) * SLOT_HEIGHT;
}

function getTodayName() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
}

// ============================================================
// MOBILE
// ============================================================
function MobileView({ schedule }: { schedule: ScheduleItem[] }) {
  const today = getTodayName();
  const todayIndex = DAYS.findIndex((d) => d === today);
  const initialDay = todayIndex !== -1 ? DAYS[todayIndex] : DAYS[0];
  const [selectedDay, setSelectedDay] = useState<(typeof DAYS)[number]>(initialDay);

  const filtered = schedule
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time));

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
        {DAYS.map((day) => {
          const isToday = day === today;
          const isSelected = day === selectedDay;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                isSelected
                  ? "bg-blue-500 text-white shadow-sm"
                  : isToday
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {day.slice(0, 3)}
              {isToday && (
                <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-current inline-block align-middle" />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-4 pt-3 pb-4 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">مفيش محاضرات اليوم ده 🎉</div>
        ) : (
          filtered.map((item) => {
            const color = getCourseColor(item.course_name);
            return (
              <div key={String(item.id)} className={`flex items-stretch gap-3 rounded-xl p-3.5 ${color.light}`}>
                <div className={`w-1 rounded-full ${color.dot} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${color.lightText}`}>{item.course_name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.course_code}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.room || "TBA"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatTime(item.start_time)} – {formatTime(item.end_time)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ============================================================
// DESKTOP
// ============================================================
function DesktopView({ schedule }: { schedule: ScheduleItem[] }) {
  const today = getTodayName();
  const hours = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div
          className="grid border-b border-gray-100 dark:border-gray-700"
          style={{ gridTemplateColumns: `64px repeat(${NUM_DAYS}, 1fr)` }}
        >
          <div className="h-12" />
          {DAYS.map((day) => (
            <div
              key={day}
              className={`h-12 flex flex-col items-center justify-center border-l border-gray-100 dark:border-gray-700 ${
                today === day ? "bg-blue-50 dark:bg-blue-900/20" : ""
              }`}
            >
              <span className={`text-xs font-semibold ${today === day ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
                {day.slice(0, 3).toUpperCase()}
              </span>
              {today === day && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-0.5" />}
            </div>
          ))}
        </div>

        <div className="relative flex" style={{ height: `${TOTAL_HOURS * SLOT_HEIGHT}px` }}>
          <div className="w-16 shrink-0 relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="absolute right-3 text-xs text-gray-400 dark:text-gray-500"
                style={{ top: `${(hour - START_HOUR) * SLOT_HEIGHT - 8}px` }}
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>

          <div className="flex-1 grid relative" style={{ gridTemplateColumns: `repeat(${NUM_DAYS}, 1fr)` }}>
            {hours.map((hour) => (
              <div
                key={hour}
                className="absolute left-0 right-0 border-t border-gray-100 dark:border-gray-700"
                style={{ top: `${(hour - START_HOUR) * SLOT_HEIGHT}px` }}
              />
            ))}

            {DAYS.map((day) => (
              <div
                key={day}
                className={`border-l border-gray-100 dark:border-gray-700 h-full ${today === day ? "bg-blue-50/30 dark:bg-blue-900/10" : ""}`}
              />
            ))}

            {schedule.map((item) => {
              const colIndex = DAYS.indexOf(item.day);
              if (colIndex === -1) return null;
              const color = getCourseColor(item.course_name);
              const top = getTopOffset(item.start_time);
              const height = getHeight(item.start_time, item.end_time);

              return (
                <div
                  key={String(item.id)}
                  className={`absolute rounded-xl px-2.5 py-2 ${color.bg} ${color.text} overflow-hidden cursor-pointer hover:opacity-90 hover:shadow-md transition-all duration-150`}
                  style={{
                    top: `${top + 2}px`,
                    height: `${height - 4}px`,
                    left: `calc(${colIndex} * (100% / ${NUM_DAYS}) + 4px)`,
                    width: `calc(100% / ${NUM_DAYS} - 8px)`,
                  }}
                >
                  <p className="text-xs font-bold leading-tight truncate">{item.course_name}</p>
                  <p className="text-xs opacity-80 truncate mt-0.5">{item.course_code}</p>
                  {height > 50 && (
                    <>
                      <div className="flex items-center gap-1 mt-1.5 opacity-75">
                        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs truncate">{item.room || "TBA"}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 opacity-75">
                        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs">{formatTime(item.start_time)} – {formatTime(item.end_time)}</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SKELETON
// ============================================================
function TimetableSkeleton() {
  return (
    <div className="p-6 space-y-3 animate-pulse">
      <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/3" />
      <div className="grid grid-cols-6 gap-2 mt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN — بيفرق عن نسخة الطالب في الـ endpoint بس
// ============================================================
export default function ProfessorTimetable() {
  const { data: session } = useSession();
  const token = session?.token as string | undefined;

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function fetchTimetable() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/professors/timetable", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Failed");
        setSchedule(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Professor timetable fetch error:", err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTimetable();
  }, [token]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-800 dark:text-white">Timetable</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span className="text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">
         this week
        </span>
      </div>

      {loading ? (
        <TimetableSkeleton />
      ) : fetchError ? (
        <div className="py-16 text-center text-sm text-red-400">
          حدث خطأ في تحميل الجدول، حاول مرة أخرى.
        </div>
      ) : schedule.length === 0 ? (
        <div className="py-16 text-center text-sm text-gray-400">
          لا توجد محاضرات مجدولة حاليًا 📅
        </div>
      ) : (
        <>
          <div className="block md:hidden pt-3">
            <MobileView schedule={schedule} />
          </div>
          <div className="hidden md:block">
            <DesktopView schedule={schedule} />
          </div>
        </>
      )}
    </div>
  );
}