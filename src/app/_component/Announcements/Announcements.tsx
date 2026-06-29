


// // "use client";

// // import React, { useEffect, useMemo, useState } from "react";
// // import { useSession } from "next-auth/react";

// // const API_BASE_URL = "http://localhost:5000/api";

// // type NotificationItem = {
// //   _id: string;
// //   title?: string;
// //   message?: string;
// //   type?: string;
// //   createdAt?: string;
// // };

// // const typeBadge: Record<string, string> = {
// //   info: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
// //   urgent: "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300",
// //   warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
// //   global: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
// //   individual: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300",
// // };

// // const typeIcon: Record<string, React.ReactNode> = {
// //   info: (
// //     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
// //       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// //     </svg>
// //   ),
// //   urgent: (
// //     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
// //       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
// //     </svg>
// //   ),
// //   warning: (
// //     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
// //       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
// //     </svg>
// //   ),
// //   global: (
// //     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
// //       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 102 0V7zm-1 7a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z" clipRule="evenodd" />
// //     </svg>
// //   ),
// //   individual: (
// //     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
// //       <path fillRule="evenodd" d="M10 2a5 5 0 00-3.535 8.535A7 7 0 003 16a1 1 0 102 0 5 5 0 0110 0 1 1 0 102 0 7 7 0 00-3.465-5.465A5 5 0 0010 2z" clipRule="evenodd" />
// //     </svg>
// //   ),
// // };

// // function formatRelativeTime(value?: string) {
// //   if (!value) return "Just now";
// //   const date = new Date(value);
// //   if (Number.isNaN(date.getTime())) return "Just now";
// //   const diffMs = Date.now() - date.getTime();
// //   const diffMinutes = Math.floor(diffMs / (1000 * 60));
// //   if (diffMinutes < 1) return "Just now";
// //   if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
// //   const diffHours = Math.floor(diffMinutes / 60);
// //   if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
// //   const diffDays = Math.floor(diffHours / 24);
// //   if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
// //   return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
// // }

// // function normalizeType(type?: string) {
// //   const value = (type || "info").toLowerCase();
// //   if (value === "sent" || value === "pending") return "info";
// //   return value;
// // }

// // export default function Announcements() {
// //   const { data: session } = useSession();
// //   const [announcements, setAnnouncements] = useState<NotificationItem[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     async function fetchAnnouncements() {
// //       if (!session?.token) {
// //         setLoading(false);
// //         return;
// //       }
// //       try {
// //         setError("");
// //         const response = await fetch(`${API_BASE_URL}/notifications/list`, {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${session.token}`,
// //           },
// //           body: JSON.stringify({}),
// //           cache: "no-store",
// //         });
// //         const data = await response.json();
// //         if (!response.ok || !data.success) {
// //           throw new Error(data.message || "Failed to load announcements");
// //         }
// //         setAnnouncements(Array.isArray(data.data) ? data.data : []);
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "Something went wrong");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchAnnouncements();
// //   }, [session?.token]);

// //   const displayAnnouncements = useMemo(() => announcements.slice(0, 6), [announcements]);

// //   return (
// //     <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
// //       <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Announcements</h2>

// //       {loading ? (
// //         <div className="space-y-4">
// //           {Array.from({ length: 3 }).map((_, index) => (
// //             <div key={index} className="animate-pulse rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
// //               <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
// //               <div className="mt-3 h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
// //               <div className="mt-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
// //               <div className="mt-2 h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
// //             </div>
// //           ))}
// //         </div>
// //       ) : error ? (
// //         <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
// //           {error}
// //         </div>
// //       ) : displayAnnouncements.length === 0 ? (
// //         <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
// //           No announcements yet.
// //         </div>
// //       ) : (
// //         <div className="divide-y divide-gray-100 dark:divide-gray-700">
// //           {displayAnnouncements.map((item) => {
// //             const normalizedType = normalizeType(item.type);
// //             const badgeClass = typeBadge[normalizedType] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
// //             const icon = typeIcon[normalizedType] || typeIcon.info;

// //             return (
// //               <div key={item._id} className="py-4 first:pt-0 last:pb-0">
// //                 <div className="flex items-center justify-between mb-1.5">
// //                   <div className="flex items-center gap-2 flex-wrap">
// //                     <span className="text-sm font-semibold text-gray-800 dark:text-white">
// //                       {item.title || "Announcement"}
// //                     </span>
// //                     <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
// //                       {icon}
// //                       {normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}
// //                     </span>
// //                   </div>
// //                   <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-2">
// //                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     {formatRelativeTime(item.createdAt)}
// //                   </div>
// //                 </div>

// //                 <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded mb-2">
// //                   {normalizedType === "global" ? "General announcement" : "Personal notification"}
// //                 </span>

// //                 <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
// //                   {item.message || "No message provided."}
// //                 </p>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }





// "use client";

// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { Bell, BookOpen, CheckCircle, AlertCircle, ExternalLink, Calendar } from "lucide-react";

// const API_BASE_URL = "http://localhost:5000/api";

// type Announcement = {
//   _id: string;
//   title: string;
//   content: string;
//   type: "meeting" | "general" | "assignment" | "grades";
//   course: {
//     _id: string;
//     name: string;
//     code: string;
//   };
//   posted_by: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   meeting?: {
//     _id: string;
//     title: string;
//     startsAt: string;
//     endsAt: string;
//     meetingUrl: string;
//   };
//   created_at: string;
//   read_by: Array<{ student_id: string; read_at: string }>;
// };

// const typeBadge: Record<string, string> = {
//   meeting: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
//   assignment: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
//   grades: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
//   general: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300",
// };

// const typeIcon: Record<string, React.ReactNode> = {
//   meeting: <Bell className="w-3.5 h-3.5" />,
//   assignment: <BookOpen className="w-3.5 h-3.5" />,
//   grades: <CheckCircle className="w-3.5 h-3.5" />,
//   general: <AlertCircle className="w-3.5 h-3.5" />,
// };

// function formatRelativeTime(value: string) {
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "Just now";
//   const diffMs = Date.now() - date.getTime();
//   const diffMinutes = Math.floor(diffMs / (1000 * 60));
//   if (diffMinutes < 1) return "Just now";
//   if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
//   const diffHours = Math.floor(diffMinutes / 60);
//   if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
//   const diffDays = Math.floor(diffHours / 24);
//   if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
//   return date.toLocaleDateString("en-GB", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// function formatDateTime(iso: string) {
//   return new Date(iso).toLocaleString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// export default function Announcements() {
//   const { data: session } = useSession();
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchAnnouncements() {
//       if (!session?.token) {
//         setLoading(false);
//         return;
//       }
//       try {
//         setError("");
//         const response = await fetch(`${API_BASE_URL}/announcements/student`, {
//           headers: {
//             Authorization: `Bearer ${session.token}`,
//             "Content-Type": "application/json",
//           },
//           cache: "no-store",
//         });

//         const data = await response.json();
//         if (!response.ok || !data.success) {
//           throw new Error(data.message || "Failed to load announcements");
//         }
//         setAnnouncements(Array.isArray(data.data) ? data.data : []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAnnouncements();
//   }, [session?.token]);

//   const displayAnnouncements = announcements.slice(0, 6);

//   return (
//     <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//       <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Announcements</h2>

//       {loading ? (
//         <div className="space-y-4">
//           {Array.from({ length: 3 }).map((_, index) => (
//             <div
//               key={index}
//               className="animate-pulse rounded-2xl border border-gray-100 dark:border-gray-700 p-4"
//             >
//               <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
//               <div className="mt-3 h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
//               <div className="mt-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
//               <div className="mt-2 h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
//             </div>
//           ))}
//         </div>
//       ) : error ? (
//         <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
//           {error}
//         </div>
//       ) : displayAnnouncements.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
//           No announcements yet.
//         </div>
//       ) : (
//         <div className="divide-y divide-gray-100 dark:divide-gray-700">
//           {displayAnnouncements.map((item) => {
//             const badgeClass =
//               typeBadge[item.type] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
//             const icon = typeIcon[item.type] || typeIcon.general;

//             return (
//               <div key={item._id} className="py-4 first:pt-0 last:pb-0">
//                 <div className="flex items-center justify-between mb-1.5">
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <span className="text-sm font-semibold text-gray-800 dark:text-white">
//                       {item.title || "Announcement"}
//                     </span>
//                     <span
//                       className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}
//                     >
//                       {icon}
//                       {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-2">
//                     <svg
//                       className="w-3.5 h-3.5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.8}
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     {formatRelativeTime(item.created_at)}
//                   </div>
//                 </div>

//                 <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded mb-2">
//                   {item.course.code} - {item.course.name}
//                 </span>

//                 <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
//                   {item.content || "No message provided."}
//                 </p>

//                 {item.meeting && (
//                   <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 mb-3">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Bell size={14} className="text-blue-500" />
//                       <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
//                         {item.meeting.title}
//                       </h4>
//                     </div>
//                     <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300 mb-2">
//                       <div className="flex items-center gap-2">
//                         <Calendar size={12} />
//                         <span>{formatDateTime(item.meeting.startsAt)}</span>
//                       </div>
//                     </div>
//                     <a
//                       href={item.meeting.meetingUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
//                     >
//                       Join Meeting
//                       <ExternalLink size={11} />
//                     </a>
//                   </div>
//                 )}

//                 <div className="text-xs text-gray-400 dark:text-gray-500">
//                   By: {item.posted_by.name}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bell, BookOpen, CheckCircle, AlertCircle, ExternalLink, Calendar } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

const API_BASE_URL = "http://localhost:5000/api";

type Announcement = {
  _id: string;
  title: string;
  content: string;
  type: "meeting" | "general" | "assignment" | "grades";
  course: {
    _id: string;
    name: string;
    code: string;
  };
  posted_by: {
    _id: string;
    name: string;
    email: string;
  };
  meeting?: {
    _id: string;
    title: string;
    startsAt: string;
    endsAt: string;
    meetingUrl: string;
  };
  created_at: string;
  read_by: Array<{ student_id: string; read_at: string }>;
};

const typeBadge: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  assignment: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  grades: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  general: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300",
};

const typeIcon: Record<string, React.ReactNode> = {
  meeting: <Bell className="w-3.5 h-3.5" />,
  assignment: <BookOpen className="w-3.5 h-3.5" />,
  grades: <CheckCircle className="w-3.5 h-3.5" />,
  general: <AlertCircle className="w-3.5 h-3.5" />,
};

function formatRelativeTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Announcements() {
  const { data: session } = useSession();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setUnreadCount } = useNotification();

  useEffect(() => {
    async function fetchAnnouncements() {
      if (!session?.token) {
        setLoading(false);
        return;
      }
      try {
        setError("");
        const response = await fetch(`${API_BASE_URL}/announcements/student`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load announcements");
        }

        const list: Announcement[] = Array.isArray(data.data) ? data.data : [];
        setAnnouncements(list);

        // ✅ حساب الغير مقروءة وتحديث الـ context
        const studentId = session?.user?.id;
        const unread = list.filter(
          (a) => !a.read_by.some((r) => r.student_id === studentId)
        ).length;
        setUnreadCount(unread);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, [session?.token]);

  const displayAnnouncements = announcements.slice(0, 6);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Announcements</h2>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-100 dark:border-gray-700 p-4"
            >
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-3 h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-2 h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : displayAnnouncements.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          No announcements yet.
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {displayAnnouncements.map((item) => {
            const badgeClass =
              typeBadge[item.type] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
            const icon = typeIcon[item.type] || typeIcon.general;

            return (
              <div key={item._id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      {item.title || "Announcement"}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}
                    >
                      {icon}
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formatRelativeTime(item.created_at)}
                  </div>
                </div>

                <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded mb-2">
                  {item.course.code} - {item.course.name}
                </span>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  {item.content || "No message provided."}
                </p>

                {item.meeting && (
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell size={14} className="text-blue-500" />
                      <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
                        {item.meeting.title}
                      </h4>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} />
                        <span>{formatDateTime(item.meeting.startsAt)}</span>
                      </div>
                    </div>
                    <a
                      href={item.meeting.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      Join Meeting
                      <ExternalLink size={11} />
                    </a>
                  </div>
                )}

                <div className="text-xs text-gray-400 dark:text-gray-500">
                  By: {item.posted_by.name}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}