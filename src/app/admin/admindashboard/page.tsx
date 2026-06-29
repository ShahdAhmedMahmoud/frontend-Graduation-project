
// "use client";
// import { useEffect, useMemo, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Grid3X3, List, Mail, Phone, Search, Plus, MoreVertical,
// } from "lucide-react";

// type Student = {
//   _id: string;
//   full_name: string;
//   email: string;
//   phone?: string;
//   gpa?: number | null;
//   avatar?: string | null;
//   enrollment_status?: string;
//   courses?: string[];
//   year?: number;
// };

// const API_BASE_URL = "http://localhost:5000/api";

// const YEAR_TABS = [
//   { id: "all", label: "All Students" },
//   { id: "1",   label: "Year 1" },
//   { id: "2",   label: "Year 2" },
//   { id: "3",   label: "Year 3" },
//   { id: "4",   label: "Year 4" },
//   { id: "5",   label: "Year 5" },
// ];

// function getStatusTone(status: string) {
//   switch (status.toLowerCase()) {
//     case "active":    return "bg-emerald-50 text-emerald-600";
//     case "graduated": return "bg-blue-50 text-blue-600";
//     case "inactive":  return "bg-amber-50 text-amber-700";
//     case "suspended": return "bg-rose-50 text-rose-600";
//     default:          return "bg-gray-100 text-gray-600";
//   }
// }

// function initials(name: string) {
//   return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
// }

// export default function AdminDashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [students, setStudents]             = useState<Student[]>([]);
//   const [search, setSearch]                 = useState("");
//   const [statusFilter, setStatusFilter]     = useState("All Status");
//   const [viewMode, setViewMode]             = useState<"grid" | "list">("grid");
//   const [loading, setLoading]               = useState(true);
//   const [error, setError]                   = useState("");
//   const [activeYear, setActiveYear]         = useState("all");

//   useEffect(() => {
//     if (status === "unauthenticated") { router.push("/admin/login"); return; }

//     async function fetchStudents() {
//       if (!session?.token) return;
//       try {
//         setLoading(true);
//         setError("");
//         const res = await fetch(`${API_BASE_URL}/admin/students`, {
//           headers: { Authorization: `Bearer ${session.token}`, "Content-Type": "application/json" },
//           cache: "no-store",
//         });
//         const data = await res.json();
//         if (!res.ok || !data.success) throw new Error(data.message || "Failed to fetch students");
//         setStudents(data.data || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (status === "authenticated") fetchStudents();
//   }, [router, session?.token, status]);

//   // ✅ عدد الطلاب في كل سنة
//   const countByYear = useMemo(() => {
//     const map: Record<string, number> = { all: students.length };
//     students.forEach((s) => {
//       const y = String(s.year ?? "");
//       if (y) map[y] = (map[y] || 0) + 1;
//     });
//     return map;
//   }, [students]);

//   // ✅ الفلترة
//   const filteredStudents = useMemo(() => {
//     return students.filter((student) => {
//       const matchesSearch =
//         !search ||
//         student.full_name.toLowerCase().includes(search.toLowerCase()) ||
//         student.email.toLowerCase().includes(search.toLowerCase());

//       const matchesStatus =
//         statusFilter === "All Status" ||
//         (student.enrollment_status || "Unknown").toLowerCase() === statusFilter.toLowerCase();

//       const matchesYear =
//         activeYear === "all" || String(student.year ?? "") === activeYear;

//       return matchesSearch && matchesStatus && matchesYear;
//     });
//   }, [search, statusFilter, activeYear, students]);

//   const activeYearLabel = activeYear === "all"
//     ? "All Students"
//     : `Year ${activeYear}`;

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-900">Student Management</h1>
//           <p className="mt-1 text-sm text-gray-500">Manage student profiles and academic information</p>
//         </div>
//         <Link
//           href="/admin/admindashboard/add-student"
//           className="inline-flex items-center gap-2 self-start rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
//         >
//           <Plus size={16} />
//           Add Student
//         </Link>
//       </div>

//       {/* Search + Filter */}
//       <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
//         <div className="flex flex-col gap-3 xl:flex-row">
//           <div className="relative flex-1">
//             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search students..."
//               className="w-full rounded-2xl bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none ring-1 ring-gray-100 transition focus:ring-2 focus:ring-slate-200"
//             />
//           </div>

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none ring-1 ring-gray-100"
//           >
//             <option>All Status</option>
//             <option>Active</option>
//             <option>Inactive</option>
//             <option>Graduated</option>
//             <option>Suspended</option>
//           </select>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`rounded-xl border p-3 transition ${
//                 viewMode === "grid"
//                   ? "border-slate-800 bg-slate-800 text-white"
//                   : "border-gray-200 text-gray-500 hover:bg-gray-50"
//               }`}
//             >
//               <Grid3X3 size={16} />
//             </button>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`rounded-xl border p-3 transition ${
//                 viewMode === "list"
//                   ? "border-slate-800 bg-slate-800 text-white"
//                   : "border-gray-200 text-gray-500 hover:bg-gray-50"
//               }`}
//             >
//               <List size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Year Tabs + Students */}
//       <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

//         {/* Tabs */}
//         <div className="flex border-b border-gray-100">
//           {YEAR_TABS.map((tab) => {
//             const isActive = activeYear === tab.id;
//             const count    = countByYear[tab.id] ?? 0;

//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveYear(tab.id)}
//                 className={`flex flex-1 flex-col items-center justify-center gap-1 py-3.5 text-xs font-medium transition-all border-b-2 -mb-px ${
//                   isActive
//                     ? "border-slate-800 text-slate-900 bg-slate-50"
//                     : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <span>{tab.label}</span>
//                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
//                   isActive ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-400"
//                 }`}>
//                   {count}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Count bar */}
//         <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
//           <p className="text-sm text-gray-500">
//             Showing{" "}
//             <span className="font-semibold text-gray-800">{filteredStudents.length}</span>
//             {" "}of{" "}
//             <span className="font-semibold text-gray-800">{students.length}</span>
//             {" "}students
//           </p>
//           <span className="text-xs font-medium text-gray-400">{activeYearLabel}</span>
//         </div>

//         {/* Students */}
//         <div className="p-4">
//           {loading ? (
//             <div className={`grid gap-5 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="h-64 animate-pulse rounded-3xl border border-gray-200 bg-gray-50" />
//               ))}
//             </div>
//           ) : error ? (
//             <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
//               {error}
//             </div>
//           ) : filteredStudents.length === 0 ? (
//             <div className="py-16 text-center">
//               <p className="text-sm text-gray-400">No students found in {activeYearLabel}</p>
//             </div>
//           ) : viewMode === "grid" ? (

//             // ===== Grid View =====
//             <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//               {filteredStudents.map((student) => {
//                 const st  = student.enrollment_status || "Unknown";
//                 const gpa = typeof student.gpa === "number" ? student.gpa.toFixed(1) : "0.0";
//                 const subjectsCount = student.courses?.length ?? 0;

//                 return (
//                   <Link
//                     key={student._id}
//                     href={`/admin/admindashboard/students/${student._id}`}
//                     className="block rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-lg font-semibold text-slate-700">
//                         {student.avatar ? (
//                           // eslint-disable-next-line @next/next/no-img-element
//                           <img src={student.avatar} alt={student.full_name} className="h-full w-full object-cover" />
//                         ) : (
//                           initials(student.full_name)
//                         )}
//                       </div>
//                       <button
//                         onClick={(e) => e.preventDefault()}
//                         className="rounded-full p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
//                       >
//                         <MoreVertical size={16} />
//                       </button>
//                     </div>

//                     <div className="mt-4 flex items-start justify-between gap-4">
//                       <div>
//                         <h2 className="text-lg font-semibold leading-snug text-gray-900">{student.full_name}</h2>
//                         <p className="text-xs text-gray-400">Student profile</p>
//                       </div>
//                       <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusTone(st)}`}>
//                         {st.toLowerCase()}
//                       </span>
//                     </div>

//                     <div className="mt-5 space-y-2.5 text-sm text-gray-500">
//                       <div className="flex items-center gap-2">
//                         <Mail size={14} className="text-gray-400" />
//                         <span className="truncate">{student.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone size={14} className="text-gray-400" />
//                         <span>{student.phone || "No phone provided"}</span>
//                       </div>
//                     </div>

//                     <div className="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
//                       <div>
//                         <p className="text-xs text-gray-400">GPA</p>
//                         <p className="mt-1 text-sm font-semibold text-gray-900">{gpa}</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-xs text-gray-400">Year</p>
//                         <p className="mt-1 text-sm font-semibold text-gray-900">{student.year ?? "—"}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-xs text-gray-400">Subjects</p>
//                         <p className="mt-1 text-sm font-semibold text-gray-900">{subjectsCount}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>

//           ) : (

//             // ===== List View =====
//             <div className="divide-y divide-gray-50">
//               {filteredStudents.map((student) => {
//                 const st  = student.enrollment_status || "Unknown";
//                 const gpa = typeof student.gpa === "number" ? student.gpa.toFixed(1) : "0.0";
//                 const subjectsCount = student.courses?.length ?? 0;

//                 return (
//                   <Link
//                     key={student._id}
//                     href={`/admin/admindashboard/students/${student._id}`}
//                     className="flex items-center gap-4 py-4 px-2 hover:bg-gray-50 rounded-xl transition-colors"
//                   >
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-sm font-semibold text-slate-700">
//                       {student.avatar ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img src={student.avatar} alt={student.full_name} className="h-full w-full object-cover" />
//                       ) : (
//                         initials(student.full_name)
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-semibold text-gray-900 truncate">{student.full_name}</p>
//                       <p className="text-xs text-gray-400 truncate">{student.email}</p>
//                     </div>

//                     <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
//                       <span>Year {student.year ?? "—"}</span>
//                       <span>GPA {gpa}</span>
//                       <span>{subjectsCount} subjects</span>
//                     </div>

//                     <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shrink-0 ${getStatusTone(st)}`}>
//                       {st.toLowerCase()}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Grid3X3, List, Mail, Phone, Search, Plus, MoreVertical } from "lucide-react";

type Student = {
  _id: string; full_name: string; email: string; phone?: string;
  gpa?: number | null; avatar?: string | null; enrollment_status?: string;
  courses?: string[]; year?: number;
};

const API_BASE_URL = "http://localhost:5000/api";
const YEAR_TABS = [
  { id: "all", label: "All Students" }, { id: "1", label: "Year 1" },
  { id: "2", label: "Year 2" }, { id: "3", label: "Year 3" },
  { id: "4", label: "Year 4" }, { id: "5", label: "Year 5" },
];

function getStatusTone(status: string) {
  switch (status.toLowerCase()) {
    case "active":    return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
    case "graduated": return "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
    case "inactive":  return "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
    case "suspended": return "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400";
    default:          return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
  }
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeYear, setActiveYear] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    async function fetchStudents() {
      if (!session?.token) return;
      try {
        setLoading(true); setError("");
        const res = await fetch(`${API_BASE_URL}/admin/students`, {
          headers: { Authorization: `Bearer ${session.token}`, "Content-Type": "application/json" },
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Failed to fetch students");
        setStudents(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally { setLoading(false); }
    }
    if (status === "authenticated") fetchStudents();
  }, [router, session?.token, status]);

  const countByYear = useMemo(() => {
    const map: Record<string, number> = { all: students.length };
    students.forEach((s) => { const y = String(s.year ?? ""); if (y) map[y] = (map[y] || 0) + 1; });
    return map;
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = !search || student.full_name.toLowerCase().includes(search.toLowerCase()) || student.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || (student.enrollment_status || "Unknown").toLowerCase() === statusFilter.toLowerCase();
      const matchesYear = activeYear === "all" || String(student.year ?? "") === activeYear;
      return matchesSearch && matchesStatus && matchesYear;
    });
  }, [search, statusFilter, activeYear, students]);

  const activeYearLabel = activeYear === "all" ? "All Students" : `Year ${activeYear}`;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Student Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage student profiles and academic information</p>
        </div>
        <Link href="/admin/admindashboard/add-student"
          className="inline-flex items-center gap-2 self-start rounded-xl bg-slate-950 dark:bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-blue-700">
          <Plus size={16} /> Add Student
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..."
              className="w-full rounded-2xl bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none ring-1 ring-gray-100 dark:ring-gray-600 transition focus:ring-2 focus:ring-slate-200 dark:focus:ring-gray-500" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl bg-gray-50 dark:bg-gray-700 dark:text-gray-200 px-4 py-3 text-sm text-gray-700 outline-none ring-1 ring-gray-100 dark:ring-gray-600">
            <option>All Status</option><option>Active</option><option>Inactive</option>
            <option>Graduated</option><option>Suspended</option>
          </select>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode("grid")}
              className={`rounded-xl border p-3 transition ${viewMode === "grid" ? "border-slate-800 bg-slate-800 text-white" : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
              <Grid3X3 size={16} />
            </button>
            <button onClick={() => setViewMode("list")}
              className={`rounded-xl border p-3 transition ${viewMode === "list" ? "border-slate-800 bg-slate-800 text-white" : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Year Tabs + Students */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-700">
          {YEAR_TABS.map((tab) => {
            const isActive = activeYear === tab.id;
            const count = countByYear[tab.id] ?? 0;
            return (
              <button key={tab.id} onClick={() => setActiveYear(tab.id)}
                className={`flex flex-1 flex-col items-center justify-center gap-1 py-3.5 text-xs font-medium transition-all border-b-2 -mb-px ${
                  isActive ? "border-slate-800 dark:border-blue-500 text-slate-900 dark:text-white bg-slate-50 dark:bg-gray-700"
                    : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}>
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? "bg-slate-800 dark:bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-300"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Count bar */}
        <div className="px-5 py-3 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-700/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-800 dark:text-white">{filteredStudents.length}</span> of <span className="font-semibold text-gray-800 dark:text-white">{students.length}</span> students
          </p>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{activeYearLabel}</span>
        </div>

        {/* Students */}
        <div className="p-4">
          {loading ? (
            <div className={`grid gap-5 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-5 py-4 text-sm text-red-600 dark:text-red-400">{error}</div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-400 dark:text-gray-500">No students found in {activeYearLabel}</p>
            </div>
          ) : viewMode === "grid" ? (

            // Grid View
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredStudents.map((student) => {
                const st = student.enrollment_status || "Unknown";
                const gpa = typeof student.gpa === "number" ? student.gpa.toFixed(1) : "0.0";
                const subjectsCount = student.courses?.length ?? 0;
                return (
                  <Link key={student._id} href={`/admin/admindashboard/students/${student._id}`}
                    className="block rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/40 dark:to-indigo-900/40 text-lg font-semibold text-slate-700 dark:text-slate-300">
                        {student.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={student.avatar} alt={student.full_name} className="h-full w-full object-cover" />
                        ) : initials(student.full_name)}
                      </div>
                      <button onClick={(e) => e.preventDefault()} className="rounded-full p-2 text-gray-400 transition hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white">{student.full_name}</h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Student profile</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusTone(st)}`}>{st.toLowerCase()}</span>
                    </div>
                    <div className="mt-5 space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /><span className="truncate">{student.email}</span></div>
                      <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /><span>{student.phone || "No phone provided"}</span></div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div><p className="text-xs text-gray-400 dark:text-gray-500">GPA</p><p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{gpa}</p></div>
                      <div className="text-center"><p className="text-xs text-gray-400 dark:text-gray-500">Year</p><p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{student.year ?? "—"}</p></div>
                      <div className="text-right"><p className="text-xs text-gray-400 dark:text-gray-500">Subjects</p><p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{subjectsCount}</p></div>
                    </div>
                  </Link>
                );
              })}
            </div>

          ) : (

            // List View
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {filteredStudents.map((student) => {
                const st = student.enrollment_status || "Unknown";
                const gpa = typeof student.gpa === "number" ? student.gpa.toFixed(1) : "0.0";
                const subjectsCount = student.courses?.length ?? 0;
                return (
                  <Link key={student._id} href={`/admin/admindashboard/students/${student._id}`}
                    className="flex items-center gap-4 py-4 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/40 dark:to-indigo-900/40 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {student.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={student.avatar} alt={student.full_name} className="h-full w-full object-cover" />
                      ) : initials(student.full_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{student.full_name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{student.email}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <span>Year {student.year ?? "—"}</span>
                      <span>GPA {gpa}</span>
                      <span>{subjectsCount} subjects</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shrink-0 ${getStatusTone(st)}`}>{st.toLowerCase()}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}