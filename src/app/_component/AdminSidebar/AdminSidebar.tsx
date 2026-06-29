// // "use client";

// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { BarChart3, FileText, Settings, UserPlus, Users } from "lucide-react";

// // const menuSections = [
// //   {
// //     title: "Main Menu",
// //     items: [
// //       { name: "Students", href: "/admin/admindashboard", icon: Users },
// //       { name: "Add Student", href: "/admin/admindashboard/add-student", icon: UserPlus },
// //     ],
// //   },
// //   {
// //     title: "Tools",
// //     items: [
// //       { name: "Reports", href: "/admin/admindashboard", icon: BarChart3 },
// //       { name: "Transcripts", href: "/admin/admindashboard", icon: FileText },
// //       { name: "Settings", href: "/admin/admindashboard", icon: Settings },
// //     ],
// //   },
// // ];

// // export default function AdminSidebar() {
// //   const pathname = usePathname();

// //   return (
// //     <aside className="flex min-h-screen w-64 flex-col justify-between border-r border-gray-200 bg-white">
// //       <div>
// //         <div className="border-b border-gray-100 px-5 py-5">
// //           <div className="flex items-center gap-3">
// //             <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
// //               ED
// //             </div>
// //             <div>
// //               <h2 className="font-semibold text-gray-900">EduManage</h2>
// //               <p className="text-xs text-gray-500">Admin Portal</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="space-y-8 px-4 py-6">
// //           {menuSections.map((section) => (
// //             <div key={section.title}>
// //               <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
// //                 {section.title}
// //               </p>

// //               <div className="mt-3 space-y-1">
// //                 {section.items.map((item) => {
// //                   const Icon = item.icon;
// //                   const isActive = pathname === item.href;

// //                   return (
// //                     <Link
// //                       key={item.name}
// //                       href={item.href}
// //                       className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
// //                         isActive
// //                           ? "bg-slate-100 font-medium text-slate-900"
// //                           : "text-gray-600 hover:bg-gray-50"
// //                       }`}
// //                     >
// //                       <Icon size={16} />
// //                       {item.name}
// //                     </Link>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="border-t border-gray-100 px-5 py-4">
// //         <div className="flex items-center gap-3">
// //           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
// //             AD
// //           </div>
// //           <div>
// //             <p className="text-sm font-medium text-gray-800">Admin User</p>
// //             <p className="text-xs text-gray-500">admin@school.edu</p>
// //           </div>
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // }


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { BarChart3, BookOpen, FileText, Settings, UserPlus, Users } from "lucide-react";

// const menuSections = [
//   {
//     title: "Main Menu",
//     items: [
//       { name: "Students", href: "/admin/admindashboard", icon: Users },
//       { name: "Add Student", href: "/admin/admindashboard/add-student", icon: UserPlus },
//       { name: "Courses", href: "/admin/admindashboard/courses", icon: BookOpen },
//     ],
//   },
//   {
//     title: "Tools",
//     items: [
//       { name: "Settings", href: "/admin/settings", icon: Settings },
//     ],
//   },
// ];

// export default function AdminSidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="flex min-h-screen w-64 flex-col justify-between border-r border-gray-200 bg-white">
//       <div>
//         <div className="border-b border-gray-100 px-5 py-5">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
//               ED
//             </div>
//             <div>
//               <h2 className="font-semibold text-gray-900">EduManage</h2>
//               <p className="text-xs text-gray-500">Admin Portal</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-8 px-4 py-6">
//           {menuSections.map((section) => (
//             <div key={section.title}>
//               <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
//                 {section.title}
//               </p>

//               <div className="mt-3 space-y-1">
//                 {section.items.map((item) => {
//                   const Icon = item.icon;
//                   const isActive = pathname === item.href;

//                   return (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                         isActive
//                           ? "bg-slate-100 font-medium text-slate-900"
//                           : "text-gray-600 hover:bg-gray-50"
//                       }`}
//                     >
//                       <Icon size={16} />
//                       {item.name}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="border-t border-gray-100 px-5 py-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
//             AD
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-800">Admin User</p>
//             <p className="text-xs text-gray-500">admin@school.edu</p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Settings, UserPlus, Users } from "lucide-react";

const menuSections = [
  {
    title: "Main Menu",
    items: [
      { name: "Students", href: "/admin/admindashboard", icon: Users },
      { name: "Add Student", href: "/admin/admindashboard/add-student", icon: UserPlus },
      { name: "Courses", href: "/admin/admindashboard/courses", icon: BookOpen },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col justify-between border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div>
        {/* Logo */}
        <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 dark:bg-blue-600 text-sm font-bold text-white">
              ED
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">EduManage</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-8 px-4 py-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500">
                {section.title}
              </p>
              <div className="mt-3 space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                        isActive
                          ? "bg-slate-100 dark:bg-gray-700 font-medium text-slate-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}>
                      <Icon size={16} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
            AD
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@school.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
