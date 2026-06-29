// "use server";

// import getMyToken from "@/utilites/getMyToken";

// export default async function getStudentGrades() {
//   let token = await getMyToken();
//   if (!token) throw new Error("User not authenticated");

//   let res = await fetch("http://localhost:5000/api/students/grades", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   let data = await res.json();
//   return data; // { student: {...}, grades: [...] }
// }
'use server';
import getMyToken from '@/utilites/getMyToken';

export default async function getStudentGrades() {
  const token = await getMyToken();
  if (!token) throw new Error('User not authenticated');

  const res = await fetch('http://localhost:5000/api/students/grades', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data; // تأكدي شكل البيانات يطابق { courseName, grade }
}
