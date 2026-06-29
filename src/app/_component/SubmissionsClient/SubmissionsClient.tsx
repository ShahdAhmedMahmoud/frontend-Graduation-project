// // "use client";

// // import React from "react";

// // interface Submission {
// //   _id: string;
// //   submitted_at: string;
// //   file: string;
// //   student: {
// //     _id: string;
// //     full_name: string;
// //     email: string;
// //   };
// // }

// // interface Props {
// //   submissions: Submission[];
// // }

// // export default function SubmissionsClient({ submissions }: Props) {
// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-6">Assignment Submissions</h1>

// //       <table className="w-full border-collapse">
// //         <thead>
// //           <tr className="bg-gray-200">
// //             <th className="border px-4 py-2">Student Name</th>
// //             <th className="border px-4 py-2">Email</th>
// //             <th className="border px-4 py-2">Submitted At</th>
// //             <th className="border px-4 py-2">Solution</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {submissions.map((s) => (
// //             <tr key={s._id}>
// //               <td className="border px-4 py-2">
// //                 {s.student.full_name}
// //               </td>

// //               <td className="border px-4 py-2">
// //                 {s.student.email}
// //               </td>

// //               <td className="border px-4 py-2">
// //                 {new Date(s.submitted_at).toLocaleString()}
// //               </td>

// //               <td className="border px-4 py-2">
// //                 <a
// //                   href={`http://localhost:5000${s.file}`}
// //                   target="_blank"
// //                   className="text-blue-600 underline"
// //                 >
// //                   View File
// //                 </a>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// 'use client';

// import React from 'react';

// interface Submission {
//   _id: string;
//   submitted_at: string;
//   file: string;
//   student: {
//     _id: string;
//     full_name: string;
//     email: string;
//   };
// }

// interface Props {
//   submissions: Submission[];
// }

// export default function SubmissionsClient({ submissions }: Props) {
//   if (!submissions || submissions.length === 0) {
//     return <div>No submissions yet</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Submissions</h2>

//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Student</th>
//             <th className="border px-4 py-2">Email</th>
//             <th className="border px-4 py-2">Submitted At</th>
//             <th className="border px-4 py-2">File</th>
//           </tr>
//         </thead>

//         <tbody>
//           {submissions.map((s) => (
//             <tr key={s._id}>
//               <td className="border px-4 py-2">{s.student.full_name}</td>
//               <td className="border px-4 py-2">{s.student.email}</td>
//               <td className="border px-4 py-2">{new Date(s.submitted_at).toLocaleString()}</td>
//               <td className="border px-4 py-2">
//                 <a
//                   href={`http://localhost:5000${s.file}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   View File
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


