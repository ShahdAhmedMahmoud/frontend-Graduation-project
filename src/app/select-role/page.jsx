"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import img from "../../../public/images/fa1983bb403b6d42ca42215836b94c03d5f62e5e.png";

export default function SelectRole() {
  const roles = [
    { name: "Student", icon: faUserGraduate, href: "/login" },
    { name: "Instructor", icon: faChalkboardTeacher, href: "/doctor/login" },
    { name: "Admin", icon: faUserCheck, href: "/admin/login" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 bg-white">
      {/* Left Side - Role Selection */}
      <div className="flex flex-col items-center text-center md:w-1/2 space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-600">
          Select Your Role
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {roles.map((role, index) => (
            <Link
              key={index}
              href={role.href}
              className="flex flex-col items-center border border-blue-200 rounded-2xl p-6 w-36 hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer"
            >
              <FontAwesomeIcon
                icon={role.icon}
                className="text-blue-600 text-4xl mb-3"
              />
              <span className="text-blue-600 font-medium">{role.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="md:w-1/2 flex justify-center">
        <Image
          src={img}
          alt="Select role illustration"
          width={400}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}
