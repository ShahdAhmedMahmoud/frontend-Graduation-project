// import React from 'react'

// import getCourses from '@/api/courses.api'
// import SingleProduct from '@/app/_component/SingleProduct/SingleProduct';
// import SingleCourse from '@/app/_component/SingleCourse/SingleCourse';

// export default async function AssignCourses() {
//   let data = await getCourses();
  
   
//   return (
//     <>
//     <div className="container w-[80%] mx-auto my-12">
//         <div className="flex flex-wrap ">
//          {data.map((course)=><div className='w-full lg:w-1/2  ' key={course._id}>
//          <SingleCourse course={course}/>

//     </div>)}
//     </div>
//     </div>
  
 
      
//     </>
//   )
// }

import React from 'react'
import getCourses from '@/api/courses.api'
import SingleProduct from '@/app/_component/SingleProduct/SingleProduct';
import SingleCourse from '@/app/_component/SingleCourse/SingleCourse';

export default async function AssignCourses() {
  let data = await getCourses();

  return (
  <>
        <h1 className="text-2xl font-bold mb-6">courses</h1>
    <div className="container w-[95%] mx-auto my-12">


      {/* GRID بدلاً من FLEX */}
      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3 
        gap-8
       
      ">
        {data.map((course, index) => (
          <SingleCourse 
            key={course._id} 
            course={course} 
            index={index}   // <<==== مهم جداً 
          />
        ))}
      </div>

    </div>
  </>
  );
}