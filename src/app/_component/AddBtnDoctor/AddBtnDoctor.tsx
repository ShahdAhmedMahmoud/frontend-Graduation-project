'use client'
import addToMyCourses from '@/CardActions/addtoDoctorCourses.action'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner';

export default function AddBtnDoctor({courseId}: {courseId:string}) {

     
    async function checkAddToCourses(courseId:string){
       let res = await addToMyCourses(courseId);
         console.log('res',res);
             if(res.message === "Courses assigned successfully"){
            toast.success("Courses assigned and students updated.",
            {position:"top-center",duration:4000});
         }
            else if(res.message === "All selected courses are already assigned to this professor"){
            toast.success("Courses are already assigned to you.",
            {position:"top-center",duration:4000});
         }
         else{
            toast.error("Error while adding course",
            {position:"top-center",duration:4000});
         }
    }
  return (
    <>
      <Button onClick={()=>checkAddToCourses(courseId)}   className='cursor-pointer'>Assign course </Button>
      
    </>
  )
}


// 'use client'
// import addToMyCourses from '@/CardActions/addtoCart.action'
// import { Button } from '@/components/ui/button'
// import React from 'react'
// import { toast } from 'sonner';

// interface AddBtnProps {
//   courseId: string;
//   index: number;  
// }

// export default function AddBtnDoctor({ courseId, index }: AddBtnProps) {

//   const colors = [
//     "bg-purple-700 hover:bg-purple-800",
//     "bg-blue-700 hover:bg-blue-800",
//     "bg-green-700 hover:bg-green-800",
//     "bg-pink-600 hover:bg-pink-700",
//     "bg-yellow-500 hover:bg-yellow-600",
//     "bg-orange-500 hover:bg-orange-600"
//   ];

//   const btnColor = colors[index % colors.length]; // << اللون حسب الكارد

//   async function checkAddToCourses(id: string){
//     let res = await addToMyCourses(id);

//     if(res.message === "Enrolled successfully"){
//       toast.success("Course added to your enrollment!", {
//         position:"top-center", duration:4000
//       });
//     }
//     else if(res.message === "Already enrolled"){
//       toast.success("Course already in your enrollment!", {
//         position:"top-center", duration:4000
//       });
//     }
//     else{
//       toast.error("Error while adding course", {
//         position:"top-center", duration:4000
//       });
//     }
//   }

//   return (
//     <Button
//       onClick={() => checkAddToCourses(courseId)}
//       className={`
//         w-full py-2 text-sm rounded-xl text-white transition
//         ${btnColor}  /* << اللون هنا */
//       `}
//     >
//       Assign course to doctor
//     </Button>
//   )
// }
