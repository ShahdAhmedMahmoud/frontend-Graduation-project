

"use server";

import getMyToken from "@/utilites/getMyToken";

export default async function getStudent() {

  const token = await getMyToken();
  console.log("Token in getStudent:", token);
  if (!token) return null;

 const res = await fetch(`http://localhost:5000/api/students/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store"
  });
  console.log("Response status in getStudent:", res);

  if (!res.ok) return null;

  return res.json();
}


