
// "use client";
// import { Bell } from "lucide-react";
// import { useSession } from "next-auth/react";
// import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
// import { useNotification } from "@/context/NotificationContext";
// import { getAvatarUrl } from "@/lib/getAvatarUrl";
// export default function Navbar() {
//   const { data: session } = useSession();
//   const { unreadCount, resetUnread } = useNotification();

//   const getInitials = (name?: string | null) => {
//     if (!name) return "?";
//     const parts = name.trim().split(" ");
//     if (parts.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[1][0]).toUpperCase();
//   };

//   const fullName = session?.user?.full_name || session?.user?.name;
//   const avatarUrl = getAvatarUrl(session?.user?.avatar);

//   return (
//     <header className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6">
//       <div className="flex items-center gap-6">

//         <DarkModeToggle />

//         {/* ✅ الجرس مع الـ badge */}
//         <div className="relative cursor-pointer" onClick={resetUnread}>
//           <Bell className="text-gray-600 dark:text-gray-300" size={20} />
//           {unreadCount > 0 && (
//             <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
//               {unreadCount > 9 ? "9+" : unreadCount}
//             </span>
//           )}
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="text-right leading-tight">
//             <p className="text-sm font-medium text-gray-800 dark:text-white">
//               Hi, {fullName}
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               Good Morning
//             </p>
//           </div>

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
import { useNotification } from "@/context/NotificationContext";
import { getAvatarUrl } from "@/lib/getAvatarUrl";

export default function Navbar() {
  const { data: session } = useSession();
  const { unreadCount, resetUnread } = useNotification();

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const fullName = session?.user?.full_name || session?.user?.name;
  const avatarUrl = getAvatarUrl(session?.user?.avatar); // ← جديد

  return (
    <header className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6">
      <div className="flex items-center gap-6">

        <DarkModeToggle />

        {/* ✅ الجرس مع الـ badge */}
        <div className="relative cursor-pointer" onClick={resetUnread}>
          <Bell className="text-gray-600 dark:text-gray-300" size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              Hi, {fullName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Good Morning
            </p>
          </div>

          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
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