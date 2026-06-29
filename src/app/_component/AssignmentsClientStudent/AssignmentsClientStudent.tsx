'use client';
import React, { useState } from 'react';
import submitAssignment from '@/CardActions/uploadAssignment.action';

interface Submission {
  _id: string;
  file: string;
  submitted_at: string;
}

interface Assignment {
  _id: string;
  title: string;
  description: string;
  file: string | null;
  deadline: string;
  submissions: Submission[];
}

interface Props {
  assignments: Assignment[];
  courseId: string;
}

export default function AssignmentsClientStudent({ assignments, courseId }: Props) {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const handleFileChange = (assignmentId: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [assignmentId]: file }));
  };

  const handleSubmit = async (assignmentId: string) => {
    const file = files[assignmentId];
    if (!file) {
      alert('Please select a file first');
      return;
    }

    try {
      const res = await submitAssignment(assignmentId, file);
      alert(res.message || 'Assignment submitted successfully');
      setFiles(prev => ({ ...prev, [assignmentId]: null }));
    } catch (err) {
      console.error(err);
      alert('Failed to submit assignment');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assignments for this course</h1>
      {assignments.length === 0 ? (
        <p>No assignments yet</p>
      ) : (
        <ul className="space-y-6">
          {assignments.map(a => {
            // ✅ تحقق إذا الطالب سلّم
            const submitted = a.submissions && a.submissions.length > 0;
            const submission = submitted ? a.submissions[0] : null;

            return (
              <li key={a._id} className="border p-4 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-lg">{a.title}</h2>
                  {/* ✅ Badge إذا سلّم */}
                  {submitted && (
                    <span className="text-xs bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full">
                      ✓ Submitted
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm">{a.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Deadline: {new Date(a.deadline).toLocaleDateString()}
                </p>

                {/* Download assignment file */}
                {a.file && (
                  <a
                    href={`http://localhost:5000${a.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block mt-2 text-sm"
                  >
                    Download Assignment
                  </a>
                )}

                {/* ✅ لو سلّم — بيّن تفاصيل الـ submission */}
                {submitted && submission ? (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-sm text-green-700 font-medium">
                      You already submitted this assignment
                    </p>
                    <p className="text-xs text-green-500 mt-1">
                      Submitted at: {new Date(submission.submitted_at).toLocaleString()}
                    </p>
                    <a
                      href={`http://localhost:5000${submission.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 underline text-xs mt-1 block"
                    >
                      View your submission
                    </a>
                  </div>
                ) : (
                  /* ✅ لو مسلمش — بيّن الـ upload */
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="file"
                      onChange={e => handleFileChange(a._id, e.target.files?.[0] || null)}
                      className="border p-1 text-sm"
                    />
                    <button
                      onClick={() => handleSubmit(a._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
