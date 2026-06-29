// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// type SemesterOption = {
//   semester: string;
//   year: number;
//   label: string;
// };

// type SemesterSummary = {
//   semester: string;
//   year: number;
//   semesterLabel: string;
//   gpa: number;
//   totalMarks: number;
//   maxMarks: number;
//   percentage: number;
//   gradeLetter: string;
//   courses: Array<{
//     id: string;
//     gradeLetter: string;
//   }>;
// };

// const API_BASE_URL = "http://localhost:5000/api/grades/student";

// function gradeBadgeColor(letter: string) {
//   switch (letter) {
//     case "A":
//     case "A-":
//       return "bg-emerald-100 text-emerald-700";
//     case "B+":
//     case "B":
//       return "bg-blue-100 text-blue-700";
//     case "C+":
//     case "C":
//       return "bg-violet-100 text-violet-700";
//     case "D":
//       return "bg-amber-100 text-amber-700";
//     default:
//       return "bg-rose-100 text-rose-700";
//   }
// }

// function toSemesterKey(semester: string, year: number) {
//   return `${semester}-${year}`;
// }

// export default function StudentGradesClient() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [semesters, setSemesters] = useState<SemesterOption[]>([]);
//   const [summaries, setSummaries] = useState<Record<string, SemesterSummary>>({});
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchSemesters = useCallback(async () => {
//     if (!session?.token) return;

//     try {
//       setLoading(true);
//       setError("");

//       const semestersRes = await fetch(`${API_BASE_URL}/semesters`, {
//         headers: {
//           Authorization: `Bearer ${session.token}`,
//         },
//         cache: "no-store",
//       });

//       const semestersData = await semestersRes.json();
//       if (!semestersRes.ok || !semestersData.success) {
//         throw new Error(semestersData.message || "Failed to fetch semesters");
//       }

//       const loadedSemesters: SemesterOption[] = Array.isArray(semestersData.data)
//         ? semestersData.data
//         : [];

//       setSemesters(loadedSemesters);

//       const summaryEntries = await Promise.all(
//         loadedSemesters.map(async (item) => {
//           const summaryRes = await fetch(`${API_BASE_URL}/semester-summary`, {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${session.token}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               semester: item.semester,
//               year: item.year,
//             }),
//           });

//           const summaryData = await summaryRes.json();
//           if (!summaryRes.ok || !summaryData.success) {
//             throw new Error(summaryData.message || `Failed to fetch ${item.label}`);
//           }

//           return [toSemesterKey(item.semester, item.year), summaryData.data] as const;
//         }),
//       );

//       setSummaries(Object.fromEntries(summaryEntries));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load grades");
//       setSemesters([]);
//       setSummaries({});
//     } finally {
//       setLoading(false);
//     }
//   }, [session?.token]);

//   useEffect(() => {
//     if (session?.token) {
//       fetchSemesters();
//     }
//   }, [fetchSemesters, session?.token]);

//   const visibleSemesters = useMemo(() => {
//     if (selectedFilter === "all") return semesters;
//     return semesters.filter(
//       (item) => toSemesterKey(item.semester, item.year) === selectedFilter,
//     );
//   }, [selectedFilter, semesters]);

//   const overview = useMemo(() => {
//     const summariesList = Object.values(summaries);
//     if (summariesList.length === 0) {
//       return {
//         percentage: 0,
//         gpa: 0,
//         gradeLetter: "--",
//       };
//     }

//     const percentage =
//       summariesList.reduce((sum, item) => sum + Number(item.percentage || 0), 0) /
//       summariesList.length;
//     const gpa =
//       summariesList.reduce((sum, item) => sum + Number(item.gpa || 0), 0) /
//       summariesList.length;

//     const gradeLetter = summariesList[0]?.gradeLetter || "--";

//     return {
//       percentage: Math.round(percentage),
//       gpa: Number(gpa.toFixed(2)),
//       gradeLetter,
//     };
//   }, [summaries]);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-semibold text-gray-900">Grades</h1>
//       </div>

//       <div className="rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
//         <p className="text-sm font-medium text-gray-800">Overview Grades</p>

//         <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
//           <div className="text-center">
//             <p className="text-3xl font-semibold text-gray-900">
//               {loading ? "--" : `${overview.percentage}%`}
//             </p>
//             <p className="mt-1 text-sm text-gray-400">Percentage</p>
//           </div>

//           <div className="text-center">
//             <p className="text-3xl font-semibold text-gray-900">
//               {loading ? "--" : overview.gpa.toFixed(2)}
//             </p>
//             <p className="mt-1 text-sm text-gray-400">CGPA</p>
//           </div>

//           <div className="flex flex-col items-center text-center">
//             <span
//               className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${gradeBadgeColor(overview.gradeLetter)}`}
//             >
//               {loading ? "--" : overview.gradeLetter}
//             </span>
//             <p className="mt-1 text-sm text-gray-400">Grade</p>
//           </div>
//         </div>
//       </div>

//       <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
//         <select
//           value={selectedFilter}
//           onChange={(e) => setSelectedFilter(e.target.value)}
//           className="w-full bg-transparent text-sm text-gray-700 outline-none"
//         >
//           <option value="all">All Semesters</option>
//           {semesters.map((item) => (
//             <option
//               key={toSemesterKey(item.semester, item.year)}
//               value={toSemesterKey(item.semester, item.year)}
//             >
//               {item.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {error && (
//         <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
//           {error}
//         </div>
//       )}

//       <div className="space-y-4">
//         {loading ? (
//           Array.from({ length: 4 }).map((_, index) => (
//             <div
//               key={index}
//               className="h-20 animate-pulse rounded-3xl border border-gray-200 bg-white"
//             />
//           ))
//         ) : visibleSemesters.length === 0 ? (
//           <div className="rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-400">
//             No semesters found
//           </div>
//         ) : (
//           visibleSemesters.map((item, index) => {
//             const semesterKey = toSemesterKey(item.semester, item.year);
//             const summary = summaries[semesterKey];

//             return (
//               <button
//                 key={semesterKey}
//                 onClick={() => router.push(`/dashboard/grades/${semesterKey}`)}
//                 className="flex w-full items-center justify-between rounded-3xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md"
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="text-lg font-medium text-gray-900">
//                     {item.label}
//                     {index === 0 ? " (Current)" : ""}
//                   </span>
//                 </div>

//                 <span
//                   className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${gradeBadgeColor(summary?.gradeLetter || "F")}`}
//                 >
//                   {summary?.gradeLetter || "--"}
//                 </span>
//               </button>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type SemesterOption = {
  semester: string;
  year: number;
  label: string;
};

type SemesterSummary = {
  semester: string;
  year: number;
  semesterLabel: string;
  gpa: number;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  gradeLetter: string;
  courses: Array<{
    id: string;
    gradeLetter: string;
  }>;
};

const API_BASE_URL = "http://localhost:5000/api/grades/student";

function gradeBadgeColor(letter: string) {
  switch (letter) {
    case "A":
    case "A-":
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
    case "B+":
    case "B":
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
    case "C+":
    case "C":
      return "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400";
    case "D":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
    default:
      return "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400";
  }
}

function toSemesterKey(semester: string, year: number) {
  return `${semester}-${year}`;
}

export default function StudentGradesClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const [semesters, setSemesters] = useState<SemesterOption[]>([]);
  const [summaries, setSummaries] = useState<Record<string, SemesterSummary>>({});
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSemesters = useCallback(async () => {
    if (!session?.token) return;
    try {
      setLoading(true);
      setError("");

      const semestersRes = await fetch(`${API_BASE_URL}/semesters`, {
        headers: { Authorization: `Bearer ${session.token}` },
        cache: "no-store",
      });

      const semestersData = await semestersRes.json();
      if (!semestersRes.ok || !semestersData.success)
        throw new Error(semestersData.message || "Failed to fetch semesters");

      const loadedSemesters: SemesterOption[] = Array.isArray(semestersData.data)
        ? semestersData.data
        : [];

      setSemesters(loadedSemesters);

      const summaryEntries = await Promise.all(
        loadedSemesters.map(async (item) => {
          const summaryRes = await fetch(`${API_BASE_URL}/semester-summary`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ semester: item.semester, year: item.year }),
          });

          const summaryData = await summaryRes.json();
          if (!summaryRes.ok || !summaryData.success)
            throw new Error(summaryData.message || `Failed to fetch ${item.label}`);

          return [toSemesterKey(item.semester, item.year), summaryData.data] as const;
        }),
      );

      setSummaries(Object.fromEntries(summaryEntries));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load grades");
      setSemesters([]);
      setSummaries({});
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    if (session?.token) fetchSemesters();
  }, [fetchSemesters, session?.token]);

  const visibleSemesters = useMemo(() => {
    if (selectedFilter === "all") return semesters;
    return semesters.filter(
      (item) => toSemesterKey(item.semester, item.year) === selectedFilter,
    );
  }, [selectedFilter, semesters]);

  const overview = useMemo(() => {
    const summariesList = Object.values(summaries);
    if (summariesList.length === 0) return { percentage: 0, gpa: 0, gradeLetter: "--" };

    const percentage =
      summariesList.reduce((sum, item) => sum + Number(item.percentage || 0), 0) /
      summariesList.length;
    const gpa =
      summariesList.reduce((sum, item) => sum + Number(item.gpa || 0), 0) /
      summariesList.length;

    return {
      percentage: Math.round(percentage),
      gpa: Number(gpa.toFixed(2)),
      gradeLetter: summariesList[0]?.gradeLetter || "--",
    };
  }, [summaries]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Grades</h1>

      {/* Overview */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Overview Grades</p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {loading ? "--" : `${overview.percentage}%`}
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Percentage</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {loading ? "--" : overview.gpa.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">CGPA</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${gradeBadgeColor(overview.gradeLetter)}`}>
              {loading ? "--" : overview.gradeLetter}
            </span>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Grade</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 shadow-sm">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none"
        >
          <option value="all">All Semesters</option>
          {semesters.map((item) => (
            <option key={toSemesterKey(item.semester, item.year)} value={toSemesterKey(item.semester, item.year)}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Semesters List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-20 animate-pulse rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
          ))
        ) : visibleSemesters.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-12 text-center text-sm text-gray-400">
            No semesters found
          </div>
        ) : (
          visibleSemesters.map((item, index) => {
            const semesterKey = toSemesterKey(item.semester, item.year);
            const summary = summaries[semesterKey];

            return (
              <button
                key={semesterKey}
                onClick={() => router.push(`/dashboard/grades/${semesterKey}`)}
                className="flex w-full items-center justify-between rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 text-left shadow-sm transition hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.label}{index === 0 ? " (Current)" : ""}
                </span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${gradeBadgeColor(summary?.gradeLetter || "F")}`}>
                  {summary?.gradeLetter || "--"}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
