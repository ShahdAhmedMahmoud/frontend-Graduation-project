

// // "use client";

// // import { Bell } from "lucide-react";
// // import { useSession } from "next-auth/react";

// // export default function Navbar() {
// //   const { data: session } = useSession();

// //   return (
// //     <header className="w-full h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-700 flex items-center justify-end px-6">
      
// //       <div className="flex items-center gap-6">

// //         {/* Notification */}
// //         <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer" size={20} />

// //         {/* User Info */}
// //         <div className="flex items-center gap-3">
// //           <div className="text-right leading-tight">
// //             <p className="text-sm font-medium text-gray-800 dark:text-white">
// //               Hi, {session?.user?.full_name || session?.user?.name}
// //             </p>
// //             <p className="text-xs text-gray-500 dark:text-gray-400">
// //               Good Morning
// //             </p>
// //           </div>

// //           {/* eslint-disable-next-line @next/next/no-img-element */}
// //           <img
// //             src={session?.user?.avatar || "/avata.jpg"}
// //             alt="avatar"
// //             className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
// //           />
// //         </div>

// //       </div>
// //     </header>
// //   );
// // }



// "use client";

// import { Bell, Sun, Moon } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const { data: session } = useSession();
//   const [isDark, setIsDark] = useState(false);

//  // استبدلي الـ useEffect والـ toggleDarkMode بالكود ده

// // sync on mount من localStorage
// useEffect(() => {
//   const saved = localStorage.getItem("darkMode");
//   if (saved === "true") {
//     document.documentElement.classList.add("dark");
//     setIsDark(true);
//   } else {
//     setIsDark(false);
//     // مش بنشيل الـ class هنا عشان الـ script في layout.tsx هو اللي بيتحكم فيها
//   }
// }, []);

// const toggleDarkMode = () => {
//   const html = document.documentElement;
//   if (html.classList.contains("dark")) {
//     html.classList.remove("dark");
//     localStorage.setItem("darkMode", "false");
//     setIsDark(false);
//   } else {
//     html.classList.add("dark");
//     localStorage.setItem("darkMode", "true");
//     setIsDark(true);
//   }
// };
//   // استخراج أول حرفين من الاسم
//   const getInitials = (name?: string | null) => {
//     if (!name) return "?";
//     const parts = name.trim().split(" ");
//     if (parts.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[1][0]).toUpperCase();
//   };

//   const fullName = session?.user?.full_name || session?.user?.name;
//   const hasAvatar = !!session?.user?.avatar;

//   return (
//     <header className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6">

//       <div className="flex items-center gap-6">

//         {/* Dark Mode Toggle */}
//         <button
//           onClick={toggleDarkMode}
//           className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
//           aria-label="Toggle dark mode"
//         >
//           {isDark ? <Sun size={20} /> : <Moon size={20} />}
//         </button>

//         {/* Notification */}
//         <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer" size={20} />

//         {/* User Info */}
//         <div className="flex items-center gap-3">
//           <div className="text-right leading-tight">
//             <p className="text-sm font-medium text-gray-800 dark:text-white">
//               Hi, {fullName}
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               Good Morning
//             </p>
//           </div>

//           {/* Avatar or Initials */}
//           {hasAvatar ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img
//               src={session?.user?.avatar}
//               alt="avatar"
//               className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
//             />
//           ) : (
//             <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center border border-blue-400">
//               <span className="text-white text-xs font-semibold">
//                 {getInitials(fullName)}
//               </span>
//             </div>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// }

"use client";

import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

export default function Navbar() {
  const { data: session } = useSession();

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const fullName = session?.user?.full_name || session?.user?.name;
  const hasAvatar = !!session?.user?.avatar;

  return (
    <header className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6">
      <div className="flex items-center gap-6">

        <DarkModeToggle />

        <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer" size={20} />

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              Hi, {fullName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Good Morning
            </p>
          </div>

          {hasAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session?.user?.avatar}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center border border-blue-400">
              <span className="text-white text-xs font-semibold">
                {getInitials(fullName)}
              </span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}