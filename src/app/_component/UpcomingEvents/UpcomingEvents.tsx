// // // "use client";

// // // import React, { useEffect, useState } from "react";
// // // import { useSession } from "next-auth/react";

// // // // ============================================================
// // // // TYPES
// // // // ============================================================
// // // export interface EventItem {
// // //   _id: string;
// // //   title: string;
// // //   venue: string;
// // //   date: string;
// // //   start_time: string;
// // //   end_time: string;
// // //   image_url: string;
// // //   link?: string;
// // //   description?: string;
// // // }

// // // // ============================================================
// // // // HELPERS
// // // // ============================================================
// // // function formatDate(dateStr: string) {
// // //   return new Date(dateStr).toLocaleDateString("en-US", {
// // //     day: "numeric",
// // //     month: "long",
// // //     year: "numeric",
// // //   });
// // // }

// // // // ============================================================
// // // // SKELETON
// // // // ============================================================
// // // function EventSkeleton() {
// // //   return (
// // //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // //       {Array.from({ length: 3 }).map((_, i) => (
// // //         <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
// // //           <div className="w-full h-40 bg-gray-100" />
// // //           <div className="p-4 space-y-3">
// // //             <div className="h-3 bg-gray-100 rounded w-2/3 mx-auto" />
// // //             <div className="h-2 bg-gray-100 rounded w-full" />
// // //             <div className="h-2 bg-gray-100 rounded w-3/4" />
// // //             <div className="h-8 bg-gray-100 rounded-full mt-4" />
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // // ============================================================
// // // // COMPONENT
// // // // ============================================================
// // // export default function UpcomingEvents() {
// // //   const { data: session } = useSession();
// // //   const [events, setEvents] = useState<EventItem[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [fetchError, setFetchError] = useState(false);

// // //   useEffect(() => {
// // //     async function fetchEvents() {
// // //       if (!session?.token) {
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       try {
// // //         const res = await fetch("http://localhost:5000/api/students/events", {
// // //           headers: { Authorization: `Bearer ${session.token}` },
// // //           cache: "no-store",
// // //         });

// // //         const data = await res.json();
// // //         if (!res.ok || !data.success) throw new Error(data.message || "Failed");
// // //         setEvents(Array.isArray(data.data) ? data.data : []);
// // //       } catch (err) {
// // //         console.error("Events fetch error:", err);
// // //         setFetchError(true);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchEvents();
// // //   }, [session?.token]);

// // //   return (
// // //     <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// // //       <h2 className="text-base font-bold text-gray-800 mb-5">Upcoming Events</h2>

// // //       {loading ? (
// // //         <EventSkeleton />
// // //       ) : fetchError ? (
// // //         <div className="text-center py-10 text-sm text-red-400">
// // //           Failed to load events. Please try again later.
// // //         </div>
// // //       ) : events.length === 0 ? (
// // //         <div className="text-center py-10 text-gray-400 text-sm">No upcoming events 📅</div>
// // //       ) : (
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // //           {events.map((event) => (
// // //             <div
// // //               key={event._id}
// // //               className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200"
// // //             >
// // //               {/* Image */}
// // //               <div className="w-full h-40 overflow-hidden bg-gray-100">
// // //                 {event.image_url ? (
// // //                   <img
// // //                     src={event.image_url}
// // //                     alt={event.title}
// // //                     className="w-full h-full object-cover"
// // //                   />
// // //                 ) : (
// // //                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
// // //                     <svg className="w-10 h-10 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// // //                     </svg>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Info */}
// // //               <div className="p-4">
// // //                 <h3 className="text-sm font-bold text-gray-800 text-center mb-3">{event.title}</h3>

// // //                 <div className="space-y-1.5 text-xs text-gray-500 border-t border-gray-100 pt-3">
// // //                   <div className="flex items-start gap-2">
// // //                     <span className="text-gray-400 shrink-0 w-10">Venue</span>
// // //                     <span className="text-gray-600">: {event.venue}</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <span className="text-gray-400 shrink-0 w-10">Date</span>
// // //                     <span className="text-gray-600">: {formatDate(event.date)}</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <span className="text-gray-400 shrink-0 w-10">Time</span>
// // //                     <span className="text-gray-600">: {event.start_time} to {event.end_time}</span>
// // //                   </div>
// // //                 </div>

// // //                 {/* View Button */}
// // //                 <a
// // //                   href={event.link || "#"}
// // //                   target={event.link ? "_blank" : "_self"}
// // //                   rel="noreferrer"
// // //                   className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-200 rounded-full py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
// // //                 >
// // //                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
// // //                   </svg>
// // //                   View
// // //                 </a>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";

// // // ============================================================
// // // TYPES
// // // ============================================================
// // export interface EventItem {
// //   _id: string;
// //   title: string;
// //   venue: string;
// //   date: string;
// //   start_time: string;
// //   end_time: string;
// //   image_url: string;
// //   link?: string;
// //   description?: string;
// // }

// // // ============================================================
// // // HELPERS
// // // ============================================================
// // function formatDate(dateStr: string) {
// //   return new Date(dateStr).toLocaleDateString("en-US", {
// //     day: "numeric",
// //     month: "long",
// //     year: "numeric",
// //   });
// // }

// // // ============================================================
// // // SKELETON
// // // ============================================================
// // function EventSkeleton() {
// //   return (
// //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //       {Array.from({ length: 3 }).map((_, i) => (
// //         <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
// //           <div className="w-full h-40 bg-gray-100" />
// //           <div className="p-4 space-y-3">
// //             <div className="h-3 bg-gray-100 rounded w-2/3 mx-auto" />
// //             <div className="h-2 bg-gray-100 rounded w-full" />
// //             <div className="h-2 bg-gray-100 rounded w-3/4" />
// //             <div className="h-8 bg-gray-100 rounded-full mt-4" />
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // // ============================================================
// // // EVENT DETAIL MODAL
// // // ============================================================
// // function EventModal({
// //   event,
// //   onClose,
// // }: {
// //   event: EventItem;
// //   onClose: () => void;
// // }) {
// //   // Close on backdrop click
// //   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
// //     if (e.target === e.currentTarget) onClose();
// //   };

// //   return (
// //     <div
// //       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
// //       onClick={handleBackdropClick}
// //     >
// //       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

// //         {/* Image */}
// //         <div className="w-full h-52 overflow-hidden bg-gray-100 relative">
// //           {event.image_url ? (
// //             <img
// //               src={event.image_url}
// //               alt={event.title}
// //               className="w-full h-full object-cover"
// //             />
// //           ) : (
// //             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
// //               <svg
// //                 className="w-14 h-14 text-blue-200"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={1.5}
// //                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
// //                 />
// //               </svg>
// //             </div>
// //           )}

// //           {/* Close button on top-right */}
// //           <button
// //             onClick={onClose}
// //             className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-700 transition-all shadow-sm"
// //           >
// //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //             </svg>
// //           </button>
// //         </div>

// //         {/* Content */}
// //         <div className="p-6">
// //           <h2 className="text-lg font-bold text-gray-800 mb-4">{event.title}</h2>

// //           <div className="space-y-2.5 text-sm text-gray-600 mb-4">
// //             <div className="flex gap-3 items-start">
// //               <span className="text-gray-400 shrink-0 w-5 mt-0.5">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                 </svg>
// //               </span>
// //               <div>
// //                 <span className="text-xs text-gray-400 block mb-0.5">Venue</span>
// //                 <span className="text-gray-700 font-medium">{event.venue}</span>
// //               </div>
// //             </div>

// //             <div className="flex gap-3 items-start">
// //               <span className="text-gray-400 shrink-0 w-5 mt-0.5">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                 </svg>
// //               </span>
// //               <div>
// //                 <span className="text-xs text-gray-400 block mb-0.5">Date</span>
// //                 <span className="text-gray-700 font-medium">{formatDate(event.date)}</span>
// //               </div>
// //             </div>

// //             <div className="flex gap-3 items-start">
// //               <span className="text-gray-400 shrink-0 w-5 mt-0.5">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //               </span>
// //               <div>
// //                 <span className="text-xs text-gray-400 block mb-0.5">Time</span>
// //                 <span className="text-gray-700 font-medium">
// //                   {event.start_time} – {event.end_time}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Description */}
// //           {event.description && (
// //             <div className="border-t border-gray-100 pt-4 mb-5">
// //               <span className="text-xs text-gray-400 block mb-1.5">About this event</span>
// //               <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
// //             </div>
// //           )}

// //           {/* Buttons */}
// //           <div className="flex gap-3 mt-5">
// //             {event.link && (
// //               <a
// //                 href={event.link}
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-full transition-colors"
// //               >
// //                 Learn More
// //               </a>
// //             )}
// //             <button
// //               onClick={onClose}
// //               className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-full hover:bg-gray-50 transition-colors"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ============================================================
// // // MAIN COMPONENT
// // // ============================================================
// // export default function UpcomingEvents() {
// //   const { data: session } = useSession();
// //   const [events, setEvents] = useState<EventItem[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [fetchError, setFetchError] = useState(false);
// //   const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

// //   useEffect(() => {
// //     async function fetchEvents() {
// //       if (!session?.token) {
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const res = await fetch("http://localhost:5000/api/students/events", {
// //           headers: { Authorization: `Bearer ${session.token}` },
// //           cache: "no-store",
// //         });

// //         const data = await res.json();
// //         if (!res.ok || !data.success) throw new Error(data.message || "Failed");
// //         setEvents(Array.isArray(data.data) ? data.data : []);
// //       } catch (err) {
// //         console.error("Events fetch error:", err);
// //         setFetchError(true);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchEvents();
// //   }, [session?.token]);

// //   return (
// //     <>
// //       <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //         <h2 className="text-base font-bold text-gray-800 mb-5">Upcoming Events</h2>

// //         {loading ? (
// //           <EventSkeleton />
// //         ) : fetchError ? (
// //           <div className="text-center py-10 text-sm text-red-400">
// //             Failed to load events. Please try again later.
// //           </div>
// //         ) : events.length === 0 ? (
// //           <div className="text-center py-10 text-gray-400 text-sm">No upcoming events 📅</div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {events.map((event) => (
// //               <div
// //                 key={event._id}
// //                 className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200"
// //               >
// //                 {/* Image */}
// //                 <div className="w-full h-40 overflow-hidden bg-gray-100">
// //                   {event.image_url ? (
// //                     <img
// //                       src={event.image_url}
// //                       alt={event.title}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
// //                       <svg
// //                         className="w-10 h-10 text-blue-200"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={1.5}
// //                           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
// //                         />
// //                       </svg>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Info */}
// //                 <div className="p-4">
// //                   <h3 className="text-sm font-bold text-gray-800 text-center mb-3">
// //                     {event.title}
// //                   </h3>

// //                   <div className="space-y-1.5 text-xs text-gray-500 border-t border-gray-100 pt-3">
// //                     <div className="flex items-start gap-2">
// //                       <span className="text-gray-400 shrink-0 w-10">Venue</span>
// //                       <span className="text-gray-600">: {event.venue}</span>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-gray-400 shrink-0 w-10">Date</span>
// //                       <span className="text-gray-600">: {formatDate(event.date)}</span>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-gray-400 shrink-0 w-10">Time</span>
// //                       <span className="text-gray-600">
// //                         : {event.start_time} to {event.end_time}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* View Button — opens modal */}
// //                   <button
// //                     onClick={() => setSelectedEvent(event)}
// //                     className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-200 rounded-full py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 cursor-pointer"
// //                   >
// //                     <svg
// //                       className="w-3.5 h-3.5"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// //                       />
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// //                       />
// //                     </svg>
// //                     View
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* Modal */}
// //       {selectedEvent && (
// //         <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
// //       )}
// //     </>
// //   );
// // }


// "use client";

// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// export interface EventItem {
//   _id: string;
//   title: string;
//   venue: string;
//   date: string;
//   start_time: string;
//   end_time: string;
//   image_url: string;
//   link?: string;
//   description?: string;
// }

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// function EventSkeleton() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {Array.from({ length: 3 }).map((_, i) => (
//         <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden animate-pulse">
//           <div className="w-full h-40 bg-gray-100 dark:bg-gray-700" />
//           <div className="p-4 space-y-3">
//             <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-2/3 mx-auto" />
//             <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full" />
//             <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-3/4" />
//             <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-full mt-4" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

//         {/* Image */}
//         <div className="w-full h-52 overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
//           {event.image_url ? (
//             <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
//               <svg className="w-14 h-14 text-blue-200 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//           )}

//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition-all shadow-sm"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{event.title}</h2>

//           <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300 mb-4">
//             <div className="flex gap-3 items-start">
//               <span className="text-gray-400 dark:text-gray-500 shrink-0 w-5 mt-0.5">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </span>
//               <div>
//                 <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">Venue</span>
//                 <span className="text-gray-700 dark:text-gray-200 font-medium">{event.venue}</span>
//               </div>
//             </div>

//             <div className="flex gap-3 items-start">
//               <span className="text-gray-400 dark:text-gray-500 shrink-0 w-5 mt-0.5">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </span>
//               <div>
//                 <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">Date</span>
//                 <span className="text-gray-700 dark:text-gray-200 font-medium">{formatDate(event.date)}</span>
//               </div>
//             </div>

//             <div className="flex gap-3 items-start">
//               <span className="text-gray-400 dark:text-gray-500 shrink-0 w-5 mt-0.5">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </span>
//               <div>
//                 <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">Time</span>
//                 <span className="text-gray-700 dark:text-gray-200 font-medium">{event.start_time} – {event.end_time}</span>
//               </div>
//             </div>
//           </div>

//           {event.description && (
//             <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-5">
//               <span className="text-xs text-gray-400 dark:text-gray-500 block mb-1.5">About this event</span>
//               <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
//             </div>
//           )}

//           <div className="flex gap-3 mt-5">
//   <a {event.link && (
//                 href={event.link}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-full transition-colors"
//               >
//                 Learn More
//               </a>
//             )}
//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium py-2.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function UpcomingEvents() {
//   const { data: session } = useSession();
//   const [events, setEvents] = useState<EventItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

//   useEffect(() => {
//     async function fetchEvents() {
//       if (!session?.token) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const res = await fetch("http://localhost:5000/api/students/events", {
//           headers: { Authorization: `Bearer ${session.token}` },
//           cache: "no-store",
//         });
//         const data = await res.json();
//         if (!res.ok || !data.success) throw new Error(data.message || "Failed");
//         setEvents(Array.isArray(data.data) ? data.data : []);
//       } catch (err) {
//         console.error("Events fetch error:", err);
//         setFetchError(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchEvents();
//   }, [session?.token]);

//   return (
//     <>
//       <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
//         <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Upcoming Events</h2>

//         {loading ? (
//           <EventSkeleton />
//         ) : fetchError ? (
//           <div className="text-center py-10 text-sm text-red-400 dark:text-red-500">
//             Failed to load events. Please try again later.
//           </div>
//         ) : events.length === 0 ? (
//           <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
//             No upcoming events 📅
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {events.map((event) => (
//               <div
//                 key={event._id}
//                 className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800"
//               >
//                 {/* Image */}
//                 <div className="w-full h-40 overflow-hidden bg-gray-100 dark:bg-gray-700">
//                   {event.image_url ? (
//                     <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
//                       <svg className="w-10 h-10 text-blue-200 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="p-4">
//                   <h3 className="text-sm font-bold text-gray-800 dark:text-white text-center mb-3">
//                     {event.title}
//                   </h3>

//                   <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
//                     <div className="flex items-start gap-2">
//                       <span className="text-gray-400 dark:text-gray-500 shrink-0 w-10">Venue</span>
//                       <span className="text-gray-600 dark:text-gray-300">: {event.venue}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-400 dark:text-gray-500 shrink-0 w-10">Date</span>
//                       <span className="text-gray-600 dark:text-gray-300">: {formatDate(event.date)}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-400 dark:text-gray-500 shrink-0 w-10">Time</span>
//                       <span className="text-gray-600 dark:text-gray-300">: {event.start_time} to {event.end_time}</span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setSelectedEvent(event)}
//                     className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-200 dark:border-gray-600 rounded-full py-2 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-150 cursor-pointer"
//                   >
//                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                     View
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {selectedEvent && (
//         <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
//       )}
//     </>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface EventItem {
  _id: string;
  title: string;
  venue: string;
  date: string;
  start_time: string;
  end_time: string;
  image_url: string;
  link?: string;
  description?: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EventSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden animate-pulse">
          <div className="w-full h-40 bg-gray-100 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-2/3 mx-auto" />
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full" />
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

        {/* Image */}
        <div className="w-full h-52 overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
          {event.image_url ? (
            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
              <svg className="w-14 h-14 text-blue-200 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{event.title}</h2>

          <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <div className="flex gap-3 items-start">
              <span className="text-gray-400 dark:text-gray-500 shrink-0 w-5 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div>
                <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">Venue</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{event.venue}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-gray-400 dark:text-gray-500 shrink-0 w-5 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">Date</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{formatDate(event.date)}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-gray-400 dark:text-gray-500 shrink-0 w-5 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <span className="text-xs text-gray-400 dark:text-gray-500 block mb-0.5">Time</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{event.start_time} – {event.end_time}</span>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-5">
              <span className="text-xs text-gray-400 dark:text-gray-500 block mb-1.5">About this event</span>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
            </div>
          )}

          <div className="flex gap-3 mt-5">
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-full transition-colors"
              >
                Learn More
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium py-2.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      if (!session?.token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/students/events", {
          headers: { Authorization: `Bearer ${session.token}` },
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Failed");
        setEvents(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Events fetch error:", err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [session?.token]);

  return (
    <>
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-base font-bold text-gray-800 dark:text-white mb-5">Upcoming Events</h2>

        {loading ? (
          <EventSkeleton />
        ) : fetchError ? (
          <div className="text-center py-10 text-sm text-red-400 dark:text-red-500">
            Failed to load events. Please try again later.
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
            No upcoming events 📅
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800"
              >
                {/* Image */}
                <div className="w-full h-40 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {event.image_url ? (
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                      <svg className="w-10 h-10 text-blue-200 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white text-center mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-gray-500 shrink-0 w-10">Venue</span>
                      <span className="text-gray-600 dark:text-gray-300">: {event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 dark:text-gray-500 shrink-0 w-10">Date</span>
                      <span className="text-gray-600 dark:text-gray-300">: {formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 dark:text-gray-500 shrink-0 w-10">Time</span>
                      <span className="text-gray-600 dark:text-gray-300">: {event.start_time} to {event.end_time}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-200 dark:border-gray-600 rounded-full py-2 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-150 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}