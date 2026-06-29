
'use server';
import getMyToken from '@/utilites/getMyToken';

interface GradePayload {
  studentId: string;
  name: string;
  grade: number;
}

interface AddGradesBody {
  courseId: string;
  grades: GradePayload[];
}

export default async function addGrades(body: AddGradesBody) {
  const token = await getMyToken();
  if (!token) throw new Error('User not authenticated');

  const res = await fetch(
    'http://localhost:5000/api/professors/submitGradesByIdAndName',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return data;
}