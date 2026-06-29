'use server';
import getMyToken from "@/utilites/getMyToken";

export default async function getProfessorAssignments() {

  const token = await getMyToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(
    "http://localhost:5000/api/assignments/professor/assignments",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  let  data =await res.json();
  console.log("Fetch professor assignments response =", data);

  return  data;
}
