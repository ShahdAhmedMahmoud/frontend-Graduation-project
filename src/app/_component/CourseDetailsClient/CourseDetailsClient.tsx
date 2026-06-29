// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import submitAssignment from "@/CardActions/uploadAssignment.action";
// import {
//   BookOpen, FileText, Monitor, Video,
//   ClipboardList, BookMarked, LayoutDashboard,
//   Download, User, CreditCard, ChevronRight,
//   ExternalLink, Calendar, CheckCircle2, Upload,
//   ArrowLeft, Clock, QrCode, Target, BarChart2,
// } from "lucide-react";

// interface Slide {
//   _id?: string;
//   title: string;
//   fileUrl: string;
//   uploadedAt: string;
//   professor?: { name?: string } | any;
// }

// interface Submission {
//   _id: string;
//   file: string;
//   submitted_at: string;
// }

// interface Assignment {
//   _id: string;
//   title: string;
//   description: string;
//   file: string | null;
//   deadline: string;
//   points?: number;
//   submissions?: Submission[];
//   course?: { name?: string } | any;
// }

// interface CourseDetailsClientProps {
//   courseId: string;
//   courseInfo?: any;
//   slides: Slide[];
//   sheets: Slide[];
//   books: Slide[];       
//   assignments: Assignment[];
//   token: string;
// }

// const tabs = [
//   { id: "overview",    label: "Overview",    icon: LayoutDashboard },
//   { id: "lectures",    label: "Lectures",    icon: Monitor },
//   { id: "sheets",      label: "Sheets",      icon: FileText },
//   { id: "recordings",  label: "Recordings",  icon: Video },
//   { id: "assignments", label: "Assignments", icon: ClipboardList },
//   // { id: "references",  label: "References",  icon: BookMarked },
//   { id: "book",        label: "Book",        icon: BookOpen },
// ];

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     weekday: "short", year: "numeric", month: "short", day: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   });
// }

// function formatDateShort(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     year: "numeric", month: "short", day: "numeric",
//   });
// }

// function isOverdue(deadline: string) {
//   return new Date(deadline) < new Date();
// }

// // ─── Overview Tab ─────────────────────────────────────────────────────────────
// function OverviewTab({
//   courseInfo,
//   assignments,
//   slides,
// }: {
//   courseInfo: any;
//   assignments: Assignment[];
//   slides: Slide[];
// }) {
//   const description        = courseInfo?.description || "";
//   const learningObjectives: string[] = courseInfo?.learning_objectives || [];
//   const totalAssignments   = assignments.length;
//   const completedCount     = assignments.filter(a => (a.submissions?.length ?? 0) > 0).length;
//   const totalLectures      = courseInfo?.totalLectures || slides.length || 0;

//   const grades: any[] = courseInfo?.grades || [];
//   const avgGrade = grades.length > 0
//     ? Math.round(grades.reduce((sum: number, g: any) => sum + (g.grade || 0), 0) / grades.length)
//     : null;

//   return (
//     <div className="space-y-4">

//       {/* Course Description */}
//       {description ? (
//         <div className="border border-gray-100 rounded-xl p-4 sm:p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//             <FileText size={14} className="text-blue-500" />
//             Course Description
//           </h3>
//           <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
//         </div>
//       ) : (
//         <div className="border border-dashed border-gray-200 rounded-xl p-4 text-center text-gray-400">
//           <p className="text-sm">No description available yet</p>
//         </div>
//       )}

//       {/* Learning Objectives */}
//       {learningObjectives.length > 0 && (
//         <div className="border border-gray-100 rounded-xl p-4 sm:p-5">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//             <Target size={14} className="text-green-500" />
//             Learning Objectives
//           </h3>
//           <ul className="space-y-2">
//             {learningObjectives.map((obj, i) => (
//               <li key={i} className="flex items-start gap-2.5">
//                 <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                   {i + 1}
//                 </span>
//                 <span className="text-sm text-gray-600 leading-relaxed">{obj}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Quick Stats */}
//       <div className="border border-gray-100 rounded-xl p-4 sm:p-5">
//         <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//           <BarChart2 size={14} className="text-purple-500" />
//           Quick Stats
//         </h3>
//         <div className="grid grid-cols-2 gap-3">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <p className="text-xl font-bold text-gray-800">{totalAssignments}</p>
//             <p className="text-xs text-gray-400 mt-1 leading-tight">Total Assignments</p>
//           </div>
//           <div className="bg-green-50 rounded-xl p-3 text-center">
//             <p className="text-xl font-bold text-green-600">{completedCount}</p>
//             <p className="text-xs text-gray-400 mt-1 leading-tight">Completed</p>
//           </div>
//           {avgGrade !== null && (
//             <div className="bg-blue-50 rounded-xl p-3 text-center">
//               <p className="text-xl font-bold text-blue-600">{avgGrade}%</p>
//               <p className="text-xs text-gray-400 mt-1 leading-tight">Current Grade</p>
//             </div>
//           )}
//           <div className="bg-purple-50 rounded-xl p-3 text-center">
//             <p className="text-xl font-bold text-purple-600">{totalLectures}</p>
//             <p className="text-xs text-gray-400 mt-1 leading-tight">Lectures</p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// // ─── File List (reusable for Lectures & Sheets) ───────────────────────────────
// function FileList({
//   files,
//   emptyIcon: EmptyIcon,
//   emptyText,
//   iconBg,
//   iconColor,
// }: {
//   files: Slide[];
//   emptyIcon: any;
//   emptyText: string;
//   iconBg: string;
//   iconColor: string;
// }) {
//   if (files.length === 0) {
//     return (
//       <div className="py-12 text-center text-gray-400">
//         <EmptyIcon size={40} className="mx-auto mb-3 opacity-30" />
//         <p className="text-sm">{emptyText}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="divide-y divide-gray-50">
//       {files.map((file, index) => (
//         <div
//           key={file._id || index}
//           className="flex items-center justify-between py-3 sm:py-4 group hover:bg-gray-50 -mx-2 px-2 sm:-mx-4 sm:px-4 rounded-xl transition-colors"
//         >
//           <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//             <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
//               <FileText size={15} className={iconColor} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-sm font-medium text-gray-800 truncate">{file.title}</p>
//               <p className="text-xs text-gray-400 mt-0.5">
//                 {formatDateShort(file.uploadedAt)}
//                 {file.professor?.name && <span className="ml-2">· {file.professor.name}</span>}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
//             <a
//               href={`http://localhost:5000${file.fileUrl}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
//             >
//               <ExternalLink size={14} />
//             </a>
//             <a
//               href={`http://localhost:5000${file.fileUrl}`}
//               download={file.title}
//               className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
//             >
//               <Download size={15} />
//             </a>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── Assignment Detail View ───────────────────────────────────────────────────
// function AssignmentDetail({
//   assignment, courseInfo, onBack, isSubmitted, onSubmitSuccess,
// }: {
//   assignment: Assignment;
//   courseInfo: any;
//   onBack: () => void;
//   isSubmitted: boolean;
//   onSubmitSuccess: () => void;
// }) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [notes, setNotes] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [done, setDone] = useState(isSubmitted);

//   const overdue    = isOverdue(assignment.deadline);
//   const courseName = courseInfo?.name || courseInfo?.title || "Course";
//   const courseCode = courseInfo?.code || "";

//   const handleSubmit = async () => {
//     if (!selectedFile) return;
//     setUploading(true);
//     try {
//       await submitAssignment(assignment._id, selectedFile);
//       setDone(true);
//       onSubmitSuccess();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit assignment");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={onBack}
//         className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4"
//       >
//         <ArrowLeft size={14} />
//         Assignments
//       </button>

//       <div className="border border-gray-100 rounded-xl p-4 sm:p-5 mb-4">
//         <div className="flex items-center gap-2 mb-3 flex-wrap">
//           <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
//             {courseCode || courseName}
//           </span>
//           {done ? (
//             <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Completed</span>
//           ) : overdue ? (
//             <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Overdue</span>
//           ) : (
//             <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Pending</span>
//           )}
//         </div>

//         <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{assignment.title}</h2>
//         <p className="text-sm text-gray-500 mb-4">{courseName}</p>

//         {assignment.points !== undefined && (
//           <p className="text-sm font-medium text-gray-700 mb-4">
//             Points: <span className="font-bold">{assignment.points}</span>
//           </p>
//         )}

//         <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 sm:p-4">
//           <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
//             <Calendar size={14} className="text-gray-500" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-400 mb-0.5">Due Date</p>
//             <p className={`text-sm font-medium ${overdue ? "text-red-500" : "text-gray-800"}`}>
//               {formatDate(assignment.deadline)}
//             </p>
//             {assignment.file && (
//               <a
//                 href={`http://localhost:5000${assignment.file}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
//               >
//                 <Download size={11} />
//                 Available
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {assignment.description && (
//         <div className="border border-gray-100 rounded-xl p-4 sm:p-5 mb-4">
//           <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
//           <p className="text-sm text-gray-500 leading-relaxed">{assignment.description}</p>
//         </div>
//       )}

//       {!done ? (
//         <div className="border border-gray-100 rounded-xl p-4 sm:p-5">
//           <h3 className="text-sm font-semibold text-gray-800 mb-1">Submit Your Work</h3>
//           <p className="text-xs text-gray-400 mb-4">Upload your assignment file and add notes</p>

//           <p className="text-xs font-medium text-gray-600 mb-2">Assignment File</p>
//           <label className="block w-full border-2 border-dashed border-gray-200 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all mb-4 group">
//             <Upload size={20} className="mx-auto mb-2 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <p className="text-sm text-gray-400 group-hover:text-blue-500 transition-colors">
//               {selectedFile ? selectedFile.name : "Tap to upload file"}
//             </p>
//             {!selectedFile && (
//               <p className="text-xs text-gray-300 mt-1">PDF, DOC, DOCX, TXT, ZIP (max 10MB)</p>
//             )}
//             <input
//               type="file"
//               className="hidden"
//               onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//             />
//           </label>

//           <p className="text-xs font-medium text-gray-600 mb-2">Additional Notes (Optional)</p>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="Add any comments about your submission..."
//             rows={3}
//             className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:border-blue-400 mb-4"
//           />

//           <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
//             <Clock size={12} />
//             Submission will be timestamped upon upload
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={!selectedFile || uploading}
//             className="w-full py-3 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//           >
//             {uploading ? "Uploading..." : "Submit Assignment"}
//           </button>
//         </div>
//       ) : (
//         <div className="border border-green-100 bg-green-50 rounded-xl p-4 sm:p-5 flex items-center gap-3">
//           <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
//           <div>
//             <p className="text-sm font-semibold text-green-700">Assignment Submitted</p>
//             <p className="text-xs text-green-500 mt-0.5">Your work has been submitted successfully</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Assignments List View ────────────────────────────────────────────────────
// function AssignmentsList({
//   assignments, submittedIds, onSelect,
// }: {
//   assignments: Assignment[];
//   submittedIds: string[];
//   onSelect: (a: Assignment) => void;
// }) {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-sm font-semibold text-gray-700">Assignments</h2>
//         <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
//           {assignments.length} {assignments.length === 1 ? "assignment" : "assignments"}
//         </span>
//       </div>

//       {assignments.length === 0 ? (
//         <div className="py-12 text-center text-gray-400">
//           <ClipboardList size={40} className="mx-auto mb-3 opacity-30" />
//           <p className="text-sm">No assignments yet</p>
//         </div>
//       ) : (
//         <div className="divide-y divide-gray-50">
//           {assignments.map((a) => {
//             const overdue        = isOverdue(a.deadline);
//             const hasSubmissions = (a.submissions?.length ?? 0) > 0;
//             const isSubmitted    = submittedIds.includes(a._id) || hasSubmissions;

//             return (
//               <button
//                 key={a._id}
//                 onClick={() => onSelect(a)}
//                 className="w-full flex items-center justify-between py-4 group hover:bg-gray-50 -mx-2 px-2 sm:-mx-4 sm:px-4 rounded-xl transition-colors text-left gap-2"
//               >
//                 <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
//                     isSubmitted ? "border-green-500 bg-green-500" : "border-gray-300 group-hover:border-gray-400"
//                   }`}>
//                     {isSubmitted && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm font-medium text-gray-800 truncate">{a.title}</p>
//                     <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                       <span className={`flex items-center gap-1 text-xs ${overdue && !isSubmitted ? "text-red-400" : "text-gray-400"}`}>
//                         <Calendar size={11} />
//                         Due: {formatDateShort(a.deadline)}
//                       </span>
//                       {a.points !== undefined && (
//                         <span className="text-xs text-gray-400">{a.points} points</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {isSubmitted ? (
//                   <span className="text-xs font-medium text-white bg-gray-800 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
//                     Completed
//                   </span>
//                 ) : (
//                   <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
//                     Pending
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function CourseDetailsClient({
//   courseId,
//   courseInfo,
//   slides = [],
//   sheets = [],
//   books = [],
//   recordings = [],
//   assignments = [],
//   token,
// }: CourseDetailsClientProps) {
//   const [activeTab, setActiveTab]= useState("overview");
//   const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

//   const storageKey = `submitted_assignments_${courseId}`;

//   const [submittedIds, setSubmittedIds] = useState<string[]>(() => {
//     if (typeof window === "undefined") return [];
//     try {
//       const stored = localStorage.getItem(storageKey);
//       return stored ? JSON.parse(stored) : [];
//     } catch {
//       return [];
//     }
//   });

//   const courseName = courseInfo?.name || courseInfo?.title || "Course Details";
//   const courseCode = courseInfo?.code || "";
//   const instructor = courseInfo?.professors?.[0]?.name || courseInfo?.instructor || "";
//   const credits    = courseInfo?.credits || courseInfo?.creditHours || "";
//   const progress   = courseInfo?.progress || 0;

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3">
//         <div className="w-full flex items-center gap-2 text-sm text-gray-500">
//           <Link href="/dashboard/coursesenrollment" className="hover:text-blue-600 transition-colors">
//             Courses
//           </Link>
//           <ChevronRight size={14} className="text-gray-400" />
//           <span className="text-gray-800 font-medium truncate">{courseCode || courseName}</span>
//         </div>
//       </div>

//       <div className="w-full px-3 sm:px-4 py-4 sm:py-6">

//         {/* Course Header */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-4">
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex items-start gap-3 sm:gap-4 min-w-0">
//               <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
//                 <span className="text-white text-xs font-bold">
//                   {courseCode?.slice(0, 2) || courseName?.slice(0, 2) || "CO"}
//                 </span>
//               </div>
//               <div className="min-w-0">
//                 {courseCode && <p className="text-xs font-medium text-blue-600 mb-1">{courseCode}</p>}
//                 <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">{courseName}</h1>
//                 <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 flex-wrap">
//                   {instructor && <span className="flex items-center gap-1.5"><User size={12} /> {instructor}</span>}
//                   {credits    && <span className="flex items-center gap-1.5"><CreditCard size={12} /> {credits} Credits</span>}
//                 </div>
//               </div>
//             </div>

//             {progress > 0 && (
//               <div className="text-right flex-shrink-0 hidden sm:block">
//                 <p className="text-xs text-gray-400 mb-1">Course Progress</p>
//                 <p className="text-3xl font-bold text-gray-900">{progress}%</p>
//                 <div className="w-32 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
//                   <div className="h-full bg-gray-800 rounded-full" style={{ width: `${progress}%` }} />
//                 </div>
//               </div>
//             )}
//           </div>

//           {progress > 0 && (
//             <div className="mt-3 sm:hidden">
//               <div className="flex items-center justify-between mb-1">
//                 <p className="text-xs text-gray-400">Course Progress</p>
//                 <p className="text-sm font-bold text-gray-900">{progress}%</p>
//               </div>
//               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div className="h-full bg-gray-800 rounded-full" style={{ width: `${progress}%` }} />
//               </div>
//             </div>
//           )}

//           <div className="mt-4">
//             <Link
//               href={`/dashboard/coursesenrollment/${courseId}/attendance`}
//               className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
//             >
//               <QrCode size={15} />
//               Scan attendance QR
//             </Link>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="flex border-b border-gray-100">
//             {tabs.map((tab) => {
//               const Icon     = tab.icon;
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     if (tab.id !== "assignments") setSelectedAssignment(null);
//                   }}
//                   className={`flex flex-1 items-center justify-center gap-1.5 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px  ${
//                     isActive
//                       ? "border-blue-600 text-blue-600 bg-blue-50/50"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   <Icon size={13} />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>

//           <div className="p-4 sm:p-6">

//             {/* ── OVERVIEW ── */}
//             {activeTab === "overview" && (
//               <OverviewTab courseInfo={courseInfo} assignments={assignments} slides={slides} />
//             )}

//             {/* ── LECTURES ── */}
//             {activeTab === "lectures" && (
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-sm font-semibold text-gray-700">Lectures</h2>
//                   <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
//                     {slides.length} {slides.length === 1 ? "file" : "files"}
//                   </span>
//                 </div>
//                 <FileList
//                   files={slides}
//                   emptyIcon={Monitor}
//                   emptyText="No lectures uploaded yet"
//                   iconBg="bg-red-50"
//                   iconColor="text-red-500"
//                 />
//               </div>
//             )}

//             {/* ── SHEETS ── */}
//             {activeTab === "sheets" && (
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-sm font-semibold text-gray-700">Sheets</h2>
//                   <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
//                     {sheets.length} {sheets.length === 1 ? "file" : "files"}
//                   </span>
//                 </div>
//                 <FileList
//                   files={sheets}
//                   emptyIcon={FileText}
//                   emptyText="No sheets uploaded yet"
//                   iconBg="bg-blue-50"
//                   iconColor="text-blue-500"
//                 />
//               </div>
//             )}

//             {activeTab === "book" && (
//   <div>
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-sm font-semibold text-gray-700">Books</h2>
//       <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
//         {books.length} {books.length === 1 ? "file" : "files"}
//       </span>
//     </div>
//     <FileList
//       files={books}
//       emptyIcon={BookOpen}
//       emptyText="No books uploaded yet"
//       iconBg="bg-orange-50"
//       iconColor="text-orange-500"
//     />
//   </div>
// )}

//             {/* ── ASSIGNMENTS ── */}
//             {activeTab === "assignments" && (
//               selectedAssignment ? (
//                 <AssignmentDetail
//                   assignment={selectedAssignment}
//                   courseInfo={courseInfo}
//                   onBack={() => setSelectedAssignment(null)}
//                   isSubmitted={
//                     submittedIds.includes(selectedAssignment._id) ||
//                     (selectedAssignment.submissions?.length ?? 0) > 0
//                   }
//                   onSubmitSuccess={() => setSubmittedIds((prev) => {
//                     const updated = [...prev, selectedAssignment._id];
//                     try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
//                     return updated;
//                   })}
//                 />
//               ) : (
//                 <AssignmentsList
//                   assignments={assignments}
//                   submittedIds={submittedIds}
//                   onSelect={setSelectedAssignment}
//                 />
//               )
//             )}

//             {/* ── OTHER TABS ── */}
//             {activeTab === "recordings" && (
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-sm font-semibold text-gray-700">Recordings</h2>
//                   <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
//                     {recordings.length} {recordings.length === 1 ? "file" : "files"}
//                   </span>
//                 </div>

//                 {recordings.length === 0 ? (
//                   <div className="py-12 text-center text-gray-400">
//                     <Video size={40} className="mx-auto mb-3 opacity-30" />
//                     <p className="text-sm">No recordings uploaded yet</p>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-gray-50">
//                     {recordings.map((recording: Slide, index: number) => (
//                       <div
//                         key={recording._id || index}
//                         className="flex items-center justify-between py-3 sm:py-4 group hover:bg-gray-50 -mx-2 px-2 sm:-mx-4 sm:px-4 rounded-xl transition-colors"
//                       >
//                         <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                           <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
//                             <Video size={15} className="text-purple-500" />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-sm font-medium text-gray-800 truncate">{recording.title}</p>
//                             <p className="text-xs text-gray-400 mt-0.5">
//                               {formatDateShort(recording.uploadedAt)}
//                               {recording.professor?.name && (
//                                 <span className="ml-2">· {recording.professor.name}</span>
//                               )}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
//                           <a
//                             href={`http://localhost:5000${recording.fileUrl}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-2 text-xs font-medium text-purple-700 transition hover:bg-purple-100"
//                           >
//                             <ExternalLink size={12} />
//                             Watch
//                           </a>
//                           <a
//                             href={`http://localhost:5000${recording.fileUrl}`}
//                             download={recording.title}
//                             className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
//                           >
//                             <Download size={15} />
//                           </a>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {["references"].includes(activeTab) && (
//               <div className="py-12 text-center text-gray-400">
//                 {activeTab === "references" && <BookMarked size={40} className="mx-auto mb-3 opacity-30" />}
//                 {activeTab === "book" && <BookOpen size={40} className="mx-auto mb-3 opacity-30" />}
//                 <p className="text-sm capitalize">{activeTab} content coming soon</p>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import Link from "next/link";
import submitAssignment from "@/CardActions/uploadAssignment.action";
import {
  BookOpen, FileText, Monitor, Video,
  ClipboardList, BookMarked, LayoutDashboard,
  Download, User, CreditCard, ChevronRight,
  ExternalLink, Calendar, CheckCircle2, Upload,
  ArrowLeft, Clock, QrCode, Target, BarChart2,
} from "lucide-react";

interface Slide {
  _id?: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
  professor?: { name?: string } | any;
}

interface Submission {
  _id: string;
  file: string;
  submitted_at: string;
}

interface Assignment {
  _id: string;
  title: string;
  description: string;
  file: string | null;
  deadline: string;
  points?: number;
  submissions?: Submission[];
  course?: { name?: string } | any;
}

interface CourseDetailsClientProps {
  courseId: string;
  courseInfo?: any;
  slides: Slide[];
  sheets: Slide[];
  books: Slide[];
  assignments: Assignment[];
  token: string;
}

const tabs = [
  { id: "overview",    label: "Overview",    icon: LayoutDashboard },
  { id: "lectures",    label: "Lectures",    icon: Monitor },
  { id: "sheets",      label: "Sheets",      icon: FileText },
  { id: "recordings",  label: "Recordings",  icon: Video },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "book",        label: "Book",        icon: BookOpen },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function isOverdue(deadline: string) {
  return new Date(deadline) < new Date();
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ courseInfo, assignments, slides }: { courseInfo: any; assignments: Assignment[]; slides: Slide[] }) {
  const description = courseInfo?.description || "";
  const learningObjectives: string[] = courseInfo?.learning_objectives || [];
  const totalAssignments = assignments.length;
  const completedCount = assignments.filter(a => (a.submissions?.length ?? 0) > 0).length;
  const totalLectures = courseInfo?.totalLectures || slides.length || 0;
  const grades: any[] = courseInfo?.grades || [];
  const avgGrade = grades.length > 0
    ? Math.round(grades.reduce((sum: number, g: any) => sum + (g.grade || 0), 0) / grades.length)
    : null;

  return (
    <div className="space-y-4">
      {description ? (
        <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FileText size={14} className="text-blue-500" /> Course Description
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      ) : (
        <div className="border border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center text-gray-400">
          <p className="text-sm">No description available yet</p>
        </div>
      )}

      {learningObjectives.length > 0 && (
        <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Target size={14} className="text-green-500" /> Learning Objectives
          </h3>
          <ul className="space-y-2">
            {learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <BarChart2 size={14} className="text-purple-500" /> Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-gray-800 dark:text-white">{totalAssignments}</p>
            <p className="text-xs text-gray-400 mt-1 leading-tight">Total Assignments</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{completedCount}</p>
            <p className="text-xs text-gray-400 mt-1 leading-tight">Completed</p>
          </div>
          {avgGrade !== null && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{avgGrade}%</p>
              <p className="text-xs text-gray-400 mt-1 leading-tight">Current Grade</p>
            </div>
          )}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{totalLectures}</p>
            <p className="text-xs text-gray-400 mt-1 leading-tight">Lectures</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── File List ────────────────────────────────────────────────────────────────
function FileList({ files, emptyIcon: EmptyIcon, emptyText, iconBg, iconColor }: {
  files: Slide[]; emptyIcon: any; emptyText: string; iconBg: string; iconColor: string;
}) {
  if (files.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400">
        <EmptyIcon size={40} className="mx-auto mb-3 opacity-30" />
        <p className="text-sm">{emptyText}</p>
      </div>
    );
  }
  return (
    <div className="divide-y divide-gray-50 dark:divide-gray-700">
      {files.map((file, index) => (
        <div key={file._id || index} className="flex items-center justify-between py-3 sm:py-4 group hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 sm:-mx-4 sm:px-4 rounded-xl transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <FileText size={15} className={iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDateShort(file.uploadedAt)}
                {file.professor?.name && <span className="ml-2">· {file.professor.name}</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <a href={`http://localhost:5000${file.fileUrl}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">
              <ExternalLink size={14} />
            </a>
            <a href={`http://localhost:5000${file.fileUrl}`} download={file.title}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">
              <Download size={15} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Assignment Detail ────────────────────────────────────────────────────────
function AssignmentDetail({ assignment, courseInfo, onBack, isSubmitted, onSubmitSuccess }: {
  assignment: Assignment; courseInfo: any; onBack: () => void; isSubmitted: boolean; onSubmitSuccess: () => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(isSubmitted);
  const overdue = isOverdue(assignment.deadline);
  const courseName = courseInfo?.name || courseInfo?.title || "Course";
  const courseCode = courseInfo?.code || "";

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      await submitAssignment(assignment._id, selectedFile);
      setDone(true);
      onSubmitSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to submit assignment");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors mb-4">
        <ArrowLeft size={14} /> Assignments
      </button>

      <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5 mb-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">{courseCode || courseName}</span>
          {done ? (
            <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Completed</span>
          ) : overdue ? (
            <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded-full">Overdue</span>
          ) : (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">Pending</span>
          )}
        </div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">{assignment.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{courseName}</p>
        {assignment.points !== undefined && (
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Points: <span className="font-bold">{assignment.points}</span></p>
        )}
        <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4">
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border border-gray-100 dark:border-gray-500 flex items-center justify-center flex-shrink-0">
            <Calendar size={14} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Due Date</p>
            <p className={`text-sm font-medium ${overdue ? "text-red-500" : "text-gray-800 dark:text-gray-200"}`}>{formatDate(assignment.deadline)}</p>
            {assignment.file && (
              <a href={`http://localhost:5000${assignment.file}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1">
                <Download size={11} /> Available
              </a>
            )}
          </div>
        </div>
      </div>

      {assignment.description && (
        <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{assignment.description}</p>
        </div>
      )}

      {!done ? (
        <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Submit Your Work</h3>
          <p className="text-xs text-gray-400 mb-4">Upload your assignment file and add notes</p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Assignment File</p>
          <label className="block w-full border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all mb-4 group">
            <Upload size={20} className="mx-auto mb-2 text-gray-300 group-hover:text-blue-400 transition-colors" />
            <p className="text-sm text-gray-400 group-hover:text-blue-500 transition-colors">
              {selectedFile ? selectedFile.name : "Tap to upload file"}
            </p>
            {!selectedFile && <p className="text-xs text-gray-300 mt-1">PDF, DOC, DOCX, TXT, ZIP (max 10MB)</p>}
            <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
          </label>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Additional Notes (Optional)</p>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any comments about your submission..." rows={3}
            className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:border-blue-400 mb-4" />
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
            <Clock size={12} /> Submission will be timestamped upon upload
          </div>
          <button onClick={handleSubmit} disabled={!selectedFile || uploading}
            className="w-full py-3 rounded-xl bg-gray-800 dark:bg-gray-600 text-white text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {uploading ? "Uploading..." : "Submit Assignment"}
          </button>
        </div>
      ) : (
        <div className="border border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 sm:p-5 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Assignment Submitted</p>
            <p className="text-xs text-green-500 mt-0.5">Your work has been submitted successfully</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Assignments List ─────────────────────────────────────────────────────────
function AssignmentsList({ assignments, submittedIds, onSelect }: {
  assignments: Assignment[]; submittedIds: string[]; onSelect: (a: Assignment) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Assignments</h2>
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          {assignments.length} {assignments.length === 1 ? "assignment" : "assignments"}
        </span>
      </div>
      {assignments.length === 0 ? (
        <div className="py-12 text-center text-gray-400">
          <ClipboardList size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No assignments yet</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-gray-700">
          {assignments.map((a) => {
            const overdue = isOverdue(a.deadline);
            const hasSubmissions = (a.submissions?.length ?? 0) > 0;
            const isSubmitted = submittedIds.includes(a._id) || hasSubmissions;
            return (
              <button key={a._id} onClick={() => onSelect(a)}
                className="w-full flex items-center justify-between py-4 group hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 sm:-mx-4 sm:px-4 rounded-xl transition-colors text-left gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSubmitted ? "border-green-500 bg-green-500" : "border-gray-300 group-hover:border-gray-400"
                  }`}>
                    {isSubmitted && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{a.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className={`flex items-center gap-1 text-xs ${overdue && !isSubmitted ? "text-red-400" : "text-gray-400"}`}>
                        <Calendar size={11} /> Due: {formatDateShort(a.deadline)}
                      </span>
                      {a.points !== undefined && <span className="text-xs text-gray-400">{a.points} points</span>}
                    </div>
                  </div>
                </div>
                {isSubmitted ? (
                  <span className="text-xs font-medium text-white bg-gray-800 dark:bg-gray-600 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">Completed</span>
                ) : (
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">Pending</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CourseDetailsClient({
  courseId, courseInfo, slides = [], sheets = [], books = [], recordings = [], assignments = [], token,
}: CourseDetailsClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const storageKey = `submitted_assignments_${courseId}`;
  const [submittedIds, setSubmittedIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { const stored = localStorage.getItem(storageKey); return stored ? JSON.parse(stored) : []; }
    catch { return []; }
  });

  const courseName = courseInfo?.name || courseInfo?.title || "Course Details";
  const courseCode = courseInfo?.code || "";
  const instructor = courseInfo?.professors?.[0]?.name || courseInfo?.instructor || "";
  const credits    = courseInfo?.credits || courseInfo?.creditHours || "";
  const progress   = courseInfo?.progress || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 sm:px-6 py-3">
        <div className="w-full flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/coursesenrollment" className="hover:text-blue-600 transition-colors">Courses</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium truncate">{courseCode || courseName}</span>
        </div>
      </div>

      <div className="w-full px-3 sm:px-4 py-4 sm:py-6">

        {/* Course Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 sm:p-6 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">{courseCode?.slice(0, 2) || courseName?.slice(0, 2) || "CO"}</span>
              </div>
              <div className="min-w-0">
                {courseCode && <p className="text-xs font-medium text-blue-600 mb-1">{courseCode}</p>}
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{courseName}</h1>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                  {instructor && <span className="flex items-center gap-1.5"><User size={12} /> {instructor}</span>}
                  {credits    && <span className="flex items-center gap-1.5"><CreditCard size={12} /> {credits} Credits</span>}
                </div>
              </div>
            </div>
            {progress > 0 && (
              <div className="text-right flex-shrink-0 hidden sm:block">
                <p className="text-xs text-gray-400 mb-1">Course Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{progress}%</p>
                <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gray-800 dark:bg-gray-400 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>
          {progress > 0 && (
            <div className="mt-3 sm:hidden">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-400">Course Progress</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{progress}%</p>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gray-800 dark:bg-gray-400 rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          <div className="mt-4">
            <Link href={`/dashboard/coursesenrollment/${courseId}/attendance`}
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition hover:bg-emerald-100 dark:hover:bg-emerald-900/30">
              <QrCode size={15} /> Scan attendance QR
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id}
                  onClick={() => { setActiveTab(tab.id); if (tab.id !== "assignments") setSelectedAssignment(null); }}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                    isActive
                      ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-900/20"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}>
                  <Icon size={13} /> {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "overview" && <OverviewTab courseInfo={courseInfo} assignments={assignments} slides={slides} />}

            {activeTab === "lectures" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lectures</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{slides.length} {slides.length === 1 ? "file" : "files"}</span>
                </div>
                <FileList files={slides} emptyIcon={Monitor} emptyText="No lectures uploaded yet" iconBg="bg-red-50 dark:bg-red-900/20" iconColor="text-red-500" />
              </div>
            )}

            {activeTab === "sheets" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sheets</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{sheets.length} {sheets.length === 1 ? "file" : "files"}</span>
                </div>
                <FileList files={sheets} emptyIcon={FileText} emptyText="No sheets uploaded yet" iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-500" />
              </div>
            )}

            {activeTab === "book" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Books</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{books.length} {books.length === 1 ? "file" : "files"}</span>
                </div>
                <FileList files={books} emptyIcon={BookOpen} emptyText="No books uploaded yet" iconBg="bg-orange-50 dark:bg-orange-900/20" iconColor="text-orange-500" />
              </div>
            )}

            {activeTab === "assignments" && (
              selectedAssignment ? (
                <AssignmentDetail
                  assignment={selectedAssignment} courseInfo={courseInfo}
                  onBack={() => setSelectedAssignment(null)}
                  isSubmitted={submittedIds.includes(selectedAssignment._id) || (selectedAssignment.submissions?.length ?? 0) > 0}
                  onSubmitSuccess={() => setSubmittedIds((prev) => {
                    const updated = [...prev, selectedAssignment._id];
                    try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
                    return updated;
                  })}
                />
              ) : (
                <AssignmentsList assignments={assignments} submittedIds={submittedIds} onSelect={setSelectedAssignment} />
              )
            )}

            {activeTab === "recordings" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recordings</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{recordings.length} {recordings.length === 1 ? "file" : "files"}</span>
                </div>
                {recordings.length === 0 ? (
                  <div className="py-12 text-center text-gray-400">
                    <Video size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No recordings uploaded yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50 dark:divide-gray-700">
                    {recordings.map((recording: Slide, index: number) => (
                      <div key={recording._id || index} className="flex items-center justify-between py-3 sm:py-4 group hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 sm:-mx-4 sm:px-4 rounded-xl transition-colors">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                            <Video size={15} className="text-purple-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{recording.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {formatDateShort(recording.uploadedAt)}
                              {recording.professor?.name && <span className="ml-2">· {recording.professor.name}</span>}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          <a href={`http://localhost:5000${recording.fileUrl}`} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 px-3 py-2 text-xs font-medium text-purple-700 dark:text-purple-400 transition hover:bg-purple-100 dark:hover:bg-purple-900/30">
                            <ExternalLink size={12} /> Watch
                          </a>
                          <a href={`http://localhost:5000${recording.fileUrl}`} download={recording.title}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all">
                            <Download size={15} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
