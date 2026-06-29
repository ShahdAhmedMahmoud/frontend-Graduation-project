// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   ArrowLeft,
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   Copy,
//   LoaderCircle,
//   QrCode,
//   RefreshCcw,
//   Users,
// } from "lucide-react";

// const API_BASE_URL = "http://localhost:5000/api";

// type AttendanceReportRow = {
//   studentId: string;
//   name: string;
//   email: string;
//   studentCode: string;
//   finalStatus: string;
//   scanned: boolean;
//   attendancePercentage: string;
//   absencePercentage: string;
// };

// type CumulativeReportRow = {
//   studentId: string;
//   name: string;
//   present: number;
//   absent: number;
//   attendancePercentage: string;
//   absencePercentage: string;
//   lastAttendance: string | null;
// };

// function getTodayDate() {
//   return new Date().toISOString().split("T")[0];
// }

// function getBadgeTone(percentage: number) {
//   if (percentage >= 75) return "bg-emerald-50 text-emerald-700";
//   if (percentage >= 50) return "bg-amber-50 text-amber-700";
//   return "bg-rose-50 text-rose-700";
// }

// function formatDate(value?: string | null) {
//   if (!value) return "No records yet";

//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "No records yet";

//   return date.toLocaleDateString("en-GB", {
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

// function getStorageKey(courseId: string) {
//   return `doctor-attendance-session:${courseId}`;
// }

// export default function DoctorAttendanceQrClient({
//   courseId,
// }: {
//   courseId: string;
// }) {
//   const { data: session } = useSession();

//   const [lectureDate, setLectureDate] = useState(getTodayDate());
//   const [expiresInMinutes, setExpiresInMinutes] = useState(15);
//   const [qrImage, setQrImage] = useState("");
//   const [qrToken, setQrToken] = useState("");
//   const [sessionId, setSessionId] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [isLoadingReport, setIsLoadingReport] = useState(false);
//   const [report, setReport] = useState<AttendanceReportRow[]>([]);
//   const [cumulativeReport, setCumulativeReport] = useState<CumulativeReportRow[]>([]);
//   const [totalLectures, setTotalLectures] = useState<number | null>(null);
//   const [reportMessage, setReportMessage] = useState("");
//   const [cumulativeReportMessage, setCumulativeReportMessage] = useState("");
//   const [isLoadingCumulativeReport, setIsLoadingCumulativeReport] = useState(false);
//   const [lectureReportSummary, setLectureReportSummary] = useState<{
//     totalStudents: number;
//     presentCount: number;
//     absentCount: number;
//     lateCount: number;
//     excusedCount: number;
//   } | null>(null);

//   const token = session?.token;
//   const hasQr = useMemo(() => Boolean(qrImage), [qrImage]);
//   const hasReport = report.length > 0;
//   const hasCumulativeReport = cumulativeReport.length > 0;

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const raw = window.localStorage.getItem(getStorageKey(courseId));
//     if (!raw) return;

//     try {
//       const saved = JSON.parse(raw) as {
//         lectureDate?: string;
//         expiresInMinutes?: number;
//         qrImage?: string;
//         qrToken?: string;
//         sessionId?: string;
//       };

//       if (saved.lectureDate) setLectureDate(saved.lectureDate);
//       if (saved.expiresInMinutes) setExpiresInMinutes(saved.expiresInMinutes);
//       if (saved.qrImage) setQrImage(saved.qrImage);
//       if (saved.qrToken) setQrToken(saved.qrToken);
//       if (saved.sessionId) setSessionId(saved.sessionId);
//     } catch {
//       window.localStorage.removeItem(getStorageKey(courseId));
//     }
//   }, [courseId]);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     if (!sessionId && !qrToken && !qrImage) {
//       window.localStorage.removeItem(getStorageKey(courseId));
//       return;
//     }

//     window.localStorage.setItem(
//       getStorageKey(courseId),
//       JSON.stringify({
//         lectureDate,
//         expiresInMinutes,
//         qrImage,
//         qrToken,
//         sessionId,
//       })
//     );
//   }, [courseId, expiresInMinutes, lectureDate, qrImage, qrToken, sessionId]);

//   async function handleGenerate() {
//     if (!token) {
//       setError("You need to login again as doctor.");
//       return;
//     }

//     setIsGenerating(true);
//     setError("");
//     setMessage("");
//     setReportMessage("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/generate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           courseId,
//           lectureDate,
//           expiresInMinutes: Number(expiresInMinutes),
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to generate QR");
//       }

//       setQrImage(data.qrCodeDataUrl || "");
//       setQrToken(data.qrToken || "");
//       setSessionId(data.session?.id || "");
//       setTotalLectures(data.totalLectures ?? null);
//       setMessage(data.message || "Lecture QR generated successfully");
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setIsGenerating(false);
//     }
//   }

//   async function loadReport(targetSessionId?: string) {
//     if (!token) {
//       setError("You need to login again as doctor.");
//       return;
//     }

//     setIsLoadingReport(true);
//     setError("");

//     try {
//       const activeSessionId = targetSessionId || sessionId;
//       const requestBody = activeSessionId
//         ? { sessionId: activeSessionId }
//         : { courseId, lectureDate };

//       const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/report`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to load current lecture report");
//       }

//       setReport(data.report || []);
//       setLectureReportSummary(data.summary || null);
//       setReportMessage("Current lecture report loaded successfully");
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setIsLoadingReport(false);
//     }
//   }

//   async function loadCumulativeReport() {
//     if (!token) {
//       setError("You need to login again as doctor.");
//       return;
//     }

//     setIsLoadingCumulativeReport(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/report`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ courseId }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to load cumulative report");
//       }

//       setCumulativeReport(data.report || []);
//       setTotalLectures(data.totalLectures ?? null);
//       setCumulativeReportMessage("Cumulative course report loaded successfully");
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setIsLoadingCumulativeReport(false);
//     }
//   }

//   async function handleCloseAttendance() {
//     if (!token) {
//       setError("You need to login again as doctor.");
//       return;
//     }

//     if (!sessionId) {
//       setError("Generate the lecture QR first before closing attendance.");
//       return;
//     }

//     setIsClosing(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/close`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ sessionId }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to close attendance");
//       }

//       setMessage(
//         `Attendance closed successfully. Present: ${data.summary?.presentCount ?? 0}, Absent: ${
//           data.summary?.absentCount ?? 0
//         }`
//       );
//       const closedSessionId = data.session?.id || sessionId;
//       setQrImage("");
//       setQrToken("");
//       setSessionId("");

//       await loadReport(closedSessionId);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setIsClosing(false);
//     }
//   }

//   async function handleCopyToken() {
//     if (!qrToken) return;
//     await navigator.clipboard.writeText(qrToken);
//     setMessage("QR token copied successfully");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="mx-auto max-w-6xl px-6">
//         <Link
//           href={`/doctor/doctordashboard/courses/${courseId}`}
//           className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600"
//         >
//           <ArrowLeft size={16} />
//           Back to course
//         </Link>

//         <div className="mb-8 rounded-3xl bg-gradient-to-br from-sky-600 via-cyan-500 to-emerald-400 p-8 text-white shadow-xl">
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl bg-white/15 p-3">
//               <QrCode size={28} />
//             </div>
//             <div>
//               <p className="text-sm uppercase tracking-[0.2em] text-white/75">Attendance QR</p>
//               <h1 className="text-3xl font-bold">Generate, close, and review lecture attendance</h1>
//             </div>
//           </div>
//           <p className="mt-4 max-w-3xl text-sm text-white/85">
//             Generate a fresh QR code for the lecture, let students scan it, then close attendance and review the
//             report with attendance and absence percentages for each student.
//           </p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
//           <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h2 className="text-xl font-semibold text-gray-900">Lecture settings</h2>
//             <p className="mt-1 text-sm text-gray-500">Choose the lecture date and how long the QR stays valid.</p>

//             <div className="mt-6 grid gap-4 md:grid-cols-2">
//               <label className="block">
//                 <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <CalendarDays size={16} />
//                   Lecture date
//                 </span>
//                 <input
//                   type="date"
//                   value={lectureDate}
//                   onChange={(e) => setLectureDate(e.target.value)}
//                   className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500"
//                 />
//               </label>

//               <label className="block">
//                 <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <Clock3 size={16} />
//                   Expire after
//                 </span>
//                 <input
//                   type="number"
//                   min={1}
//                   max={180}
//                   value={expiresInMinutes}
//                   onChange={(e) => setExpiresInMinutes(Number(e.target.value))}
//                   className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500"
//                 />
//               </label>
//             </div>

//             <div className="mt-6 grid gap-3 md:grid-cols-3">
//               <button
//                 onClick={handleGenerate}
//                 disabled={isGenerating}
//                 className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {isGenerating ? "Generating..." : "Generate QR"}
//               </button>

//               <button
//                 onClick={handleCloseAttendance}
//                 disabled={isClosing || !sessionId}
//                 className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {isClosing ? "Closing..." : "Close attendance"}
//               </button>

//               <button
//                 onClick={loadReport}
//                 disabled={isLoadingReport}
//                 className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {isLoadingReport ? "Loading..." : "Load lecture report"}
//               </button>
//             </div>

//             {totalLectures !== null && (
//               <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
//                 Total lectures recorded for this course: <span className="font-semibold">{totalLectures}</span>
//               </div>
//             )}

//             {error && (
//               <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//                 {error}
//               </div>
//             )}

//             {message && !error && (
//               <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} />
//                   {message}
//                 </div>
//               </div>
//             )}
//           </section>

//           <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h2 className="text-xl font-semibold text-gray-900">Generated QR</h2>
//             <p className="mt-1 text-sm text-gray-500">Show this QR to students during the lecture.</p>

//             {hasQr ? (
//               <div className="mt-6">
//                 <div className="rounded-[2rem] bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//                   <Image
//                     src={qrImage}
//                     alt="Lecture QR code"
//                     width={320}
//                     height={320}
//                     unoptimized
//                     className="mx-auto w-full max-w-xs rounded-3xl bg-white p-4 shadow-md"
//                   />
//                 </div>

//                 <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
//                   <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">QR token</p>
//                   <p className="mt-2 break-all font-mono text-sm text-gray-800">{qrToken}</p>
//                   <p className="mt-3 text-xs text-gray-500">Session ID: {sessionId || "Not available"}</p>
//                   <button
//                     onClick={handleCopyToken}
//                     className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-white"
//                   >
//                     <Copy size={14} />
//                     Copy token
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="mt-6 rounded-[2rem] border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
//                 <QrCode size={40} className="mx-auto text-gray-300" />
//               <p className="mt-4 text-sm text-gray-500">Your QR code will appear here after generation.</p>
//             </div>
//           )}
//         </section>
//       </div>

//         <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Current lecture report</h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 Review which students attended this lecture, which students were absent, and the final status for this lecture only.
//               </p>
//             </div>

//             <button
//               onClick={loadReport}
//               disabled={isLoadingReport}
//               className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isLoadingReport ? <LoaderCircle size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
//               Refresh report
//             </button>
//           </div>

//           {lectureReportSummary && (
//             <div className="mt-4 grid gap-3 md:grid-cols-4">
//               <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
//                 Present: <span className="font-semibold">{lectureReportSummary.presentCount}</span>
//               </div>
//               <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
//                 Absent: <span className="font-semibold">{lectureReportSummary.absentCount}</span>
//               </div>
//               <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
//                 Late: <span className="font-semibold">{lectureReportSummary.lateCount}</span>
//               </div>
//               <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
//                 Total students: <span className="font-semibold">{lectureReportSummary.totalStudents}</span>
//               </div>
//             </div>
//           )}

//           {reportMessage && (
//             <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
//               {reportMessage}
//             </div>
//           )}

//           {hasReport ? (
//             <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
//                       <th className="px-5 py-4">Student</th>
//                       <th className="px-5 py-4">Code</th>
//                       <th className="px-5 py-4">Status</th>
//                       <th className="px-5 py-4">Scanned QR</th>
//                       <th className="px-5 py-4">Attendance %</th>
//                       <th className="px-5 py-4">Absence %</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100 bg-white">
//                     {report.map((row) => {
//                       const attendancePercentage = Number(row.attendancePercentage || 0);
//                       const absencePercentage = Number(row.absencePercentage || 0);

//                       return (
//                         <tr key={row.studentId} className="text-sm text-gray-700">
//                           <td className="px-5 py-4">
//                             <div className="font-semibold text-gray-900">{row.name}</div>
//                             <div className="mt-1 text-xs text-gray-400">{row.email || "No email"}</div>
//                           </td>
//                           <td className="px-5 py-4 text-gray-500">{row.studentCode || "No code"}</td>
//                           <td className="px-5 py-4">
//                             <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(row.finalStatus)}`}>
//                               {row.finalStatus}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">
//                             <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${row.scanned ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
//                               {row.scanned ? "Yes" : "No"}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">
//                             <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeTone(attendancePercentage)}`}>
//                               {attendancePercentage.toFixed(2)}%
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">{absencePercentage.toFixed(2)}%</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-6 rounded-[2rem] border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
//               <Users size={40} className="mx-auto text-gray-300" />
//               <p className="mt-4 text-sm text-gray-500">
//                 Generate attendance, close the lecture, then load the report to see the students&apos; final status for this lecture.
//               </p>
//             </div>
//           )}
//         </section>

//         <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">Cumulative course report</h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 Review the full attendance history for the whole course, including total present, absent, and the running attendance percentage for each student.
//               </p>
//             </div>

//             <button
//               onClick={loadCumulativeReport}
//               disabled={isLoadingCumulativeReport}
//               className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isLoadingCumulativeReport ? <LoaderCircle size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
//               Load cumulative report
//             </button>
//           </div>

//           {cumulativeReportMessage && (
//             <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
//               {cumulativeReportMessage}
//             </div>
//           )}

//           {hasCumulativeReport ? (
//             <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
//                       <th className="px-5 py-4">Student</th>
//                       <th className="px-5 py-4">Present</th>
//                       <th className="px-5 py-4">Absent</th>
//                       <th className="px-5 py-4">Attendance %</th>
//                       <th className="px-5 py-4">Absence %</th>
//                       <th className="px-5 py-4">Last attendance</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100 bg-white">
//                     {cumulativeReport.map((row) => {
//                       const attendancePercentage = Number(row.attendancePercentage || 0);
//                       const absencePercentage = Number(row.absencePercentage || 0);

//                       return (
//                         <tr key={row.studentId} className="text-sm text-gray-700">
//                           <td className="px-5 py-4 font-semibold text-gray-900">{row.name}</td>
//                           <td className="px-5 py-4">
//                             <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
//                               {row.present}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">
//                             <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
//                               {row.absent}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">
//                             <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeTone(attendancePercentage)}`}>
//                               {attendancePercentage.toFixed(2)}%
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">{absencePercentage.toFixed(2)}%</td>
//                           <td className="px-5 py-4 text-gray-500">{formatDate(row.lastAttendance)}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-6 rounded-[2rem] border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
//               <Users size={40} className="mx-auto text-gray-300" />
//               <p className="mt-4 text-sm text-gray-500">
//                 Load the cumulative report to see the full attendance history for this course.
//               </p>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Copy, LoaderCircle, QrCode, RefreshCcw, Users } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

type AttendanceReportRow = { studentId: string; name: string; email: string; studentCode: string; finalStatus: string; scanned: boolean; attendancePercentage: string; absencePercentage: string; };
type CumulativeReportRow = { studentId: string; name: string; present: number; absent: number; attendancePercentage: string; absencePercentage: string; lastAttendance: string | null; };

function getTodayDate() { return new Date().toISOString().split("T")[0]; }
function getBadgeTone(percentage: number) {
  if (percentage >= 75) return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
  if (percentage >= 50) return "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
  return "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400";
}
function formatDate(value?: string | null) {
  if (!value) return "No records yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No records yet";
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
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
function getStorageKey(courseId: string) { return `doctor-attendance-session:${courseId}`; }

export default function DoctorAttendanceQrClient({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [lectureDate, setLectureDate] = useState(getTodayDate());
  const [expiresInMinutes, setExpiresInMinutes] = useState(15);
  const [qrImage, setQrImage] = useState("");
  const [qrToken, setQrToken] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [report, setReport] = useState<AttendanceReportRow[]>([]);
  const [cumulativeReport, setCumulativeReport] = useState<CumulativeReportRow[]>([]);
  const [totalLectures, setTotalLectures] = useState<number | null>(null);
  const [reportMessage, setReportMessage] = useState("");
  const [cumulativeReportMessage, setCumulativeReportMessage] = useState("");
  const [isLoadingCumulativeReport, setIsLoadingCumulativeReport] = useState(false);
  const [lectureReportSummary, setLectureReportSummary] = useState<{ totalStudents: number; presentCount: number; absentCount: number; lateCount: number; excusedCount: number; } | null>(null);

  const token = session?.token;
  const hasQr = useMemo(() => Boolean(qrImage), [qrImage]);
  const hasReport = report.length > 0;
  const hasCumulativeReport = cumulativeReport.length > 0;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(getStorageKey(courseId));
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      if (saved.lectureDate) setLectureDate(saved.lectureDate);
      if (saved.expiresInMinutes) setExpiresInMinutes(saved.expiresInMinutes);
      if (saved.qrImage) setQrImage(saved.qrImage);
      if (saved.qrToken) setQrToken(saved.qrToken);
      if (saved.sessionId) setSessionId(saved.sessionId);
    } catch { window.localStorage.removeItem(getStorageKey(courseId)); }
  }, [courseId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionId && !qrToken && !qrImage) { window.localStorage.removeItem(getStorageKey(courseId)); return; }
    window.localStorage.setItem(getStorageKey(courseId), JSON.stringify({ lectureDate, expiresInMinutes, qrImage, qrToken, sessionId }));
  }, [courseId, expiresInMinutes, lectureDate, qrImage, qrToken, sessionId]);

  async function handleGenerate() {
    if (!token) { setError("You need to login again as doctor."); return; }
    setIsGenerating(true); setError(""); setMessage(""); setReportMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/generate`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId, lectureDate, expiresInMinutes: Number(expiresInMinutes) }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to generate QR");
      setQrImage(data.qrCodeDataUrl || ""); setQrToken(data.qrToken || ""); setSessionId(data.session?.id || "");
      setTotalLectures(data.totalLectures ?? null); setMessage(data.message || "Lecture QR generated successfully");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setIsGenerating(false); }
  }

  async function loadReport(targetSessionId?: string) {
    if (!token) { setError("You need to login again as doctor."); return; }
    setIsLoadingReport(true); setError("");
    try {
      const activeSessionId = targetSessionId || sessionId;
      const requestBody = activeSessionId ? { sessionId: activeSessionId } : { courseId, lectureDate };
      const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/report`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to load report");
      setReport(data.report || []); setLectureReportSummary(data.summary || null);
      setReportMessage("Current lecture report loaded successfully");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setIsLoadingReport(false); }
  }

  async function loadCumulativeReport() {
    if (!token) { setError("You need to login again as doctor."); return; }
    setIsLoadingCumulativeReport(true); setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/report`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to load cumulative report");
      setCumulativeReport(data.report || []); setTotalLectures(data.totalLectures ?? null);
      setCumulativeReportMessage("Cumulative course report loaded successfully");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setIsLoadingCumulativeReport(false); }
  }

  async function handleCloseAttendance() {
    if (!token) { setError("You need to login again as doctor."); return; }
    if (!sessionId) { setError("Generate the lecture QR first before closing attendance."); return; }
    setIsClosing(true); setError(""); setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/close`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to close attendance");
      setMessage(`Attendance closed successfully. Present: ${data.summary?.presentCount ?? 0}, Absent: ${data.summary?.absentCount ?? 0}`);
      const closedSessionId = data.session?.id || sessionId;
      setQrImage(""); setQrToken(""); setSessionId("");
      await loadReport(closedSessionId);
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setIsClosing(false); }
  }

  async function handleCopyToken() {
    if (!qrToken) return;
    await navigator.clipboard.writeText(qrToken);
    setMessage("QR token copied successfully");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Link href={`/doctor/doctordashboard/courses/${courseId}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition hover:text-blue-600">
          <ArrowLeft size={16} /> Back to course
        </Link>

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-sky-600 via-cyan-500 to-emerald-400 p-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3"><QrCode size={28} /></div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/75">Attendance QR</p>
              <h1 className="text-3xl font-bold">Generate, close, and review lecture attendance</h1>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-white/85">Generate a fresh QR code for the lecture, let students scan it, then close attendance and review the report.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Settings */}
          <section className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Lecture settings</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose the lecture date and how long the QR stays valid.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CalendarDays size={16} />Lecture date</span>
                <input type="date" value={lectureDate} onChange={(e) => setLectureDate(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500" />
              </label>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><Clock3 size={16} />Expire after</span>
                <input type="number" min={1} max={180} value={expiresInMinutes} onChange={(e) => setExpiresInMinutes(Number(e.target.value))}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500" />
              </label>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <button onClick={handleGenerate} disabled={isGenerating}
                className="inline-flex items-center justify-center rounded-2xl bg-gray-900 dark:bg-gray-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-gray-600 disabled:opacity-60">
                {isGenerating ? "Generating..." : "Generate QR"}
              </button>
              <button onClick={handleCloseAttendance} disabled={isClosing || !sessionId}
                className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60">
                {isClosing ? "Closing..." : "Close attendance"}
              </button>
              <button onClick={() => loadReport()} disabled={isLoadingReport}
                className="inline-flex items-center justify-center rounded-2xl border border-gray-300 dark:border-gray-600 px-5 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-60">
                {isLoadingReport ? "Loading..." : "Load lecture report"}
              </button>
            </div>

            {totalLectures !== null && (
              <div className="mt-4 rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-400">
                Total lectures recorded: <span className="font-semibold">{totalLectures}</span>
              </div>
            )}
            {error && <div className="mt-4 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>}
            {message && !error && (
              <div className="mt-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} />{message}</div>
              </div>
            )}
          </section>

          {/* QR Display */}
          <section className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated QR</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Show this QR to students during the lecture.</p>
            {hasQr ? (
              <div className="mt-6">
                <div className="rounded-[2rem] bg-gradient-to-br from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-600 p-6">
                  <Image src={qrImage} alt="Lecture QR code" width={320} height={320} unoptimized className="mx-auto w-full max-w-xs rounded-3xl bg-white p-4 shadow-md" />
                </div>
                <div className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">QR token</p>
                  <p className="mt-2 break-all font-mono text-sm text-gray-800 dark:text-gray-200">{qrToken}</p>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Session ID: {sessionId || "Not available"}</p>
                  <button onClick={handleCopyToken}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-white dark:hover:bg-gray-600">
                    <Copy size={14} /> Copy token
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-6 py-14 text-center">
                <QrCode size={40} className="mx-auto text-gray-300 dark:text-gray-500" />
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Your QR code will appear here after generation.</p>
              </div>
            )}
          </section>
        </div>

        {/* Current Lecture Report */}
        <section className="mt-6 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current lecture report</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review which students attended this lecture.</p>
            </div>
            <button onClick={() => loadReport()} disabled={isLoadingReport}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-60">
              {isLoadingReport ? <LoaderCircle size={16} className="animate-spin" /> : <RefreshCcw size={16} />} Refresh report
            </button>
          </div>

          {lectureReportSummary && (
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">Present: <span className="font-semibold">{lectureReportSummary.presentCount}</span></div>
              <div className="rounded-2xl bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-400">Absent: <span className="font-semibold">{lectureReportSummary.absentCount}</span></div>
              <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">Late: <span className="font-semibold">{lectureReportSummary.lateCount}</span></div>
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-700 px-4 py-3 text-sm text-slate-700 dark:text-slate-300">Total: <span className="font-semibold">{lectureReportSummary.totalStudents}</span></div>
            </div>
          )}

          {reportMessage && <div className="mt-4 rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-400">{reportMessage}</div>}

          {hasReport ? (
            <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                      <th className="px-5 py-4">Student</th><th className="px-5 py-4">Code</th>
                      <th className="px-5 py-4">Status</th><th className="px-5 py-4">Scanned QR</th>
                      <th className="px-5 py-4">Attendance %</th><th className="px-5 py-4">Absence %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {report.map((row) => {
                      const att = Number(row.attendancePercentage || 0);
                      const abs = Number(row.absencePercentage || 0);
                      return (
                        <tr key={row.studentId} className="text-sm text-gray-700 dark:text-gray-300">
                          <td className="px-5 py-4"><div className="font-semibold text-gray-900 dark:text-white">{row.name}</div><div className="mt-1 text-xs text-gray-400">{row.email || "No email"}</div></td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{row.studentCode || "No code"}</td>
                          <td className="px-5 py-4"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(row.finalStatus)}`}>{row.finalStatus}</span></td>
                          <td className="px-5 py-4"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${row.scanned ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}>{row.scanned ? "Yes" : "No"}</span></td>
                          <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeTone(att)}`}>{att.toFixed(2)}%</span></td>
                          <td className="px-5 py-4 dark:text-gray-400">{abs.toFixed(2)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-6 py-14 text-center">
              <Users size={40} className="mx-auto text-gray-300 dark:text-gray-500" />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Generate attendance, close the lecture, then load the report.</p>
            </div>
          )}
        </section>

        {/* Cumulative Report */}
        <section className="mt-6 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cumulative course report</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review the full attendance history for the whole course.</p>
            </div>
            <button onClick={loadCumulativeReport} disabled={isLoadingCumulativeReport}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-60">
              {isLoadingCumulativeReport ? <LoaderCircle size={16} className="animate-spin" /> : <RefreshCcw size={16} />} Load cumulative report
            </button>
          </div>

          {cumulativeReportMessage && <div className="mt-4 rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-400">{cumulativeReportMessage}</div>}

          {hasCumulativeReport ? (
            <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                      <th className="px-5 py-4">Student</th><th className="px-5 py-4">Present</th>
                      <th className="px-5 py-4">Absent</th><th className="px-5 py-4">Attendance %</th>
                      <th className="px-5 py-4">Absence %</th><th className="px-5 py-4">Last attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {cumulativeReport.map((row) => {
                      const att = Number(row.attendancePercentage || 0);
                      const abs = Number(row.absencePercentage || 0);
                      return (
                        <tr key={row.studentId} className="text-sm text-gray-700 dark:text-gray-300">
                          <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">{row.name}</td>
                          <td className="px-5 py-4"><span className="inline-flex rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">{row.present}</span></td>
                          <td className="px-5 py-4"><span className="inline-flex rounded-full bg-rose-50 dark:bg-rose-900/30 px-3 py-1 text-xs font-semibold text-rose-700 dark:text-rose-400">{row.absent}</span></td>
                          <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeTone(att)}`}>{att.toFixed(2)}%</span></td>
                          <td className="px-5 py-4 dark:text-gray-400">{abs.toFixed(2)}%</td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{formatDate(row.lastAttendance)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-6 py-14 text-center">
              <Users size={40} className="mx-auto text-gray-300 dark:text-gray-500" />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Load the cumulative report to see the full attendance history.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}


