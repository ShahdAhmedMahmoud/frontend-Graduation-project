// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   BookOpen,
//   Video,
//   CalendarDays,
//   Bell,
//   Plus,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   ChevronDown,
//   ExternalLink,
//   X,
// } from "lucide-react";

// // ─── re-use the existing components ───────────────────────
// import ProfessorTimetable from "../../_component/Timetable/ProfessorTimetable";
// import UpcomingEvents from "../../_component/UpcomingEvents/UpcomingEvents";
// import ProfessorAnnouncements from "../../_component/ProfessorAnnouncements/ProfessorAnnouncements";

// const API_BASE_URL = "http://localhost:5000/api";

// // ─────────────────────────────────────────────────────────
// // TYPES
// // ─────────────────────────────────────────────────────────
// type Course = { _id: string; name: string; code: string };
// type AnnouncementType = "general" | "meeting" | "assignment" | "grades";
// type Toast = { message: string; type: "success" | "error" };

// // ─────────────────────────────────────────────────────────
// // TOAST
// // ─────────────────────────────────────────────────────────
// function ToastAlert({ toast, onClose }: { toast: Toast; onClose: () => void }) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 3500);
//     return () => clearTimeout(t);
//   }, [onClose]);

//   return (
//     <div
//       className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
//         ${toast.type === "success"
//           ? "bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300"
//           : "bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300"
//         }`}
//     >
//       {toast.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
//       {toast.message}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────
// // MODAL WRAPPER
// // ─────────────────────────────────────────────────────────
// function Modal({
//   title,
//   onClose,
//   children,
// }: {
//   title: string;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//       <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-base font-bold text-gray-800 dark:text-white">{title}</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
//           >
//             <X size={18} />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────
// // FORM HELPERS
// // ─────────────────────────────────────────────────────────
// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{label}</label>
//       {children}
//     </div>
//   );
// }

// const inputClass =
//   "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

// const selectClass =
//   "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none";

// // ─────────────────────────────────────────────────────────
// // CREATE MEETING MODAL
// // ─────────────────────────────────────────────────────────
// function CreateMeetingModal({
//   courses,
//   token,
//   onClose,
//   onToast,
// }: {
//   courses: Course[];
//   token: string;
//   onClose: () => void;
//   onToast: (t: Toast) => void;
// }) {
//   const [form, setForm] = useState({
//     courseId: "",
//     title: "",
//     description: "",
//     startsAt: "",
//     endsAt: "",
//     meetingUrl: "",
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const handle = async () => {
//     const { courseId, title, startsAt, endsAt } = form;
//     if (!courseId || !title || !startsAt || !endsAt) {
//       onToast({ message: "Course, title, start and end time are required.", type: "error" });
//       return;
//     }
//     if (new Date(endsAt) <= new Date(startsAt)) {
//       onToast({ message: "End time must be after start time.", type: "error" });
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/meetings/professor`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message);
//       onToast({ message: "Meeting created and students notified!", type: "success" });
//       onClose();
//     } catch (e: unknown) {
//       onToast({ message: e instanceof Error ? e.message : "Failed to create meeting.", type: "error" });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Modal title="Create Online Meeting" onClose={onClose}>
//       <div className="space-y-4">
//         <Field label="Course *">
//           <div className="relative">
//             <select
//               className={selectClass}
//               value={form.courseId}
//               onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
//             >
//               <option value="">Select a course</option>
//               {courses.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.code} — {c.name}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>
//         </Field>

//         <Field label="Meeting Title *">
//           <input
//             className={inputClass}
//             placeholder="e.g. Lecture 5 — Algorithms"
//             value={form.title}
//             onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
//           />
//         </Field>

//         <div className="grid grid-cols-2 gap-3">
//           <Field label="Starts At *">
//             <input
//               type="datetime-local"
//               className={inputClass}
//               value={form.startsAt}
//               onChange={(e) => setForm((f) => ({ ...f, startsAt: e.target.value }))}
//             />
//           </Field>
//           <Field label="Ends At *">
//             <input
//               type="datetime-local"
//               className={inputClass}
//               value={form.endsAt}
//               onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value }))}
//             />
//           </Field>
//         </div>

//         <Field label="Custom Meeting URL (optional)">
//           <input
//             className={inputClass}
//             placeholder="Leave blank to auto-generate"
//             value={form.meetingUrl}
//             onChange={(e) => setForm((f) => ({ ...f, meetingUrl: e.target.value }))}
//           />
//         </Field>

//         <Field label="Description (optional)">
//           <textarea
//             className={`${inputClass} resize-none`}
//             rows={3}
//             placeholder="What will be covered in this session?"
//             value={form.description}
//             onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
//           />
//         </Field>

//         <div className="flex justify-end gap-2 pt-1">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handle}
//             disabled={submitting}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
//           >
//             {submitting && <Loader2 size={14} className="animate-spin" />}
//             Create Meeting
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────
// // CREATE ANNOUNCEMENT MODAL
// // ─────────────────────────────────────────────────────────
// function CreateAnnouncementModal({
//   courses,
//   token,
//   onClose,
//   onSuccess,
//   onToast,
// }: {
//   courses: Course[];
//   token: string;
//   onClose: () => void;
//   onSuccess: () => void;
//   onToast: (t: Toast) => void;
// }) {
//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     courseId: "",
//     type: "general" as AnnouncementType,
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const handle = async () => {
//     if (!form.title.trim() || !form.content.trim() || !form.courseId) {
//       onToast({ message: "Title, content, and course are required.", type: "error" });
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/announcements/professor`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message);
//       onToast({ message: "Announcement posted successfully!", type: "success" });
//       onSuccess();
// onClose();
//     } catch (e: unknown) {
//       onToast({ message: e instanceof Error ? e.message : "Failed to post.", type: "error" });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Modal title="Post Announcement" onClose={onClose}>
//       <div className="space-y-4">
//         <Field label="Title *">
//           <input
//             className={inputClass}
//             placeholder="e.g. Exam schedule update"
//             value={form.title}
//             onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
//           />
//         </Field>

//         <Field label="Course *">
//           <div className="relative">
//             <select
//               className={selectClass}
//               value={form.courseId}
//               onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
//             >
//               <option value="">Select a course</option>
//               {courses.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.code} — {c.name}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>
//         </Field>

//         <Field label="Type">
//           <div className="relative">
//             <select
//               className={selectClass}
//               value={form.type}
//               onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as AnnouncementType }))}
//             >
//               <option value="general">General</option>
//               <option value="meeting">Meeting</option>
//               <option value="assignment">Assignment</option>
//               <option value="grades">Grades</option>
//             </select>
//             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>
//         </Field>

//         <Field label="Content *">
//           <textarea
//             className={`${inputClass} resize-none`}
//             rows={4}
//             placeholder="Write your announcement here…"
//             value={form.content}
//             onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
//           />
//         </Field>

//         <div className="flex justify-end gap-2 pt-1">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handle}
//             disabled={submitting}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
//           >
//             {submitting && <Loader2 size={14} className="animate-spin" />}
//             Post Announcement
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────
// // QUICK ACTIONS
// // ─────────────────────────────────────────────────────────
// type QuickAction = {
//   label: string;
//   icon: React.ReactNode;
//   iconBg: string;
//   onClick: () => void;
// };

// function QuickActions({ actions }: { actions: QuickAction[] }) {
//   return (
//     <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//       <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Quick Actions</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//         {actions.map((action) => (
//           <button
//             key={action.label}
//             onClick={action.onClick}
//             className="flex flex-col items-center justify-center gap-3 py-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer group"
//           >
//             <div
//               className={`w-14 h-14 rounded-xl ${action.iconBg} flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200`}
//             >
//               {action.icon}
//             </div>
//             <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//               {action.label}
//             </span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────
// // MY COURSES MINI CARD
// // ─────────────────────────────────────────────────────────
// function MyCourses({ courses, loading }: { courses: Course[]; loading: boolean }) {
//   return (
//     <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//       <h2 className="text-base font-bold text-gray-800 dark:text-white mb-4">My Courses</h2>

//       {loading ? (
//         <div className="space-y-2">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="animate-pulse h-10 rounded-lg bg-gray-100 dark:bg-gray-700" />
//           ))}
//         </div>
//       ) : courses.length === 0 ? (
//         <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
//           No courses assigned yet.
//         </p>
//       ) : (
//         <div className="space-y-2">
//           {courses.map((c) => (
//             <div
//               key={c._id}
//               className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700"
//             >
//               <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
//               <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0">
//                 {c.code}
//               </span>
//               <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{c.name}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────
// // UPCOMING MEETINGS MINI PANEL
// // ─────────────────────────────────────────────────────────
// // type Meeting = {
// //   _id: string;
// //   title: string;
// //   startsAt: string;
// //   endsAt: string;
// //   meetingUrl: string;
// //   course: { name: string; code: string };
// //   status: string;
// // };

// // function UpcomingMeetings({ token }: { token: string }) {
// //   const [meetings, setMeetings] = useState<Meeting[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!token) return;
// //     fetch(`${API_BASE_URL}/meetings/professor`, {
// //       headers: { Authorization: `Bearer ${token}` },
// //       cache: "no-store",
// //     })
// //       .then((r) => r.json())
// //       .then((d) => {
// //         if (d.success) {
// //           const upcoming = (d.data as Meeting[]).filter(
// //             (m) => m.status === "scheduled" && new Date(m.startsAt) >= new Date()
// //           );
// //           setMeetings(upcoming.slice(0, 3));
// //         }
// //       })
// //       .catch(() => {})
// //       .finally(() => setLoading(false));
// //   }, [token]);

// //   function formatDateTime(iso: string) {
// //     return new Date(iso).toLocaleString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   }

// //   return (
// //     <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
// //       <h2 className="text-base font-bold text-gray-800 dark:text-white mb-4">Upcoming Meetings</h2>

// //       {loading ? (
// //         <div className="space-y-2">
// //           {[1, 2].map((i) => (
// //             <div key={i} className="animate-pulse h-14 rounded-lg bg-gray-100 dark:bg-gray-700" />
// //           ))}
// //         </div>
// //       ) : meetings.length === 0 ? (
// //         <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
// //           No upcoming meetings.
// //         </p>
// //       ) : (
// //         <div className="space-y-3">
// //           {meetings.map((m) => (
// //             <div
// //               key={m._id}
// //               className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-3"
// //             >
// //               <div className="flex items-start justify-between gap-2">
// //                 <div className="flex-1 min-w-0">
// //                   <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
// //                     {m.title}
// //                   </p>
// //                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
// //                     {m.course?.code} · {formatDateTime(m.startsAt)}
// //                   </p>
// //                 </div>
// //                 <a
// //                   href={m.meetingUrl}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
// //                 >
// //                   Join
// //                   <ExternalLink size={10} />
// //                 </a>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// // ─────────────────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────────────────
// export default function ProfessorDashboardPage() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const token = session?.token as string | undefined;

//   const [courses, setCourses] = useState<Course[]>([]);
//   const [coursesLoading, setCoursesLoading] = useState(true);
//   const [toast, setToast] = useState<Toast | null>(null);

//   // Modals
//   const [showMeeting, setShowMeeting] = useState(false);
//   const [showAnnouncement, setShowAnnouncement] = useState(false);

//   // Fetch professor's courses
//   useEffect(() => {
//     if (!token) return;
//     fetch(`${API_BASE_URL}/professors/courses`, {
//       headers: { Authorization: `Bearer ${token}` },
//       cache: "no-store",
//     })
//       .then((r) => r.json())
//       .then((d) => {
//         if (d.success) setCourses(Array.isArray(d.data) ? d.data : []);
//       })
//       .catch(() => {})
//       .finally(() => setCoursesLoading(false));
//   }, [token]);

//   if (!token) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] text-sm text-gray-400">
//         <Loader2 className="animate-spin mr-2" size={16} />
//         Loading…
//       </div>
//     );
//   }

//   // ── Quick Actions ──────────────────────────────────────
//   const quickActions: QuickAction[] = [
//     {
//       label: "My Courses",
//       iconBg: "bg-blue-500",
//       icon: (
//         <BookOpen className="w-7 h-7 text-white" strokeWidth={1.8} />
//       ),
//       onClick: () => router.push("/doctor/doctordashboard/courses"),
//     },
//     {
//       label: "Create Meeting",
//       iconBg: "bg-blue-50 dark:bg-blue-900",
//       icon: (
//         <Video className="w-7 h-7 text-blue-600 dark:text-blue-300" strokeWidth={1.8} />
//       ),
//       onClick: () => setShowMeeting(true),
//     },
//     {
//       label: "Schedule",
//       iconBg: "bg-blue-50 dark:bg-blue-900",
//       icon: (
//         <CalendarDays className="w-7 h-7 text-blue-600 dark:text-blue-300" strokeWidth={1.8} />
//       ),
//       onClick: () => router.push("/doctor/doctordashboard/schedule"),
//     },
//     {
//       label: "Announcement",
//       iconBg: "bg-blue-50 dark:bg-blue-900",
//       icon: (
//         <Bell className="w-7 h-7 text-blue-600 dark:text-blue-300" strokeWidth={1.8} />
//       ),
//       onClick: () => setShowAnnouncement(true),
//     },
//   ];

//   return (
//     <div className="space-y-6">

//       {/* ── Row 1: Quick Actions + My Courses ── */}
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="w-full lg:w-2/3">
//           <QuickActions actions={quickActions} />
//         </div>
//         <div className="w-full lg:w-1/3">
//           <MyCourses courses={courses} loading={coursesLoading} />
//         </div>
//       </div>

//       {/* ── Row 2: Announcements + Upcoming Meetings ── */}
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="w-full lg:w-2/3">
//           <ProfessorAnnouncements />
//         </div>
//         {/* <div className="w-full lg:w-1/3">
//           <UpcomingMeetings token={token} />
//         </div> */}
//       </div>

//       {/* ── Timetable ── */}
//       <ProfessorTimetable />

//       {/* ── Upcoming Events ── */}
//       <UpcomingEvents endpoint="http://localhost:5000/api/professors/events" />

//       {/* ── Modals ── */}
//       {showMeeting && (
//         <CreateMeetingModal
//           courses={courses}
//           token={token}
//           onClose={() => setShowMeeting(false)}
//           onToast={setToast}
//         />
//       )}

//       {showAnnouncement && (
//         <CreateAnnouncementModal
//           courses={courses}
//           token={token}
//           onClose={() => setShowAnnouncement(false)}
//           onToast={setToast}
//         />
//       )}

//       {/* ── Toast ── */}
//       {toast && <ToastAlert toast={toast} onClose={() => setToast(null)} />}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  Video,
  CalendarDays,
  Bell,
  Plus,
  Loader2,
  CheckCircle,
  XCircle,
  ChevronDown,
  ExternalLink,
  X,
} from "lucide-react";

// ─── re-use the existing components ───────────────────────
import ProfessorTimetable from "../../_component/Timetable/ProfessorTimetable";
import UpcomingEvents from "../../_component/UpcomingEvents/UpcomingEvents";
import ProfessorAnnouncements from "../../_component/ProfessorAnnouncements/ProfessorAnnouncements";

const API_BASE_URL = "http://localhost:5000/api";

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────
type Course = { _id: string; name: string; code: string };
type AnnouncementType = "general" | "meeting" | "assignment" | "grades";
type Toast = { message: string; type: "success" | "error" };

// ─────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────
function ToastAlert({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
        ${toast.type === "success"
          ? "bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300"
          : "bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300"
        }`}
    >
      {toast.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
      {toast.message}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MODAL WRAPPER
// ─────────────────────────────────────────────────────────
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-gray-800 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// FORM HELPERS
// ─────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

const selectClass =
  "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none";

// ─────────────────────────────────────────────────────────
// CREATE MEETING MODAL
// ─────────────────────────────────────────────────────────
function CreateMeetingModal({
  courses,
  token,
  onClose,
  onSuccess,
  onToast,
}: {
  courses: Course[];
  token: string;
  onClose: () => void;
  onSuccess: () => void;
  onToast: (t: Toast) => void;
}) {
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    description: "",
    startsAt: "",
    endsAt: "",
    meetingUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handle = async () => {
    const { courseId, title, startsAt, endsAt } = form;
    if (!courseId || !title || !startsAt || !endsAt) {
      onToast({ message: "Course, title, start and end time are required.", type: "error" });
      return;
    }
    if (new Date(endsAt) <= new Date(startsAt)) {
      onToast({ message: "End time must be after start time.", type: "error" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/meetings/professor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      onToast({ message: "Meeting created and students notified!", type: "success" });
      onSuccess();
      onClose();
    } catch (e: unknown) {
      onToast({ message: e instanceof Error ? e.message : "Failed to create meeting.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Create Online Meeting" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Course *">
          <div className="relative">
            <select
              className={selectClass}
              value={form.courseId}
              onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
            >
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </Field>

        <Field label="Meeting Title *">
          <input
            className={inputClass}
            placeholder="e.g. Lecture 5 — Algorithms"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Starts At *">
            <input
              type="datetime-local"
              className={inputClass}
              value={form.startsAt}
              onChange={(e) => setForm((f) => ({ ...f, startsAt: e.target.value }))}
            />
          </Field>
          <Field label="Ends At *">
            <input
              type="datetime-local"
              className={inputClass}
              value={form.endsAt}
              onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value }))}
            />
          </Field>
        </div>

        <Field label="Custom Meeting URL (optional)">
          <input
            className={inputClass}
            placeholder="Leave blank to auto-generate"
            value={form.meetingUrl}
            onChange={(e) => setForm((f) => ({ ...f, meetingUrl: e.target.value }))}
          />
        </Field>

        <Field label="Description (optional)">
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder="What will be covered in this session?"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </Field>

        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handle}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            Create Meeting
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────
// CREATE ANNOUNCEMENT MODAL
// ─────────────────────────────────────────────────────────
function CreateAnnouncementModal({
  courses,
  token,
  onClose,
  onSuccess,
  onToast,
}: {
  courses: Course[];
  token: string;
  onClose: () => void;
  onSuccess: () => void;
  onToast: (t: Toast) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    courseId: "",
    type: "general" as AnnouncementType,
  });
  const [submitting, setSubmitting] = useState(false);

  const handle = async () => {
    if (!form.title.trim() || !form.content.trim() || !form.courseId) {
      onToast({ message: "Title, content, and course are required.", type: "error" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/announcements/professor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      onToast({ message: "Announcement posted successfully!", type: "success" });
      onSuccess();
      onClose();
    } catch (e: unknown) {
      onToast({ message: e instanceof Error ? e.message : "Failed to post.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Post Announcement" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Title *">
          <input
            className={inputClass}
            placeholder="e.g. Exam schedule update"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </Field>

        <Field label="Course *">
          <div className="relative">
            <select
              className={selectClass}
              value={form.courseId}
              onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
            >
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </Field>

        <Field label="Type">
          <div className="relative">
            <select
              className={selectClass}
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as AnnouncementType }))}
            >
              <option value="general">General</option>
              <option value="meeting">Meeting</option>
              <option value="assignment">Assignment</option>
              <option value="grades">Grades</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </Field>

        <Field label="Content *">
          <textarea
            className={`${inputClass} resize-none`}
            rows={4}
            placeholder="Write your announcement here…"
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          />
        </Field>

        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handle}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            Post Announcement
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────
// QUICK ACTIONS
// ─────────────────────────────────────────────────────────
type QuickAction = {
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  onClick: () => void;
};

function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
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
  );
}

// ─────────────────────────────────────────────────────────
// MY COURSES MINI CARD
// ─────────────────────────────────────────────────────────
function MyCourses({ courses, loading }: { courses: Course[]; loading: boolean }) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-bold text-gray-800 dark:text-white mb-4">My Courses</h2>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-10 rounded-lg bg-gray-100 dark:bg-gray-700" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
          No courses assigned yet.
        </p>
      ) : (
        <div className="space-y-2">
          {courses.map((c) => (
            <div
              key={c._id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                {c.code}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────
export default function ProfessorDashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.token as string | undefined;

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  // Modals
  const [showMeeting, setShowMeeting] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  // ── Refresh triggers (bump the number to force child components to refetch) ──
  const [announcementsRefreshKey, setAnnouncementsRefreshKey] = useState(0);

  // Fetch professor's courses
  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE_URL}/professors/courses`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCourses(Array.isArray(d.data) ? d.data : []);
      })
      .catch(() => {})
      .finally(() => setCoursesLoading(false));
  }, [token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-sm text-gray-400">
        <Loader2 className="animate-spin mr-2" size={16} />
        Loading…
      </div>
    );
  }

  // ── Quick Actions ──────────────────────────────────────
  const quickActions: QuickAction[] = [
    {
      label: "My Courses",
      iconBg: "bg-blue-500",
      icon: (
        <BookOpen className="w-7 h-7 text-white" strokeWidth={1.8} />
      ),
      onClick: () => router.push("/doctor/doctordashboard/courses"),
    },
    {
      label: "Create Meeting",
      iconBg: "bg-blue-50 dark:bg-blue-900",
      icon: (
        <Video className="w-7 h-7 text-blue-600 dark:text-blue-300" strokeWidth={1.8} />
      ),
      onClick: () => setShowMeeting(true),
    },
    {
      label: "Schedule",
      iconBg: "bg-blue-50 dark:bg-blue-900",
      icon: (
        <CalendarDays className="w-7 h-7 text-blue-600 dark:text-blue-300" strokeWidth={1.8} />
      ),
      onClick: () => router.push("/doctor/doctordashboard/schedule"),
    },
    {
      label: "Announcement",
      iconBg: "bg-blue-50 dark:bg-blue-900",
      icon: (
        <Bell className="w-7 h-7 text-blue-600 dark:text-blue-300" strokeWidth={1.8} />
      ),
      onClick: () => setShowAnnouncement(true),
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Row 1: Quick Actions + My Courses ── */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <QuickActions actions={quickActions} />
        </div>
        <div className="w-full lg:w-1/3">
          <MyCourses courses={courses} loading={coursesLoading} />
        </div>
      </div>

      {/* ── Row 2: Announcements ── */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <ProfessorAnnouncements refreshTrigger={announcementsRefreshKey} />
        </div>
      </div>

      {/* ── Timetable ── */}
      <ProfessorTimetable />

      {/* ── Upcoming Events ── */}
      <UpcomingEvents endpoint="http://localhost:5000/api/professors/events" />

      {/* ── Modals ── */}
      {showMeeting && (
        <CreateMeetingModal
          courses={courses}
          token={token}
          onClose={() => setShowMeeting(false)}
          onSuccess={() => setAnnouncementsRefreshKey((k) => k + 1)}
          onToast={setToast}
        />
      )}

      {showAnnouncement && (
        <CreateAnnouncementModal
          courses={courses}
          token={token}
          onClose={() => setShowAnnouncement(false)}
          onSuccess={() => setAnnouncementsRefreshKey((k) => k + 1)}
          onToast={setToast}
        />
      )}

      {/* ── Toast ── */}
      {toast && <ToastAlert toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}