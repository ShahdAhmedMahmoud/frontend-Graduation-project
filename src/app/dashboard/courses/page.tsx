// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// type Course = {
//   _id: string;
//   code: string;
//   name: string;
//   description?: string;
//   credits?: number;
//   academicYears?: number[];
//   maxEnrollment?: number;
//   seatsLeft?: number | null;
//   isEnrolled?: boolean;
// };

// const API_BASE_URL = "http://localhost:5000/api";

// export default function StudentCoursesRegistrationPage() {
//   const { data: session } = useSession();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [enrollingId, setEnrollingId] = useState<string | null>(null);

//   async function fetchAvailableCourses() {
//     if (!session?.token) return;
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetch(`${API_BASE_URL}/students/available-courses`, {
//         headers: { Authorization: `Bearer ${session.token}` },
//         cache: "no-store",
//       });
//       const data = await res.json();
//       if (!res.ok || !data.success) throw new Error(data.message || "Failed to load courses");
//       setCourses(Array.isArray(data.data) ? data.data : []);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load courses");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchAvailableCourses();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [session?.token]);

//   const filteredCourses = useMemo(() => {
//     return courses.filter((course) => {
//       const keyword = search.trim().toLowerCase();
//       if (!keyword) return true;
//       return (
//         course.name?.toLowerCase().includes(keyword) ||
//         course.code?.toLowerCase().includes(keyword)
//       );
//     });
//   }, [courses, search]);

//   async function enrollInCourse(courseId: string) {
//     if (!session?.token) return;
//     setEnrollingId(courseId);
//     try {
//       const res = await fetch(`${API_BASE_URL}/students/enroll`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${session.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ courseId }),
//       });
//       const data = await res.json();
//       if (!res.ok || data?.success === false) throw new Error(data.message || "Enrollment failed");
//       toast.success("Enrolled successfully");
//       await fetchAvailableCourses();
//     } catch (err) {
//       toast.error(err instanceof Error ? err.message : "Enrollment failed");
//     } finally {
//       setEnrollingId(null);
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Course Registration</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           You can register only in courses available for your academic year.
//         </p>
//       </div>

//       <div className="rounded-2xl border border-gray-200 bg-white p-4">
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by course name or code..."
//           className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
//         />
//       </div>

//       {loading ? (
//         <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
//           Loading courses...
//         </div>
//       ) : error ? (
//         <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//           {error}
//         </div>
//       ) : filteredCourses.length === 0 ? (
//         <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
//           No available courses found.
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {filteredCourses.map((course) => {
//             const isEnrolled = Boolean(course.isEnrolled);
//             const seatsLeft = course.seatsLeft;
//             const isFull = typeof seatsLeft === "number" ? seatsLeft <= 0 : false;
//             return (
//               <div key={course._id} className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
//                 <div className="flex items-start justify-between gap-2">
//                   <div>
//                     <h3 className="text-base font-semibold text-gray-900">{course.name}</h3>
//                     <p className="text-xs text-gray-500">{course.code}</p>
//                   </div>
//                   <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
//                     {course.credits ?? 3} credits
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-500 min-h-[40px]">
//                   {course.description || "No description"}
//                 </p>

//                 <div className="text-xs text-gray-600">
//                   Years: {(course.academicYears || []).join(", ") || "N/A"}
//                 </div>
//                 <div className="text-xs text-gray-600">
//                   Seats left: {seatsLeft ?? "N/A"}
//                 </div>

//                 <button
//                   onClick={() => enrollInCourse(course._id)}
//                   disabled={isEnrolled || isFull || enrollingId === course._id}
//                   className={`w-full rounded-xl py-2.5 text-sm font-semibold ${
//                     isEnrolled
//                       ? "bg-emerald-100 text-emerald-700"
//                       : isFull
//                         ? "bg-gray-100 text-gray-500"
//                         : "bg-slate-900 text-white hover:bg-slate-800"
//                   } disabled:opacity-70`}
//                 >
//                   {enrollingId === course._id
//                     ? "Enrolling..."
//                     : isEnrolled
//                       ? "Already enrolled"
//                       : isFull
//                         ? "Course is full"
//                         : "Enroll now"}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type Course = {
  _id: string;
  code: string;
  name: string;
  description?: string;
  credits?: number;
  academicYears?: number[];
  maxEnrollment?: number;
  seatsLeft?: number | null;
  isEnrolled?: boolean;
};

const API_BASE_URL = "http://localhost:5000/api";

export default function StudentCoursesRegistrationPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  async function fetchAvailableCourses() {
    if (!session?.token) return;
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/students/available-courses`, {
        headers: { Authorization: `Bearer ${session.token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to load courses");
      setCourses(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAvailableCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const keyword = search.trim().toLowerCase();
      if (!keyword) return true;
      return course.name?.toLowerCase().includes(keyword) || course.code?.toLowerCase().includes(keyword);
    });
  }, [courses, search]);

  async function enrollInCourse(courseId: string) {
    if (!session?.token) return;
    setEnrollingId(courseId);
    try {
      const res = await fetch(`${API_BASE_URL}/students/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) throw new Error(data.message || "Enrollment failed");
      toast.success("Enrolled successfully");
      await fetchAvailableCourses();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Enrollment failed");
    } finally {
      setEnrollingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course Registration</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          You can register only in courses available for your academic year.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by course name or code..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500 px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Loading courses...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
          No available courses found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => {
            const isEnrolled = Boolean(course.isEnrolled);
            const seatsLeft = course.seatsLeft;
            const isFull = typeof seatsLeft === "number" ? seatsLeft <= 0 : false;
            return (
              <div key={course._id} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{course.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{course.code}</p>
                  </div>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                    {course.credits ?? 3} credits
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">
                  {course.description || "No description"}
                </p>

                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Years: {(course.academicYears || []).join(", ") || "N/A"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Seats left: {seatsLeft ?? "N/A"}
                </div>

                <button
                  onClick={() => enrollInCourse(course._id)}
                  disabled={isEnrolled || isFull || enrollingId === course._id}
                  className={`w-full rounded-xl py-2.5 text-sm font-semibold disabled:opacity-70 ${
                    isEnrolled
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : isFull
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        : "bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600"
                  }`}
                >
                  {enrollingId === course._id
                    ? "Enrolling..."
                    : isEnrolled
                      ? "Already enrolled"
                      : isFull
                        ? "Course is full"
                        : "Enroll now"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}