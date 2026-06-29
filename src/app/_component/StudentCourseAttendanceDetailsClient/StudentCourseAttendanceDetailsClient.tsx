// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { ArrowLeft, CalendarDays, CheckCircle2, CircleAlert, Clock3, XCircle } from "lucide-react";

// const API_BASE_URL = "http://localhost:5000/api";

// type AttendanceRecord = {
//   _id: string;
//   date: string;
//   status: "Present" | "Absent" | "Late" | "Excused";
//   markedBy?: {
//     name?: string;
//     email?: string;
//   };
// };

// type AttendanceSummaryCourse = {
//   courseId: string;
//   courseName: string;
//   present: number;
//   absent: number;
//   percentage: string | number;
//   totalLectures: number;
// };

// function formatDate(value: string) {
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "Unknown date";

//   return date.toLocaleDateString("en-GB", {
//     weekday: "short",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// function getStatusTone(status: string) {
//   switch (status.toLowerCase()) {
//     case "present":
//       return "bg-emerald-50 text-emerald-700";
//     case "absent":
//       return "bg-rose-50 text-rose-700";
//     case "late":
//       return "bg-amber-50 text-amber-700";
//     case "excused":
//       return "bg-sky-50 text-sky-700";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// }

// export default function StudentCourseAttendanceDetailsClient({
//   courseId,
// }: {
//   courseId: string;
// }) {
//   const { data: session } = useSession();
//   const [records, setRecords] = useState<AttendanceRecord[]>([]);
//   const [courseSummary, setCourseSummary] = useState<AttendanceSummaryCourse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchAttendanceDetails() {
//       if (!session?.token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setError("");

//         const [summaryRes, recordsRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/attendance/me/summary`, {
//             headers: {
//               Authorization: `Bearer ${session.token}`,
//             },
//             cache: "no-store",
//           }),
//           fetch(`${API_BASE_URL}/attendance/me/course`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${session.token}`,
//             },
//             body: JSON.stringify({ courseId }),
//           }),
//         ]);

//         const summaryData = await summaryRes.json();
//         const recordsData = await recordsRes.json();

//         if (!summaryRes.ok || !summaryData.success) {
//           throw new Error(summaryData.message || "Failed to fetch course summary");
//         }

//         if (!recordsRes.ok || !recordsData.success) {
//           throw new Error(recordsData.message || "Failed to fetch attendance details");
//         }

//         const matchedCourse = Array.isArray(summaryData.courses)
//           ? summaryData.courses.find((course: AttendanceSummaryCourse) => course.courseId === courseId)
//           : null;

//         setCourseSummary(matchedCourse || null);
//         setRecords(Array.isArray(recordsData.data) ? recordsData.data : []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAttendanceDetails();
//   }, [courseId, session?.token]);

//   const summary = useMemo(() => {
//     const present = records.filter((record) => record.status === "Present").length;
//     const absent = records.filter((record) => record.status === "Absent").length;
//     const late = records.filter((record) => record.status === "Late").length;
//     const excused = records.filter((record) => record.status === "Excused").length;

//     return {
//       total: records.length,
//       present,
//       absent,
//       late,
//       excused,
//     };
//   }, [records]);

//   const attendancePercentage = Number(courseSummary?.percentage || 0);
//   const absencePercentage = Math.max(0, 100 - attendancePercentage);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="mx-auto max-w-6xl px-6">
//         <Link
//           href="/dashboard/attendance"
//           className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600"
//         >
//           <ArrowLeft size={16} />
//           Back to attendance overview
//         </Link>

//         <div className="mb-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 p-8 text-white shadow-xl">
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl bg-white/15 p-3">
//               <CalendarDays size={28} />
//             </div>
//             <div>
//               <p className="text-sm uppercase tracking-[0.2em] text-white/75">Course Attendance Details</p>
//               <h1 className="text-3xl font-bold">{courseSummary?.courseName || "Course attendance details"}</h1>
//             </div>
//           </div>
//           <p className="mt-4 max-w-3xl text-sm text-white/85">
//             Review every recorded lecture for this course, including your attendance status and who recorded it.
//           </p>
//         </div>

//         {loading ? (
//           <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
//             {Array.from({ length: 4 }).map((_, index) => (
//               <div key={index} className="h-36 animate-pulse rounded-3xl border border-gray-200 bg-white" />
//             ))}
//           </div>
//         ) : error ? (
//           <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
//             {error}
//           </div>
//         ) : (
//           <>
//             <div className="mb-6 grid gap-4 md:grid-cols-4">
//               <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//                 <p className="text-sm text-gray-500">Attendance rate</p>
//                 <p className="mt-2 text-3xl font-semibold text-gray-900">{attendancePercentage.toFixed(2)}%</p>
//               </div>
//               <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//                 <p className="text-sm text-gray-500">Absence rate</p>
//                 <p className="mt-2 text-3xl font-semibold text-gray-900">{absencePercentage.toFixed(2)}%</p>
//               </div>
//               <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//                 <p className="text-sm text-gray-500">Present lectures</p>
//                 <p className="mt-2 text-3xl font-semibold text-emerald-700">{summary.present}</p>
//               </div>
//               <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//                 <p className="text-sm text-gray-500">Absent lectures</p>
//                 <p className="mt-2 text-3xl font-semibold text-rose-700">{summary.absent}</p>
//               </div>
//             </div>

//             {records.length === 0 ? (
//               <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
//                 <CircleAlert size={40} className="mx-auto text-gray-300" />
//                 <p className="mt-4 text-sm text-gray-500">No lecture attendance records are available for this course yet.</p>
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
//                         <th className="px-5 py-4">Lecture date</th>
//                         <th className="px-5 py-4">Status</th>
//                         <th className="px-5 py-4">Recorded by</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 bg-white">
//                       {records.map((record) => (
//                         <tr key={record._id} className="text-sm text-gray-700">
//                           <td className="px-5 py-4">
//                             <div className="font-semibold text-gray-900">{formatDate(record.date)}</div>
//                           </td>
//                           <td className="px-5 py-4">
//                             <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(record.status)}`}>
//                               {record.status === "Present" ? <CheckCircle2 size={14} /> : null}
//                               {record.status === "Absent" ? <XCircle size={14} /> : null}
//                               {record.status === "Late" ? <Clock3 size={14} /> : null}
//                               {record.status}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4 text-gray-500">
//                             {record.markedBy?.name || record.markedBy?.email || "System / QR attendance"}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, CircleAlert, Clock3, XCircle } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

type AttendanceRecord = {
  _id: string;
  date: string;
  status: "Present" | "Absent" | "Late" | "Excused";
  markedBy?: { name?: string; email?: string };
};

type AttendanceSummaryCourse = {
  courseId: string;
  courseName: string;
  present: number;
  absent: number;
  percentage: string | number;
  totalLectures: number;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString("en-GB", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}

function getStatusTone(status: string) {
  switch (status.toLowerCase()) {
    case "present": return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
    case "absent":  return "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400";
    case "late":    return "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
    case "excused": return "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400";
    default:        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
  }
}

export default function StudentCourseAttendanceDetailsClient({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [courseSummary, setCourseSummary] = useState<AttendanceSummaryCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAttendanceDetails() {
      if (!session?.token) { setLoading(false); return; }
      try {
        setError("");
        const [summaryRes, recordsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/attendance/me/summary`, {
            headers: { Authorization: `Bearer ${session.token}` },
            cache: "no-store",
          }),
          fetch(`${API_BASE_URL}/attendance/me/course`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.token}` },
            body: JSON.stringify({ courseId }),
          }),
        ]);

        const summaryData = await summaryRes.json();
        const recordsData = await recordsRes.json();

        if (!summaryRes.ok || !summaryData.success) throw new Error(summaryData.message || "Failed to fetch course summary");
        if (!recordsRes.ok || !recordsData.success) throw new Error(recordsData.message || "Failed to fetch attendance details");

        const matchedCourse = Array.isArray(summaryData.courses)
          ? summaryData.courses.find((course: AttendanceSummaryCourse) => course.courseId === courseId)
          : null;

        setCourseSummary(matchedCourse || null);
        setRecords(Array.isArray(recordsData.data) ? recordsData.data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendanceDetails();
  }, [courseId, session?.token]);

  const summary = useMemo(() => ({
    total: records.length,
    present: records.filter((r) => r.status === "Present").length,
    absent: records.filter((r) => r.status === "Absent").length,
    late: records.filter((r) => r.status === "Late").length,
    excused: records.filter((r) => r.status === "Excused").length,
  }), [records]);

  const attendancePercentage = Number(courseSummary?.percentage || 0);
  const absencePercentage = Math.max(0, 100 - attendancePercentage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/dashboard/attendance"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition hover:text-blue-600">
          <ArrowLeft size={16} /> Back to attendance overview
        </Link>

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 p-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3"><CalendarDays size={28} /></div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/75">Course Attendance Details</p>
              <h1 className="text-3xl font-bold">{courseSummary?.courseName || "Course attendance details"}</h1>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-white/85">
            Review every recorded lecture for this course, including your attendance status and who recorded it.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-36 animate-pulse rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-5 py-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Attendance rate</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{attendancePercentage.toFixed(2)}%</p>
              </div>
              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Absence rate</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{absencePercentage.toFixed(2)}%</p>
              </div>
              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Present lectures</p>
                <p className="mt-2 text-3xl font-semibold text-emerald-700 dark:text-emerald-400">{summary.present}</p>
              </div>
              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Absent lectures</p>
                <p className="mt-2 text-3xl font-semibold text-rose-700 dark:text-rose-400">{summary.absent}</p>
              </div>
            </div>

            {records.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-16 text-center">
                <CircleAlert size={40} className="mx-auto text-gray-300 dark:text-gray-600" />
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No lecture attendance records are available for this course yet.</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                        <th className="px-5 py-4">Lecture date</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Recorded by</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {records.map((record) => (
                        <tr key={record._id} className="text-sm text-gray-700 dark:text-gray-300">
                          <td className="px-5 py-4">
                            <div className="font-semibold text-gray-900 dark:text-white">{formatDate(record.date)}</div>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(record.status)}`}>
                              {record.status === "Present" && <CheckCircle2 size={14} />}
                              {record.status === "Absent"  && <XCircle size={14} />}
                              {record.status === "Late"    && <Clock3 size={14} />}
                              {record.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                            {record.markedBy?.name || record.markedBy?.email || "System / QR attendance"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}