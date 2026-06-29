// // // // 'use server';
// // // // import getMyToken from '@/utilites/getMyToken';

// // // // export default async function uploadAssignment(assignmentId: string, file: File) {
// // // //   const token = await getMyToken();
// // // //   if (!token) throw new Error('User not authenticated');

// // // //   const formData = new FormData();
// // // //   formData.append('assignmentId', assignmentId);
// // // //   formData.append('file', file);

// // // //   const res = await fetch('http://localhost:5000/api/assignments/submit', {
// // // //     method: 'POST',
// // // //     headers: { Authorization: `Bearer ${token}` },
// // // //     body: formData,
// // // //   });

// // // //   return res.json();
// // // // }

// // // 'use server';
// // // import getMyToken from '@/utilites/getMyToken';

// // // export default async function submitAssignment(assignmentId: string, file: File) {
// // //   const token = await getMyToken();
// // //   if (!token) throw new Error('User not authenticated');

// // //   const formData = new FormData();
// // //   formData.append('assignmentId', assignmentId);
// // //   formData.append('file', file);

// // //   const res = await fetch('http://localhost:5000/api/assignments/submit', {
// // //     method: 'POST',
// // //     headers: {
// // //       Authorization: `Bearer ${token}`,
// // //     },
// // //     body: formData,
// // //   });

// // //   if (!res.ok) throw new Error('Failed to submit assignment');

// // //   const data = await res.json();
// // //   return data;
// // // }
// // 'use server';
// // import getMyToken from '@/utilites/getMyToken';

// // export default async function submitAssignment(assignmentId: string, file: File) {
// //   const token = await getMyToken();
// //   if (!token) throw new Error('User not authenticated');

// //   const formData = new FormData();
// //   formData.append('assignmentId', assignmentId);
// //   formData.append('file', file);

// //   const res = await fetch('http://localhost:5000/api/assignments/submit', {
// //     method: 'POST',
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //       // ما تضيفيش Content-Type هنا لأن FormData بتحددها اوتوماتيك
// //     },
// //     body: formData,
// //   });

// //   if (!res.ok) {
// //     const text = await res.text();
// //     console.error('Server responded with:', text);
// //     throw new Error('Failed to submit assignment');
// //   }

// //   const data = await res.json();
// //   return data;
// // }


// 'use server';
// import getMyToken from '@/utilites/getMyToken';

// export default async function submitAssignment(assignmentId: string, file: File) {
//   const token = await getMyToken();
//   if (!token) throw new Error('User not authenticated');

//   const formData = new FormData();
//   formData.append('assignmentId', assignmentId);
//   formData.append('file', file);

//   const res = await fetch('http://localhost:5000/api/assignments/submit', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       // ما تضيفيش Content-Type هنا
//     },
//     body: formData,
//   });
 

//   // if (!res.ok) {
//   //   const text = await res.text();
//   //   console.error('Server responded with:', text);
//   //   throw new Error('Failed to submit assignment');
//   // }
  

//   // const data = await res.json(); // data.message = "Submitted successfully"
//   // return data;

//   if (!res.ok) {
//   const text = await res.text(); // اعرض response كـ نص
//   console.error('Server responded with:', text);
//   throw new Error('Failed to submit assignment');
// }

// const data = await res.json().catch(async () => {
//   const text = await res.text();
//   console.error('Failed to parse JSON, got:', text);
//   throw new Error('Failed to parse JSON');
// });
// return data;

// }

// 'use client';
// import getMyToken from '@/utilites/getMyToken';

// export default async function submitAssignment(assignmentId: string, file: File) {
//   const token = await getMyToken();
//   if (!token) throw new Error('User not authenticated');

//   const formData = new FormData();
//   formData.append('assignmentId', assignmentId);
//   formData.append('file', file);

//   const res = await fetch('http://localhost:5000/api/assignments/submit', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       // لا تضيفي Content-Type
//     },
//     body: formData,
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error('Server responded with:', text);
//     throw new Error('Failed to submit assignment');
//   }

//   const data = await res.json(); // { message: "Submitted successfully" }
//   return data;
// }


// 'use client';
// import getMyToken from '@/utilites/getMyToken';

// export default async function uploadAssignment(courseId: string, file: File, title: string, description: string, deadline: string) {
//   const token = await getMyToken();
//   if (!token) throw new Error('User not authenticated');

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('title', title);
//   formData.append('description', description);
//   formData.append('deadline', deadline);

//   const res = await fetch(`http://localhost:5000/api/assignments/create?courseId=${courseId}`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       // do NOT set Content-Type manually
//     },
//     body: formData,
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error('Server responded with:', text);
//     throw new Error('Failed to create assignment');
//   }

//   return await res.json();
// }


'use client';
import getMyToken from '@/utilites/getMyToken';

export default async function submitAssignment(assignmentId: string, file: File) {
  const token = await getMyToken();
  if (!token) throw new Error('User not authenticated');

  const formData = new FormData();
  formData.append('assignmentId', assignmentId);
  formData.append('file', file);

  const res = await fetch(`http://localhost:5000/api/assignments/submit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ Do NOT set Content-Type manually; browser will set it for FormData
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error:", text);
    throw new Error('Failed to submit assignment');
  }

  const data = await res.json();
  return data;
}

