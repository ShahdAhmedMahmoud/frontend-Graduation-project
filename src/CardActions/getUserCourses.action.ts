"use server";
import getMyToken from "@/utilites/getMyToken";

export default async function getLoggedUserCourses() {
    let token = await getMyToken();
    console.log('token',token);
    if (!token) {
        throw new Error("User not authenticated");
    }
   let res = await fetch(`http://localhost:5000/api/students/courses`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    });
    let data = await res.json();
    return data;
}