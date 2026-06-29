'use server';
import getMyToken from '@/utilites/getMyToken';

export default async function getSubmissions(assignmentId: string) {
  const token = await getMyToken();
  console.log("Token in getSubmissions =", token);

  if (!token) throw new Error('Not authenticated');

  const res = await fetch(
    'http://localhost:5000/api/assignments/submissions/list',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assignmentId }),
    }
  );
  let data =await res.json()
  console.log("Fetch submissions response status =", data);

  return data ;
}
