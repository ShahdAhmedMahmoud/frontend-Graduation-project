import React, { useEffect, useState } from "react";
import axios from "axios";

interface Professor {
  _id: string;
  name: string;
  email: string;
}

interface Assignment {
  _id: string;
  title: string;
  description: string;
  file: string;
  deadline: string;
  course: string;
  professor: Professor;
  submissions: any[];
  createdAt: string;
  updatedAt: string;
}

interface Props {
  courseId: string;
}

const AssignmentsList: React.FC<Props> = ({ courseId }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token"); // نفس الطريقة اللي استخدمتها لل auth
        const res = await axios.post(
          "http://localhost:5000/api/assignments/list",
          { courseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAssignments(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div>
      <h2>Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((a) => (
            <li key={a._id} style={{ marginBottom: "20px" }}>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
              <p>
                Professor: {a.professor.name} ({a.professor.email})
              </p>
              <p>Deadline: {new Date(a.deadline).toLocaleDateString()}</p>
              <a href={a.file} target="_blank" rel="noopener noreferrer">
                Download Assignment
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentsList;
