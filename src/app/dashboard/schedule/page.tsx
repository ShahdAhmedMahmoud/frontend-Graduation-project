// import React from "react";
// import Timetable from "../../_component/Timetable/Timetable";

// export default function SchedulePage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-xl font-bold text-gray-800">Schedule</h1>
//         <p className="mt-1 text-sm text-gray-500">Your weekly class timetable.</p>
//       </div>

//       <Timetable />
//     </div>
//   );
// }
import React from "react";
import Timetable from "../../_component/Timetable/Timetable";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Schedule</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your weekly class timetable.</p>
      </div>

      <Timetable />
    </div>
  );
}

