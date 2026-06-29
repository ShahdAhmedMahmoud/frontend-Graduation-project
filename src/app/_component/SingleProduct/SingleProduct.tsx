
import React from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { MoreVertical, GraduationCap } from "lucide-react";
import AddBtn from '../AddBtn/AddBtn';

export default async function SingleProduct({ course, index }) {

  const colors = [
    "bg-purple-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-pink-200",
    "bg-yellow-200",
    "bg-orange-200"
  ];

  const cardColor = colors[index % colors.length];

  // ألوان الدوائر مختلفة
  const circleColors = [
    ["#8f00ff", "#e0b6ff"],
    ["#1e40af", "#93c5fd"],
    ["#047857", "#6ee7b7"],
    ["#be185d", "#f9a8d4"],
    ["#b45309", "#fcd34d"],
    ["#c2410c", "#fdba74"]
  ];

  const [circleStart, circleEnd] = circleColors[index % circleColors.length];

  return (
    <Card
      className={`
        relative w-[240px] h-[280px]
        p-4 rounded-2xl shadow-md 
        hover:shadow-lg transition-all 
        cursor-pointer 
        ${cardColor}
        flex flex-col justify-between
      `}
    >

      <div>
        {/* Three Dots Icon */}
        <div className="absolute top-3 right-3 text-gray-700">
          <MoreVertical size={20} />
        </div>

        {/* Graduation icon */}
        <div className="absolute top-3 left-3 text-gray-700">
          <GraduationCap size={20} />
        </div>

        <Link href={`/dashboard/courses/${course._id}`}>
          <div className="flex flex-col gap-2 mt-6">

            <h2 className="text-lg font-semibold">{course.name}</h2>

            <p className="text-gray-700 -mt-1 text-sm">
              Dr. {course.department?.doctor || "Unknown"}
            </p>

            {/* Circle Progress بلون مختلف */}
            <div className="flex justify-center my-2">
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  background: `conic-gradient(
                    ${circleStart} 0deg 70deg,
                    ${circleEnd} 70deg 360deg
                  )`
                }}
              ></div>
            </div>

          </div>
        </Link>

        {/* Bottom info */}
        <div className="flex justify-between mt-1 text-xs text-gray-700">
         
<span>{course.department?.dept_name ?? "—"}</span>
<span>{course.department?.office_location ?? "—"}</span>
        </div>
      </div>

      {/* Add button داخل الكارد */}
      <div className="mt-2">
        {/* <AddBtn courseId={course._id} /> */}
        <AddBtn courseId={course._id} index={index} />

      </div>

    </Card>
  );
}

