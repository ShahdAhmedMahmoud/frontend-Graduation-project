
import getProfessor from "@/utilites/getProfessor";
import getMyToken from "@/utilites/getMyToken";
import SlidesClientUploader from "@/app/_component/SlidesClientUploader/SlidesClientUploader";

export default async function SlidesPage({ params }: { params: { _id: string } }) {
  const { _id } = await params;
  
  const professor = await getProfessor();
  if (!professor) return <div>Not authenticated</div>;

  const course = professor.data?.courses?.find((id: string) => id === _id) 
    || professor.courses?.find((id: string) => id === _id);
  if (!course) return <div>You are not assigned to this course</div>;

  const token = await getMyToken();
  if (!token) return <div>Invalid token</div>;

  return (
    <SlidesClientUploader
      course={_id}      
      token={token}
    />
  );
}