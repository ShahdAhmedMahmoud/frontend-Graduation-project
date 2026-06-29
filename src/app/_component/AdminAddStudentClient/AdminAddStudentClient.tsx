// "use client";

// import type { FormEvent, InputHTMLAttributes, ReactNode } from "react";
// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { ArrowLeft, Loader2, Save, X } from "lucide-react";
// import { toast } from "sonner";

// const API_BASE_URL = "http://localhost:5000/api";

// type FormState = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   dob: string;
//   year: string;
//   enrollment_status: string;
//   gpa: string;
//   address: string;
//   emergency_contact: string;
//   enrollment_date: string;
//   avatar: string;
// };

// const initialForm: FormState = {
//   first_name: "",
//   last_name: "",
//   email: "",
//   phone: "",
//   dob: "",
//   year: "1",
//   enrollment_status: "Active",
//   gpa: "",
//   address: "",
//   emergency_contact: "",
//   enrollment_date: "",
//   avatar: "",
// };

// function getInitials(firstName: string, lastName: string) {
//   return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "ST";
// }

// function FieldLabel({ children }: { children: ReactNode }) {
//   return <label className="mb-2 block text-sm font-medium text-gray-700">{children}</label>;
// }

// function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <input
//       {...props}
//       className={`w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100 ${props.className || ""}`}
//     />
//   );
// }

// export default function AdminAddStudentClient() {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   const [form, setForm] = useState<FormState>(initialForm);
//   const [isSaving, setIsSaving] = useState(false);
//   const [temporaryPassword, setTemporaryPassword] = useState("");
//   const [createdStudentName, setCreatedStudentName] = useState("");

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/admin/login");
//     }
//   }, [router, status]);

//   const previewInitials = useMemo(
//     () => getInitials(form.first_name.trim(), form.last_name.trim()),
//     [form.first_name, form.last_name]
//   );

//   function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
//     setForm((current) => ({ ...current, [key]: value }));
//   }

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (!session?.token) {
//       toast.error("Admin session not found", { position: "top-center", duration: 3000 });
//       router.push("/admin/login");
//       return;
//     }

//     if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
//       toast.error("First name, last name, and email are required", {
//         position: "top-center",
//         duration: 3000,
//       });
//       return;
//     }

//     try {
//       setIsSaving(true);
//       setTemporaryPassword("");

//       const response = await fetch(`${API_BASE_URL}/admin/students`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.token}`,
//         },
//         body: JSON.stringify({
//           first_name: form.first_name.trim(),
//           last_name: form.last_name.trim(),
//           email: form.email.trim(),
//           phone: form.phone.trim() || undefined,
//           dob: form.dob || undefined,
//           year: Number(form.year) || 1,
//           enrollment_status: form.enrollment_status,
//           gpa: form.gpa ? Number(form.gpa) : undefined,
//           address: form.address.trim() || undefined,
//           emergency_contact: form.emergency_contact.trim() || undefined,
//           enrollment_date: form.enrollment_date || undefined,
//           avatar: form.avatar.trim() || undefined,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to create student");
//       }

//       setCreatedStudentName(data.data?.student?.full_name || "");
//       setTemporaryPassword(data.data?.temporaryPassword || "");
//       toast.success("Student created successfully", { position: "top-center", duration: 3000 });
//       setForm(initialForm);
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : "Something went wrong", {
//         position: "top-center",
//         duration: 3000,
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   if (status === "unauthenticated") {
//     return null;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between gap-4">
//         <Link
//           href="/admin/admindashboard"
//           className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-slate-900"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </Link>

//         <div className="flex items-center gap-2">
//           <Link
//             href="/admin/admindashboard"
//             className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//           >
//             <X size={14} />
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             form="add-student-form"
//             disabled={isSaving}
//             className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
//             Save Student
//           </button>
//         </div>
//       </div>

//       <div>
//         <h1 className="text-3xl font-semibold text-gray-900">Add New Student</h1>
//       </div>

//       {temporaryPassword && (
//         <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
//           Temporary password for {createdStudentName || "the student"}:{" "}
//           <span className="font-semibold">{temporaryPassword}</span>
//         </div>
//       )}

//       <form id="add-student-form" onSubmit={handleSubmit} className="space-y-5">
//         <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-900">Profile Picture</h2>

//           <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center">
//             <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-sm font-semibold text-slate-700">
//               {form.avatar ? (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img src={form.avatar} alt="Student avatar preview" className="h-full w-full object-cover" />
//               ) : (
//                 previewInitials
//               )}
//             </div>

//             <div className="flex-1">
//               <FieldLabel>Profile Image URL</FieldLabel>
//               <TextInput
//                 type="url"
//                 placeholder="https://images.unsplash.com/..."
//                 value={form.avatar}
//                 onChange={(e) => updateField("avatar", e.target.value)}
//               />
//             </div>
//           </div>
//         </section>

//         <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

//           <div className="mt-5 grid gap-5 md:grid-cols-2">
//             <div>
//               <FieldLabel>First Name *</FieldLabel>
//               <TextInput
//                 value={form.first_name}
//                 onChange={(e) => updateField("first_name", e.target.value)}
//                 placeholder="Rawan"
//               />
//             </div>
//             <div>
//               <FieldLabel>Last Name *</FieldLabel>
//               <TextInput
//                 value={form.last_name}
//                 onChange={(e) => updateField("last_name", e.target.value)}
//                 placeholder="Gamal"
//               />
//             </div>
//             <div>
//               <FieldLabel>Email Address *</FieldLabel>
//               <TextInput
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => updateField("email", e.target.value)}
//                 placeholder="student@example.com"
//               />
//             </div>
//             <div>
//               <FieldLabel>Phone Number</FieldLabel>
//               <TextInput
//                 value={form.phone}
//                 onChange={(e) => updateField("phone", e.target.value)}
//                 placeholder="01143198840"
//               />
//             </div>
//             <div>
//               <FieldLabel>Date of Birth</FieldLabel>
//               <TextInput
//                 type="date"
//                 value={form.dob}
//                 onChange={(e) => updateField("dob", e.target.value)}
//               />
//             </div>
//             <div>
//               <FieldLabel>Grade *</FieldLabel>
//               <select
//                 value={form.year}
//                 onChange={(e) => updateField("year", e.target.value)}
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
//               >
//                 <option value="1">1st Year</option>
//                 <option value="2">2nd Year</option>
//                 <option value="3">3rd Year</option>
//                 <option value="4">4th Year</option>
//                 <option value="5">5th Year</option>
//               </select>
//             </div>
//             <div>
//               <FieldLabel>GPA</FieldLabel>
//               <TextInput
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="4"
//                 value={form.gpa}
//                 onChange={(e) => updateField("gpa", e.target.value)}
//                 placeholder="3.7"
//               />
//             </div>
//             <div>
//               <FieldLabel>Status</FieldLabel>
//               <select
//                 value={form.enrollment_status}
//                 onChange={(e) => updateField("enrollment_status", e.target.value)}
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//                 <option value="Graduated">Graduated</option>
//                 <option value="Suspended">Suspended</option>
//               </select>
//             </div>
//           </div>
//         </section>

//         <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>

//           <div className="mt-5 grid gap-5">
//             <div>
//               <FieldLabel>Address</FieldLabel>
//               <textarea
//                 value={form.address}
//                 onChange={(e) => updateField("address", e.target.value)}
//                 placeholder="4 شارع المدينة المنورة حدائق القبة"
//                 rows={4}
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
//               />
//             </div>

//             <div className="grid gap-5 md:grid-cols-2">
//               <div>
//                 <FieldLabel>Emergency Contact</FieldLabel>
//                 <TextInput
//                   value={form.emergency_contact}
//                   onChange={(e) => updateField("emergency_contact", e.target.value)}
//                   placeholder="Mama - 01123456789"
//                 />
//               </div>
//               <div>
//                 <FieldLabel>Enrollment Date</FieldLabel>
//                 <TextInput
//                   type="date"
//                   value={form.enrollment_date}
//                   onChange={(e) => updateField("enrollment_date", e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
//       </form>
//     </div>
//   );
// }


"use client";

import type { FormEvent, InputHTMLAttributes, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:5000/api";

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  year: string;
  enrollment_status: string;
  gpa: string;
  address: string;
  emergency_contact: string;
  enrollment_date: string;
  avatar: string;
};

const initialForm: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  dob: "",
  year: "1",
  enrollment_status: "Active",
  gpa: "",
  address: "",
  emergency_contact: "",
  enrollment_date: "",
  avatar: "",
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "ST";
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {children}
    </label>
  );
}

function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition focus:border-slate-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-slate-100 dark:focus:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${props.className || ""}`}
    />
  );
}

export default function AdminAddStudentClient() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState<FormState>(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [createdStudentName, setCreatedStudentName] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [router, status]);

  const previewInitials = useMemo(
    () => getInitials(form.first_name.trim(), form.last_name.trim()),
    [form.first_name, form.last_name]
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session?.token) {
      toast.error("Admin session not found", { position: "top-center", duration: 3000 });
      router.push("/admin/login");
      return;
    }

    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
      toast.error("First name, last name, and email are required", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSaving(true);
      setTemporaryPassword("");

      const response = await fetch(`${API_BASE_URL}/admin/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          dob: form.dob || undefined,
          year: Number(form.year) || 1,
          enrollment_status: form.enrollment_status,
          gpa: form.gpa ? Number(form.gpa) : undefined,
          address: form.address.trim() || undefined,
          emergency_contact: form.emergency_contact.trim() || undefined,
          enrollment_date: form.enrollment_date || undefined,
          avatar: form.avatar.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create student");
      }

      setCreatedStudentName(data.data?.student?.full_name || "");
      setTemporaryPassword(data.data?.temporaryPassword || "");
      toast.success("Student created successfully", { position: "top-center", duration: 3000 });
      setForm(initialForm);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/admindashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/admindashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <X size={14} />
            Cancel
          </Link>
          <button
            type="submit"
            form="add-student-form"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 dark:bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Student
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Add New Student</h1>
      </div>

      {temporaryPassword && (
        <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-5 py-4 text-sm text-emerald-700 dark:text-emerald-400">
          Temporary password for {createdStudentName || "the student"}:{" "}
          <span className="font-semibold">{temporaryPassword}</span>
        </div>
      )}

      <form id="add-student-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Picture */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Picture</h2>

          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/40 dark:to-indigo-900/40 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {form.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.avatar} alt="Student avatar preview" className="h-full w-full object-cover" />
              ) : (
                previewInitials
              )}
            </div>

            <div className="flex-1">
              <FieldLabel>Profile Image URL</FieldLabel>
              <TextInput
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={form.avatar}
                onChange={(e) => updateField("avatar", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel>First Name *</FieldLabel>
              <TextInput
                value={form.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
                placeholder="Rawan"
              />
            </div>
            <div>
              <FieldLabel>Last Name *</FieldLabel>
              <TextInput
                value={form.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
                placeholder="Gamal"
              />
            </div>
            <div>
              <FieldLabel>Email Address *</FieldLabel>
              <TextInput
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="student@example.com"
              />
            </div>
            <div>
              <FieldLabel>Phone Number</FieldLabel>
              <TextInput
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="01143198840"
              />
            </div>
            <div>
              <FieldLabel>Date of Birth</FieldLabel>
              <TextInput
                type="date"
                value={form.dob}
                onChange={(e) => updateField("dob", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Grade *</FieldLabel>
              <select
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition focus:border-slate-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-slate-100 dark:focus:ring-gray-600"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </select>
            </div>
            <div>
              <FieldLabel>GPA</FieldLabel>
              <TextInput
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={form.gpa}
                onChange={(e) => updateField("gpa", e.target.value)}
                placeholder="3.7"
              />
            </div>
            <div>
              <FieldLabel>Status</FieldLabel>
              <select
                value={form.enrollment_status}
                onChange={(e) => updateField("enrollment_status", e.target.value)}
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition focus:border-slate-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-slate-100 dark:focus:ring-gray-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>

          <div className="mt-5 grid gap-5">
            <div>
              <FieldLabel>Address</FieldLabel>
              <textarea
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="4 شارع المدينة المنورة حدائق القبة"
                rows={4}
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition focus:border-slate-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-slate-100 dark:focus:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <FieldLabel>Emergency Contact</FieldLabel>
                <TextInput
                  value={form.emergency_contact}
                  onChange={(e) => updateField("emergency_contact", e.target.value)}
                  placeholder="Mama - 01123456789"
                />
              </div>
              <div>
                <FieldLabel>Enrollment Date</FieldLabel>
                <TextInput
                  type="date"
                  value={form.enrollment_date}
                  onChange={(e) => updateField("enrollment_date", e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}


