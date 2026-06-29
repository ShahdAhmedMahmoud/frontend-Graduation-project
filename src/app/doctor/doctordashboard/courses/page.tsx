


// 'use client'
// import getDoctorCourses from '@/CardActions/getDoctorCourses'
// import React, { useEffect, useState } from 'react'
// import { GraduationCap, MoreVertical } from 'lucide-react'

// const cardColors = [
//   'bg-purple-100 text-purple-700',
//   'bg-blue-100 text-blue-700',
//   'bg-green-100 text-green-700',
//   'bg-pink-100 text-pink-700',
// ]

// export default function Courses() {
//   const [courses, setCourses] = useState([])

//   async function getCoursesDoctor() {
//     try {
//       const res = await getDoctorCourses()

//       const uniqueCourses = Array.from(
//         new Map(res.data.map(course => [course._id, course])).values()
//       )

//       setCourses(uniqueCourses)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     getCoursesDoctor()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="w-11/12 mx-auto">
        
//         {/* Page Title */}
//         <h1 className="text-3xl font-bold mb-8 text-gray-800">
//           Courses
//         </h1>

//         {courses.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {courses.map((course, index) => {
//               const color = cardColors[index % cardColors.length]

//               return (
//                 <a
//                   key={course._id}
//                   href={`/doctor/doctordashboard/courses/${course._id}`}
//                   className={`relative p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${color}`}
//                 >
//                   {/* Icons */}
//                   <div className="flex justify-between items-center mb-4">
//                     <GraduationCap className="w-6 h-6" />
//                     <MoreVertical className="w-5 h-5 cursor-pointer" />
//                   </div>

//                   {/* Course Name */}
//                   <h3 className="text-lg font-semibold mb-1">
//                     {course.name}
//                   </h3>

//                   {/* Doctor Name */}
//                   <p className="text-sm opacity-80 mb-6">
//                     Dr. {course.doctorName || 'Unknown'}
//                   </p>

//                   {/* Progress */}
//                   <div className="flex justify-center">
//                     <div className="relative w-20 h-20">
//                       <svg viewBox="0 0 36 36" className="w-full h-full">
//                         <path
//                           d="M18 2.0845
//                              a 15.9155 15.9155 0 0 1 0 31.831
//                              a 15.9155 15.9155 0 0 1 0 -31.831"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="3"
//                           opacity="0.2"
//                         />
//                         <path
//                           d="M18 2.0845
//                              a 15.9155 15.9155 0 0 1 0 31.831"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="3"
//                           strokeDasharray="30, 100"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </a>
//               )
//             })}
//           </div>
//         ) : (
//           <p className="text-center text-xl text-red-500">
//             No courses added yet!
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'
import getDoctorCourses from '@/CardActions/getDoctorCourses'
import React, { useEffect, useState } from 'react'
import { GraduationCap, MoreVertical } from 'lucide-react'

const cardColors = [
  'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
]

export default function Courses() {
  const [courses, setCourses] = useState([])

  async function getCoursesDoctor() {
    try {
      const res = await getDoctorCourses()
      const uniqueCourses = Array.from(
        new Map(res.data.map(course => [course._id, course])).values()
      )
      setCourses(uniqueCourses)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCoursesDoctor()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="w-11/12 mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Courses
        </h1>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => {
              const color = cardColors[index % cardColors.length]

              return (
                <a
                  key={course._id}
                  href={`/doctor/doctordashboard/courses/${course._id}`}
                  className={`relative p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${color}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <GraduationCap className="w-6 h-6" />
                    <MoreVertical className="w-5 h-5 cursor-pointer" />
                  </div>

                  <h3 className="text-lg font-semibold mb-1">
                    {course.name}
                  </h3>

                  <p className="text-sm opacity-80 mb-6">
                    Dr. {course.doctorName || 'Unknown'}
                  </p>

                  <div className="flex justify-center">
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          opacity="0.2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="30, 100"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-xl text-red-500 dark:text-red-400">
            No courses added yet!
          </p>
        )}
      </div>
    </div>
  )
}

