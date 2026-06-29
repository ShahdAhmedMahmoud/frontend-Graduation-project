import StudentCourseAttendanceDetailsClient from "@/app/_component/StudentCourseAttendanceDetailsClient/StudentCourseAttendanceDetailsClient";

export default async function StudentCourseAttendanceDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <StudentCourseAttendanceDetailsClient courseId={courseId} />;
}
