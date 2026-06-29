import AdminCourseGradesClient from "@/app/_component/AdminCourseGradesClient/AdminCourseGradesClient";

export default async function AdminCourseGradesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminCourseGradesClient courseId={id} />;
}
