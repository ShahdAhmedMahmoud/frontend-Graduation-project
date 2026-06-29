

// import Link from "next/link";
// import { BookOpen, FileText, ClipboardList, QrCode } from "lucide-react";

// export default async function CourseDetails({ params }) {
//   const { _id } = await params;

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="max-w-5xl mx-auto px-6">

//         {/* Page Title */}
//         <h1 className="text-3xl font-bold mb-8 text-gray-800">
//           Course Details
//         </h1>

//         {/* Course Info Card */}
//         <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-2">Course Information</h2>
//           <p className="text-gray-600">
//             Course ID:
//             <span className="font-semibold text-gray-800 ml-2">
//               {_id}
//             </span>
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//           {/* Grades */}
//           <Link
//             href={`/doctor/doctordashboard/courses/${_id}/grades`}
//             className="group bg-blue-100 hover:bg-blue-200 transition rounded-2xl p-6 shadow-md hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <ClipboardList className="w-8 h-8 text-blue-700" />
//               <div>
//                 <h3 className="text-lg font-semibold text-blue-800">
//                   Add Grades
//                 </h3>
//                 <p className="text-sm text-blue-700">
//                   Manage students grades
//                 </p>
//               </div>
//             </div>
//           </Link>

//           {/* Slides */}
//           <Link
//             href={`/doctor/doctordashboard/courses/${_id}/slides`}
//             className="group bg-green-100 hover:bg-green-200 transition rounded-2xl p-6 shadow-md hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <FileText className="w-8 h-8 text-green-700" />
//               <div>
//                 <h3 className="text-lg font-semibold text-green-800">
//                   Add Materials
//                 </h3>
//                 <p className="text-sm text-green-700">
//                   Upload course materials
//                 </p>
//               </div>
//             </div>
//           </Link>

//           {/* Assignment */}
//           <Link
//             href={`/doctor/doctordashboard/courses/${_id}/assignment`}
//             className="group bg-purple-100 hover:bg-purple-200 transition rounded-2xl p-6 shadow-md hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <BookOpen className="w-8 h-8 text-purple-700" />
//               <div>
//                 <h3 className="text-lg font-semibold text-purple-800">
//                   Add Assignment
//                 </h3>
//                 <p className="text-sm text-purple-700">
//                   Create new assignments
//                 </p>
//               </div>
//             </div>
//           </Link>

//           <Link
//             href={`/doctor/doctordashboard/courses/${_id}/attendance`}
//             className="group bg-amber-100 hover:bg-amber-200 transition rounded-2xl p-6 shadow-md hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <QrCode className="w-8 h-8 text-amber-700" />
//               <div>
//                 <h3 className="text-lg font-semibold text-amber-800">
//                   Attendance QR
//                 </h3>
//                 <p className="text-sm text-amber-700">
//                   Generate lecture QR codes
//                 </p>
//               </div>
//             </div>
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { BookOpen, FileText, ClipboardList, QrCode } from "lucide-react";

export default async function CourseDetails({ params }) {
  const { _id } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Course Details
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Course Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Course ID:
            <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">{_id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link href={`/doctor/doctordashboard/courses/${_id}/grades`}
            className="bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition rounded-2xl p-6 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-4">
              <ClipboardList className="w-8 h-8 text-blue-700 dark:text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Add Grades</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">Manage students grades</p>
              </div>
            </div>
          </Link>

          <Link href={`/doctor/doctordashboard/courses/${_id}/slides`}
            className="bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-900/60 transition rounded-2xl p-6 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-green-700 dark:text-green-400" />
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Add Materials</h3>
                <p className="text-sm text-green-700 dark:text-green-400">Upload course materials</p>
              </div>
            </div>
          </Link>

          <Link href={`/doctor/doctordashboard/courses/${_id}/assignment`}
            className="bg-purple-100 dark:bg-purple-900/40 hover:bg-purple-200 dark:hover:bg-purple-900/60 transition rounded-2xl p-6 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-purple-700 dark:text-purple-400" />
              <div>
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">Add Assignment</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">Create new assignments</p>
              </div>
            </div>
          </Link>

          <Link href={`/doctor/doctordashboard/courses/${_id}/attendance`}
            className="bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-900/60 transition rounded-2xl p-6 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-4">
              <QrCode className="w-8 h-8 text-amber-700 dark:text-amber-400" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">Attendance QR</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400">Generate lecture QR codes</p>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
