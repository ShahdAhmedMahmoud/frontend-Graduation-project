import StudentSemesterGradesDetailsClient from "@/app/_component/StudentSemesterGradesDetailsClient/StudentSemesterGradesDetailsClient";

export default async function StudentSemesterGradesPage({
  params,
}: {
  params: Promise<{ semesterKey: string }>;
}) {
  const { semesterKey } = await params;

  return <StudentSemesterGradesDetailsClient semesterKey={semesterKey} />;
}
