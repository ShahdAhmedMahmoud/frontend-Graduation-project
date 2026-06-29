// // "use server";
// // import getMyToken from "@/utilites/getMyToken"


// // export default async function getDoctorCourses(){
// //    let token= await getMyToken();
// // // const token = localStorage.getItem('token');


// //    console.log('token',token);
// //    if(!token){
// //     throw new Error("No token found");
// //    }

// //     let res = await fetch(`http://localhost:5000/api/professors/courses/`,{
// //         method: 'GET',
// //         headers:{
// //             Authorization : `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //         },
// //      });
// //      let data = await res.json();
// //      return data;
// // }


// "use server";
// import getMyToken from "@/utilites/getMyToken";

// export default async function getDoctorCourses() {
//     let token = await getMyToken();
//     console.log('token',token);
//     if (!token) {
//         throw new Error("User not authenticated");
//     }
//    let res = await fetch(`http://localhost:5000/api/professors/courses`,{
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//     });
//     let data = await res.json();
//     return data;
// }

"use server";
import getMyToken from "@/utilites/getMyToken";

export default async function getDoctorCourses() {
    let token = await getMyToken();
    console.log('token',token);
    if (!token) {
        throw new Error("User not authenticated");
    }
   let res = await fetch(`http://localhost:5000/api/professors/courses`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
    });
    let data = await res.json();
    return data;
}