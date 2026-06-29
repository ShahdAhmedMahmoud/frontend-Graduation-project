
"use client";

import Navbar from "@/app/_component/Navbar/Navbar";
import MySessionProvider from "../../../MySessionProvider/MySessionProvider";
import DoctorSidebar from "@/app/_component/DoctorSidebar/DoctorSidebar";
import { useEffect } from "react";

function DarkModeInitializer() {
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MySessionProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <DoctorSidebar />
        <div className="flex-1 flex flex-col min-w-0"> 
          <Navbar />
          <main className="p-4 sm:p-8 overflow-x-hidden"> 
            {children}
          </main>
        </div>
      </div>
    </MySessionProvider>
  );
}