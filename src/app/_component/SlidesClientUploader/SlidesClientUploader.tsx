// "use client";

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// type UploadType = "lecture" | "sheet" | "recording" | "book"; // ✅ أضفنا book

// type UploadedItem = {
//   _id?: string;
//   title: string;
//   fileUrl: string;
//   uploadedAt: string;
//   type: UploadType;
// };

// const ACCEPTED_MIME: Record<UploadType, string[]> = {
//   lecture: [
//     "application/pdf",
//     "application/vnd.ms-powerpoint",
//     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ],
//   sheet: [
//     "application/pdf",
//     "application/vnd.ms-powerpoint",
//     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ],
//   recording: [
//     "video/mp4",
//     "video/quicktime",
//     "video/x-msvideo",
//     "video/x-matroska",
//     "video/webm",
//     "video/mpeg",
//     "video/x-ms-wmv",
//     "",
//   ],
//   book: [ // ✅ جديد
//     "application/pdf",
//     "application/epub+zip",
//     "application/x-mobipocket-ebook",
//   ],
// };

// const ACCEPTED_EXT: Record<UploadType, string[]> = {
//   lecture:   [".pdf", ".ppt", ".pptx", ".doc", ".docx"],
//   sheet:     [".pdf", ".ppt", ".pptx", ".doc", ".docx"],
//   recording: [".mp4", ".mov", ".avi", ".mkv", ".webm"],
//   book:      [".pdf", ".epub", ".mobi"], // ✅ جديد
// };

// const ACCEPTED_LABELS: Record<UploadType, string> = {
//   lecture:   "PDF, PPT, DOC",
//   sheet:     "PDF, PPT, DOC",
//   recording: "MP4, MOV, AVI, MKV, WEBM",
//   book:      "PDF, EPUB, MOBI", // ✅ جديد
// };

// const TYPE_CONFIG = [
//   {
//     value: "lecture" as UploadType,
//     label: "Lecture",
//     helper: "PDF, PPT, DOC",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//       </svg>
//     ),
//   },
//   {
//     value: "sheet" as UploadType,
//     label: "Sheet",
//     helper: "Practice sheets and handouts",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//       </svg>
//     ),
//   },
//   {
//     value: "recording" as UploadType,
//     label: "Recording",
//     helper: "MP4, MOV, AVI, MKV, WEBM",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.259a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//       </svg>
//     ),
//   },
//   {
//     value: "book" as UploadType, // ✅ جديد
//     label: "Book",
//     helper: "PDF, EPUB, MOBI",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//       </svg>
//     ),
//   },
// ];

// const LIBRARY_TABS: { key: UploadType | "all"; label: string }[] = [
//   { key: "all",       label: "All" },
//   { key: "lecture",   label: "Lectures" },
//   { key: "sheet",     label: "Sheets" },
//   { key: "recording", label: "Recordings" },
//   { key: "book",      label: "Books" }, // ✅ جديد
// ];

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     year: "numeric", month: "short", day: "numeric",
//   });
// }

// // ===== Video Modal =====
// function VideoModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between px-5 py-3 bg-gray-900">
//           <div className="flex items-center gap-2 text-white">
//             <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.259a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//             </svg>
//             <span className="text-sm font-medium truncate max-w-xs">{title}</span>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
//           >
//             <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <video src={url} controls autoPlay className="w-full max-h-[75vh] bg-black">
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// }

// // ===== Badge color =====
// function typeBadgeClass(type: UploadType) {
//   switch (type) {
//     case "lecture":   return "bg-purple-100 text-purple-600";
//     case "sheet":     return "bg-green-100 text-green-600";
//     case "recording": return "bg-blue-100 text-blue-600";
//     case "book":      return "bg-orange-100 text-orange-600"; // ✅ جديد
//     default:          return "bg-gray-100 text-gray-600";
//   }
// }

// // ===== Main Component =====
// export default function SlidesClientUploader({ course, token }: { course: string; token: string }) {
//   const [selectedType, setSelectedType] = useState<UploadType>("lecture");
//   const [title, setTitle]               = useState("");
//   const [file, setFile]                 = useState<File | null>(null);
//   const [fileError, setFileError]       = useState("");
//   const [uploading, setUploading]       = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState("");
//   const [uploadError, setUploadError]   = useState("");
//   const [uploads, setUploads]           = useState<UploadedItem[]>([]);
//   const [listLoading, setListLoading]   = useState(true);
//   const [activeLibTab, setActiveLibTab] = useState<UploadType | "all">("all");
//   const [videoModal, setVideoModal]     = useState<{ url: string; title: string } | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // ===== Load uploads =====
//   const loadUploads = useCallback(async () => {
//     try {
//       setListLoading(true);
//       const res = await fetch("http://localhost:5000/api/slides/professor/slides/course", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ courseId: course }),
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message);

//       const items: UploadedItem[] = Array.isArray(data.data) ? data.data : [];

//       // ازيل الـ duplicates بالـ _id
//       const seen = new Set<string>();
//       const unique = items.filter((item) => {
//         const id = item._id ?? "";
//         if (seen.has(id)) return false;
//         seen.add(id);
//         return true;
//       });

//       setUploads(unique);
//     } catch {
//       setUploads([]);
//     } finally {
//       setListLoading(false);
//     }
//   }, [course, token]);

//   useEffect(() => { loadUploads(); }, [loadUploads]);

//   // ===== File validation =====
//   const validateFile = (f: File): boolean => {
//     const ext = "." + f.name.split(".").pop()?.toLowerCase();
//     const mimeOk = ACCEPTED_MIME[selectedType].includes(f.type);
//     const extOk  = ACCEPTED_EXT[selectedType].includes(ext);
//     if (!mimeOk && !extOk) {
//       setFileError(`Invalid file type. Accepted: ${ACCEPTED_LABELS[selectedType]}`);
//       return false;
//     }
//     setFileError("");
//     return true;
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     validateFile(f);
//     setFile(f);
//   };

//   const handleTypeChange = (type: UploadType) => {
//     setSelectedType(type);
//     setFile(null);
//     setFileError("");
//     setUploadError("");
//     setUploadSuccess("");
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // ===== Upload =====
//   const handleUpload = async () => {
//     if (!title.trim() || !file) { setUploadError("Please enter a title and choose a file"); return; }
//     if (!validateFile(file)) return;

//     try {
//       setUploading(true);
//       setUploadError("");
//       setUploadSuccess("");

//       const formData = new FormData();
//       formData.append("title", title.trim());
//       formData.append("file", file);

//       const res = await fetch(
//         `http://localhost:5000/api/slides/upload?courseId=${course}&type=${selectedType}`,
//         { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData },
//       );

//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Upload failed");

//       setUploadSuccess(`${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} uploaded successfully!`);
//       setTitle("");
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       await loadUploads();
//     } catch (err) {
//       setUploadError(err instanceof Error ? err.message : "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const filteredUploads = useMemo(
//     () => (activeLibTab === "all" ? uploads : uploads.filter((i) => i.type === activeLibTab)),
//     [activeLibTab, uploads],
//   );

//   const currentConfig = TYPE_CONFIG.find((t) => t.value === selectedType)!;

//   return (
//     <>
//       {videoModal && (
//         <VideoModal url={videoModal.url} title={videoModal.title} onClose={() => setVideoModal(null)} />
//       )}

//       <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-gray-50">

//         {/* ===== LEFT: New Upload ===== */}
//         <div className="w-full lg:w-1/2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
//           <h2 className="text-lg font-bold text-gray-800 mb-1">New Upload</h2>
//           <p className="text-sm text-gray-400 mb-5">{currentConfig.helper}</p>

//           {/* Type selector — grid-cols-2 عشان بقوا 4 */}
//           <div className="grid grid-cols-2 gap-3 mb-6">
//             {TYPE_CONFIG.map((t) => (
//               <button
//                 key={t.value}
//                 onClick={() => handleTypeChange(t.value)}
//                 className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
//                   selectedType === t.value
//                     ? "border-blue-500 bg-blue-50 text-blue-700"
//                     : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 <span className={selectedType === t.value ? "text-blue-600" : "text-gray-400"}>{t.icon}</span>
//                 <div>
//                   <p className="text-sm font-semibold">{t.label}</p>
//                   <p className="text-xs text-gray-400 leading-tight">{t.helper}</p>
//                 </div>
//               </button>
//             ))}
//           </div>

//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder={`Enter ${selectedType} title...`}
//             className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 mb-3"
//           />

//           <div className="w-full border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 mb-3">
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="bg-gray-900 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-gray-700 transition-colors shrink-0"
//             >
//               Choose File
//             </button>
//             <span className="text-sm text-gray-500 truncate">{file ? file.name : "No file chosen"}</span>
//             <input
//               ref={fileInputRef}
//               type="file"
//               className="hidden"
//               accept={ACCEPTED_EXT[selectedType].join(",")}
//               onChange={handleFileChange}
//             />
//           </div>

//           {fileError && (
//             <div className="w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-3">
//               <p className="text-sm text-red-500">{fileError}</p>
//             </div>
//           )}
//           {uploadError && (
//             <div className="w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-3">
//               <p className="text-sm text-red-500">{uploadError}</p>
//             </div>
//           )}
//           {uploadSuccess && (
//             <div className="w-full bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-3">
//               <p className="text-sm text-green-600">{uploadSuccess}</p>
//             </div>
//           )}

//           <button
//             onClick={handleUpload}
//             disabled={!file || !title.trim() || !!fileError || uploading}
//             className="bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
//           >
//             {uploading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
//             {uploading ? "Uploading..." : `Upload ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`}
//           </button>
//         </div>

//         {/* ===== RIGHT: Library ===== */}
//         <div className="w-full lg:w-1/2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="text-lg font-bold text-gray-800 mb-1">Library</h2>
//           <p className="text-sm text-gray-400 mb-4">Previously uploaded items for this course</p>

//           {/* Tabs */}
//           <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5 overflow-x-auto">
//             {LIBRARY_TABS.map((tab) => {
//               const count = tab.key === "all"
//                 ? uploads.length
//                 : uploads.filter((i) => i.type === tab.key).length;
//               return (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveLibTab(tab.key)}
//                   className={`flex-1 text-xs font-semibold py-2 px-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
//                     activeLibTab === tab.key ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {tab.label}
//                   <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
//                     activeLibTab === tab.key ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-400"
//                   }`}>
//                     {count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* List */}
//           <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
//             {listLoading ? (
//               <div className="flex items-center justify-center py-16">
//                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//               </div>
//             ) : filteredUploads.length === 0 ? (
//               <div className="text-center py-12 text-gray-400 text-sm">No items found</div>
//             ) : (
//               filteredUploads.map((item, index) => (
//                 <div
//                   key={`${item._id ?? "no-id"}-${index}`}
//                   className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 group border-b border-gray-50 last:border-0"
//                 >
//                   <div className="flex items-center gap-3 min-w-0">
//                     <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${typeBadgeClass(item.type)}`}>
//                       {item.type}
//                     </span>
//                     <div className="min-w-0">
//                       <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 truncate">{item.title}</p>
//                       <p className="text-xs text-gray-400">{formatDate(item.uploadedAt)}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
//                     {item.type === "recording" ? (
//                       <button
//                         onClick={() => setVideoModal({ url: `http://localhost:5000${item.fileUrl}`, title: item.title })}
//                         className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-blue-600 transition-colors"
//                         title="Play video"
//                       >
//                         <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
//                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
//                         </svg>
//                       </button>
//                     ) : (
//                       <a
//                         href={`http://localhost:5000${item.fileUrl}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-blue-600 transition-colors"
//                         title="Open"
//                       >
//                         <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                       </a>
//                     )}

//                     <a
//                       href={`http://localhost:5000${item.fileUrl}`}
//                       download={item.title}
//                       className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-blue-600 transition-colors"
//                       title="Download"
//                     >
//                       <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UploadType = "lecture" | "sheet" | "recording" | "book";

type UploadedItem = {
  _id?: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
  type: UploadType;
};

const ACCEPTED_MIME: Record<UploadType, string[]> = {
  lecture:   ["application/pdf","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  sheet:     ["application/pdf","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  recording: ["video/mp4","video/quicktime","video/x-msvideo","video/x-matroska","video/webm","video/mpeg","video/x-ms-wmv",""],
  book:      ["application/pdf","application/epub+zip","application/x-mobipocket-ebook"],
};

const ACCEPTED_EXT: Record<UploadType, string[]> = {
  lecture:   [".pdf",".ppt",".pptx",".doc",".docx"],
  sheet:     [".pdf",".ppt",".pptx",".doc",".docx"],
  recording: [".mp4",".mov",".avi",".mkv",".webm"],
  book:      [".pdf",".epub",".mobi"],
};

const ACCEPTED_LABELS: Record<UploadType, string> = {
  lecture: "PDF, PPT, DOC", sheet: "PDF, PPT, DOC", recording: "MP4, MOV, AVI, MKV, WEBM", book: "PDF, EPUB, MOBI",
};

const TYPE_CONFIG = [
  { value: "lecture" as UploadType, label: "Lecture", helper: "PDF, PPT, DOC", icon: (<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>) },
  { value: "sheet" as UploadType, label: "Sheet", helper: "Practice sheets and handouts", icon: (<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>) },
  { value: "recording" as UploadType, label: "Recording", helper: "MP4, MOV, AVI, MKV, WEBM", icon: (<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.259a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>) },
  { value: "book" as UploadType, label: "Book", helper: "PDF, EPUB, MOBI", icon: (<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>) },
];

const LIBRARY_TABS: { key: UploadType | "all"; label: string }[] = [
  { key: "all", label: "All" }, { key: "lecture", label: "Lectures" },
  { key: "sheet", label: "Sheets" }, { key: "recording", label: "Recordings" }, { key: "book", label: "Books" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function VideoModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 bg-gray-900">
          <div className="flex items-center gap-2 text-white">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.259a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="text-sm font-medium truncate max-w-xs">{title}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <video src={url} controls autoPlay className="w-full max-h-[75vh] bg-black">Your browser does not support the video tag.</video>
      </div>
    </div>
  );
}

function typeBadgeClass(type: UploadType) {
  switch (type) {
    case "lecture":   return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
    case "sheet":     return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    case "recording": return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
    case "book":      return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
    default:          return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
  }
}

export default function SlidesClientUploader({ course, token }: { course: string; token: string }) {
  const [selectedType, setSelectedType] = useState<UploadType>("lecture");
  const [title, setTitle]               = useState("");
  const [file, setFile]                 = useState<File | null>(null);
  const [fileError, setFileError]       = useState("");
  const [uploading, setUploading]       = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError]   = useState("");
  const [uploads, setUploads]           = useState<UploadedItem[]>([]);
  const [listLoading, setListLoading]   = useState(true);
  const [activeLibTab, setActiveLibTab] = useState<UploadType | "all">("all");
  const [videoModal, setVideoModal]     = useState<{ url: string; title: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadUploads = useCallback(async () => {
    try {
      setListLoading(true);
      const res = await fetch("http://localhost:5000/api/slides/professor/slides/course", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      const items: UploadedItem[] = Array.isArray(data.data) ? data.data : [];
      const seen = new Set<string>();
      const unique = items.filter((item) => { const id = item._id ?? ""; if (seen.has(id)) return false; seen.add(id); return true; });
      setUploads(unique);
    } catch { setUploads([]); } finally { setListLoading(false); }
  }, [course, token]);

  useEffect(() => { loadUploads(); }, [loadUploads]);

  const validateFile = (f: File): boolean => {
    const ext = "." + f.name.split(".").pop()?.toLowerCase();
    const mimeOk = ACCEPTED_MIME[selectedType].includes(f.type);
    const extOk  = ACCEPTED_EXT[selectedType].includes(ext);
    if (!mimeOk && !extOk) { setFileError(`Invalid file type. Accepted: ${ACCEPTED_LABELS[selectedType]}`); return false; }
    setFileError(""); return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; validateFile(f); setFile(f);
  };

  const handleTypeChange = (type: UploadType) => {
    setSelectedType(type); setFile(null); setFileError(""); setUploadError(""); setUploadSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!title.trim() || !file) { setUploadError("Please enter a title and choose a file"); return; }
    if (!validateFile(file)) return;
    try {
      setUploading(true); setUploadError(""); setUploadSuccess("");
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("file", file);
      const res = await fetch(`http://localhost:5000/api/slides/upload?courseId=${course}&type=${selectedType}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Upload failed");
      setUploadSuccess(`${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} uploaded successfully!`);
      setTitle(""); setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadUploads();
    } catch (err) { setUploadError(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(false); }
  };

  const filteredUploads = useMemo(
    () => (activeLibTab === "all" ? uploads : uploads.filter((i) => i.type === activeLibTab)),
    [activeLibTab, uploads],
  );

  const currentConfig = TYPE_CONFIG.find((t) => t.value === selectedType)!;

  return (
    <>
      {videoModal && <VideoModal url={videoModal.url} title={videoModal.title} onClose={() => setVideoModal(null)} />}

      <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* LEFT: New Upload */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">New Upload</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">{currentConfig.helper}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {TYPE_CONFIG.map((t) => (
              <button key={t.value} onClick={() => handleTypeChange(t.value)}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedType === t.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                    : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}>
                <span className={selectedType === t.value ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}>{t.icon}</span>
                <div>
                  <p className="text-sm font-semibold dark:text-gray-200">{t.label}</p>
                  <p className="text-xs text-gray-400 leading-tight">{t.helper}</p>
                </div>
              </button>
            ))}
          </div>

          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder={`Enter ${selectedType} title...`}
            className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 mb-3" />

          <div className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 flex items-center gap-3 mb-3">
            <button onClick={() => fileInputRef.current?.click()}
              className="bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shrink-0">
              Choose File
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{file ? file.name : "No file chosen"}</span>
            <input ref={fileInputRef} type="file" className="hidden" accept={ACCEPTED_EXT[selectedType].join(",")} onChange={handleFileChange} />
          </div>

          {fileError && <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3 mb-3"><p className="text-sm text-red-500 dark:text-red-400">{fileError}</p></div>}
          {uploadError && <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3 mb-3"><p className="text-sm text-red-500 dark:text-red-400">{uploadError}</p></div>}
          {uploadSuccess && <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl px-4 py-3 mb-3"><p className="text-sm text-green-600 dark:text-green-400">{uploadSuccess}</p></div>}

          <button onClick={handleUpload} disabled={!file || !title.trim() || !!fileError || uploading}
            className="bg-gray-900 dark:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2">
            {uploading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {uploading ? "Uploading..." : `Upload ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`}
          </button>
        </div>

        {/* RIGHT: Library */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">Library</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Previously uploaded items for this course</p>

          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-5 overflow-x-auto">
            {LIBRARY_TABS.map((tab) => {
              const count = tab.key === "all" ? uploads.length : uploads.filter((i) => i.type === tab.key).length;
              return (
                <button key={tab.key} onClick={() => setActiveLibTab(tab.key)}
                  className={`flex-1 text-xs font-semibold py-2 px-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeLibTab === tab.key ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}>
                  {tab.label}
                  <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                    activeLibTab === tab.key ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "bg-gray-200 dark:bg-gray-600 text-gray-400"
                  }`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
            {listLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredUploads.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">No items found</div>
            ) : (
              filteredUploads.map((item, index) => (
                <div key={`${item._id ?? "no-id"}-${index}`}
                  className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group border-b border-gray-50 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${typeBadgeClass(item.type)}`}>{item.type}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white truncate">{item.title}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(item.uploadedAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                    {item.type === "recording" ? (
                      <button onClick={() => setVideoModal({ url: `http://localhost:5000${item.fileUrl}`, title: item.title })}
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-blue-600 transition-colors" title="Play video">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                      </button>
                    ) : (
                      <a href={`http://localhost:5000${item.fileUrl}`} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-blue-600 transition-colors" title="Open">
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                    <a href={`http://localhost:5000${item.fileUrl}`} download={item.title}
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-blue-600 transition-colors" title="Download">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}