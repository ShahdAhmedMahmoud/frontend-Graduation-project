

// // "use client";

// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { useSession } from "next-auth/react";
// // import {
// //   Home,
// //   Grid,
// //   Users,
// //   User,
// //   Settings,
// //   LogOut,
// // } from "lucide-react";

// // export default function Sidebar() {
// //   const { data: session } = useSession();
// //   const pathname = usePathname();

// //   const menu = [
// //     { name: "Home", href: "/dashboard", icon: Home },
// //     { name: "Services", href: "/dashboard/services", icon: Grid },
// //     { name: "Community", href: "/dashboard/community", icon: Users },
// //     { name: "Profile", href: "/dashboard/profile", icon: User },
// //     { name: "Settings", href: "/dashboard/settings", icon: Settings },
// //   ];

// //   return (
// //     <aside className="w-64 min-h-screen bg-white border-r flex flex-col justify-between p-4">
// //       {/* Top */}
// //       <div>
// //         {/* Logo / Name */}
// //         <div className="flex items-center gap-2 mb-8">
// //           <div className="w-10 h-10 rounded-md overflow-hidden bg-blue-600">
// //             {/* eslint-disable-next-line @next/next/no-img-element */}
// //             <img
// //               src={session?.user?.avatar || "/avata.jpg"}
// //               alt="student avatar"
// //               className="w-full h-full object-cover"
// //             />
// //           </div>
// //           <span className="font-semibold text-lg truncate">
// //             {session?.user?.full_name || "Student"}
// //           </span>
// //         </div>
// //         {/* Menu */}
// //         <ul className="space-y-2">
// //           {menu.map((item) => {
// //             const Icon = item.icon;
// //             const active = pathname === item.href;

// //             return (
// //               <li key={item.name}>
// //                 <Link
// //                   href={item.href}
// //                   className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
// //                     ${
// //                       active
// //                         ? "bg-blue-100 text-blue-600 font-medium"
// //                         : "text-gray-500 hover:bg-gray-100"
// //                     }
// //                   `}
// //                 >
// //                   <Icon size={18} />
// //                   {item.name}
// //                 </Link>
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       </div>

// //       {/* Logout */}
// //       <button
// //         className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-600 text-white text-sm hover:bg-gray-700"
// //       >
// //         <LogOut size={18} />
// //         Logout
// //       </button>
// //     </aside>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   Home,
//   Grid,
//   Users,
//   User,
//   Settings,
//   LogOut,
// } from "lucide-react";

// export default function Sidebar() {
//   const { data: session } = useSession();
//   const pathname = usePathname();

//   const menu = [
//     { name: "Home", href: "/dashboard", icon: Home },
//     { name: "Services", href: "/dashboard/services", icon: Grid },
//     // { name: "Community", href: "/dashboard/community", icon: Users },
//     { name: "Profile", href: "/dashboard/profile", icon: User },
//     { name: "Settings", href: "/dashboard/settings", icon: Settings },
//   ];

//   return (
//     <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col justify-between p-4">
//       {/* Top */}
//       <div>
//         {/* Logo / Name */}
//         <div className="flex items-center gap-2 mb-8">
//           <div className="w-10 h-10 rounded-md overflow-hidden bg-blue-600">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={session?.user?.avatar || "/avata.jpg"}
//               alt="student avatar"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <span className="font-semibold text-lg truncate dark:text-white">
//             {session?.user?.full_name || "Student"}
//           </span>
//         </div>
//         {/* Menu */}
//         <ul className="space-y-2">
//           {menu.map((item) => {
//             const Icon = item.icon;
//             const active = pathname === item.href;

//             return (
//               <li key={item.name}>
//                 <Link
//                   href={item.href}
//                   className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
//                     ${
//                       active
//                         ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
//                         : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     }
//                   `}
//                 >
//                   <Icon size={18} />
//                   {item.name}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* Logout */}
//       <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-600 dark:bg-gray-700 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-600">
//         <LogOut size={18} />
//         Logout
//       </button>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession ,signOut} from "next-auth/react";
import {
  Home,
  Grid,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const getInitials = (name?: string | null) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const fullName = session?.user?.full_name || session?.user?.name;
  const hasAvatar = !!session?.user?.avatar;

  const menu = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Services", href: "/dashboard/services", icon: Grid },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col justify-between p-4">
      {/* Top */}
      <div>
        {/* Logo / Name */}
        <div className="flex items-center gap-2 mb-8">
          {hasAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session?.user?.avatar}
              alt="student avatar"
              className="w-10 h-10 rounded-md object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-semibold">
                {getInitials(fullName)}
              </span>
            </div>
          )}
          <span className="font-semibold text-lg truncate dark:text-white">
            {fullName || "Student"}
          </span>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                    ${
                      active
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      {/* <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-600 dark:bg-gray-700 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-600">
        <LogOut size={18} />
        Logout
      </button> */}
      <button
  onClick={() => signOut({ callbackUrl: "/login" })}
  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-600 dark:bg-gray-700 text-white text-sm hover:bg-gray-700 dark:hover:bg-gray-600"
>
  <LogOut size={18} />
  Logout
</button>
    </aside>
  );
}