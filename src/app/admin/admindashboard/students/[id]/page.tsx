import AdminStudentDetailsClient from "@/app/_component/AdminStudentDetailsClient/AdminStudentDetailsClient";

export default async function AdminStudentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id || "";

  return <AdminStudentDetailsClient studentId={id} />;
}
