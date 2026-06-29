
'use client'
import React from "react";

export default function SubmitionsClient({ submissions }: any) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Submitted Assignments
        </h1>

        <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Submitted At</th>
                <th className="px-6 py-4 font-semibold">File</th>
                <th className="px-6 py-4 font-semibold">Grade</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((s: any) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    {s.student.full_name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {s.student.email}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(s.submitted_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {s.file ? (
                      <a
                        href={`http://localhost:5000${s.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-400">No File</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {submissions.map((s: any) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl shadow-md p-4 space-y-2"
            >
              <div>
                <span className="font-semibold">Name:</span>
                <p>{s.student.full_name}</p>
              </div>

              <div>
                <span className="font-semibold">Email:</span>
                <p className="text-gray-600">{s.student.email}</p>
              </div>

              <div>
                <span className="font-semibold">Submitted:</span>
                <p>{new Date(s.submitted_at).toLocaleString()}</p>
              </div>

              <div>
                <span className="font-semibold">File:</span>
                {s.file ? (
                  <a
                    href={`http://localhost:5000${s.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 underline"
                  >
                    Download
                  </a>
                ) : (
                  <p className="text-gray-400">No File</p>
                )}
              </div>

              <div>
                <span className="font-semibold">Grade:</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
