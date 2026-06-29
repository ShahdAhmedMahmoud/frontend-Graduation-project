

import AssignmentsClientStudent from "@/app/_component/AssignmentsClientStudent/AssignmentsClientStudent";
import getAssignments from "@/CardActions/getAssignments.action";

export default async function AssignmentsPage({ params }: { params: { _id: string } }) {

  const courseId = params._id;

  const result = await getAssignments(courseId);

  console.log("Assignments from backend:", result);

  const assignments = result?.data || [];

  return (
    <AssignmentsClientStudent
      assignments={assignments}
      courseId={courseId}
    />
  );
}



