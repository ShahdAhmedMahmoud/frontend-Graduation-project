import StudentAttendanceScannerClient from "@/app/_component/StudentAttendanceScannerClient/StudentAttendanceScannerClient";

export default async function StudentCourseAttendancePage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;

  return <StudentAttendanceScannerClient courseId={_id} />;
}
