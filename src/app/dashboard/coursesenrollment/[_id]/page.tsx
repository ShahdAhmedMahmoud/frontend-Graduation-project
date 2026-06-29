
import React from "react";
import getStudent from "@/utilites/getStudent";
import getMyToken from "@/utilites/getMyToken";
import getAssignments from "@/CardActions/getAssignments.action";
import CourseDetailsClient from "@/app/_component/CourseDetailsClient/CourseDetailsClient";

interface CourseDetailsProps {
  params: { _id: string };
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const { _id: courseId } =await params;

  const student = await getStudent();
  console.log("student data:", JSON.stringify(student, null, 2));
  if (!student) return <div>No student found</div>;

  const courseExists = student.data.courses.some(
    (course: any) => course._id === courseId
  );
  console.log("courseId from params:", courseId);
console.log("courses in student:", student.data.courses.map((c: any) => c._id));
console.log("courseExists:", courseExists);
  if (!courseExists) return <div>You are not enrolled in this course</div>;

  const token = await getMyToken();
  if (!token) return <div>User not authenticated</div>;

  const courseInfo = student.data.courses.find(
    (course: any) => course._id === courseId
  );

const slidesRes = await fetch(`http://localhost:5000/api/slides/list`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ courseId, type: "lecture" }), // ✅ lecture فقط
  cache: "no-store",
});
const slidesResult = await slidesRes.json();
const slides = Array.isArray(slidesResult?.data) ? slidesResult.data : [];


const sheetsRes = await fetch(`http://localhost:5000/api/slides/list`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ courseId, type: "sheet" }),
  cache: "no-store",
});
const sheetsResult = await sheetsRes.json();
const sheets = Array.isArray(sheetsResult?.data) ? sheetsResult.data : [];

const recordingsRes = await fetch(`http://localhost:5000/api/slides/list`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ courseId, type: "recording" }),
  cache: "no-store",
});
const recordingsResult = await recordingsRes.json();
const recordings = Array.isArray(recordingsResult?.data) ? recordingsResult.data : [];


const booksRes = await fetch(`http://localhost:5000/api/slides/list`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ courseId, type: "book" }),
  cache: "no-store",
});
const booksResult = await booksRes.json();
const books = Array.isArray(booksResult?.data) ? booksResult.data : [];

  const assignmentsResult = await getAssignments(courseId);
  console.log("assignments:", JSON.stringify(assignmentsResult?.data, null, 2));

 const assignments = Array.isArray(assignmentsResult?.data) ? assignmentsResult.data : [];

  return (
    <CourseDetailsClient
      courseId={courseId}
      courseInfo={courseInfo}
      slides={slides}
      sheets={sheets} 
      assignments={assignments}
      recordings={recordings} 
      books={books}
      token={token}
    />
  );
}