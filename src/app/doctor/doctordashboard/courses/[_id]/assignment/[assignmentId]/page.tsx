
import getProfessor from "@/utilites/getProfessor";
import getSubmissions from "@/utilites/getSubmissions";
import SubmitionsClient from "@/app/_component/SubmitionsAssignmentsForProf/SubmitionsAssignmentsForProf";

export default async function submitionsPage({ params }: any) {
  // const assignmentId = params._id;
  const assignmentId = params.assignmentId;
  console.log("Assignment ID in page.tsx =", assignmentId);

  const professor = await getProfessor();
  if(!professor) return <div>Not authorized</div>

  const submissionsRes = await getSubmissions(assignmentId);
  console.log("submissionsRes =", submissionsRes);

  if(!submissionsRes.success){
    return <div>Error fetching submissions</div>
  }

  return (
    <SubmitionsClient submissions={submissionsRes.data} />
  );
}

