// // // import React from "react";
// // // import {
// // //   Calendar,
// // //   FileSpreadsheet,
// // //   BookOpen,
// // //   Wallet,
// // //   GraduationCap,
// // //   PenTool,
// // //   List,
// // // } from "lucide-react";

// // // export default function ServicesPage() {
// // //   const services = [
// // //     { title: "Schedule", icon: <Calendar size={32} />, href: "/dashboard/schedule" },
// // //     { title: "Attendance", icon: <FileSpreadsheet size={32} />, href: "/dashboard/attendance" },
// // //     { title: "Courses", icon: <BookOpen size={32} />, href: "/dashboard/coursesenrollment" },
// // //     { title: "Tuition Fees", icon: <Wallet size={32} />, href: "/dashboard/fees" },
// // //     { title: "Grades", icon: <GraduationCap size={32} />, href: "/dashboard/grades" },
// // //     { title: "Registration", icon: <PenTool size={32} />, href: "/dashboard/courses" },
// // //     { title: "Services", icon: <List size={32} />, href: "/services" },
// // //   ];

// // //   return (
// // //     <div className="w-[85%] mx-auto my-10">
// // //       <h1 className="text-2xl font-bold mb-6">Services</h1>

// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //         {services.map((service, index) => (
// // //           <a
// // //             key={index}
// // //             href={service.href}
// // //             className="
// // //               bg-[#eef2ff] 
// // //               rounded-2xl 
// // //               h-[140px]
// // //               shadow
// // //               flex flex-col items-center justify-center 
// // //               gap-3
// // //               transition-all
// // //               hover:shadow-lg
// // //               hover:bg-[#e0e7ff]
// // //             "
// // //           >
// // //             <div className="text-blue-700">
// // //               {service.icon}
// // //             </div>
// // //             <h3 className="text-sm font-semibold text-gray-700">
// // //               {service.title}
// // //             </h3>
// // //           </a>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import React, { useState } from "react";
// // import Link from "next/link";
// // import {
// //   Calendar,
// //   FileSpreadsheet,
// //   BookOpen,
// //   Wallet,
// //   GraduationCap,
// //   PenTool,
// //   List,
// //   Bot,
// //   BookMarked,
// //   Code2,
// //   ChevronRight,
// // } from "lucide-react";

// // export default function ServicesPage() {
// //   const [aiOpen, setAiOpen] = useState(false);

// //   const services = [
// //     {
// //       title: "Schedule",
// //       icon: <Calendar size={32} />,
// //       href: "/dashboard/schedule",
// //     },
// //     {
// //       title: "Attendance",
// //       icon: <FileSpreadsheet size={32} />,
// //       href: "/dashboard/attendance",
// //     },
// //     {
// //       title: "Courses",
// //       icon: <BookOpen size={32} />,
// //       href: "/dashboard/coursesenrollment",
// //     },
// //     {
// //       title: "Tuition Fees",
// //       icon: <Wallet size={32} />,
// //       href: "/dashboard/fees",
// //     },
// //     {
// //       title: "Grades",
// //       icon: <GraduationCap size={32} />,
// //       href: "/dashboard/grades",
// //     },
// //     {
// //       title: "Registration",
// //       icon: <PenTool size={32} />,
// //       href: "/dashboard/courses",
// //     },
// //     {
// //       title: "Services",
// //       icon: <List size={32} />,
// //       href: "/services",
// //     },
// //   ];

// //   return (
// //     <div className="w-[85%] mx-auto my-10">
// //       <h1 className="text-2xl font-bold mb-6">Services</h1>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {services.map((service, index) => (
// //           <Link
// //             key={index}
// //             href={service.href}
// //             className="bg-[#eef2ff] rounded-2xl h-[140px] shadow flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg hover:bg-[#e0e7ff]"
// //           >
// //             <div className="text-blue-700">{service.icon}</div>
// //             <h3 className="text-sm font-semibold text-gray-700">
// //               {service.title}
// //             </h3>
// //           </Link>
// //         ))}

// //         {/* AI Assistant Card */}
// //         <div
// //           className="relative"
// //           onMouseEnter={() => setAiOpen(true)}
// //           onMouseLeave={() => setAiOpen(false)}
// //         >
// //           <div className="bg-[#eef2ff] rounded-2xl h-[140px] shadow flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg hover:bg-[#e0e7ff] cursor-pointer">
// //             <div className="text-blue-700">
// //               <Bot size={32} />
// //             </div>
// //             <h3 className="text-sm font-semibold text-gray-700">
// //               AI Assistant
// //             </h3>
// //           </div>

// //           {/* Dropdown */}
// //           {aiOpen && (
// //             <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 w-[220px] bg-white border border-gray-200 rounded-2xl shadow-xl p-2 flex flex-col gap-2">
// //               <Link
// //                 href="/dashboard/teaching-assistant"
// //                 className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-300 transition-all group"
// //               >
// //                 <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-700 flex-shrink-0">
// //                   <BookMarked size={18} />
// //                 </div>

// //                 <div className="flex-1">
// //                   <p className="text-sm font-semibold text-gray-800">
// //                     Teaching Assistant
// //                   </p>
// //                   <p className="text-[11px] text-gray-500">
// //                     Ask questions & get explanations
// //                   </p>
// //                 </div>

// //                 <ChevronRight
// //                   size={14}
// //                   className="text-gray-400 group-hover:text-gray-600"
// //                 />
// //               </Link>

// //               <Link
// //                 href="/dashboard/code-assistant"
// //                 className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-300 transition-all group"
// //               >
// //                 <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
// //                   <Code2 size={18} />
// //                 </div>

// //                 <div className="flex-1">
// //                   <p className="text-sm font-semibold text-gray-800">
// //                     Code Assistant
// //                   </p>
// //                   <p className="text-[11px] text-gray-500">
// //                     Debug, review & write code
// //                   </p>
// //                 </div>

// //                 <ChevronRight
// //                   size={14}
// //                   className="text-gray-400 group-hover:text-gray-600"
// //                 />
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   Calendar,
//   FileSpreadsheet,
//   BookOpen,
//   Wallet,
//   GraduationCap,
//   PenTool,
//   List,
//   Bot,
//   BookMarked,
//   Code2,
//   X,
// } from "lucide-react";

// export default function ServicesPage() {
//   const [aiOpen, setAiOpen] = useState(false);

//   const services = [
//     { title: "Schedule", icon: <Calendar size={28} />, href: "/dashboard/schedule" },
//     { title: "Attendance", icon: <FileSpreadsheet size={28} />, href: "/dashboard/attendance" },
//     { title: "Courses", icon: <BookOpen size={28} />, href: "/dashboard/coursesenrollment" },
//     { title: "Tuition Fees", icon: <Wallet size={28} />, href: "/dashboard/fees" },
//     { title: "Grades", icon: <GraduationCap size={28} />, href: "/dashboard/grades" },
//     { title: "Registration", icon: <PenTool size={28} />, href: "/dashboard/courses" },
//     { title: "Services", icon: <List size={28} />, href: "/services" },
//   ];

//   return (
//     <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-8 py-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto h-full flex flex-col">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Services</h1>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//           {services.map((service, index) => (
//             <Link
//               key={index}
//               href={service.href}
//               className="h-32 rounded-3xl bg-white shadow-md border border-gray-100 flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all"
//             >
//               <div className="text-blue-600">{service.icon}</div>
//               <span className="font-semibold text-gray-700 text-sm">
//                 {service.title}
//               </span>
//             </Link>
//           ))}

//           <button
//             onClick={() => setAiOpen(true)}
//             className="h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all"
//           >
//             <Bot size={28} />
//             <span className="font-semibold text-sm">AI Assistant</span>
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {aiOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="w-[420px] rounded-3xl bg-white shadow-2xl p-6 relative">
//             <button
//               onClick={() => setAiOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-black"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-xl font-bold mb-6 text-gray-800">
//               AI Assistant
//             </h2>

//             <div className="space-y-4">
//               <Link
//                 href="/dashboard/teaching-assistant"
//                 className="block p-4 rounded-2xl border hover:shadow-md hover:border-violet-300 transition-all"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-xl bg-violet-100 text-violet-700">
//                     <BookMarked size={20} />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Teaching Assistant</p>
//                     <p className="text-sm text-gray-500">
//                       Ask questions & explanations
//                     </p>
//                   </div>
//                 </div>
//               </Link>

//               <Link
//                 href="/dashboard/code-assistant"
//                 className="block p-4 rounded-2xl border hover:shadow-md hover:border-emerald-300 transition-all"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
//                     <Code2 size={20} />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Code Assistant</p>
//                     <p className="text-sm text-gray-500">
//                       Debug, review & write code
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  FileSpreadsheet,
  BookOpen,
  Wallet,
  GraduationCap,
  PenTool,
  List,
  Bot,
  BookMarked,
  Code2,
  X,
} from "lucide-react";

export default function ServicesPage() {
  const [aiOpen, setAiOpen] = useState(false);

  const services = [
    { title: "Schedule", icon: <Calendar size={28} />, href: "/dashboard/schedule" },
    { title: "Attendance", icon: <FileSpreadsheet size={28} />, href: "/dashboard/attendance" },
    { title: "Courses", icon: <BookOpen size={28} />, href: "/dashboard/coursesenrollment" },
    { title: "Tuition Fees", icon: <Wallet size={28} />, href: "/dashboard/fees" },
    { title: "Grades", icon: <GraduationCap size={28} />, href: "/dashboard/grades" },
    { title: "Registration", icon: <PenTool size={28} />, href: "/dashboard/courses" },
    { title: "Services", icon: <List size={28} />, href: "/services" },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-900 px-8 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Services</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="h-32 rounded-3xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="text-blue-600 dark:text-blue-400">{service.icon}</div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                {service.title}
              </span>
            </Link>
          ))}

          <button
            onClick={() => setAiOpen(true)}
            className="h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all"
          >
            <Bot size={28} />
            <span className="font-semibold text-sm">AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {aiOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[420px] rounded-3xl bg-white dark:bg-gray-800 shadow-2xl p-6 relative">
            <button
              onClick={() => setAiOpen(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
              AI Assistant
            </h2>

            <div className="space-y-4">
              <Link
                href="/dashboard/teaching-assistant"
                className="block p-4 rounded-2xl border dark:border-gray-700 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-500 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                    <BookMarked size={20} />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">Teaching Assistant</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ask questions & explanations
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/dashboard/code-assistant"
                className="block p-4 rounded-2xl border dark:border-gray-700 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-500 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">Code Assistant</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Debug, review & write code
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
