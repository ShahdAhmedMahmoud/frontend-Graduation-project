import DoctorAttendanceQrClient from "@/app/_component/DoctorAttendanceQrClient/DoctorAttendanceQrClient";

export default async function DoctorCourseAttendancePage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;

  return <DoctorAttendanceQrClient courseId={_id} />;
}
