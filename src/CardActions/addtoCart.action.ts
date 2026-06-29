'use server';
import getMyToken from "@/utilites/getMyToken";

export default  async function addToMyCourses( courseId: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("User not authenticated");
  }
  let res = await fetch(
      `http://localhost:5000/api/students/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId : courseId }),
      }
    );

    let data = await res.json();

    return data;  
}
