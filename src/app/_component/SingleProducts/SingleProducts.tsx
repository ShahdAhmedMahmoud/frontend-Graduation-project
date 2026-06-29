
// // // // // // // // // // import React from 'react'
// // // // // // // // // // import {

// // // // // // // // // //   Card,
// // // // // // // // // //   CardAction,
// // // // // // // // // //   CardContent,
// // // // // // // // // //   CardDescription,
// // // // // // // // // //   CardFooter,
// // // // // // // // // //   CardHeader,
// // // // // // // // // //   CardTitle,
// // // // // // // // // // } from "@/components/ui/card"
// // // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // import addToMyCourses from '@/CardActions/addtoCart.action';

// // // // // // // // // // import { authOptions } from '@/auth'
// // // // // // // // // // import { getServerSession } from 'next-auth'
// // // // // // // // // // import AddBtn from '../AddBtn/AddBtn';

// // // // // // // // // // export default async  function SingleProduct({course}) {

// // // // // // // // // //   return (
// // // // // // // // // //     <>
// // // // // // // // // //      <div className="p-4">
// // // // // // // // // //        <Card className='gap-2 p-2'>
// // // // // // // // // //          <Link href={`/dashboard/courses/${course._id}`}>
// // // // // // // // // //   <CardHeader>
// // // // // // // // // //     <CardTitle className='text-4xl font-semibold' >{course.name}</CardTitle>
// // // // // // // // // //     <CardDescription className='text-emerald-700'>Credits: {course.credits}</CardDescription>
    
// // // // // // // // // //   </CardHeader>
// // // // // // // // // //   <CardContent className='font-bold'>
// // // // // // // // // //     <p>Code: {course.code}</p>
// // // // // // // // // //   </CardContent>
// // // // // // // // // //   <CardFooter>
// // // // // // // // // //     <div className="flex justify-between w-full">
      
// // // // // // // // // //       <span>{course.department.dept_name}</span>
// // // // // // // // // //       <span>location: {course.department.office_location}</span>
    

      
// // // // // // // // // //        </div>
// // // // // // // // // //   </CardFooter>
// // // // // // // // // //          </Link>
// // // // // // // // // //         <AddBtn  courseId={course._id}/>
       
// // // // // // // // // //       </Card>
// // // // // // // // // //      </div>
      
// // // // // // // // // //     </>
// // // // // // // // // //   )
// // // // // // // // // // }


// // // // import React from 'react';
// // // // import Link from 'next/link';
// // // // import { Card } from "@/components/ui/card";
// // // // import { MoreVertical, GraduationCap } from "lucide-react";
// // // // import AddBtn from '../AddBtn/AddBtn';

// // // // export default async function SingleProduct({ course }) {
// // // //   return (
// // // //     <div className="p-3">
// // // //       <Card
// // // //         className="
// // // //           relative p-5 rounded-2xl border-0 shadow-md hover:shadow-lg 
// // // //           transition-all cursor-pointer 
// // // //           bg-purple-200
// // // //         "
// // // //       >
// // // //         {/* Three Dots Icon */}
// // // //         <div className="absolute top-4 right-4 text-gray-700">
// // // //           <MoreVertical size={20} />
// // // //         </div>

// // // //         {/* Icon on top */}
// // // //         <div className="absolute top-4 left-4 text-gray-700">
// // // //           <GraduationCap size={22} />
// // // //         </div>

// // // //         <Link href={`/dashboard/courses/${course._id}`}>
// // // //           <div className="flex flex-col gap-3">

// // // //             {/* Course Name */}
// // // //             <h2 className="text-xl font-semibold mt-6">
// // // //               {course.name}
// // // //             </h2>

// // // //             {/* Doctor Name */}
// // // //             <p className="text-gray-600 -mt-2">
// // // //               Dr. {course.department?.doctor || "Unknown"}
// // // //             </p>

// // // //             {/* Circle Progress — dummy like design */}
// // // //             <div className="flex justify-center my-4">
// // // //               <div
// // // //                 className="w-28 h-28 rounded-full"
// // // //                 style={{
// // // //                   background: `conic-gradient(
// // // //                     #8f00ff 0deg 70deg,
// // // //                     #e0b6ff 70deg 360deg
// // // //                   )`
// // // //                 }}
// // // //               ></div>
// // // //             </div>

// // // //           </div>
// // // //         </Link>

// // // //         {/* Footer */}
// // // //         <div className="flex justify-between mt-3 text-sm text-gray-700">
// // // //           <span>{course.department.dept_name}</span>
// // // //           <span>Location: {course.department.office_location}</span>
// // // //         </div>

// // // //         <div className="mt-4">
// // // //           <AddBtn courseId={course._id} />
// // // //         </div>

// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // }

// // // // // import React from 'react';
// // // // // import Link from 'next/link';
// // // // // import { Card } from "@/components/ui/card";
// // // // // import { MoreVertical, GraduationCap } from "lucide-react";
// // // // // import AddBtn from '../AddBtn/AddBtn';

// // // // // export default function SingleProduct({ course, index }) {

// // // // //   // ألوان مختلفة لكل Card
// // // // //   const colors = [
// // // // //     "bg-purple-200",
// // // // //     "bg-blue-200",
// // // // //     "bg-pink-200",
// // // // //     "bg-green-200",
// // // // //     "bg-yellow-200",
// // // // //   ];

// // // // //   return (
// // // // //     <div className="p-2">
// // // // //       <Card
// // // // //         className={`
// // // // //           relative p-4 rounded-2xl border-0 shadow-md hover:shadow-lg 
// // // // //           transition-all cursor-pointer 
// // // // //           ${colors[index % colors.length]}
// // // // //           w-[240px] h-[280px]   /* ⇦ الحجم أصغر */
// // // // //         `}
// // // // //       >
// // // // //         {/* Three dots */}
// // // // //         <div className="absolute top-3 right-3 text-gray-700">
// // // // //           <MoreVertical size={18} />
// // // // //         </div>

// // // // //         {/* Icon */}
// // // // //         <div className="absolute top-3 left-3 text-gray-700">
// // // // //           <GraduationCap size={20} />
// // // // //         </div>

// // // // //         <Link href={`/dashboard/courses/${course._id}`}>
// // // // //           <div className="flex flex-col gap-2">

// // // // //             <h2 className="text-lg font-semibold mt-6">
// // // // //               {course.name}
// // // // //             </h2>

// // // // //             <p className="text-gray-700 text-sm -mt-1">
// // // // //               Dr. {course.department?.doctor || "Unknown"}
// // // // //             </p>

// // // // //             <div className="flex justify-center my-2">
// // // // //               <div
// // // // //                 className="w-20 h-20 rounded-full"
// // // // //                 style={{
// // // // //                   background: `conic-gradient(
// // // // //                     #8f00ff 0deg 70deg,
// // // // //                     #e0b6ff 70deg 360deg
// // // // //                   )`
// // // // //                 }}
// // // // //               ></div>
// // // // //             </div>

// // // // //           </div>
// // // // //         </Link>

// // // // //         <div className="flex justify-between mt-2 text-xs text-gray-700">
// // // // //           <span>{course.department.dept_name}</span>
// // // // //           <span>{course.department.office_location}</span>
// // // // //         </div>

// // // // //         <div className="mt-3">
// // // // //           <AddBtn courseId={course._id} />
// // // // //         </div>

// // // // //       </Card>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // import React from 'react';
// // // import Link from 'next/link';
// // // import { Card } from "@/components/ui/card";
// // // import { MoreVertical, GraduationCap } from "lucide-react";
// // // import AddBtn from '../AddBtn/AddBtn';

// // // export default async function SingleProduct({ course }) {

// // //   // مجموعة ألوان مختلفة
// // //   const colors = [
// // //     "bg-purple-200",
// // //     "bg-blue-200",
// // //     "bg-green-200",
// // //     "bg-pink-200",
// // //     "bg-yellow-200",
// // //     "bg-orange-200"
// // //   ];

// // //   // اختيار لون ثابت لكل كارد بناء على الـ id
// // //   const cardColor = colors[Math.abs(course._id.charCodeAt(0)) % colors.length];

// // //   return (
// // //     <Card
// // //       className={`
// // //         relative w-[240px] h-[280px]     /* 🔥 حجم الكارد أصغر */
// // //         p-4 rounded-2xl shadow-md 
// // //         hover:shadow-lg transition-all cursor-pointer 
// // //         ${cardColor}
// // //       `}
// // //     >

// // //       {/* ثلاث نقاط */}
// // //       <div className="absolute top-3 right-3 text-gray-700">
// // //         <MoreVertical size={20} />
// // //       </div>

// // //       {/* أيقونة */}
// // //       <div className="absolute top-3 left-3 text-gray-700">
// // //         <GraduationCap size={20} />
// // //       </div>

// // //       <Link href={`/dashboard/courses/${course._id}`}>
// // //         <div className="flex flex-col gap-2">
// // //           <h2 className="text-lg font-semibold mt-6">{course.name}</h2>

// // //           <p className="text-gray-700 -mt-1 text-sm">
// // //             Dr. {course.department?.doctor || "Unknown"}
// // //           </p>

// // //           {/* دائرة progress */}
// // //           <div className="flex justify-center my-2">
// // //             <div
// // //               className="w-20 h-20 rounded-full"
// // //               style={{
// // //                 background: `conic-gradient(
// // //                   #8f00ff 0deg 70deg,
// // //                   #e0b6ff 70deg 360deg
// // //                 )`
// // //               }}
// // //             ></div>
// // //           </div>
// // //         </div>
// // //       </Link>

// // //       {/* footer */}
// // //       <div className="flex justify-between mt-1 text-xs text-gray-700">
// // //         <span>{course.department.dept_name}</span>
// // //         <span>{course.department.office_location}</span>
// // //       </div>

// // //       <div className="mt-3">
// // //         <AddBtn courseId={course._id} />
// // //       </div>

// // //     </Card>
// // //   );
// // // }

// // import React from 'react';
// // import Link from 'next/link';
// // import { Card } from "@/components/ui/card";
// // import { MoreVertical, GraduationCap } from "lucide-react";
// // import AddBtn from '../AddBtn/AddBtn';

// // export default async function SingleProduct({ course, index }) {

// //   // مجموعة ألوان جميلة ومختلفة
// //   const colors = [
// //     "bg-purple-200",
// //     "bg-blue-200",
// //     "bg-green-200",
// //     "bg-pink-200",
// //     "bg-yellow-200",
// //     "bg-orange-200"
// //   ];

// //   // اختيار لون بناءً على ترتيب الكارد
// //   const cardColor = colors[index % colors.length];

// //   return (
// //     <Card
// //       className={`
// //         relative w-[240px] h-[280px]
// //         p-4 rounded-2xl shadow-md 
// //         hover:shadow-lg transition-all 
// //         cursor-pointer 
// //         ${cardColor}
// //       `}
// //     >

// //       {/* Three Dots Icon */}
// //       <div className="absolute top-3 right-3 text-gray-700">
// //         <MoreVertical size={20} />
// //       </div>

// //       {/* Graduation icon */}
// //       <div className="absolute top-3 left-3 text-gray-700">
// //         <GraduationCap size={20} />
// //       </div>

// //       <Link href={`/dashboard/courses/${course._id}`}>
// //         <div className="flex flex-col gap-2">

// //           <h2 className="text-lg font-semibold mt-6">
// //             {course.name}
// //           </h2>

// //           <p className="text-gray-700 -mt-1 text-sm">
// //             Dr. {course.department?.doctor || "Unknown"}
// //           </p>

// //           {/* Circle Progress */}
// //           <div className="flex justify-center my-2">
// //             <div
// //               className="w-20 h-20 rounded-full"
// //               style={{
// //                 background: `conic-gradient(
// //                   #8f00ff 0deg 70deg,
// //                   #e0b6ff 70deg 360deg
// //                 )`
// //               }}
// //             ></div>
// //           </div>

// //         </div>
// //       </Link>

// //       {/* Bottom info */}
// //       <div className="flex justify-between mt-1 text-xs text-gray-700">
// //         <span>{course.department.dept_name}</span>
// //         <span>{course.department.office_location}</span>
// //       </div>

// //       <div className="mt-3">
// //         <AddBtn courseId={course._id} />
// //       </div>

// //     </Card>
// //   );
// // }

// import React from 'react';
// import Link from 'next/link';
// import { Card } from "@/components/ui/card";
// import { MoreVertical, GraduationCap } from "lucide-react";
// import AddBtn from '../AddBtn/AddBtn';

// export default async function SingleProduct({ course, index }) {

//   const colors = [
//     "bg-purple-200",
//     "bg-blue-200",
//     "bg-green-200",
//     "bg-pink-200",
//     "bg-yellow-200",
//     "bg-orange-200"
//   ];

//   const cardColor = colors[index % colors.length];

//   return (
//     <Card
//       className={`
//         relative w-[240px] h-[280px]
//         p-4 rounded-2xl shadow-md 
//         hover:shadow-lg transition-all 
//         cursor-pointer 
//         ${cardColor}
//         flex flex-col justify-between   /* << مهم جدًا */
//       `}
//     >

//       <div>
//         {/* Three Dots Icon */}
//         <div className="absolute top-3 right-3 text-gray-700">
//           <MoreVertical size={20} />
//         </div>

//         {/* Graduation icon */}
//         <div className="absolute top-3 left-3 text-gray-700">
//           <GraduationCap size={20} />
//         </div>

//         <Link href={`/dashboard/courses/${course._id}`}>
//           <div className="flex flex-col gap-2 mt-6">

//             <h2 className="text-lg font-semibold">
//               {course.name}
//             </h2>

//             <p className="text-gray-700 -mt-1 text-sm">
//               Dr. {course.department?.doctor || "Unknown"}
//             </p>

//             {/* Circle Progress */}
//             <div className="flex justify-center my-2">
//               <div
//                 className="w-20 h-20 rounded-full"
//                 style={{
//                   background: `conic-gradient(
//                     #8f00ff 0deg 70deg,
//                     #e0b6ff 70deg 360deg
//                   )`
//                 }}
//               ></div>
//             </div>

//           </div>
//         </Link>

//         {/* Bottom info */}
//         <div className="flex justify-between mt-1 text-xs text-gray-700">
//           <span>{course.department.dept_name}</span>
//           <span>{course.department.office_location}</span>
//         </div>
//       </div>

//       {/* Add button داخل الكارد تمامًا */}
//       <div className="mt-2">
//         <AddBtn courseId={course._id} />
//       </div>

//     </Card>
//   );
// }

import React from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { MoreVertical, GraduationCap } from "lucide-react";


export default  function SingleProducts({ course, index }) {

  const colors = [
    "bg-purple-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-pink-200",
    "bg-yellow-200",
    "bg-orange-200"
  ];

  const cardColor = colors[index % colors.length];

  // ألوان الدوائر مختلفة
  const circleColors = [
    ["#8f00ff", "#e0b6ff"],
    ["#1e40af", "#93c5fd"],
    ["#047857", "#6ee7b7"],
    ["#be185d", "#f9a8d4"],
    ["#b45309", "#fcd34d"],
    ["#c2410c", "#fdba74"]
  ];

  const [circleStart, circleEnd] = circleColors[index % circleColors.length];

  return (
    <Card
      className={`
        relative w-[240px] h-[280px]
        p-4 rounded-2xl shadow-md 
        hover:shadow-lg transition-all 
        cursor-pointer 
        ${cardColor}
        flex flex-col justify-between
      `}
    >

      <div>
        {/* Three Dots Icon */}
        <div className="absolute top-3 right-3 text-gray-700">
          <MoreVertical size={20} />
        </div>

        {/* Graduation icon */}
        <div className="absolute top-3 left-3 text-gray-700">
          <GraduationCap size={20} />
        </div>

        <Link href={`/dashboard/coursesenrollment/${course._id}`}>
          <div className="flex flex-col gap-2 mt-6">

            <h2 className="text-lg font-semibold">{course.name}</h2>

            <p className="text-gray-700 -mt-1 text-sm">
              Dr. {course.department?.doctor || "Unknown"}
            </p>

            {/* Circle Progress بلون مختلف */}
            <div className="flex justify-center my-2">
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  background: `conic-gradient(
                    ${circleStart} 0deg 70deg,
                    ${circleEnd} 70deg 360deg
                  )`
                }}
              ></div>
            </div>

          </div>
        </Link>

        {/* Bottom info */}
        <div className="flex justify-between mt-1 text-xs text-gray-700">
          {/* <span>{course.department.dept_name}</span> */}
          {/* <span>{course.department.office_location}</span> */}
        </div>
      </div>



    </Card>
  );
}

