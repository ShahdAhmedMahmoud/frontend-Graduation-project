// "use client";

// import { SessionProvider, useSession } from "next-auth/react";
// import { useEffect } from "react";

// function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const { data: session } = useSession();

//   useEffect(() => {
//     const apply = async () => {
//       const token = session?.token;
//       if (!token) return;

//       const res = await fetch("http://localhost:5000/api/students/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       const prefs = result?.data?.preferences;

//       if (prefs?.darkMode) {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }

//       document.documentElement.lang = prefs?.language ?? "en";
//       document.documentElement.dir = prefs?.language === "ar" ? "rtl" : "ltr";
//     };

//     apply();
//   }, [session]);

//   return <>{children}</>;
// }

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider>
//       <ThemeProvider>{children}</ThemeProvider>
//     </SessionProvider>
//   );
// }

"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    const apply = async () => {
      const token = session?.token;
      const role = session?.user?.role; // "student" | "professor" | "admin"
      if (!token || !role) return;

      // اختاري الـ endpoint حسب الـ role
      let endpoint = "http://localhost:5000/api/students/me";
      if (role === "professor") endpoint = "http://localhost:5000/api/professors/me";
      else if (role === "admin") endpoint = "http://localhost:5000/api/admins/me";

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      const prefs = result?.data?.preferences;

      if (prefs?.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      document.documentElement.lang = prefs?.language ?? "en";
      document.documentElement.dir = prefs?.language === "ar" ? "rtl" : "ltr";
    };

    apply();
  }, [session]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}