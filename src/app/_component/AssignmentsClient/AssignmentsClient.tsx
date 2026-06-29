
// 'use client'

// import uploadAssignment from "@/CardActions/addAssignment.action";
// import { useState } from "react";

// export default function CreateAssignmentForm({ courseId }: { courseId: string }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) return alert("Please select file");
//     if (!courseId) return alert("Course ID Missing");
//     if (!title || !deadline) return alert("Title and deadline are required");

//     try {
//       await uploadAssignment(courseId, file, title, description, deadline);
//       alert("Assignment uploaded successfully");
//       setTitle(""); setDescription(""); setDeadline(""); setFile(null);
//     } catch (err: any) {
//       console.error(err);
//       alert(err.message || "Error uploading assignment");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">

//       <input
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <input
//         type="date"
//         value={deadline}
//         onChange={(e) => setDeadline(e.target.value)}
//       />

//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />

//       <button type="submit">
//         Upload Assignment
//       </button>
//     </form>
//   );
// }

'use client'

import uploadAssignment from "@/CardActions/addAssignment.action";
import { CalendarDays, FileUp, Type, AlignLeft, Upload } from "lucide-react";
import { useRef, useState } from "react";

export default function CreateAssignmentForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(""); setError("");

    if (!file) return setError("Please select a file");
    if (!courseId) return setError("Course ID missing");
    if (!title || !deadline) return setError("Title and deadline are required");

    try {
      setLoading(true);
      await uploadAssignment(courseId, file, title, description, deadline);
      setSuccess("Assignment uploaded successfully");
      setTitle(""); setDescription(""); setDeadline(""); setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error uploading assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Assignment</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to create a new assignment for this course.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Type size={15} className="text-blue-500" />
            Assignment Title
          </label>
          <input
            placeholder="e.g. Chapter 3 Exercises"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <AlignLeft size={15} className="text-blue-500" />
            Description <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            placeholder="Describe the assignment requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition resize-none"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <CalendarDays size={15} className="text-blue-500" />
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FileUp size={15} className="text-blue-500" />
            Attachment
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl px-4 py-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
          >
            <Upload size={22} className="mx-auto mb-2 text-gray-300 dark:text-gray-500 group-hover:text-blue-400 transition-colors" />
            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
              {file ? file.name : "Click to upload a file"}
            </p>
            {!file && <p className="text-xs text-gray-300 dark:text-gray-500 mt-1">PDF, DOC, DOCX, ZIP (max 20MB)</p>}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gray-900 dark:bg-blue-600 text-white text-sm font-semibold py-3 hover:bg-gray-800 dark:hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          {loading ? "Uploading..." : "Upload Assignment"}
        </button>
      </form>
    </div>
  );
}