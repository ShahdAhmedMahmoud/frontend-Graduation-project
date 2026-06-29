// // "use client";

// // import { useEffect, useState, useCallback } from "react";
// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// // import {
// //   Search,
// //   Plus,
// //   X,
// //   Clock,
// //   MapPin,
// //   BookOpen,
// //   ChevronDown,
// //   ChevronUp,
// //   Trash2,
// //   Save,
// //   CalendarDays,
// // } from "lucide-react";

// // // ============================================================
// // // TYPES
// // // ============================================================
// // type ScheduleSlot = {
// //   _id?: string;
// //   day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
// //   start_time: string;
// //   end_time: string;
// //   room: string;
// // };

// // type Course = {
// //   _id: string;
// //   name: string;
// //   code: string;
// //   description?: string;
// //   credits: number;
// //   professors: { _id: string; full_name?: string; name?: string }[];
// //   students: string[];
// //   schedule: ScheduleSlot[];
// // };

// // const API_BASE_URL = "http://localhost:5000/api";

// // const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

// // const DAY_COLORS: Record<string, string> = {
// //   Monday:    "bg-blue-50 text-blue-700 ring-blue-200",
// //   Tuesday:   "bg-violet-50 text-violet-700 ring-violet-200",
// //   Wednesday: "bg-emerald-50 text-emerald-700 ring-emerald-200",
// //   Thursday:  "bg-amber-50 text-amber-700 ring-amber-200",
// //   Friday:    "bg-rose-50 text-rose-700 ring-rose-200",
// // };

// // const DAY_DOT: Record<string, string> = {
// //   Monday:    "bg-blue-500",
// //   Tuesday:   "bg-violet-500",
// //   Wednesday: "bg-emerald-500",
// //   Thursday:  "bg-amber-500",
// //   Friday:    "bg-rose-500",
// // };

// // function emptySlot(): ScheduleSlot {
// //   return { day: "Monday", start_time: "09:00", end_time: "10:30", room: "" };
// // }

// // // ============================================================
// // // SCHEDULE MODAL
// // // ============================================================
// // function ScheduleModal({
// //   course,
// //   token,
// //   onClose,
// //   onSaved,
// // }: {
// //   course: Course;
// //   token: string;
// //   onClose: () => void;
// //   onSaved: (updated: Course) => void;
// // }) {
// //   const [slots, setSlots] = useState<ScheduleSlot[]>(
// //     course.schedule.length > 0 ? course.schedule : [emptySlot()]
// //   );
// //   const [saving, setSaving] = useState(false);
// //   const [err, setErr] = useState("");

// //   function addSlot() {
// //     setSlots((prev) => [...prev, emptySlot()]);
// //   }

// //   function removeSlot(index: number) {
// //     setSlots((prev) => prev.filter((_, i) => i !== index));
// //   }

// //   function updateSlot(index: number, field: keyof ScheduleSlot, value: string) {
// //     setSlots((prev) =>
// //       prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
// //     );
// //   }

// //   async function handleSave() {
// //     setSaving(true);
// //     setErr("");
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/admin/courses/${course._id}`, {
// //         method: "PUT",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ schedule: slots }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok || !data.success) throw new Error(data.message || "Failed");
// //       onSaved({ ...course, schedule: slots });
// //       onClose();
// //     } catch (e) {
// //       setErr(e instanceof Error ? e.message : "Something went wrong");
// //     } finally {
// //       setSaving(false);
// //     }
// //   }

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       {/* Backdrop */}
// //       <div
// //         className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
// //         onClick={onClose}
// //       />

// //       {/* Modal */}
// //       <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-100">
// //         {/* Header */}
// //         <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
// //           <div className="flex items-start justify-between gap-4">
// //             <div>
// //               <div className="flex items-center gap-2 mb-1">
// //                 <CalendarDays size={16} className="text-slate-400" />
// //                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
// //                   Schedule
// //                 </span>
// //               </div>
// //               <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
// //               <p className="text-sm text-gray-400 mt-0.5">{course.code}</p>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
// //             >
// //               <X size={18} />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Slots */}
// //         <div className="px-6 py-4 space-y-3">
// //           {slots.map((slot, i) => (
// //             <div
// //               key={i}
// //               className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3"
// //             >
// //               <div className="flex items-center justify-between">
// //                 <span className="text-xs font-semibold text-gray-500">
// //                   Slot {i + 1}
// //                 </span>
// //                 {slots.length > 1 && (
// //                   <button
// //                     onClick={() => removeSlot(i)}
// //                     className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition"
// //                   >
// //                     <Trash2 size={14} />
// //                   </button>
// //                 )}
// //               </div>

// //               {/* Day */}
// //               <div>
// //                 <label className="text-xs text-gray-400 mb-1.5 block">Day</label>
// //                 <div className="flex flex-wrap gap-1.5">
// //                   {DAYS.map((day) => (
// //                     <button
// //                       key={day}
// //                       onClick={() => updateSlot(i, "day", day)}
// //                       className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 transition ${
// //                         slot.day === day
// //                           ? DAY_COLORS[day]
// //                           : "bg-white text-gray-500 ring-gray-200 hover:bg-gray-50"
// //                       }`}
// //                     >
// //                       {day.slice(0, 3)}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Times */}
// //               <div className="grid grid-cols-2 gap-3">
// //                 <div>
// //                   <label className="text-xs text-gray-400 mb-1.5 block">Start</label>
// //                   <input
// //                     type="time"
// //                     value={slot.start_time}
// //                     onChange={(e) => updateSlot(i, "start_time", e.target.value)}
// //                     className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-slate-200"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="text-xs text-gray-400 mb-1.5 block">End</label>
// //                   <input
// //                     type="time"
// //                     value={slot.end_time}
// //                     onChange={(e) => updateSlot(i, "end_time", e.target.value)}
// //                     className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-slate-200"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Room */}
// //               <div>
// //                 <label className="text-xs text-gray-400 mb-1.5 block">Room</label>
// //                 <input
// //                   type="text"
// //                   value={slot.room}
// //                   onChange={(e) => updateSlot(i, "room", e.target.value)}
// //                   placeholder="e.g. Room A-203"
// //                   className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-slate-200"
// //                 />
// //               </div>
// //             </div>
// //           ))}

// //           {/* Add Slot */}
// //           <button
// //             onClick={addSlot}
// //             className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-gray-400 font-medium hover:border-slate-300 hover:text-slate-500 transition flex items-center justify-center gap-2"
// //           >
// //             <Plus size={15} />
// //             Add another slot
// //           </button>
// //         </div>

// //         {/* Footer */}
// //         <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100">
// //           {err && (
// //             <p className="text-xs text-rose-500 mb-3">{err}</p>
// //           )}
// //           <button
// //             onClick={handleSave}
// //             disabled={saving}
// //             className="w-full py-3 rounded-2xl bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
// //           >
// //             {saving ? (
// //               <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //             ) : (
// //               <Save size={15} />
// //             )}
// //             {saving ? "Saving..." : "Save Schedule"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============================================================
// // // COURSE CARD
// // // ============================================================
// // function CourseCard({
// //   course,
// //   onManageSchedule,
// //   onManageGrades,
// // }: {
// //   course: Course;
// //   onManageSchedule: (course: Course) => void;
// //   onManageGrades: (courseId: string) => void;
// // }) {
// //   const [expanded, setExpanded] = useState(false);
// //   const hasSchedule = course.schedule && course.schedule.length > 0;

// //   return (
// //     <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
// //       {/* Top */}
// //       <div className="p-5">
// //         <div className="flex items-start justify-between gap-3">
// //           <div className="flex items-center gap-3">
// //             <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
// //               <BookOpen size={16} className="text-slate-600" />
// //             </div>
// //             <div>
// //               <h3 className="text-base font-bold text-gray-900 leading-tight">
// //                 {course.name}
// //               </h3>
// //               <p className="text-xs text-gray-400 mt-0.5">{course.code}</p>
// //             </div>
// //           </div>

// //           <span className="shrink-0 text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
// //             {course.credits} cr
// //           </span>
// //         </div>

// //         {/* Stats */}
// //         <div className="mt-4 grid grid-cols-3 gap-2 text-center">
// //           <div className="rounded-2xl bg-gray-50 py-2.5">
// //             <p className="text-sm font-bold text-gray-900">{course.students?.length ?? 0}</p>
// //             <p className="text-[11px] text-gray-400 mt-0.5">Students</p>
// //           </div>
// //           <div className="rounded-2xl bg-gray-50 py-2.5">
// //             <p className="text-sm font-bold text-gray-900">{course.professors?.length ?? 0}</p>
// //             <p className="text-[11px] text-gray-400 mt-0.5">Professors</p>
// //           </div>
// //           <div className="rounded-2xl bg-gray-50 py-2.5">
// //             <p className="text-sm font-bold text-gray-900">{course.schedule?.length ?? 0}</p>
// //             <p className="text-[11px] text-gray-400 mt-0.5">Slots</p>
// //           </div>
// //         </div>

// //         {/* Schedule preview */}
// //         {hasSchedule && (
// //           <div className="mt-3 space-y-1.5">
// //             {course.schedule.slice(0, expanded ? undefined : 2).map((slot, i) => (
// //               <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
// //                 <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DAY_DOT[slot.day]}`} />
// //                 <span className="font-medium text-gray-700 w-16 shrink-0">{slot.day.slice(0,3)}</span>
// //                 <Clock size={11} className="shrink-0" />
// //                 <span>{slot.start_time} – {slot.end_time}</span>
// //                 {slot.room && (
// //                   <>
// //                     <MapPin size={11} className="shrink-0 ml-1" />
// //                     <span className="truncate">{slot.room}</span>
// //                   </>
// //                 )}
// //               </div>
// //             ))}
// //             {course.schedule.length > 2 && (
// //               <button
// //                 onClick={() => setExpanded(!expanded)}
// //                 className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition mt-1"
// //               >
// //                 {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
// //                 {expanded ? "Show less" : `+${course.schedule.length - 2} more`}
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Action */}
// //       <div className="px-5 pb-5 space-y-2">
// //         <button
// //           onClick={() => onManageSchedule(course)}
// //           className={`w-full py-2.5 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
// //             hasSchedule
// //               ? "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
// //               : "bg-slate-950 text-white hover:bg-slate-800"
// //           }`}
// //         >
// //           <CalendarDays size={14} />
// //           {hasSchedule ? "Edit Schedule" : "Add Schedule"}
// //         </button>

// //         <button
// //           onClick={() => onManageGrades(course._id)}
// //           className="w-full rounded-2xl border border-rose-200 bg-rose-50 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
// //         >
// //           Manage Final Grades
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============================================================
// // // MAIN PAGE
// // // ============================================================
// // export default function AdminCoursesPage() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();

// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

// //   useEffect(() => {
// //     if (status === "unauthenticated") {
// //       router.push("/admin/login");
// //     }
// //   }, [status, router]);

// //   const fetchCourses = useCallback(async () => {
// //     if (!session?.token) return;
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const res = await fetch(`${API_BASE_URL}/admin/courses`, {
// //         headers: { Authorization: `Bearer ${session.token}` },
// //         cache: "no-store",
// //       });
// //       const data = await res.json();
// //       if (!res.ok || !data.success) throw new Error(data.message || "Failed");
// //       setCourses(data.data || []);
// //     } catch (e) {
// //       setError(e instanceof Error ? e.message : "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [session?.token]);

// //   useEffect(() => {
// //     if (status === "authenticated") fetchCourses();
// //   }, [status, fetchCourses]);

// //   const filtered = courses.filter(
// //     (c) =>
// //       !search ||
// //       c.name.toLowerCase().includes(search.toLowerCase()) ||
// //       c.code.toLowerCase().includes(search.toLowerCase())
// //   );

// //   function handleSaved(updated: Course) {
// //     setCourses((prev) =>
// //       prev.map((c) => (c._id === updated._id ? updated : c))
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
// //         <div>
// //           <h1 className="text-3xl font-semibold text-gray-900">Course Management</h1>
// //           <p className="mt-1 text-sm text-gray-500">
// //             View courses and manage their weekly schedules
// //           </p>
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
// //         <div className="relative">
// //           <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// //           <input
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             placeholder="Search courses..."
// //             className="w-full rounded-2xl bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none ring-1 ring-gray-100 transition focus:ring-2 focus:ring-slate-200"
// //           />
// //         </div>
// //       </div>

// //       {/* Count */}
// //       <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-500 shadow-sm ring-1 ring-gray-100">
// //         Showing {filtered.length} of {courses.length} courses
// //       </div>

// //       {/* Grid */}
// //       {loading ? (
// //         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
// //           {Array.from({ length: 6 }).map((_, i) => (
// //             <div key={i} className="h-64 animate-pulse rounded-3xl border border-gray-200 bg-white" />
// //           ))}
// //         </div>
// //       ) : error ? (
// //         <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
// //           {error}
// //         </div>
// //       ) : filtered.length === 0 ? (
// //         <div className="rounded-3xl border border-gray-100 bg-white py-20 text-center text-sm text-gray-400">
// //           No courses found 📚
// //         </div>
// //       ) : (
// //         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
// //           {filtered.map((course) => (
// //             <CourseCard
// //               key={course._id}
// //               course={course}
// //               onManageSchedule={setSelectedCourse}
// //               onManageGrades={(courseId) =>
// //                 router.push(`/admin/admindashboard/courses/${courseId}/grades`)
// //               }
// //             />
// //           ))}
// //         </div>
// //       )}

// //       {/* Schedule Modal */}
// //       {selectedCourse && session?.token && (
// //         <ScheduleModal
// //           course={selectedCourse}
// //           token={session.token}
// //           onClose={() => setSelectedCourse(null)}
// //           onSaved={handleSaved}
// //         />
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import {
//   Search, Plus, X, Clock, MapPin, BookOpen,
//   ChevronDown, ChevronUp, Trash2, Save,
//   CalendarDays, FileText, Target,
// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================
// type ScheduleSlot = {
//   _id?: string;
//   day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
//   start_time: string;
//   end_time: string;
//   room: string;
// };

// type Course = {
//   _id: string;
//   name: string;
//   code: string;
//   description?: string;
//   learning_objectives?: string[];
//   credits: number;
//   academicYears?: number[];
//   maxEnrollment?: number;
//   professors: { _id: string; full_name?: string; name?: string }[]; 
//   students: string[];
//   schedule: ScheduleSlot[];
// };

// type ProfessorLite = {
//   _id: string;
//   name?: string;
//   full_name?: string;
//   email?: string;
// };

// const API_BASE_URL = "http://localhost:5000/api";
// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

// const DAY_COLORS: Record<string, string> = {
//   Monday:    "bg-blue-50 text-blue-700 ring-blue-200",
//   Tuesday:   "bg-violet-50 text-violet-700 ring-violet-200",
//   Wednesday: "bg-emerald-50 text-emerald-700 ring-emerald-200",
//   Thursday:  "bg-amber-50 text-amber-700 ring-amber-200",
//   Friday:    "bg-rose-50 text-rose-700 ring-rose-200",
// };

// const DAY_DOT: Record<string, string> = {
//   Monday:    "bg-blue-500",
//   Tuesday:   "bg-violet-500",
//   Wednesday: "bg-emerald-500",
//   Thursday:  "bg-amber-500",
//   Friday:    "bg-rose-500",
// };

// function emptySlot(): ScheduleSlot {
//   return { day: "Monday", start_time: "09:00", end_time: "10:30", room: "" };
// }

// // ============================================================
// // OVERVIEW MODAL ✅ جديد
// // ============================================================
// function OverviewModal({
//   course,
//   token,
//   onClose,
//   onSaved,
// }: {
//   course: Course;
//   token: string;
//   onClose: () => void;
//   onSaved: (updated: Course) => void;
// }) {
//   const [description, setDescription] = useState(course.description || "");
//   const [objectives, setObjectives] = useState<string[]>(
//     course.learning_objectives?.length ? course.learning_objectives : [""]
//   );
//   const [saving, setSaving] = useState(false);
//   const [err, setErr] = useState("");
//   const [success, setSuccess] = useState(false);

//   function addObjective() {
//     setObjectives((prev) => [...prev, ""]);
//   }

//   function removeObjective(index: number) {
//     setObjectives((prev) => prev.filter((_, i) => i !== index));
//   }

//   function updateObjective(index: number, value: string) {
//     setObjectives((prev) => prev.map((o, i) => (i === index ? value : o)));
//   }

//   async function handleSave() {
//     setSaving(true);
//     setErr("");
//     setSuccess(false);

//     const cleanObjectives = objectives.filter((o) => o.trim() !== "");

//     try {
//       const res = await fetch(`${API_BASE_URL}/admin/courses/${course._id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           description: description.trim(),
//           learning_objectives: cleanObjectives,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Failed");

//       setSuccess(true);
//       onSaved({
//         ...course,
//         description: description.trim(),
//         learning_objectives: cleanObjectives,
//       });

//       setTimeout(() => onClose(), 800);
//     } catch (e) {
//       setErr(e instanceof Error ? e.message : "Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />

//       <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-100">

//         {/* Header */}
//         <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <FileText size={16} className="text-slate-400" />
//                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//                   Course Overview
//                 </span>
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
//               <p className="text-sm text-gray-400 mt-0.5">{course.code}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="px-6 py-4 space-y-5">

//           {/* Description */}
//           <div>
//             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
//               <FileText size={12} className="text-blue-500" />
//               Course Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter course description..."
//               rows={4}
//               className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-slate-200 resize-none"
//             />
//           </div>

//           {/* Learning Objectives */}
//           <div>
//             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
//               <Target size={12} className="text-green-500" />
//               Learning Objectives
//             </label>

//             <div className="space-y-2">
//               {objectives.map((obj, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
//                     {i + 1}
//                   </span>
//                   <input
//                     type="text"
//                     value={obj}
//                     onChange={(e) => updateObjective(i, e.target.value)}
//                     placeholder={`Objective ${i + 1}...`}
//                     className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-slate-200"
//                   />
//                   {objectives.length > 1 && (
//                     <button
//                       onClick={() => removeObjective(i)}
//                       className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition flex-shrink-0"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={addObjective}
//               className="mt-3 w-full py-2.5 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-gray-400 font-medium hover:border-slate-300 hover:text-slate-500 transition flex items-center justify-center gap-2"
//             >
//               <Plus size={14} />
//               Add objective
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100">
//           {err && <p className="text-xs text-rose-500 mb-3">{err}</p>}
//           {success && <p className="text-xs text-green-600 mb-3">✓ Saved successfully!</p>}
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="w-full py-3 rounded-2xl bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
//           >
//             {saving ? (
//               <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <Save size={15} />
//             )}
//             {saving ? "Saving..." : "Save Overview"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // SCHEDULE MODAL
// // ============================================================
// function ScheduleModal({
//   course, token, onClose, onSaved,
// }: {
//   course: Course;
//   token: string;
//   onClose: () => void;
//   onSaved: (updated: Course) => void;
// }) {
//   const [slots, setSlots] = useState<ScheduleSlot[]>(
//     course.schedule.length > 0 ? course.schedule : [emptySlot()]
//   );
//   const [saving, setSaving] = useState(false);
//   const [err, setErr] = useState("");

//   function addSlot() { setSlots((prev) => [...prev, emptySlot()]); }
//   function removeSlot(index: number) { setSlots((prev) => prev.filter((_, i) => i !== index)); }
//   function updateSlot(index: number, field: keyof ScheduleSlot, value: string) {
//     setSlots((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
//   }

//   async function handleSave() {
//     setSaving(true);
//     setErr("");
//     try {
//       const res = await fetch(`${API_BASE_URL}/admin/courses/${course._id}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body: JSON.stringify({ schedule: slots }),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Failed");
//       onSaved({ ...course, schedule: slots });
//       onClose();
//     } catch (e) {
//       setErr(e instanceof Error ? e.message : "Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-100">

//         <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <CalendarDays size={16} className="text-slate-400" />
//                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Schedule</span>
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
//               <p className="text-sm text-gray-400 mt-0.5">{course.code}</p>
//             </div>
//             <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
//               <X size={18} />
//             </button>
//           </div>
//         </div>

//         <div className="px-6 py-4 space-y-3">
//           {slots.map((slot, i) => (
//             <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-xs font-semibold text-gray-500">Slot {i + 1}</span>
//                 {slots.length > 1 && (
//                   <button onClick={() => removeSlot(i)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition">
//                     <Trash2 size={14} />
//                   </button>
//                 )}
//               </div>

//               <div>
//                 <label className="text-xs text-gray-400 mb-1.5 block">Day</label>
//                 <div className="flex flex-wrap gap-1.5">
//                   {DAYS.map((day) => (
//                     <button
//                       key={day}
//                       onClick={() => updateSlot(i, "day", day)}
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 transition ${
//                         slot.day === day ? DAY_COLORS[day] : "bg-white text-gray-500 ring-gray-200 hover:bg-gray-50"
//                       }`}
//                     >
//                       {day.slice(0, 3)}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="text-xs text-gray-400 mb-1.5 block">Start</label>
//                   <input type="time" value={slot.start_time} onChange={(e) => updateSlot(i, "start_time", e.target.value)}
//                     className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-slate-200" />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-400 mb-1.5 block">End</label>
//                   <input type="time" value={slot.end_time} onChange={(e) => updateSlot(i, "end_time", e.target.value)}
//                     className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-slate-200" />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-400 mb-1.5 block">Room</label>
//                 <input type="text" value={slot.room} onChange={(e) => updateSlot(i, "room", e.target.value)}
//                   placeholder="e.g. Room A-203"
//                   className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-slate-200" />
//               </div>
//             </div>
//           ))}

//           <button onClick={addSlot}
//             className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-gray-400 font-medium hover:border-slate-300 hover:text-slate-500 transition flex items-center justify-center gap-2">
//             <Plus size={15} />
//             Add another slot
//           </button>
//         </div>

//         <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100">
//           {err && <p className="text-xs text-rose-500 mb-3">{err}</p>}
//           <button onClick={handleSave} disabled={saving}
//             className="w-full py-3 rounded-2xl bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-60">
//             {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
//             {saving ? "Saving..." : "Save Schedule"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // COURSE CARD
// // ============================================================
// function CourseCard({
//   course, onManageSchedule, onManageGrades, onManageOverview,
// }: {
//   course: Course;
//   onManageSchedule: (course: Course) => void;
//   onManageGrades: (courseId: string) => void;
//   onManageOverview: (course: Course) => void; // ✅ جديد
// }) {
//   const [expanded, setExpanded] = useState(false);
//   const hasSchedule = course.schedule && course.schedule.length > 0;
//   const hasOverview = !!(course.description || (course.learning_objectives?.length ?? 0) > 0);

//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
//       <div className="p-5">
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
//               <BookOpen size={16} className="text-slate-600" />
//             </div>
//             <div>
//               <h3 className="text-base font-bold text-gray-900 leading-tight">{course.name}</h3>
//               <p className="text-xs text-gray-400 mt-0.5">{course.code}</p>
//             </div>
//           </div>
//           <span className="shrink-0 text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
//             {course.credits} cr
//           </span>
//         </div>

//         {/* Stats */}
//         <div className="mt-4 grid grid-cols-3 gap-2 text-center">
//           <div className="rounded-2xl bg-gray-50 py-2.5">
//             <p className="text-sm font-bold text-gray-900">{course.students?.length ?? 0}</p>
//             <p className="text-[11px] text-gray-400 mt-0.5">Students</p>
//           </div>
//           <div className="rounded-2xl bg-gray-50 py-2.5">
//             <p className="text-sm font-bold text-gray-900">{course.professors?.length ?? 0}</p>
//             <p className="text-[11px] text-gray-400 mt-0.5">Professors</p>
//           </div>
//           <div className="rounded-2xl bg-gray-50 py-2.5">
//             <p className="text-sm font-bold text-gray-900">{course.schedule?.length ?? 0}</p>
//             <p className="text-[11px] text-gray-400 mt-0.5">Slots</p>
//           </div>
//         </div>

//         {/* Schedule preview */}
//         {hasSchedule && (
//           <div className="mt-3 space-y-1.5">
//             {course.schedule.slice(0, expanded ? undefined : 2).map((slot, i) => (
//               <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
//                 <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DAY_DOT[slot.day]}`} />
//                 <span className="font-medium text-gray-700 w-16 shrink-0">{slot.day.slice(0, 3)}</span>
//                 <Clock size={11} className="shrink-0" />
//                 <span>{slot.start_time} – {slot.end_time}</span>
//                 {slot.room && (
//                   <>
//                     <MapPin size={11} className="shrink-0 ml-1" />
//                     <span className="truncate">{slot.room}</span>
//                   </>
//                 )}
//               </div>
//             ))}
//             {course.schedule.length > 2 && (
//               <button onClick={() => setExpanded(!expanded)}
//                 className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition mt-1">
//                 {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
//                 {expanded ? "Show less" : `+${course.schedule.length - 2} more`}
//               </button>
//             )}
//           </div>
//         )}

//         {/* Overview preview */}
//         {hasOverview && course.description && (
//           <p className="mt-3 text-xs text-gray-400 line-clamp-2 leading-relaxed">
//             {course.description}
//           </p>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="px-5 pb-5 space-y-2">
//         {/* ✅ Overview button جديد */}
//         <button
//           onClick={() => onManageOverview(course)}
//           className={`w-full py-2.5 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
//             hasOverview
//               ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
//               : "bg-slate-950 text-white hover:bg-slate-800"
//           }`}
//         >
//           <FileText size={14} />
//           {hasOverview ? "Edit Overview" : "Add Overview"}
//         </button>

//         <button
//           onClick={() => onManageSchedule(course)}
//           className={`w-full py-2.5 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
//             hasSchedule
//               ? "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
//               : "bg-slate-950 text-white hover:bg-slate-800"
//           }`}
//         >
//           <CalendarDays size={14} />
//           {hasSchedule ? "Edit Schedule" : "Add Schedule"}
//         </button>

//         <button
//           onClick={() => onManageGrades(course._id)}
//           className="w-full rounded-2xl border border-rose-200 bg-rose-50 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
//         >
//           Manage Final Grades
//         </button>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // MAIN PAGE
// // ============================================================
// export default function AdminCoursesPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [courses, setCourses]             = useState<Course[]>([]);
//   const [search, setSearch]               = useState("");
//   const [loading, setLoading]             = useState(true);
//   const [error, setError]                 = useState("");
//   const [selectedCourse, setSelectedCourse]           = useState<Course | null>(null);
//   const [overviewCourse, setOverviewCourse]           = useState<Course | null>(null); // ✅ جديد
//   const [professors, setProfessors] = useState<ProfessorLite[]>([]);
//   const [createError, setCreateError] = useState("");
//   const [assignError, setAssignError] = useState("");
//   const [creating, setCreating] = useState(false);
//   const [assigning, setAssigning] = useState(false);
//   const [createForm, setCreateForm] = useState({
//     code: "",
//     name: "",
//     credits: 3,
//     maxEnrollment: 200,
//     academicYears: [] as number[],
//   });
//   const [assignForm, setAssignForm] = useState({
//     courseId: "",
//     professorIds: [] as string[],
//   });

//   useEffect(() => {
//     if (status === "unauthenticated") router.push("/admin/login");
//   }, [status, router]);

//   const fetchCourses = useCallback(async () => {
//     if (!session?.token) return;
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetch(`${API_BASE_URL}/admin/courses`, {
//         headers: { Authorization: `Bearer ${session.token}` },
//         cache: "no-store",
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Failed");
//       setCourses(data.data || []);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }, [session?.token]);

//   useEffect(() => {
//     if (status === "authenticated") fetchCourses();
//   }, [status, fetchCourses]);

//   const fetchProfessors = useCallback(async () => {
//     if (!session?.token) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/admin/professors`, {
//         headers: { Authorization: `Bearer ${session.token}` },
//         cache: "no-store",
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Failed");
//       setProfessors(data.data || []);
//     } catch (e) {
//       console.error("Fetch professors failed:", e);
//     }
//   }, [session?.token]);

//   useEffect(() => {
//     if (status === "authenticated") fetchProfessors();
//   }, [status, fetchProfessors]);

//   const filtered = courses.filter(
//     (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
//   );

//   function handleSaved(updated: Course) {
//     setCourses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
//   }

//   async function handleCreateCourse() {
//     if (!session?.token) return;
//     setCreateError("");
//     setCreating(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/admin/courses`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${session.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(createForm),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Failed to create course");
//       setCreateForm({ code: "", name: "", credits: 3, maxEnrollment: 200, academicYears: [] });
//       await fetchCourses();
//     } catch (e) {
//       setCreateError(e instanceof Error ? e.message : "Failed to create course");
//     } finally {
//       setCreating(false);
//     }
//   }

//   async function handleAssignProfessors() {
//     if (!session?.token || !assignForm.courseId || assignForm.professorIds.length === 0) return;
//     setAssignError("");
//     setAssigning(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/admin/courses/${assignForm.courseId}/assign-professors`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${session.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ professorIds: assignForm.professorIds }),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Failed to assign professors");
//       await fetchCourses();
//     } catch (e) {
//       setAssignError(e instanceof Error ? e.message : "Failed to assign professors");
//     } finally {
//       setAssigning(false);
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-900">Course Management</h1>
//           <p className="mt-1 text-sm text-gray-500">View courses and manage their schedules and overviews</p>
//         </div>
//       </div>

//       <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
//         <div className="relative">
//           <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search courses..."
//             className="w-full rounded-2xl bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none ring-1 ring-gray-100 transition focus:ring-2 focus:ring-slate-200"
//           />
//         </div>
//       </div>

//       <div className="grid gap-4 lg:grid-cols-2">
//         <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
//           <h3 className="text-lg font-semibold text-gray-900">Create Course</h3>
//           <input
//             value={createForm.code}
//             onChange={(e) => setCreateForm((prev) => ({ ...prev, code: e.target.value }))}
//             placeholder="Course code (e.g. CS101)"
//             className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
//           />
//           <input
//             value={createForm.name}
//             onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
//             placeholder="Course name"
//             className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
//           />
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="number"
//               min={1}
//               max={6}
//               value={createForm.credits}
//               onChange={(e) => setCreateForm((prev) => ({ ...prev, credits: Number(e.target.value || 3) }))}
//               placeholder="Credits"
//               className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
//             />
//             <input
//               type="number"
//               min={1}
//               value={createForm.maxEnrollment}
//               onChange={(e) => setCreateForm((prev) => ({ ...prev, maxEnrollment: Number(e.target.value || 200) }))}
//               placeholder="Max enrollment"
//               className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
//             />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 mb-2">Academic years</p>
//             <div className="flex gap-2 flex-wrap">
//               {[1, 2, 3, 4, 5].map((year) => {
//                 const selected = createForm.academicYears.includes(year);
//                 return (
//                   <button
//                     key={year}
//                     type="button"
//                     onClick={() =>
//                       setCreateForm((prev) => ({
//                         ...prev,
//                         academicYears: selected ? [] : [year],
//                       }))
//                     }
//                     className={`px-3 py-1 rounded-full text-xs border ${selected ? "bg-slate-900 text-white border-slate-900" : "bg-white text-gray-600 border-gray-300"}`}
//                   >
//                     Year {year}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//           {createError ? <p className="text-xs text-rose-500">{createError}</p> : null}
//           <button
//             onClick={handleCreateCourse}
//             disabled={creating}
//             className="w-full rounded-xl bg-slate-950 text-white py-2.5 text-sm font-semibold disabled:opacity-60"
//           >
//             {creating ? "Creating..." : "Create course"}
//           </button>
//         </div>

//         <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
//           <h3 className="text-lg font-semibold text-gray-900">Assign Course To Professor</h3>
//           <select
//             value={assignForm.courseId}
//             onChange={(e) => setAssignForm((prev) => ({ ...prev, courseId: e.target.value }))}
//             className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
//           >
//             <option value="">Select course</option>
//             {courses.map((course) => (
//               <option key={course._id} value={course._id}>
//                 {course.code} - {course.name}
//               </option>
//             ))}
//           </select>
//           <select
//             multiple
//             value={assignForm.professorIds}
//             onChange={(e) =>
//               setAssignForm((prev) => ({
//                 ...prev,
//                 professorIds: Array.from(e.target.selectedOptions).map((option) => option.value),
//               }))
//             }
//             className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm min-h-[130px]"
//           >
//             {professors.map((professor) => (
//               <option key={professor._id} value={professor._id}>
//                 {(professor.name || professor.full_name || "Professor")} - {professor.email || "no email"}
//               </option>
//             ))}
//           </select>
//           <p className="text-xs text-gray-500">Use Ctrl + click to select multiple professors.</p>
//           {assignError ? <p className="text-xs text-rose-500">{assignError}</p> : null}
//           <button
//             onClick={handleAssignProfessors}
//             disabled={assigning}
//             className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold disabled:opacity-60"
//           >
//             {assigning ? "Assigning..." : "Assign professor(s)"}
//           </button>
//         </div>
//       </div>

//       <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-500 shadow-sm ring-1 ring-gray-100">
//         Showing {filtered.length} of {courses.length} courses
//       </div>

//       {loading ? (
//         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="h-64 animate-pulse rounded-3xl border border-gray-200 bg-white" />
//           ))}
//         </div>
//       ) : error ? (
//         <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">{error}</div>
//       ) : filtered.length === 0 ? (
//         <div className="rounded-3xl border border-gray-100 bg-white py-20 text-center text-sm text-gray-400">No courses found 📚</div>
//       ) : (
//         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {filtered.map((course) => (
//             <CourseCard
//               key={course._id}
//               course={course}
//               onManageSchedule={setSelectedCourse}
//               onManageOverview={setOverviewCourse}
//               onManageGrades={(courseId) => router.push(`/admin/admindashboard/courses/${courseId}/grades`)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Schedule Modal */}
//       {selectedCourse && session?.token && (
//         <ScheduleModal
//           course={selectedCourse}
//           token={session.token}
//           onClose={() => setSelectedCourse(null)}
//           onSaved={handleSaved}
//         />
//       )}

//       {/* Overview Modal ✅ جديد */}
//       {overviewCourse && session?.token && (
//         <OverviewModal
//           course={overviewCourse}
//           token={session.token}
//           onClose={() => setOverviewCourse(null)}
//           onSaved={handleSaved}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Search, Plus, X, Clock, MapPin, BookOpen,
  ChevronDown, ChevronUp, Trash2, Save,
  CalendarDays, FileText, Target,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
type ScheduleSlot = {
  _id?: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  start_time: string;
  end_time: string;
  room: string;
};

type Course = {
  _id: string;
  name: string;
  code: string;
  description?: string;
  learning_objectives?: string[];
  credits: number;
  academicYears?: number[];
  maxEnrollment?: number;
  professors: { _id: string; full_name?: string; name?: string }[];
  students: string[];
  schedule: ScheduleSlot[];
};

type ProfessorLite = {
  _id: string;
  name?: string;
  full_name?: string;
  email?: string;
};

const API_BASE_URL = "http://localhost:5000/api";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const DAY_COLORS: Record<string, string> = {
  Monday:    "bg-blue-50 text-blue-700 ring-blue-200",
  Tuesday:   "bg-violet-50 text-violet-700 ring-violet-200",
  Wednesday: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Thursday:  "bg-amber-50 text-amber-700 ring-amber-200",
  Friday:    "bg-rose-50 text-rose-700 ring-rose-200",
};

const DAY_DOT: Record<string, string> = {
  Monday:    "bg-blue-500",
  Tuesday:   "bg-violet-500",
  Wednesday: "bg-emerald-500",
  Thursday:  "bg-amber-500",
  Friday:    "bg-rose-500",
};

function emptySlot(): ScheduleSlot {
  return { day: "Monday", start_time: "09:00", end_time: "10:30", room: "" };
}

// ============================================================
// OVERVIEW MODAL
// ============================================================
function OverviewModal({
  course, token, onClose, onSaved,
}: {
  course: Course;
  token: string;
  onClose: () => void;
  onSaved: (updated: Course) => void;
}) {
  const [description, setDescription] = useState(course.description || "");
  const [objectives, setObjectives] = useState<string[]>(
    course.learning_objectives?.length ? course.learning_objectives : [""]
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  function addObjective() { setObjectives((prev) => [...prev, ""]); }
  function removeObjective(index: number) { setObjectives((prev) => prev.filter((_, i) => i !== index)); }
  function updateObjective(index: number, value: string) {
    setObjectives((prev) => prev.map((o, i) => (i === index ? value : o)));
  }

  async function handleSave() {
    setSaving(true);
    setErr("");
    setSuccess(false);
    const cleanObjectives = objectives.filter((o) => o.trim() !== "");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/courses/${course._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim(), learning_objectives: cleanObjectives }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");
      setSuccess(true);
      onSaved({ ...course, description: description.trim(), learning_objectives: cleanObjectives });
      setTimeout(() => onClose(), 800);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">

        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText size={16} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Course Overview</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{course.name}</h2>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{course.code}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 space-y-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText size={12} className="text-blue-500" />
              Course Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description..."
              rows={4}
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-gray-600 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target size={12} className="text-green-500" />
              Learning Objectives
            </label>
            <div className="space-y-2">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={obj}
                    onChange={(e) => updateObjective(i, e.target.value)}
                    placeholder={`Objective ${i + 1}...`}
                    className="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-gray-600"
                  />
                  {objectives.length > 1 && (
                    <button onClick={() => removeObjective(i)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addObjective}
              className="mt-3 w-full py-2.5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 text-sm text-gray-400 dark:text-gray-500 font-medium hover:border-slate-300 dark:hover:border-gray-500 hover:text-slate-500 dark:hover:text-gray-400 transition flex items-center justify-center gap-2">
              <Plus size={14} />
              Add objective
            </button>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          {err && <p className="text-xs text-rose-500 mb-3">{err}</p>}
          {success && <p className="text-xs text-green-600 mb-3">✓ Saved successfully!</p>}
          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 rounded-2xl bg-slate-950 dark:bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
            {saving ? "Saving..." : "Save Overview"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCHEDULE MODAL
// ============================================================
function ScheduleModal({
  course, token, onClose, onSaved,
}: {
  course: Course;
  token: string;
  onClose: () => void;
  onSaved: (updated: Course) => void;
}) {
  const [slots, setSlots] = useState<ScheduleSlot[]>(
    course.schedule.length > 0 ? course.schedule : [emptySlot()]
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function addSlot() { setSlots((prev) => [...prev, emptySlot()]); }
  function removeSlot(index: number) { setSlots((prev) => prev.filter((_, i) => i !== index)); }
  function updateSlot(index: number, field: keyof ScheduleSlot, value: string) {
    setSlots((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  async function handleSave() {
    setSaving(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/courses/${course._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ schedule: slots }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");
      onSaved({ ...course, schedule: slots });
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">

        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays size={16} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Schedule</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{course.name}</h2>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{course.code}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 space-y-3">
          {slots.map((slot, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Slot {i + 1}</span>
                {slots.length > 1 && (
                  <button onClick={() => removeSlot(i)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-400 dark:text-gray-500 mb-1.5 block">Day</label>
                <div className="flex flex-wrap gap-1.5">
                  {DAYS.map((day) => (
                    <button key={day} onClick={() => updateSlot(i, "day", day)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 transition ${
                        slot.day === day ? DAY_COLORS[day] : "bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-300 ring-gray-200 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500"
                      }`}>
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 dark:text-gray-500 mb-1.5 block">Start</label>
                  <input type="time" value={slot.start_time} onChange={(e) => updateSlot(i, "start_time", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-gray-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 dark:text-gray-500 mb-1.5 block">End</label>
                  <input type="time" value={slot.end_time} onChange={(e) => updateSlot(i, "end_time", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-gray-600" />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 dark:text-gray-500 mb-1.5 block">Room</label>
                <input type="text" value={slot.room} onChange={(e) => updateSlot(i, "room", e.target.value)}
                  placeholder="e.g. Room A-203"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-gray-600" />
              </div>
            </div>
          ))}

          <button onClick={addSlot}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 text-sm text-gray-400 dark:text-gray-500 font-medium hover:border-slate-300 dark:hover:border-gray-500 hover:text-slate-500 transition flex items-center justify-center gap-2">
            <Plus size={15} />
            Add another slot
          </button>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          {err && <p className="text-xs text-rose-500 mb-3">{err}</p>}
          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 rounded-2xl bg-slate-950 dark:bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
            {saving ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COURSE CARD
// ============================================================
function CourseCard({
  course, onManageSchedule, onManageGrades, onManageOverview,
}: {
  course: Course;
  onManageSchedule: (course: Course) => void;
  onManageGrades: (courseId: string) => void;
  onManageOverview: (course: Course) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasSchedule = course.schedule && course.schedule.length > 0;
  const hasOverview = !!(course.description || (course.learning_objectives?.length ?? 0) > 0);

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <BookOpen size={16} className="text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{course.name}</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{course.code}</p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
            {course.credits} cr
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-700/50 py-2.5">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{course.students?.length ?? 0}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Students</p>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-700/50 py-2.5">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{course.professors?.length ?? 0}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Professors</p>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-700/50 py-2.5">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{course.schedule?.length ?? 0}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Slots</p>
          </div>
        </div>

        {hasSchedule && (
          <div className="mt-3 space-y-1.5">
            {course.schedule.slice(0, expanded ? undefined : 2).map((slot, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DAY_DOT[slot.day]}`} />
                <span className="font-medium text-gray-700 dark:text-gray-300 w-16 shrink-0">{slot.day.slice(0, 3)}</span>
                <Clock size={11} className="shrink-0" />
                <span>{slot.start_time} – {slot.end_time}</span>
                {slot.room && (
                  <>
                    <MapPin size={11} className="shrink-0 ml-1" />
                    <span className="truncate">{slot.room}</span>
                  </>
                )}
              </div>
            ))}
            {course.schedule.length > 2 && (
              <button onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition mt-1">
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {expanded ? "Show less" : `+${course.schedule.length - 2} more`}
              </button>
            )}
          </div>
        )}

        {hasOverview && course.description && (
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        )}
      </div>

      <div className="px-5 pb-5 space-y-2">
        <button onClick={() => onManageOverview(course)}
          className={`w-full py-2.5 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
            hasOverview
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800"
              : "bg-slate-950 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600"
          }`}>
          <FileText size={14} />
          {hasOverview ? "Edit Overview" : "Add Overview"}
        </button>

        <button onClick={() => onManageSchedule(course)}
          className={`w-full py-2.5 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
            hasSchedule
              ? "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
              : "bg-slate-950 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600"
          }`}>
          <CalendarDays size={14} />
          {hasSchedule ? "Edit Schedule" : "Add Schedule"}
        </button>

        <button onClick={() => onManageGrades(course._id)}
          className="w-full rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 py-2.5 text-sm font-semibold text-rose-700 dark:text-rose-400 transition hover:bg-rose-100 dark:hover:bg-rose-900/40">
          Manage Final Grades
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function AdminCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [overviewCourse, setOverviewCourse] = useState<Course | null>(null);
  const [professors, setProfessors] = useState<ProfessorLite[]>([]);
  const [createError, setCreateError] = useState("");
  const [assignError, setAssignError] = useState("");
  const [creating, setCreating] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [createForm, setCreateForm] = useState({
    code: "", name: "", credits: 3, maxEnrollment: 200, academicYears: [] as number[],
  });
  const [assignForm, setAssignForm] = useState({
    courseId: "", professorIds: [] as string[],
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  const fetchCourses = useCallback(async () => {
    if (!session?.token) return;
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/admin/courses`, {
        headers: { Authorization: `Bearer ${session.token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");
      setCourses(data.data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  const fetchProfessors = useCallback(async () => {
    if (!session?.token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/professors`, {
        headers: { Authorization: `Bearer ${session.token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");
      setProfessors(data.data || []);
    } catch (e) {
      console.error("Fetch professors failed:", e);
    }
  }, [session?.token]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCourses();
      fetchProfessors();
    }
  }, [status, fetchCourses, fetchProfessors]);

  const filtered = courses.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
  );

  function handleSaved(updated: Course) {
    setCourses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
  }

  async function handleCreateCourse() {
    if (!session?.token) return;
    setCreateError("");
    setCreating(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/courses`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.token}`, "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to create course");
      setCreateForm({ code: "", name: "", credits: 3, maxEnrollment: 200, academicYears: [] });
      await fetchCourses();
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : "Failed to create course");
    } finally {
      setCreating(false);
    }
  }

  async function handleAssignProfessors() {
    if (!session?.token || !assignForm.courseId || assignForm.professorIds.length === 0) return;
    setAssignError("");
    setAssigning(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/courses/${assignForm.courseId}/assign-professors`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${session.token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ professorIds: assignForm.professorIds }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to assign professors");
      await fetchCourses();
    } catch (e) {
      setAssignError(e instanceof Error ? e.message : "Failed to assign professors");
    } finally {
      setAssigning(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Course Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View courses and manage their schedules and overviews</p>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-2xl bg-gray-50 dark:bg-gray-700 py-3 pl-11 pr-4 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none ring-1 ring-gray-100 dark:ring-gray-600 transition focus:ring-2 focus:ring-slate-200 dark:focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Create & Assign */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Course</h3>
          <input
            value={createForm.code}
            onChange={(e) => setCreateForm((prev) => ({ ...prev, code: e.target.value }))}
            placeholder="Course code (e.g. CS101)"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
          <input
            value={createForm.name}
            onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Course name"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <input type="number" min={1} max={6} value={createForm.credits}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, credits: Number(e.target.value || 3) }))}
              placeholder="Credits"
              className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none" />
            <input type="number" min={1} value={createForm.maxEnrollment}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, maxEnrollment: Number(e.target.value || 200) }))}
              placeholder="Max enrollment"
              className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Academic years</p>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((year) => {
                const selected = createForm.academicYears.includes(year);
                return (
                  <button key={year} type="button"
                    onClick={() => setCreateForm((prev) => ({ ...prev, academicYears: selected ? [] : [year] }))}
                    className={`px-3 py-1 rounded-full text-xs border transition ${selected ? "bg-slate-900 dark:bg-slate-600 text-white border-slate-900 dark:border-slate-600" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"}`}>
                    Year {year}
                  </button>
                );
              })}
            </div>
          </div>
          {createError && <p className="text-xs text-rose-500">{createError}</p>}
          <button onClick={handleCreateCourse} disabled={creating}
            className="w-full rounded-xl bg-slate-950 dark:bg-slate-700 text-white py-2.5 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-60 transition">
            {creating ? "Creating..." : "Create course"}
          </button>
        </div>

        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Course To Professor</h3>
          <select value={assignForm.courseId}
            onChange={(e) => setAssignForm((prev) => ({ ...prev, courseId: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none">
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.code} - {course.name}</option>
            ))}
          </select>
          <select multiple value={assignForm.professorIds}
            onChange={(e) => setAssignForm((prev) => ({ ...prev, professorIds: Array.from(e.target.selectedOptions).map((o) => o.value) }))}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none min-h-[130px]">
            {professors.map((professor) => (
              <option key={professor._id} value={professor._id}>
                {professor.name || professor.full_name || "Professor"} - {professor.email || "no email"}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400">Use Ctrl + click to select multiple professors.</p>
          {assignError && <p className="text-xs text-rose-500">{assignError}</p>}
          <button onClick={handleAssignProfessors} disabled={assigning}
            className="w-full rounded-xl bg-blue-600 dark:bg-blue-700 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-60 transition">
            {assigning ? "Assigning..." : "Assign professor(s)"}
          </button>
        </div>
      </div>

      {/* Count */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-500 dark:text-gray-400 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
        Showing {filtered.length} of {courses.length} courses
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-5 py-4 text-sm text-red-600 dark:text-red-400">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 py-20 text-center text-sm text-gray-400 dark:text-gray-500">No courses found 📚</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onManageSchedule={setSelectedCourse}
              onManageOverview={setOverviewCourse}
              onManageGrades={(courseId) => router.push(`/admin/admindashboard/courses/${courseId}/grades`)}
            />
          ))}
        </div>
      )}

      {selectedCourse && session?.token && (
        <ScheduleModal course={selectedCourse} token={session.token} onClose={() => setSelectedCourse(null)} onSaved={handleSaved} />
      )}

      {overviewCourse && session?.token && (
        <OverviewModal course={overviewCourse} token={session.token} onClose={() => setOverviewCourse(null)} onSaved={handleSaved} />
      )}
    </div>
  );
}