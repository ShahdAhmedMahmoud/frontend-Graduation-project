

// import React from "react";
// import {
//   Calendar,
//   FileSpreadsheet,
//   BookOpen,
//   Wallet,
//   GraduationCap,
//   PenTool,
//   List,
// } from "lucide-react";

// export default function Services() {
//   const services = [
//     // { title: "Schedule", icon: <Calendar size={32} />, href: "/schedule" },
//     // { title: "Attendance", icon: <FileSpreadsheet size={32} />, href: "/attendance" },
//     { title: "Courses", icon: <BookOpen size={32} />, href: "/doctor/doctordashboard/courses" },
//     // { title: "Tuition Fees", icon: <Wallet size={32} />, href: "/fees" },
//     // { title: "Grades", icon: <GraduationCap size={32} />, href: "/dashboard/grades" },
//     { title: "Registration", icon: <PenTool size={32} />, href: "/doctor/doctordashboard/assigncourses" },
//     // { title: "Services", icon: <List size={32} />, href: "/services" },
//   ];

//   return (
//     <div className="w-[85%] mx-auto my-10">
//       <h1 className="text-2xl font-bold mb-6">Services</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {services.map((service, index) => (
//           <a
//             key={index}
//             href={service.href}
//             className="
//               bg-[#eef2ff] 
//               rounded-2xl 
//               h-[140px]
//               shadow
//               flex flex-col items-center justify-center 
//               gap-3
//               transition-all
//               hover:shadow-lg
//               hover:bg-[#e0e7ff]
//             "
//           >
//             <div className="text-blue-700">
//               {service.icon}
//             </div>
//             <h3 className="text-sm font-semibold text-gray-700">
//               {service.title}
//             </h3>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from "react";
import {
  Calendar,
  FileSpreadsheet,
  BookOpen,
  Wallet,
  GraduationCap,
  PenTool,
  List,
  Video,
} from "lucide-react";

export default function Services() {
  const services = [
    { title: "Schedule", icon: <Calendar size={32} />, href: "/doctor/doctordashboard/schedule" },
    // { title: "Attendance", icon: <FileSpreadsheet size={32} />, href: "/attendance" },
    { title: "Courses", icon: <BookOpen size={32} />, href: "/doctor/doctordashboard/courses" },
    // { title: "Tuition Fees", icon: <Wallet size={32} />, href: "/fees" },
    // { title: "Grades", icon: <GraduationCap size={32} />, href: "/dashboard/grades" },
    { title: "Create Meeting", icon: <Video size={32} />, href: "/doctor/doctordashboard/createmeeting" },
    // { title: "Services", icon: <List size={32} />, href: "/services" },
  ];

  return (
    <div className="w-[85%] mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6">Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <a
            key={index}
            href={service.href}
            className="
              bg-[#eef2ff] 
              rounded-2xl 
              h-[140px]
              shadow
              flex flex-col items-center justify-center 
              gap-3
              transition-all
              hover:shadow-lg
              hover:bg-[#e0e7ff]
            "
          >
            <div className="text-blue-700">
              {service.icon}
            </div>
            <h3 className="text-sm font-semibold text-gray-700">
              {service.title}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
}