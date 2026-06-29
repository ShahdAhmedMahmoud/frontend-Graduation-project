// // // // // // // // // // import React from "react";
// // // // // // // // // // import getStudent from "@/utilites/getStudent";

// // // // // // // // // // export default async function StudentSlidesPage({ params }: any) {
// // // // // // // // // //   const student = await getStudent(); // نفس فكرة getProfessor()
// // // // // // // // // //   if (!student) return <div>Not authenticated</div>;

// // // // // // // // // //   const course = student?.coursesEnrolled?.find(
// // // // // // // // // //     (c: any) => c._id === params.id
// // // // // // // // // //   );

// // // // // // // // // //   if (!course) return <div>No course found</div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-6">
// // // // // // // // // //       <h1 className="text-2xl font-bold mb-4">Course Slides</h1>

// // // // // // // // // //       {(!course.slides || course.slides.length === 0) && (
// // // // // // // // // //         <p>No slides uploaded yet.</p>
// // // // // // // // // //       )}

// // // // // // // // // //       <ul className="space-y-3">
// // // // // // // // // //         {course.slides?.map((slide: any) => (
// // // // // // // // // //           <li key={slide._id} className="border p-4 rounded shadow-sm">
// // // // // // // // // //             <h2 className="font-semibold">{slide.title}</h2>

// // // // // // // // // //             <a
// // // // // // // // // //               href={slide.fileUrl}
// // // // // // // // // //               download
// // // // // // // // // //               className="text-blue-700 underline"
// // // // // // // // // //             >
// // // // // // // // // //               Download
// // // // // // // // // //             </a>
// // // // // // // // // //           </li>
// // // // // // // // // //         ))}
// // // // // // // // // //       </ul>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // import React from 'react';
// // // // // // // // // import getStudent from '@/utilites/getStudent';
// // // // // // // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // // // // // // interface StudentSlidesPageProps {
// // // // // // // // //   params: { courseId: string };
// // // // // // // // // }

// // // // // // // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // // // // // // //   const { courseId } = params;

// // // // // // // // //   const student = await getStudent(); // تجيب بيانات الطالب + الكورسات اللي مسجل فيها
// // // // // // // // //   console.log("Student:", student);

// // // // // // // // //   const course = student?.courses.find((c: any) => c._id === courseId);
// // // // // // // // //   if (!course) return <div>No course found</div>;

// // // // // // // // //   return <StudentSlidesClient courseId={course._id} />;
// // // // // // // // // }

// // // // // // // // import React from 'react';
// // // // // // // // import getStudent from '@/utilites/getStudent';
// // // // // // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // // // // // interface StudentSlidesPageProps {
// // // // // // // //   params: { _id: string }; // _id هنا هو courseId
// // // // // // // // }

// // // // // // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // // // // // //   const { _id: courseId } = params;

// // // // // // // //   const student = await getStudent(); // تجيب بيانات الطالب + الكورسات المسجل فيها
// // // // // // // //   console.log("Student:", student);

// // // // // // // //   const course = student?.courses.find((c: any) => c._id === courseId);
// // // // // // // //   if (!course) return <div>No course found</div>;

// // // // // // // //   return <StudentSlidesClient courseId={course._id} />;
// // // // // // // // }

// // // // // // // import React from 'react';
// // // // // // // import getStudent from '@/utilites/getStudent';
// // // // // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // // // // interface StudentSlidesPageProps {
// // // // // // //   params: { _id: string }; // _id هنا هو courseId
// // // // // // // }

// // // // // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // // // // //   const { _id: courseId } = params;

// // // // // // //   const student = await getStudent();

// // // // // // //   // لو مفيش student أو courses
// // // // // // //   if (!student) {
// // // // // // //     return <div>Please login to view slides</div>;
// // // // // // //   }

// // // // // // //   const course = student.courses?.find((c: any) => c._id === courseId);

// // // // // // //   if (!course) {
// // // // // // //     return <div>No course found</div>;
// // // // // // //   }

// // // // // // //   // لازم ترجع JSX
// // // // // // //   return <StudentSlidesClient courseId={course._id} />;
// // // // // // // }

// // // // // // import React from 'react';
// // // // // // import getStudent from '@/utilites/getStudent';
// // // // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // // // interface StudentSlidesPageProps {
// // // // // //   params: { _id: string }; // _id هنا هو courseId
// // // // // // }

// // // // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // // // //   const { _id: courseId } = params;

// // // // // //   const student = await getStudent();

// // // // // //   // 🔹 debug logs
// // // // // //   console.log("Student data:", student);       // يشوف كل بيانات الطالب
// // // // // //   console.log("Course ID from URL params:", courseId); // يشوف _id اللي جاي من URL

// // // // // //   if (!student) {
// // // // // //     return <div>Please login to view slides</div>;
// // // // // //   }

// // // // // //   // 🔹 استخدام toString() لضمان المقارنة الصحيحة
// // // // // //   const course = student.courses?.find(
// // // // // //     (c: any) => c._id.toString() === courseId.toString()
// // // // // //   );

// // // // // //   console.log("Found course:", course); // debug للكورس اللي تم إيجاده

// // // // // //   if (!course) return <div>No course found</div>;

// // // // // //   return <StudentSlidesClient courseId={course._id} />;
// // // // // // }

// // // // // import React from 'react';
// // // // // import getStudent from '@/utilites/getStudent';
// // // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // // interface StudentSlidesPageProps {
// // // // //   params: { _id: string }; // _id هنا هو courseId
// // // // // }

// // // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // // //   const { _id: courseId } = params;

// // // // //   const student = await getStudent();

// // // // //   // 🔹 debug logs
// // // // //   console.log("Student data:", student);
// // // // //   console.log("Course ID from URL params:", courseId);

// // // // //   if (!student) {
// // // // //     return <div>Please login to view slides</div>;
// // // // //   }

// // // // //   // 🔹 تحقق من كل كورس قبل عمل toString
// // // // //   const course = student.courses?.find(
// // // // //     (c: any) => c && c._id && c._id.toString() === courseId.toString()
// // // // //   );

// // // // //   console.log("Found course:", course);

// // // // //   if (!course) return <div>No course found</div>;

// // // // //   return <StudentSlidesClient courseId={course._id} />;
// // // // // }

// // // // // import React from 'react';
// // // // // import getStudent from '@/utilites/getStudent';
// // // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // // interface StudentSlidesPageProps {
// // // // //   params: { _id: string }; // _id هنا هو courseId
// // // // // }

// // // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // // //   const { _id: courseId } = params;

// // // // //   const student = await getStudent();

// // // // //   console.log("Student data:", student);
// // // // //   console.log("Course ID from URL params:", courseId);

// // // // //   if (!student) {
// // // // //     return <div>Please login to view slides</div>;
// // // // //   }

// // // // //   // 🔹 تحقق من وجود courseId في array
// // // // //   const courseExists = student.courses?.includes(courseId);

// // // // //   console.log("Course exists:", courseExists);

// // // // //   if (!courseExists) return <div>No course found</div>;

// // // // //   return <StudentSlidesClient courseId={courseId} />;
// // // // // }

// // // // import React from 'react';
// // // // import getStudent from '@/utilites/getStudent';
// // // // import getMyToken from '@/utilites/getMyToken';
// // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // interface StudentSlidesPageProps {
// // // //   params: { _id: string }; // _id هنا هو courseId
// // // // }

// // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // //   const { _id: courseId } = params;

// // // //   const student = await getStudent();
// // // //   if (!student) return <div>Please login to view slides</div>;

// // // //   const courseExists = student.courses?.includes(courseId);
// // // //   if (!courseExists) return <div>No course found</div>;

// // // //   // 🔹 جلب الـ token من server
// // // //   const token = await getMyToken();
// // // //   if (!token) return <div>User not authenticated</div>;

// // // //   return <StudentSlidesClient courseId={courseId} token={token} />;
// // // // }

// // // import React from 'react';
// // // import getStudent from '@/utilites/getStudent';
// // // import getMyToken from '@/utilites/getMyToken';
// // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // interface StudentSlidesPageProps {
// // //   params: { _id: string }; // _id هو courseId
// // // }

// // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // //   const { _id: courseId } = params;

// // //   const student = await getStudent();
// // //   if (!student) return <div>Please login to view slides</div>;

// // //   const courseExists = student.courses?.includes(courseId);
// // //   if (!courseExists) return <div>No course found</div>;

// // //   const token = await getMyToken();
// // //   if (!token) return <div>User not authenticated</div>;

// // //   return <StudentSlidesClient courseId={courseId} token={token} />;
// // // }

// // import React from 'react';
// // import getStudent from '@/utilites/getStudent';
// // import getMyToken from '@/utilites/getMyToken';

// // interface Slide {
// //   _id: string;
// //   title: string;
// //   fileUrl: string;
// //   uploadedAt: string;
// //   professor: { name: string; email: string };
// // }

// // interface StudentSlidesPageProps {
// //   params: { _id: string }; // courseId
// // // }

// // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // //   const { _id: courseId } = params;

// // //   const student = await getStudent();
// // //   if (!student) return <div>Please login</div>;

// // //   const courseExists = student.courses?.includes(courseId);
// // //   if (!courseExists) return <div>No course found</div>;

// // //   const token = await getMyToken();
// // //   if (!token) return <div>User not authenticated</div>;

// // //   // 🔹 Fetch slides من server مباشرة
// // //   const res = await fetch('http://localhost:5000/api/slides/list', {
// // //     method: 'POST',
// // //     headers: {
// // //       'Content-Type': 'application/json',
// // //       'Authorization': `Bearer ${token}`
// // //     },
// // //     body: JSON.stringify({ courseId }),
// // //   });

// // //   const slides: Slide[] = await res.json();

// // //   if (!Array.isArray(slides) || slides.length === 0)
// // //     return <div>No slides found for this course.</div>;

// // //   return (
// // //     <div className="p-4">
// // //       <h2 className="text-xl font-bold mb-4">Slides</h2>
// // //       <ul className="space-y-2">
// // //         {slides.map((slide) => (
// // //           <li key={slide._id} className="border p-2 rounded flex justify-between items-center">
// // //             <div>
// // //               <p className="font-semibold">{slide.title}</p>
// // //               <p className="text-sm text-gray-500">
// // //                 Uploaded by: {slide.professor.name} | {new Date(slide.uploadedAt).toLocaleDateString()}
// // //               </p>
// // //             </div>
// // //             <a
// // //               href={slide.fileUrl}
// // //               download
// // //               className="bg-green-600 text-white px-3 py-1 rounded"
// // //             >
// // //               Download
// // //             </a>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }
// import React from 'react';
// import getStudent from '@/utilites/getStudent';
// import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';
// import getMyToken from '@/utilites/getMyToken';

// interface SlidesPageProps {
//   params: { _id: string };
// }

// export default async function StudentSlidesPage({ params }: SlidesPageProps) {
//   const { _id: courseId } = params;

//   // جلب بيانات الطالب + الكورسات اللي مسجل فيها
//   const student = await getStudent();
//   if (!student) return <div>No student found</div>;

//   console.log("Student data:", student);
//   console.log("Course ID from URL params:", courseId);

//   // التأكد أن الطالب مسجل في الكورس
//   const courseExists = student.courses.includes(courseId);
//   if (!courseExists) return <div>You are not enrolled in this course</div>;
//   console.log("Course exists:", courseExists);

//   // جلب الـ token من cookies
//   const token = await getMyToken();
//   if (!token) return <div>User not authenticated</div>;

//   // fetch السلايدات للطالب
//   const res = await fetch('http://localhost:5000/api/slides/list', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ courseId }),
//   });

//   const slides = await res.json();

//   console.log("Slides fetched:", slides);

//   if (!slides || slides.length === 0) return <div>No slides found for this course.</div>;

//   return <StudentSlidesClient slides={slides} />;


// }

// 'use client';

// import React, { useEffect, useState } from 'react';
// import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';
// import getMyToken from '@/utilites/getMyToken';

// interface PageProps {
//   params: any;
// }

// export default function StudentSlidesPage({ params }: PageProps) {
//   const [slides, setSlides] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 استخدمنا courseId بدل الوصول المباشر params._id
//   const courseId = params?._id;

//   useEffect(() => {
//     const fetchSlides = async () => {
//       const token = await getMyToken();

//       try {
//         const res = await fetch('http://localhost:5000/api/slides/list', {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ courseId }),
//         });

//         if (!res.ok) {
//           console.error('Error fetching slides:', res.status);
//           setSlides([]);
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();
//         setSlides(data);
//       } catch (err) {
//         console.error('Fetch slides error:', err);
//         setSlides([]);
//       }

//       setLoading(false);
//     };

//     if (courseId) fetchSlides();
//   }, [courseId]);

//   if (loading) return <p>Loading slides...</p>;

//   return <StudentSlidesClient slides={slides} />;
// }



import React from 'react';
import getStudent from '@/utilites/getStudent';
import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';
import getMyToken from '@/utilites/getMyToken';

interface SlidesPageProps {
  params: { _id: string };
}

export default async function StudentSlidesPage({ params }: SlidesPageProps) {

  const { _id: courseId } = params;
  console.log('courseId',courseId);


  const student = await getStudent();
  console.log('student',student);
  // console.log('studentcourses',student.courses);
  if (!student) return <div>No student found</div>;

  // const courseExists = student.data.courses.includes(courseId);
  const courseExists = student.data.courses.some(
  (course: any) => course._id === courseId
);

  console.log("Course exists:", courseExists);
  if (!courseExists)
    return <div>You are not enrolled in this course</div>;

  const token = await getMyToken();
  if (!token) return <div>User not authenticated</div>;

  const res = await fetch('http://localhost:5000/api/slides/list', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ courseId }),
    cache: 'no-store'
  });

  const result = await res.json();

  console.log("Slides fetched:", result);

  const slides = result?.data || [];

  if (slides.length === 0)
    return <div>No slides found for this course.</div>;

  return <StudentSlidesClient slides={slides} />;
}
