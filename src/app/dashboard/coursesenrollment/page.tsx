// "use client";

// import getLoggedUserCourses from "@/CardActions/getUserCourses.action";
// import React, { useEffect, useState } from "react";
// import SingleProducts from '@/app/_component/SingleProducts/SingleProducts';
// import UpcomingDeadlines from '@/app/_component/UpcomingDeadlines/UpcomingDeadlines';

// export default function CoursesEnroll() {
//   const [courses, setCourses] = useState([]);

//   async function getStudentsCourses() {
//     try {
//       const res = await getLoggedUserCourses();
//       setCourses(res.data);
//     } catch (err) {
//       console.log("ERROR FETCHING USER COURSES:", err);
//     }
//   }

//   useEffect(() => {
//     getStudentsCourses();
//   }, []);

//   if (!courses?.length) {
//     return (
//       <h1 className="text-center text-3xl text-red-600 mt-20">
//         No courses added yet!
//       </h1>
//     );
//   }

//   return (
//     <div className="w-11/12 mx-auto my-10 flex flex-col lg:flex-row gap-6">

//       {/* ===== LEFT — Courses Grid ===== */}
//       <div className="flex-1 min-w-0">
//         <h2 className="text-xl font-semibold mb-6">Courses</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course, index) => (
//             <SingleProducts
//               key={course._id}
//               course={course}
//               index={index}
//             />
//           ))}
//         </div>
//       </div>

//       {/* ===== RIGHT — Upcoming Deadlines ===== */}
//       <div className="w-full lg:w-[260px] shrink-0">
//         <UpcomingDeadlines />
//       </div>

//     </div>
//   );
// }


"use client";

import getLoggedUserCourses from "@/CardActions/getUserCourses.action";
import React, { useEffect, useState } from "react";
import SingleProducts from '@/app/_component/SingleProducts/SingleProducts';
import UpcomingDeadlines from '@/app/_component/UpcomingDeadlines/UpcomingDeadlines';

export default function CoursesEnroll() {
  const [courses, setCourses] = useState([]);

  async function getStudentsCourses() {
    try {
      const res = await getLoggedUserCourses();
      setCourses(res.data);
    } catch (err) {
      console.log("ERROR FETCHING USER COURSES:", err);
    }
  }

  useEffect(() => {
    getStudentsCourses();
  }, []);

  if (!courses?.length) {
    return (
      <h1 className="text-center text-3xl text-red-600 dark:text-red-400 mt-20">
        No courses added yet!
      </h1>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10 flex flex-col lg:flex-row gap-6">

      {/* LEFT — Courses Grid */}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any, index: number) => (
            <SingleProducts
              key={course._id}
              course={course}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — Upcoming Deadlines */}
      <div className="w-full lg:w-[260px] shrink-0">
        <UpcomingDeadlines />
      </div>

    </div>
  );
}

