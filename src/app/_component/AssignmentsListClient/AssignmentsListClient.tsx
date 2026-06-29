// 'use client';

// import Link from 'next/link';

// interface Assignment {
//   _id: string;
//   title: string;
//   deadline?: string;
// }

// export default function AssignmentsListClient({ assignments }: { assignments: Assignment[] }) {
//   if (!assignments || assignments.length === 0) {
//     return <div>No assignments found</div>;
//   }

//   return (
//     <table className="w-full border-collapse mt-4">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="border px-4 py-2 text-left">Title</th>
//           <th className="border px-4 py-2 text-left">Deadline</th>
//           <th className="border px-4 py-2 text-left">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {assignments.map((a) => (
//           <tr key={a._id}>
//             <td className="border px-4 py-2">{a.title}</td>
//             <td className="border px-4 py-2">
//               {a.deadline ? new Date(a.deadline).toLocaleDateString() : '-'}
//             </td>
//             <td className="border px-4 py-2">
//               <Link href={`/professor/assignments/${a._id}`} className="text-blue-600 underline">
//                 View Submissions
//               </Link>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
