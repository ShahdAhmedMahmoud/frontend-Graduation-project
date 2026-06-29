// // "use server";

// // import getMyToken from "@/utilites/getMyToken";

// // export default async function uploadSlide(courseId: string, title: string, file: File) {
// //   const token = await getMyToken();
// //   if (!token) throw new Error("User not authenticated");

// //   const formData = new FormData();
// //   formData.append("courseld", courseId);
// //   formData.append("title", title);
// //   formData.append("file", file);

// //   const res = await fetch("http://localhost:5000/api/slides/upload", {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //     body: formData,
// //   });

// //   const data = await res.json();
// //   return data;
// // }

// // "use server";

// // import getMyToken from "@/utilites/getMyToken";

// // export default async function uploadSlide(
// //   courseId: string,
// //   title: string,
// //   file: File
// // ) {

// //   const token = await getMyToken();
// //   if (!token) throw new Error("Unauthenticated");

// //   const formData = new FormData();
// //   formData.append("courseld", courseId);
// //   formData.append("title", title);
// //   formData.append("file", file);

// //   const res = await fetch(
// //     "http://localhost:5000/api/slides/upload",
// //     {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: formData,
// //     }
// //   );

// //   return res.json();
// // }

// "use server";

// import getMyToken from "@/utilites/getMyToken";

// export default async function uploadSlide(
//   courseId: string,
//   title: string,
//   file: File
// ) {

//   const token = await getMyToken();
//   console.log("TOKEN =====>", token);

//   if (!token) throw new Error("Unauthenticated");

//   const formData = new FormData();
//   formData.append("course", courseId);
//   formData.append("title", title);
//   formData.append("file", file);

//   const res = await fetch("http://localhost:5000/api/slides/upload", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   console.log("STATUS =====>", res.status);
//   console.log("HEADERS =====>", Object.fromEntries(res.headers.entries()));

//   const text = await res.text();
//   console.log("RAW RESPONSE =====>", text);

//   if (!res.ok) {
//     throw new Error(text);
//   }

//   return JSON.parse(text);
// }

// // export default async function uploadSlide(
// //   courseId: string,
// //   title: string,
// //   file: File
// // ) {
// //   const token = localStorage.getItem("token");
// //   if (!token) throw new Error("Unauthenticated");

// //   const formData = new FormData();
// //   formData.append("course", courseId);
// //   formData.append("title", title);
// //   formData.append("file", file);

// //   const res = await fetch("http://localhost:5000/api/slides/upload", {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //       // مفيش Content-Type هنا، المتصفح يضيفه تلقائيًا
// //     },
// //     body: formData,
// //   });

// //   if (!res.ok) {
// //     const text = await res.text();
// //     throw new Error(text);
// //   }

// //   return res.json();
// // }

// // مكانه ممكن يكون: /CardActions/uploadSlide.client.ts

// // export default async function uploadSlide(courseId: string, title: string, file: File) {
// //   const formData = new FormData();
// //   formData.append("course", courseId);
// //   formData.append("title", title);
// //   formData.append("file", file);

// //   const res = await fetch("/api/uploadSlide", {
// //     method: "POST",
// //     body: formData,
// //     credentials: "include", // يرسل cookies تلقائي
// //   });

// //   if (!res.ok) {
// //     const text = await res.text();
// //     throw new Error(text);
// //   }

// //   return res.json();
// // }

// // export default async function uploadSlide(courseId: string, title: string, file: File) {
// //   // جلب token من localStorage
// //   const token = localStorage.getItem("token"); 
// //   if (!token) throw new Error("Unauthenticated");

// //   const formData = new FormData();
// //   formData.append("course", courseId);
// //   formData.append("title", title);
// //   formData.append("file", file);

// //   const res = await fetch("http://localhost:5000/api/slides/upload", {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${token}`, // إرسال الـ token
// //     },
// //     body: formData,
// //   });

// //   if (!res.ok) {
// //     const text = await res.text();
// //     throw new Error(text);
// //   }

// //   return res.json();
// // }

'use server';
import getMyToken from '@/utilites/getMyToken';

export default async function uploadSlide(courseId: string, title: string, file: File) {
  const token = await getMyToken();
  if (!token) throw new Error('User not authenticated');

  const formData = new FormData();
  formData.append('courseId', courseId);
  formData.append('title', title);
  formData.append('file', file);

  const res = await fetch('http://localhost:5000/api/slides/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
}


