// "use client";

// import AdminSidebar from "@/app/_component/AdminSidebar/AdminSidebar";
// import Navbar from "@/app/_component/Navbar/Navbar";
// import MySessionProvider from "@/MySessionProvider/MySessionProvider";

// export default function AdminDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <MySessionProvider>
//       <div className="flex min-h-screen bg-[#fafafa]">
//         <AdminSidebar />

//         <div className="flex min-h-screen flex-1 flex-col">
//           <Navbar />
//           <main className="flex-1 p-8">{children}</main>
//         </div>
//       </div>
//     </MySessionProvider>
//   );
// }

"use client";

import AdminSidebar from "@/app/_component/AdminSidebar/AdminSidebar";
import Navbar from "@/app/_component/Navbar/Navbar";
import MySessionProvider from "@/MySessionProvider/MySessionProvider";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MySessionProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col min-w-0">
          <Navbar />
          <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </MySessionProvider>
  );
}