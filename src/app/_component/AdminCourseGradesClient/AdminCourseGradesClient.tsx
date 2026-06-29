// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useSession } from "next-auth/react";

// type AdminGradeRow = {
//   studentId: string;
//   studentCode: string;
//   studentName: string;
//   email: string;
//   midTerm: number;
//   internal: number;
//   finalExam: number;
//   total: number;
//   percentage: number;
//   gradeLetter: string;
// };

// type AdminSheetResponse = {
//   course: {
//     id: string;
//     name: string;
//     code: string;
//     credits: number;
//   };
//   semester: string;
//   year: number;
//   semesterLabel: string;
//   rows: AdminGradeRow[];
// };

// const API_BASE_URL = "http://localhost:5000/api/grades";
// const SEMESTER_OPTIONS = ["Fall", "Spring", "Summer", "Winter"];

// function getDefaultSemester() {
//   const month = new Date().getMonth() + 1;
//   if (month >= 9) return "Fall";
//   if (month >= 6) return "Summer";
//   if (month >= 2) return "Spring";
//   return "Winter";
// }

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
//       return "bg-amber-100 text-amber-700";
//     case "D":
//       return "bg-orange-100 text-orange-700";
//     default:
//       return "bg-rose-100 text-rose-700";
//   }
// }

// export default function AdminCourseGradesClient({ courseId }: { courseId: string }) {
//   const { data: session } = useSession();
//   const [semester, setSemester] = useState(getDefaultSemester());
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [sheet, setSheet] = useState<AdminSheetResponse | null>(null);
//   const [rows, setRows] = useState<AdminGradeRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const loadSheet = useCallback(async (selectedSemester = semester, selectedYear = year) => {
//     if (!session?.token) return;

//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       const res = await fetch(`${API_BASE_URL}/admin/course-records`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.token}`,
//         },
//         body: JSON.stringify({
//           courseId,
//           semester: selectedSemester,
//           year: selectedYear,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok || !data.success) {
//         throw new Error(data.message || "Failed to load admin grade sheet");
//       }

//       setSheet(data.data);
//       setRows(data.data.rows || []);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load grade sheet");
//       setSheet(null);
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [courseId, semester, session?.token, year]);

//   useEffect(() => {
//     if (session?.token) {
//       loadSheet();
//     }
//   }, [loadSheet, session?.token]);

//   function updateFinal(studentId: string, value: number) {
//     setRows((prev) =>
//       prev.map((row) => {
//         if (row.studentId !== studentId) return row;

//         const finalExam = Math.min(Math.max(value, 0), 50);
//         const total = row.midTerm + row.internal + finalExam;
//         const percentage = total;

//         let gradeLetter = "F";
//         if (percentage >= 90) gradeLetter = "A";
//         else if (percentage >= 85) gradeLetter = "A-";
//         else if (percentage >= 80) gradeLetter = "B+";
//         else if (percentage >= 75) gradeLetter = "B";
//         else if (percentage >= 70) gradeLetter = "C+";
//         else if (percentage >= 65) gradeLetter = "C";
//         else if (percentage >= 60) gradeLetter = "D";

//         return {
//           ...row,
//           finalExam,
//           total,
//           percentage,
//           gradeLetter,
//         };
//       }),
//     );
//   }

//   async function handleSave() {
//     if (!session?.token) return;

//     try {
//       setSaving(true);
//       setError("");
//       setMessage("");

//       const res = await fetch(`${API_BASE_URL}/admin/save-final`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.token}`,
//         },
//         body: JSON.stringify({
//           courseId,
//           semester,
//           year,
//           grades: rows.map((row) => ({
//             studentId: row.studentId,
//             finalExam: row.finalExam,
//           })),
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok || !data.success) {
//         throw new Error(data.message || "Failed to save final grades");
//       }

//       setMessage("Final exam grades saved successfully");
//       await loadSheet();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to save final grades");
//     } finally {
//       setSaving(false);
//     }
//   }

//   const summary = useMemo(() => {
//     const students = rows.length;
//     const average =
//       students > 0
//         ? Math.round(rows.reduce((sum, row) => sum + row.percentage, 0) / students)
//         : 0;

//     return {
//       students,
//       average,
//       courseName: sheet?.course?.name || "Course",
//       courseCode: sheet?.course?.code || "",
//     };
//   }, [rows, sheet]);

//   return (
//     <div className="space-y-6">
//       <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//           <div>
//             <p className="text-sm font-medium text-rose-600">Admin Final Grades</p>
//             <h1 className="mt-1 text-3xl font-semibold text-gray-900">{summary.courseName}</h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Review coursework and enter final exam grades only.
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 sm:flex-row">
//             <select
//               value={semester}
//               onChange={(e) => setSemester(e.target.value)}
//               className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-rose-100"
//             >
//               {SEMESTER_OPTIONS.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               value={year}
//               onChange={(e) => setYear(Number(e.target.value))}
//               className="w-32 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-rose-100"
//             />

//             <button
//               onClick={() => loadSheet()}
//               className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//             >
//               Load sheet
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Students</p>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.students}</p>
//         </div>
//         <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Average percentage</p>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.average}%</p>
//         </div>
//         <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Course code</p>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.courseCode || "--"}</p>
//         </div>
//       </div>

//       {message && (
//         <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
//           {message}
//         </div>
//       )}

//       {error && (
//         <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
//           {error}
//         </div>
//       )}

//       <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//         <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               {sheet?.semesterLabel || `${semester} ${year}`}
//             </h2>
//             <p className="text-sm text-gray-500">
//               Final exam is out of 50. Coursework values are read-only here.
//             </p>
//           </div>

//           <button
//             onClick={handleSave}
//             disabled={saving || loading || rows.length === 0}
//             className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save final grades"}
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center py-16">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
//           </div>
//         ) : rows.length === 0 ? (
//           <div className="px-6 py-16 text-center text-sm text-gray-400">
//             No students found for this course.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-50 text-left text-gray-500">
//                 <tr>
//                   <th className="px-6 py-4 font-medium">Student</th>
//                   <th className="px-4 py-4 font-medium">Code</th>
//                   <th className="px-4 py-4 font-medium">Mid</th>
//                   <th className="px-4 py-4 font-medium">Internal</th>
//                   <th className="px-4 py-4 font-medium">Final</th>
//                   <th className="px-4 py-4 font-medium">Total</th>
//                   <th className="px-4 py-4 font-medium">Grade</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row) => (
//                   <tr key={row.studentId} className="border-t border-gray-100">
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">{row.studentName}</div>
//                       <div className="text-xs text-gray-400">{row.email}</div>
//                     </td>
//                     <td className="px-4 py-4 text-gray-600">{row.studentCode}</td>
//                     <td className="px-4 py-4 text-gray-600">{row.midTerm}/30</td>
//                     <td className="px-4 py-4 text-gray-600">{row.internal}/20</td>
//                     <td className="px-4 py-4">
//                       <input
//                         type="number"
//                         min={0}
//                         max={50}
//                         value={row.finalExam}
//                         onChange={(e) => updateFinal(row.studentId, Number(e.target.value))}
//                         className="w-24 rounded-xl border border-gray-200 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-rose-100"
//                       />
//                     </td>
//                     <td className="px-4 py-4 font-medium text-gray-900">{row.total}/100</td>
//                     <td className="px-4 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${gradeBadgeColor(row.gradeLetter)}`}
//                       >
//                         {row.gradeLetter}
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
import { useSession } from "next-auth/react";

type AdminGradeRow = {
  studentId: string;
  studentCode: string;
  studentName: string;
  email: string;
  midTerm: number;
  internal: number;
  finalExam: number;
  total: number;
  percentage: number;
  gradeLetter: string;
};

type AdminSheetResponse = {
  course: {
    id: string;
    name: string;
    code: string;
    credits: number;
  };
  semester: string;
  year: number;
  semesterLabel: string;
  rows: AdminGradeRow[];
};

const API_BASE_URL = "http://localhost:5000/api/grades";
const SEMESTER_OPTIONS = ["Fall", "Spring", "Summer", "Winter"];

function getDefaultSemester() {
  const month = new Date().getMonth() + 1;
  if (month >= 9) return "Fall";
  if (month >= 6) return "Summer";
  if (month >= 2) return "Spring";
  return "Winter";
}

function gradeBadgeColor(letter: string) {
  switch (letter) {
    case "A":
    case "A-":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "B+":
    case "B":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    case "C+":
    case "C":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    case "D":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";
    default:
      return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
  }
}

export default function AdminCourseGradesClient({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [semester, setSemester] = useState(getDefaultSemester());
  const [year, setYear] = useState(new Date().getFullYear());
  const [sheet, setSheet] = useState<AdminSheetResponse | null>(null);
  const [rows, setRows] = useState<AdminGradeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadSheet = useCallback(async (selectedSemester = semester, selectedYear = year) => {
    if (!session?.token) return;
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const res = await fetch(`${API_BASE_URL}/admin/course-records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ courseId, semester: selectedSemester, year: selectedYear }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to load admin grade sheet");
      setSheet(data.data);
      setRows(data.data.rows || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load grade sheet");
      setSheet(null);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [courseId, semester, session?.token, year]);

  useEffect(() => {
    if (session?.token) loadSheet();
  }, [loadSheet, session?.token]);

  function updateFinal(studentId: string, value: number) {
    setRows((prev) =>
      prev.map((row) => {
        if (row.studentId !== studentId) return row;
        const finalExam = Math.min(Math.max(value, 0), 50);
        const total = row.midTerm + row.internal + finalExam;
        const percentage = total;
        let gradeLetter = "F";
        if (percentage >= 90) gradeLetter = "A";
        else if (percentage >= 85) gradeLetter = "A-";
        else if (percentage >= 80) gradeLetter = "B+";
        else if (percentage >= 75) gradeLetter = "B";
        else if (percentage >= 70) gradeLetter = "C+";
        else if (percentage >= 65) gradeLetter = "C";
        else if (percentage >= 60) gradeLetter = "D";
        return { ...row, finalExam, total, percentage, gradeLetter };
      })
    );
  }

  async function handleSave() {
    if (!session?.token) return;
    try {
      setSaving(true);
      setError("");
      setMessage("");
      const res = await fetch(`${API_BASE_URL}/admin/save-final`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          courseId, semester, year,
          grades: rows.map((row) => ({ studentId: row.studentId, finalExam: row.finalExam })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save final grades");
      setMessage("Final exam grades saved successfully");
      await loadSheet();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save final grades");
    } finally {
      setSaving(false);
    }
  }

  const summary = useMemo(() => {
    const students = rows.length;
    const average = students > 0
      ? Math.round(rows.reduce((sum, row) => sum + row.percentage, 0) / students)
      : 0;
    return { students, average, courseName: sheet?.course?.name || "Course", courseCode: sheet?.course?.code || "" };
  }, [rows, sheet]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-rose-600 dark:text-rose-400">Admin Final Grades</p>
            <h1 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{summary.courseName}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review coursework and enter final exam grades only.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900"
            >
              {SEMESTER_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-32 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900"
            />

            <button
              onClick={() => loadSheet()}
              className="rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Load sheet
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Students</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{summary.students}</p>
        </div>
        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Average percentage</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{summary.average}%</p>
        </div>
        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Course code</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{summary.courseCode || "--"}</p>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {sheet?.semesterLabel || `${semester} ${year}`}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Final exam is out of 50. Coursework values are read-only here.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading || rows.length === 0}
            className="rounded-2xl bg-slate-950 dark:bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save final grades"}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
          </div>
        ) : rows.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-gray-400 dark:text-gray-500">
            No students found for this course.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-4 py-4 font-medium">Code</th>
                  <th className="px-4 py-4 font-medium">Mid</th>
                  <th className="px-4 py-4 font-medium">Internal</th>
                  <th className="px-4 py-4 font-medium">Final</th>
                  <th className="px-4 py-4 font-medium">Total</th>
                  <th className="px-4 py-4 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.studentId} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{row.studentName}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{row.email}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{row.studentCode}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{row.midTerm}/30</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{row.internal}/20</td>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={row.finalExam}
                        onChange={(e) => updateFinal(row.studentId, Number(e.target.value))}
                        className="w-24 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900"
                      />
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{row.total}/100</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${gradeBadgeColor(row.gradeLetter)}`}>
                        {row.gradeLetter}
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

