
import DoctorCourseGradesClient from "@/app/_component/DoctorCourseGradesClient/DoctorCourseGradesClient";

interface GradesPageProps {
  params: Promise<{ _id: string }>;
}

export default async function GradesPage({ params }: GradesPageProps) {
  const { _id } = await params;
  return <DoctorCourseGradesClient courseId={_id} />;
}
