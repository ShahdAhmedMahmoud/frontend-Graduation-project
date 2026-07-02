// "use client";
// import { Mail, Phone, MapPin, BookOpen } from "lucide-react";

// export default function ProfileUI({ user }: any) {
//   const totalCredits = user?.courses?.reduce((sum: number, c: any) => sum + (c.credits || 0), 0) || 0;
//   const initials = user?.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

//   return (
//     <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

//       {/* Header Card */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-center gap-4">
//           {user?.avatar ? (
//             <img
//               src={user.avatar}
//               alt="avatar"
//               className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
//             />
//           ) : (
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
//               <span className="text-white text-xl font-bold">{initials}</span>
//             </div>
//           )}
//           <div className="min-w-0">
//             <h2 className="text-lg sm:text-xl font-semibold dark:text-white truncate">{user?.full_name}</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               ID: {user?.student_id} • Year {user?.year}
//             </p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
//           </div>
//         </div>
//         <span className="self-start sm:self-auto bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-1 rounded-full text-sm whitespace-nowrap">
//           {user?.enrollment_status}
//         </span>
//       </div>

//       {/* Contact Info */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
//         <h3 className="font-semibold mb-4 dark:text-white">Contact Information</h3>
//         <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//           <p className="flex items-center gap-2">
//             <Mail size={16} /> {user?.email}
//           </p>
//           {user?.phone ? (
//             <p className="flex items-center gap-2">
//               <Phone size={16} /> {user.phone}
//             </p>
//           ) : (
//             <p className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
//               <Phone size={16} /> Phone not added yet
//             </p>
//           )}
//           {user?.address ? (
//             <p className="flex items-center gap-2">
//               <MapPin size={16} /> {user.address}
//             </p>
//           ) : (
//             <p className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
//               <MapPin size={16} /> Address not added yet
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Courses */}
//       {user?.courses?.length > 0 && (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
//           <h3 className="font-semibold mb-4 dark:text-white">Enrolled Courses</h3>
//           <div className="space-y-3">
//             {user.courses.map((course: any) => (
//               <div key={course._id} className="flex items-center justify-between border-b dark:border-gray-700 pb-3 last:border-0 last:pb-0">
//                 <div className="flex items-center gap-3 min-w-0">
//                   <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
//                     <BookOpen size={16} className="text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm font-medium dark:text-white truncate">{course.name}</p>
//                     <p className="text-xs text-gray-400">{course.code}</p>
//                   </div>
//                 </div>
//                 <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full flex-shrink-0 ml-2">
//                   {course.credits} cr
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Mail, Phone, MapPin, BookOpen, Camera, Loader2 } from "lucide-react";
import { getAvatarUrl } from "@/lib/getAvatarUrl"; // عدّل المسار حسب مكانه عندك
const API_BASE_URL = "http://localhost:5000/api";

export default function ProfileUI({ user }: any) {
  const { data: session, update } = useSession();
  const token = session?.token as string | undefined;

  const [avatar, setAvatar] = useState<string | null>(getAvatarUrl(user?.avatar));
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalCredits =
    user?.courses?.reduce((sum: number, c: any) => sum + (c.credits || 0), 0) || 0;
  const initials = user?.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // basic validation
    if (!file.type.startsWith("image/")) {
      setErrorMsg("الملف المختار مش صورة.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("حجم الصورة أكبر من 5MB.");
      return;
    }
    setErrorMsg(null);

    // instant local preview
    const localPreviewUrl = URL.createObjectURL(file);
    setAvatar(localPreviewUrl);

    if (!token) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${API_BASE_URL}/students/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // ملاحظة: متضفش Content-Type يدويًا هنا،
          // الـ browser هيحط multipart/form-data + boundary تلقائيًا
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "فشل رفع الصورة");

      // السيرفر بيرجع avatar كمسار نسبي زي /uploads/students/xxx.png
const serverAvatarPath = data.data?.avatar;
if (serverAvatarPath) {
  setAvatar(getAvatarUrl(serverAvatarPath));

  // ✅ يحدّث الـ session لايف من غير logout/login
  await update({ avatar: serverAvatarPath });
}
    } catch (err: any) {
      console.error("Avatar upload error:", err);
      setErrorMsg(err.message || "حصل خطأ أثناء رفع الصورة.");
      setAvatar(getAvatarUrl(user?.avatar));
    } finally {
      setUploading(false);
      // نظّف الـ input عشان لو اختار نفس الملف تاني يشتغل onChange
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">

          {/* Avatar + Camera Button */}
          <div className="relative flex-shrink-0 group">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">{initials}</span>
              </div>
            )}

            {/* Camera overlay button */}
            <button
              type="button"
              onClick={handlePickFile}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-gray-800 transition disabled:opacity-60"
              title="تغيير الصورة الشخصية"
            >
              {uploading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Camera size={12} />
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold dark:text-white truncate">{user?.full_name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {user?.student_id} • Year {user?.year}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            {errorMsg && (
              <p className="text-xs text-red-500 mt-1">{errorMsg}</p>
            )}
          </div>
        </div>
        <span className="self-start sm:self-auto bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-1 rounded-full text-sm whitespace-nowrap">
          {user?.enrollment_status}
        </span>
      </div>

      {/* Contact Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
        <h3 className="font-semibold mb-4 dark:text-white">Contact Information</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center gap-2">
            <Mail size={16} /> {user?.email}
          </p>
          {user?.phone ? (
            <p className="flex items-center gap-2">
              <Phone size={16} /> {user.phone}
            </p>
          ) : (
            <p className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
              <Phone size={16} /> Phone not added yet
            </p>
          )}
          {user?.address ? (
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {user.address}
            </p>
          ) : (
            <p className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
              <MapPin size={16} /> Address not added yet
            </p>
          )}
        </div>
      </div>

      {/* Courses */}
      {user?.courses?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
          <h3 className="font-semibold mb-4 dark:text-white">Enrolled Courses</h3>
          <div className="space-y-3">
            {user.courses.map((course: any) => (
              <div key={course._id} className="flex items-center justify-between border-b dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                    <BookOpen size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium dark:text-white truncate">{course.name}</p>
                    <p className="text-xs text-gray-400">{course.code}</p>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                  {course.credits} cr
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
