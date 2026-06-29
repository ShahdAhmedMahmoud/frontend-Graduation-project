"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  UserRound,
} from "lucide-react";

type Course = {
  _id: string;
  name: string;
  code?: string;
  credits?: number;
};

type StudentDetails = {
  _id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  enrollment_status?: string;
  address?: string;
  gender?: string;
  dob?: string;
  student_id?: string;
  year?: number;
  gpa?: number | null;
  createdAt?: string;
  courses?: Course[];
  completedCredits?: number;
  department_id?: { name?: string } | null;
  onboardingPassword?: string | null;
};

type AcademicRecord = {
  _id: string;
  student_id?: { _id?: string };
  course_id?: { _id?: string; name?: string; code?: string };
  grade?: string;
  semester?: string;
  year?: number;
};

const API_BASE_URL = "http://localhost:5000/api";

function getStatusTone(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-50 text-emerald-600";
    case "graduated":
      return "bg-blue-50 text-blue-600";
    case "inactive":
      return "bg-amber-50 text-amber-700";
    case "suspended":
      return "bg-rose-50 text-rose-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(value?: string) {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getAge(value?: string) {
  if (!value) return "N/A";
  const dob = new Date(value);
  if (Number.isNaN(dob.getTime())) return "N/A";

  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
}

function getGradeLabel(year?: number) {
  if (!year) return "Not assigned";
  const suffix = year === 1 ? "st" : year === 2 ? "nd" : year === 3 ? "rd" : "th";
  return `${year}${suffix} Year`;
}

const tabs = [
  "Personal Information",
  "Academic Records",
  "Activities & Clubs",
] as const;

export default function AdminStudentDetailsClient({
  studentId,
}: {
  studentId: string;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [records, setRecords] = useState<AcademicRecord[]>([]);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Personal Information");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }

    async function fetchStudentDetails() {
      if (!studentId || !session?.token) return;

      try {
        setLoading(true);
        setError("");

        const [studentRes, recordsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/students/${studentId}`, {
            headers: {
              Authorization: `Bearer ${session.token}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }),
          fetch(`${API_BASE_URL}/records`, {
            cache: "no-store",
          }),
        ]);

        const studentData = await studentRes.json();
        const recordsData = await recordsRes.json();

        if (!studentRes.ok || !studentData.success) {
          throw new Error(studentData.message || "Failed to fetch student details");
        }

        setStudent(studentData.data);

        const filteredRecords = Array.isArray(recordsData)
          ? recordsData.filter((record: AcademicRecord) => record.student_id?._id === studentId)
          : [];

        setRecords(filteredRecords);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchStudentDetails();
    }
  }, [router, session?.token, status, studentId]);

  const timelineItems = useMemo(() => {
    if (!student) return [];

    return [
      {
        title: `Current Year - ${getGradeLabel(student.year)}`,
        subtitle: student.department_id?.name || "Department not assigned",
      },
      {
        title: "Enrolled",
        subtitle: formatDate(student.createdAt),
      },
    ];
  }, [student]);

  if (loading) {
    return <div className="h-96 animate-pulse rounded-3xl bg-white" />;
  }

  if (error || !student) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
        {error || "Student not found"}
      </div>
    );
  }

  const statusLabel = student.enrollment_status || "Unknown";
  const age = getAge(student.dob);
  const gpa = typeof student.gpa === "number" ? student.gpa.toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/admindashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Students
        </Link>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            <Pencil size={14} />
            Edit
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700">
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      <section className="rounded-3xl border border-gray-200 bg-white px-6 py-7 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-2xl font-semibold text-slate-700">
              {student.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={student.avatar} alt={student.full_name} className="h-full w-full object-cover" />
              ) : (
                initials(student.full_name)
              )}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold text-gray-900">{student.full_name}</h1>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusTone(statusLabel)}`}>
                  {statusLabel.toLowerCase()}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <Mail size={14} />
                  {student.email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone size={14} />
                  {student.phone || "No phone"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={14} />
                  Age {age}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active ? "bg-slate-900 text-white" : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === "Personal Information" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>

            <div className="mt-6 space-y-5 text-sm">
              <div>
                <p className="text-gray-400">Email Address</p>
                <p className="mt-1 font-medium text-gray-900">{student.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Phone Number</p>
                <p className="mt-1 font-medium text-gray-900">{student.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-400">Address</p>
                <p className="mt-1 font-medium text-gray-900">{student.address || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-400">Department</p>
                <p className="mt-1 font-medium text-gray-900">{student.department_id?.name || "Not assigned"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>

            <div className="mt-6 grid gap-5 text-sm md:grid-cols-2">
              <div>
                <p className="text-gray-400">Date of Birth</p>
                <p className="mt-1 font-medium text-gray-900">{formatDate(student.dob)}</p>
              </div>
              <div>
                <p className="text-gray-400">Age</p>
                <p className="mt-1 font-medium text-gray-900">{age} years old</p>
              </div>
              <div>
                <p className="text-gray-400">Gender</p>
                <p className="mt-1 font-medium text-gray-900">{student.gender || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-400">Grade Level</p>
                <p className="mt-1 font-medium text-gray-900">{getGradeLabel(student.year)}</p>
              </div>
              <div>
                <p className="text-gray-400">Enrollment Date</p>
                <p className="mt-1 font-medium text-gray-900">{formatDate(student.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-400">Student ID</p>
                <p className="mt-1 font-medium text-gray-900">{student.student_id || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-400">Initial Login Password</p>
                <p className="mt-1 font-medium text-gray-900">{student.onboardingPassword || "Not available"}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === "Academic Records" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-gray-900">
              <BookOpen size={16} />
              <h2 className="text-lg font-semibold">Academic Performance</h2>
            </div>

            <div className="mt-8 text-center">
              <p className="text-5xl font-semibold text-gray-900">{gpa}</p>
              <p className="mt-2 text-sm text-gray-400">Current GPA</p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-medium text-gray-500">Current Subjects</h3>

              <div className="mt-4 space-y-3">
                {(student.courses || []).length > 0 ? (
                  (student.courses || []).map((course) => {
                    const record = records.find((item) => item.course_id?._id === course._id);

                    return (
                      <div
                        key={course._id}
                        className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-sm"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <p className="text-xs text-gray-400">{course.code || "Course"}</p>
                        </div>
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                          {record?.grade || "In progress"}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400">No courses assigned yet.</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Academic Timeline</h2>

            <div className="mt-6 space-y-6">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative pl-6">
                  <span className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-slate-900" : "bg-gray-200"}`} />
                  {index !== timelineItems.length - 1 && (
                    <span className="absolute left-[4px] top-4 h-12 w-px bg-gray-200" />
                  )}
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="mt-1 text-xs text-gray-400">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "Activities & Clubs" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Student Snapshot</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Completed Credits</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{student.completedCredits || 0}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Enrolled Courses</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{student.courses?.length || 0}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Engagement Notes</h2>
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
              <div className="flex items-start gap-3">
                <UserRound size={18} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">Activity tracking placeholder</p>
                  <p className="mt-1">
                    This area is ready for clubs, activities, or behavior notes once those APIs are connected.
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 text-gray-400">
                    <MapPin size={14} />
                    Current address: {student.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
