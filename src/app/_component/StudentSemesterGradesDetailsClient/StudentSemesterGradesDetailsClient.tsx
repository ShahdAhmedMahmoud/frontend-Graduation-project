// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// type CourseGradeRow = {
//   id: string;
//   courseId: string;
//   courseName: string;
//   courseCode: string;
//   credits: number;
//   midTerm: number;
//   internal: number;
//   finalExam: number;
//   total: number;
//   gradeLetter: string;
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
//   courses: CourseGradeRow[];
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

// function parseSemesterKey(semesterKey: string) {
//   const separatorIndex = semesterKey.lastIndexOf("-");
//   if (separatorIndex === -1) {
//     return null;
//   }

//   return {
//     semester: semesterKey.slice(0, separatorIndex),
//     year: Number(semesterKey.slice(separatorIndex + 1)),
//   };
// }

// export default function StudentSemesterGradesDetailsClient({
//   semesterKey,
// }: {
//   semesterKey: string;
// }) {
//   const { data: session } = useSession();
//   const [summary, setSummary] = useState<SemesterSummary | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const parsed = useMemo(() => parseSemesterKey(semesterKey), [semesterKey]);

//   const fetchSummary = useCallback(async () => {
//     if (!session?.token || !parsed) return;

//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`${API_BASE_URL}/semester-summary`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${session.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           semester: parsed.semester,
//           year: parsed.year,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok || !data.success) {
//         throw new Error(data.message || "Failed to fetch semester summary");
//       }

//       setSummary(data.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load semester summary");
//       setSummary(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [parsed, session?.token]);

//   useEffect(() => {
//     if (session?.token && parsed) {
//       fetchSummary();
//     }
//   }, [fetchSummary, parsed, session?.token]);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-2 text-sm text-gray-400">
//         <Link href="/dashboard/grades" className="transition hover:text-gray-600">
//           Grades
//         </Link>
//         <span>&gt;</span>
//         <span className="text-gray-600">{summary?.semesterLabel || semesterKey}</span>
//       </div>

//       <div className="rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
//         <h2 className="text-xl font-medium text-gray-900">
//           Semester Summary {summary ? `- ${summary.semesterLabel}` : ""}
//         </h2>

//         <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
//           <div className="text-center">
//             <p className="text-3xl font-semibold text-gray-900">
//               {loading ? "--" : summary?.gpa?.toFixed(2) || "--"}
//             </p>
//             <p className="mt-1 text-sm text-gray-400">GPA</p>
//           </div>

//           <div className="text-center">
//             <p className="text-3xl font-semibold text-gray-900">
//               {loading || !summary ? "--" : `${summary.totalMarks} / ${summary.maxMarks}`}
//             </p>
//             <p className="mt-1 text-sm text-gray-400">Total Marks</p>
//           </div>

//           <div className="text-center">
//             <p className="text-3xl font-semibold text-gray-900">
//               {loading || !summary ? "--" : `${summary.percentage}%`}
//             </p>
//             <p className="mt-1 text-sm text-gray-400">Percentage</p>
//           </div>

//           <div className="flex flex-col items-center text-center">
//             <span
//               className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${gradeBadgeColor(summary?.gradeLetter || "F")}`}
//             >
//               {loading ? "--" : summary?.gradeLetter || "--"}
//             </span>
//             <p className="mt-1 text-sm text-gray-400">Grade</p>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
//           {error}
//         </div>
//       )}

//       <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//         {loading ? (
//           <div className="flex items-center justify-center py-16">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
//           </div>
//         ) : !summary || summary.courses.length === 0 ? (
//           <div className="px-6 py-16 text-center text-sm text-gray-400">
//             No grades available for this semester yet.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="text-left text-gray-500">
//                 <tr className="border-b border-gray-100">
//                   <th className="px-6 py-4 font-medium">Course</th>
//                   <th className="px-4 py-4 font-medium">Credits</th>
//                   <th className="px-4 py-4 font-medium">Mid Term</th>
//                   <th className="px-4 py-4 font-medium">Final Exam</th>
//                   <th className="px-4 py-4 font-medium">Internal</th>
//                   <th className="px-4 py-4 font-medium">Total</th>
//                   <th className="px-4 py-4 font-medium">Grade</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {summary.courses.map((course) => (
//                   <tr key={course.id} className="border-t border-gray-100">
//                     <td className="px-6 py-4 font-medium text-gray-800">{course.courseCode}</td>
//                     <td className="px-4 py-4 text-gray-600">{course.credits}</td>
//                     <td className="px-4 py-4 text-gray-600">{course.midTerm}/30</td>
//                     <td className="px-4 py-4 text-gray-600">{course.finalExam}/50</td>
//                     <td className="px-4 py-4 text-gray-600">{course.internal}/20</td>
//                     <td className="px-4 py-4 text-gray-700">{course.total}/100</td>
//                     <td className="px-4 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${gradeBadgeColor(course.gradeLetter)}`}
//                       >
//                         {course.gradeLetter}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

type CourseGradeRow = {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  credits: number;
  midTerm: number;
  internal: number;
  finalExam: number;
  total: number;
  gradeLetter: string;
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
  courses: CourseGradeRow[];
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

function parseSemesterKey(semesterKey: string) {
  const separatorIndex = semesterKey.lastIndexOf("-");
  if (separatorIndex === -1) return null;
  return {
    semester: semesterKey.slice(0, separatorIndex),
    year: Number(semesterKey.slice(separatorIndex + 1)),
  };
}

export default function StudentSemesterGradesDetailsClient({ semesterKey }: { semesterKey: string }) {
  const { data: session } = useSession();
  const [summary, setSummary] = useState<SemesterSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const parsed = useMemo(() => parseSemesterKey(semesterKey), [semesterKey]);

  const fetchSummary = useCallback(async () => {
    if (!session?.token || !parsed) return;
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/semester-summary`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ semester: parsed.semester, year: parsed.year }),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to fetch semester summary");

      setSummary(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load semester summary");
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [parsed, session?.token]);

  useEffect(() => {
    if (session?.token && parsed) fetchSummary();
  }, [fetchSummary, parsed, session?.token]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
        <Link href="/dashboard/grades" className="transition hover:text-gray-600 dark:hover:text-gray-300">
          Grades
        </Link>
        <span>&gt;</span>
        <span className="text-gray-600 dark:text-gray-300">{summary?.semesterLabel || semesterKey}</span>
      </div>

      {/* Summary Card */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">
          Semester Summary {summary ? `- ${summary.semesterLabel}` : ""}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {loading ? "--" : summary?.gpa?.toFixed(2) || "--"}
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">GPA</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {loading || !summary ? "--" : `${summary.totalMarks} / ${summary.maxMarks}`}
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Total Marks</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {loading || !summary ? "--" : `${summary.percentage}%`}
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Percentage</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${gradeBadgeColor(summary?.gradeLetter || "F")}`}>
              {loading ? "--" : summary?.gradeLetter || "--"}
            </span>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Grade</p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : !summary || summary.courses.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-gray-400 dark:text-gray-500">
            No grades available for this semester yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-4 font-medium">Course</th>
                  <th className="px-4 py-4 font-medium">Credits</th>
                  <th className="px-4 py-4 font-medium">Mid Term</th>
                  <th className="px-4 py-4 font-medium">Final Exam</th>
                  <th className="px-4 py-4 font-medium">Internal</th>
                  <th className="px-4 py-4 font-medium">Total</th>
                  <th className="px-4 py-4 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {summary.courses.map((course) => (
                  <tr key={course.id} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{course.courseCode}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{course.credits}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{course.midTerm}/30</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{course.finalExam}/50</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{course.internal}/20</td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{course.total}/100</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${gradeBadgeColor(course.gradeLetter)}`}>
                        {course.gradeLetter}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


