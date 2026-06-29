// // // // 'use server';

// // // // import getMyToken from '@/utilites/getMyToken';

// // // // interface AssignmentData {
// // // //   title: string;
// // // //   description: string;
// // // //   deadline: string;
// // // //   file: File;
// // // // }

// // // // export default async function addAssignment(courseId: string, assignmentData: AssignmentData) {
// // // //   const token = await getMyToken();
// // // //   if (!token) throw new Error('User not authenticated');

// // // //   const formData = new FormData();
// // // //   formData.append('title', assignmentData.title);
// // // //   formData.append('description', assignmentData.description);
// // // //   formData.append('deadline', assignmentData.deadline);
// // // //   formData.append('file', assignmentData.file);
// // // //   formData.append('course', courseId);

// // // //   const res = await fetch('http://localhost:5000/api/assignments/create', {
// // // //     method: 'POST',
// // // //     headers: {
// // // //       Authorization: `Bearer ${token}`,
// // // //       // 'Content-Type': 'multipart/form-data' => لا تكتبها هنا، FormData يحددها تلقائيًا
// // // //     },
// // // //     body: formData,
// // // //   });

// // // //   if (!res.ok) {
// // // //     const text = await res.text();
// // // //     throw new Error(`Error uploading assignment: ${text}`);
// // // //   }

// // // //   const data = await res.json();
// // // //   return data;
// // // // }
// // // 'use server';
// // // import getMyToken from '@/utilites/getMyToken';

// // // export default async function addAssignment(courseId: string, assignmentData: { title: string; description: string; deadline: string; file: File }) {
// // //   // 1. جلب التوكن من السيرفر
// // //   const token = await getMyToken();
// // //   console.log('DEBUG: token from getMyToken =', token);
// // //   if (!token) throw new Error('User not authenticated (no token)');

// // //   // 2. تأكيد الحقول
// // //   const { title, description, deadline, file } = assignmentData;
// // //   if (!title || !description || !deadline || !file || !courseId) {
// // //     throw new Error('Missing required fields');
// // //   }

// // //   // 3. بناء FormData بدون Content-Type
// // //   const formData = new FormData();
// // //   formData.append('title', title);
// // //   formData.append('description', description);
// // //   formData.append('deadline', deadline);
// // //   formData.append('file', file);
// // //   formData.append('course', courseId); // تأكدي اسم الحقل matches backend

// // //   console.log('DEBUG: sending formData keys: ', Array.from(formData.keys()));
// // //   console.log("DEBUG course value:", formData.get("course"));


// // //   // 4. ارساله للـ backend
// // //   const res = await fetch('http://localhost:5000/api/assignments/create', {
// // //     method: 'POST',
// // //     headers: {
// // //       Authorization: `Bearer ${token}`, // **مهم**
// // //       // لا تضيفي Content-Type هنا
// // //     },
// // //     body: formData,
// // //   });

// // //   console.log('DEBUG: response status =', res.status, 'statusText=', res.statusText);

// // //   // حاول تقرأ النص لو مش JSON
// // //   const contentType = res.headers.get('content-type') || '';
// // //   if (contentType.includes('application/json')) {
// // //     const data = await res.json();
// // //     console.log('DEBUG: response json =', data);
// // //     if (!res.ok) throw new Error(data.message || 'Upload failed');
// // //     return data;
// // //   } else {
// // //     const text = await res.text();
// // //     console.log('DEBUG: response text =', text);
// // //     if (!res.ok) throw new Error(text || 'Upload failed (non-json)');
// // //     return { message: 'OK', raw: text };
// // //   }
// // // }

// // "use server";

// // import getMyToken from "@/utilites/getMyToken";

// // export async function addAssignment(formData: FormData) {

// //   // ========= DEBUG =========
// //   console.log("SERVER ACTION: addAssignment called");

// //   const token = await getMyToken();
// //   console.log("DEBUG token:", token);

// //   if (!token) throw new Error("User not authenticated");

// //   // اطبعي DATA اللي جاية من الفورم
// //   console.log("DEBUG form keys:", [...formData.keys()]);

// //   // ========= API CALL =========
// //   const res = await fetch("http://localhost:5000/api/assignments/create", {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //       // ❌ لا تضيفي Content-Type لأننا نستخدم FormData
// //     },
// //     body: formData,
// //   });

// //   console.log("DEBUG status =", res.status);

// //   const data = await res.json();
// //   console.log("DEBUG response json =", data);

// //   if (!res.ok) {
// //     throw new Error(data.message || "Upload failed");
// //   }

// //   return data;
// // }


// // "use server";

// // import getMyToken from "@/utilites/getMyToken";

// // export async function addAssignment(formData: FormData) {

// //   console.log("SERVER ACTION: addAssignment called");

// //   const token = await getMyToken();
// //   console.log("DEBUG token:", token);

// //   console.log("DEBUG form keys:", [...formData.keys()]);

// //   const res = await fetch("http://localhost:5000/api/assignments/create", {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //     body: formData,
// //   });

// //   console.log("DEBUG status =", res.status);

// //   const data = await res.json();
// //   console.log("DEBUG response json =", data);

// //   if (!res.ok) {
// //     throw new Error(data.message || "Upload failed");
// //   }

// //   return data;
// // }


// 'use client';
// import getMyToken from '@/utilites/getMyToken';

// export default async function uploadAssignment(
//   courseId: string,
//   file: File,
//   title: string,
//   description: string,
//   deadline: string
// ) {
//   const token = await getMyToken();
//   if (!token) throw new Error('User not authenticated');

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('title', title);
//   formData.append('description', description);
//   formData.append('deadline', deadline);

//   console.log("Uploading assignment with data:", {
//     courseId,
//     title,
//     description,
//     deadline,
//     fileName: file.name,
//   });

//   const res = await fetch(`http://localhost:5000/api/assignments/upload?courseId=${courseId}`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`, // ✅ fixed
//     },
//     body: formData,
//   });
//   console.log("Response status:", res);  

//   if (!res.ok) {
//     const text = await res.text();
//     console.error('Server responded with:', text);
//     throw new Error('Failed to create assignment');
//   }

//   return await res.json();
// }

'use client';
import getMyToken from '@/utilites/getMyToken';

export default async function uploadAssignment(
  courseId: string,
  file: File,
  title: string,
  description: string,
  deadline: string
) {
  const token = await getMyToken();
  if (!token) throw new Error('User not authenticated');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('deadline', deadline);

  console.log("Uploading assignment with data:", {
    courseId,
    title,
    description,
    deadline,
    fileName: file.name,
  });

  const res = await fetch(`http://localhost:5000/api/assignments/upload?courseId=${courseId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Server responded with:', text);
    throw new Error('Failed to create assignment');
  }

  return await res.json();
}
