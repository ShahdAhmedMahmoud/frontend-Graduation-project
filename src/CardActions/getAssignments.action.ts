'use server';
import getMyToken from '@/utilites/getMyToken';

interface Assignment {
  _id: string;
  title: string;
  description: string;
  file: string | null;
  deadline: string;
  submissions: {
    _id: string;
    file: string;
    submitted_at: string;
  }[];
}

export default async function getAssignments(courseId: string): Promise<{ data: Assignment[] }> {
  const token = await getMyToken();
  console.log("Student token:", token);
  if (!token) throw new Error('User not authenticated');

  const res = await fetch('http://localhost:5000/api/assignments/list', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ courseId }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error('Failed to fetch assignments');
  }

  const data = await res.json();
  return data; 
}
