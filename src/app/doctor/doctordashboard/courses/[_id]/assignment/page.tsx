

// import CreateAssignmentForm from "@/app/_component/AssignmentsClient/AssignmentsClient";
// import getProfessorAssignments from "@/utilites/getProfessorAssignments";
// import Link from "next/link";

// interface PageProps {
//   params: {
//     _id: string;
//   };
// }

// export default async function AssignmentPage({ params }: PageProps) {

//   const { _id: courseId } = await params;

//   const res = await getProfessorAssignments();

//   if (!res?.success) {
//     return (
//       <div className="p-6 text-red-600">
//         Failed to load assignments
//       </div>
//     );
//   }

//   const assignments = res.data.filter(
//     (a: any) => a.course._id === courseId
//   );

//   return (
//     <div className="p-6">

//       {/* ✅ FORM */}
//       <CreateAssignmentForm courseId={courseId} />

//       <hr className="my-6" />

//       {/* ✅ LIST */}
//       <h2 className="text-xl font-bold mb-4">
//         Assignments
//       </h2>

//       {assignments.length === 0 && (
//         <p>No assignments yet.</p>
//       )}

//       {assignments.map((a: any) => (
//         <div
//           key={a._id}
//           className="border p-3 mb-2 flex justify-between items-center"
//         >
//           <div>
//             <p className="font-semibold">
//               {a.title}
//             </p>
//             <p className="text-sm text-gray-500">
//               Deadline:{" "}
//               {new Date(a.deadline).toLocaleDateString()}
//             </p>
//             <p className="text-sm">
//               Submissions: {a.submissions.length}
//             </p>
//           </div>

//           <Link
//             href={`/doctor/doctordashboard/courses/${courseId}/assignment/${a._id}`}
//             className="text-blue-600 underline"
//           >
//             View Submissions
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }


import CreateAssignmentForm from "@/app/_component/AssignmentsClient/AssignmentsClient";
import getProfessorAssignments from "@/utilites/getProfessorAssignments";
import Link from "next/link";

interface PageProps {
  params: { _id: string };
}

export default async function AssignmentPage({ params }: PageProps) {
  const { _id: courseId } = await params;
  const res = await getProfessorAssignments();

  if (!res?.success) {
    return (
      <div className="p-6 text-red-600 dark:text-red-400">
        Failed to load assignments
      </div>
    );
  }

  const assignments = res.data.filter((a: any) => a.course._id === courseId);

  return (
    <div className="p-6">

      {/* Form */}
      <CreateAssignmentForm courseId={courseId} />

      <hr className="my-6 dark:border-gray-700" />

      {/* List */}
      <h2 className="text-xl font-bold mb-4 dark:text-white">Assignments</h2>

      {assignments.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No assignments yet.</p>
      )}

      {assignments.map((a: any) => (
        <div key={a._id}
          className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 mb-3 flex justify-between items-center">
          <div>
            <p className="font-semibold dark:text-white">{a.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Deadline: {new Date(a.deadline).toLocaleDateString()}
            </p>
            <p className="text-sm dark:text-gray-300">
              Submissions: {a.submissions.length}
            </p>
          </div>
          <Link
            href={`/doctor/doctordashboard/courses/${courseId}/assignment/${a._id}`}
            className="text-blue-600 dark:text-blue-400 underline text-sm"
          >
            View Submissions
          </Link>
        </div>
      ))}
    </div>
  );
}
