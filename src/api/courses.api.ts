// export default async function getCourses(){
//      let res =  await fetch(`http://localhost:5000/api/courses`,{
//         method:"GET",
//         // cache : "no-store", //SSR
//         // cache : "force-cache", //SSG
//         next:{revalidate:60}, //ISR
//      });
//    let data = await res.json();
// //    console.log(data);
//     return data;

// }

export default async function getCourses(){
  let res = await fetch(`http://localhost:5000/api/courses`, {
    next: { revalidate: 60 },
  });
  let data = await res.json();
  console.log(data); // شوفي شكله في الـ terminal
  return data.data ?? data; // لو فيه data جوا data، رجعيها
}
