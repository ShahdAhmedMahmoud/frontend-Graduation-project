

// // "use client";

// // import Sidebar from "../_component/Sidebar/Sidebar";
// // import Navbar from "../_component/Navbar/Navbar";
// // import MySessionProvider from "../../MySessionProvider/MySessionProvider";

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <MySessionProvider>
// //       <div className="flex min-h-screen bg-gray-50">

// //         {/* Sidebar */}
// //         <Sidebar />

// //         {/* Right Section */}
// //         <div className="flex-1 flex flex-col">

// //           {/* Navbar */}
// //           <Navbar />

// //           {/* Page Content */}
// //           <main className="p-8">
// //             {children}
// //           </main>

// //         </div>
// //       </div>
// //     </MySessionProvider>
// //   );
// // }


// "use client";

// import Sidebar from "../_component/Sidebar/Sidebar";
// import Navbar from "../_component/Navbar/Navbar";
// import MySessionProvider from "../../MySessionProvider/MySessionProvider";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <MySessionProvider>
//       <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

//   <Sidebar />

//   <div className="flex-1 flex flex-col min-w-0">

//     <Navbar />

//     <main className="p-4 sm:p-8 overflow-x-hidden bg-gray-50 dark:bg-gray-900">
//       {children}
//     </main>

//   </div>
// </div>
//     </MySessionProvider>
//   );
// }

"use client";

import Sidebar from "../_component/Sidebar/Sidebar";
import Navbar from "../_component/Navbar/Navbar";
import MySessionProvider from "../../MySessionProvider/MySessionProvider";
import { NotificationProvider } from "@/context/NotificationContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MySessionProvider>
      <NotificationProvider>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0">

            <Navbar />

            <main className="p-4 sm:p-8 overflow-x-hidden bg-gray-50 dark:bg-gray-900">
              {children}
            </main>

          </div>
        </div>
      </NotificationProvider>
    </MySessionProvider>
  );
}