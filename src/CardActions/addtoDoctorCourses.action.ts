'use server';
import getMyToken from "@/utilites/getMyToken";
export default  async function addToMyCourses( courseId: string) {
  const token = await getMyToken();
  console.log("Token in addtoDoctorCourses.action:", token);
  if (!token) {
    throw new Error("User not authenticated");
  }
  let res = await fetch(
      `http://localhost:5000/api/professors/courses/assign`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseIds: [courseId] }),
      }
    );

    let data = await res.json();

    return data;
}


