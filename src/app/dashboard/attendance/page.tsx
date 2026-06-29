// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { ArrowLeft, BookOpen, CalendarDays, CircleAlert, Percent, Users } from "lucide-react";

// type AttendanceCourseSummary = {
//   courseId: string;
//   courseName: string;
//   present: number;
//   absent: number;
//   percentage: string | number;
//   totalLectures: number;
// };

// const API_BASE_URL = "http://localhost:5000/api";

// function getStatusTone(percentage: number) {
//   if (percentage >= 75) return "bg-emerald-50 text-emerald-700";
//   if (percentage >= 50) return "bg-amber-50 text-amber-700";
//   return "bg-rose-50 text-rose-700";
// }

// export default function StudentAttendancePage() {
//   const { data: session } = useSession();
//   const [courses, setCourses] = useState<AttendanceCourseSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchAttendanceSummary() {
//       if (!session?.token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setError("");

//         const response = await fetch(`${API_BASE_URL}/attendance/me/summary`, {
//           headers: {
//             Authorization: `Bearer ${session.token}`,
//           },
//           cache: "no-store",
//         });

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(data.message || "Failed to fetch attendance summary");
//         }

//         setCourses(Array.isArray(data.courses) ? data.courses : []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAttendanceSummary();
//   }, [session?.token]);

//   const overallAttendance = useMemo(() => {
//     if (!courses.length) return 0;

//     const total = courses.reduce((sum, course) => sum + Number(course.percentage || 0), 0);
//     return Math.round(total / courses.length);
//   }, [courses]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="mx-auto max-w-6xl px-6">
//         <Link
//           href="/dashboard"
//           className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600"
//         >
//           <ArrowLeft size={16} />
//           Back to dashboard
//         </Link>

//         <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-8 text-white shadow-xl">
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl bg-white/15 p-3">
//               <CalendarDays size={28} />
//             </div>
//             <div>
//               <p className="text-sm uppercase tracking-[0.2em] text-white/75">Attendance Overview</p>
//               <h1 className="text-3xl font-bold">Your attendance in all registered courses</h1>
//             </div>
//           </div>
//           <p className="mt-4 max-w-3xl text-sm text-white/85">
//             Review your attendance details for every course you are enrolled in, including present lectures, absences, and your current attendance percentage.
//           </p>
//         </div>

//         <div className="mb-6 grid gap-4 md:grid-cols-4">
//           <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//             <p className="text-sm text-gray-500">Registered courses</p>
//             <p className="mt-2 text-3xl font-semibold text-gray-900">{courses.length}</p>
//           </div>
//           <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//             <p className="text-sm text-gray-500">Overall attendance</p>
//             <p className="mt-2 text-3xl font-semibold text-gray-900">{overallAttendance}%</p>
//           </div>
//           <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//             <p className="text-sm text-gray-500">Total present</p>
//             <p className="mt-2 text-3xl font-semibold text-emerald-700">
//               {courses.reduce((sum, course) => sum + Number(course.present || 0), 0)}
//             </p>
//           </div>
//           <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//             <p className="text-sm text-gray-500">Total absent</p>
//             <p className="mt-2 text-3xl font-semibold text-rose-700">
//               {courses.reduce((sum, course) => sum + Number(course.absent || 0), 0)}
//             </p>
//           </div>
//         </div>

//         {loading ? (
//           <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {Array.from({ length: 4 }).map((_, index) => (
//               <div key={index} className="h-56 animate-pulse rounded-3xl border border-gray-200 bg-white" />
//             ))}
//           </div>
//         ) : error ? (
//           <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
//             {error}
//           </div>
//         ) : courses.length === 0 ? (
//           <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
//             <BookOpen size={40} className="mx-auto text-gray-300" />
//             <p className="mt-4 text-sm text-gray-500">No attendance data is available yet for your courses.</p>
//           </div>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {courses.map((course) => {
//               const percentage = Number(course.percentage || 0);
//               const absencePercentage = Math.max(0, 100 - percentage);

//               return (
//                 <div
//                   key={course.courseId}
//                   className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div>
//                       <h2 className="text-lg font-semibold text-gray-900">{course.courseName}</h2>
//                       <p className="mt-1 text-xs text-gray-400">Course attendance summary</p>
//                     </div>
//                     <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(percentage)}`}>
//                       {percentage.toFixed(2)}%
//                     </span>
//                   </div>

//                   <div className="mt-6 grid grid-cols-2 gap-4">
//                     <div className="rounded-2xl bg-emerald-50 p-4">
//                       <p className="text-xs uppercase tracking-[0.14em] text-emerald-600">Present</p>
//                       <p className="mt-2 text-2xl font-semibold text-emerald-700">{course.present}</p>
//                     </div>
//                     <div className="rounded-2xl bg-rose-50 p-4">
//                       <p className="text-xs uppercase tracking-[0.14em] text-rose-600">Absent</p>
//                       <p className="mt-2 text-2xl font-semibold text-rose-700">{course.absent}</p>
//                     </div>
//                   </div>

//                   <div className="mt-5 space-y-3 text-sm text-gray-600">
//                     <div className="flex items-center justify-between">
//                       <span className="inline-flex items-center gap-2">
//                         <Percent size={15} />
//                         Attendance rate
//                       </span>
//                       <span className="font-semibold text-gray-900">{percentage.toFixed(2)}%</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="inline-flex items-center gap-2">
//                         <CircleAlert size={15} />
//                         Absence rate
//                       </span>
//                       <span className="font-semibold text-gray-900">{absencePercentage.toFixed(2)}%</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="inline-flex items-center gap-2">
//                         <Users size={15} />
//                         Total lectures
//                       </span>
//                       <span className="font-semibold text-gray-900">{course.totalLectures || 0}</span>
//                     </div>
//                   </div>

//                   <Link
//                     href={`/dashboard/attendance/${course.courseId}`}
//                     className="mt-6 inline-flex items-center justify-center rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
//                   >
//                     View details
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CalendarDays, CircleAlert, Percent, Users } from "lucide-react";

type AttendanceCourseSummary = {
  courseId: string;
  courseName: string;
  present: number;
  absent: number;
  percentage: string | number;
  totalLectures: number;
};

const API_BASE_URL = "http://localhost:5000/api";

function getStatusTone(percentage: number) {
  if (percentage >= 75) return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
  if (percentage >= 50) return "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
  return "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400";
}

export default function StudentAttendancePage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<AttendanceCourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAttendanceSummary() {
      if (!session?.token) { setLoading(false); return; }
      try {
        setError("");
        const response = await fetch(`${API_BASE_URL}/attendance/me/summary`, {
          headers: { Authorization: `Bearer ${session.token}` },
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to fetch attendance summary");
        setCourses(Array.isArray(data.courses) ? data.courses : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendanceSummary();
  }, [session?.token]);

  const overallAttendance = useMemo(() => {
    if (!courses.length) return 0;
    const total = courses.reduce((sum, course) => sum + Number(course.percentage || 0), 0);
    return Math.round(total / courses.length);
  }, [courses]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition hover:text-blue-600">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3"><CalendarDays size={28} /></div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/75">Attendance Overview</p>
              <h1 className="text-3xl font-bold">Your attendance in all registered courses</h1>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-white/85">
            Review your attendance details for every course you are enrolled in, including present lectures, absences, and your current attendance percentage.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Registered courses</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{courses.length}</p>
          </div>
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Overall attendance</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{overallAttendance}%</p>
          </div>
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total present</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-700 dark:text-emerald-400">
              {courses.reduce((sum, course) => sum + Number(course.present || 0), 0)}
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total absent</p>
            <p className="mt-2 text-3xl font-semibold text-rose-700 dark:text-rose-400">
              {courses.reduce((sum, course) => sum + Number(course.absent || 0), 0)}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-56 animate-pulse rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-5 py-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-16 text-center">
            <BookOpen size={40} className="mx-auto text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No attendance data is available yet for your courses.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const percentage = Number(course.percentage || 0);
              const absencePercentage = Math.max(0, 100 - percentage);
              return (
                <div key={course.courseId} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{course.courseName}</h2>
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Course attendance summary</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(percentage)}`}>
                      {percentage.toFixed(2)}%
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">Present</p>
                      <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-400">{course.present}</p>
                    </div>
                    <div className="rounded-2xl bg-rose-50 dark:bg-rose-900/20 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-rose-600 dark:text-rose-400">Absent</p>
                      <p className="mt-2 text-2xl font-semibold text-rose-700 dark:text-rose-400">{course.absent}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2"><Percent size={15} />Attendance rate</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{percentage.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2"><CircleAlert size={15} />Absence rate</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{absencePercentage.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2"><Users size={15} />Total lectures</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{course.totalLectures || 0}</span>
                    </div>
                  </div>

                  <Link href={`/dashboard/attendance/${course.courseId}`}
                    className="mt-6 inline-flex items-center justify-center rounded-2xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700">
                    View details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


