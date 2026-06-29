// // import { NextAuthOptions } from "next-auth";
// // import Credentials from "next-auth/providers/credentials";
// // import {jwtDecode} from "jwt-decode"

// // export const authOptions : NextAuthOptions ={
// //     pages:{
// //         signIn:"/login",
        


// //     },
// //     providers:[
// //         Credentials({
// //             name:'Credentials',
// //             credentials:{
// //                 email:{},
// //                 password:{}
// //             },
// //             authorize :async (credentials) => {
// //                 let res = await fetch(`http://localhost:5000/api/students/login`,{
// //                     method:"POST",
// //                     body:JSON.stringify({
// //                         email :credentials?.email,
// //                         password:credentials?.password
// //                     }),
// //                     headers:{"Content-Type": "application/json"},
// //                 });

// //                 let payload = await res.json();
// //                 console.log("payload",payload);
// //                 // return null;
// //                 if(payload.message === 'Login successful'){
// //                     const decodeToken: {id:string} = jwtDecode(payload.token);
// //                     // console.log("decode",decode);
                    
// //                     return {
// //                         id:decodeToken.id,
// //                         // id:payload.student.id,
// //                         student: payload.student,
// //                         token:payload.token,
// //                     };
// //                 }
// //                 else {
// //                     throw new Error(payload.message || "wrong credentials")
// //                 }
// //             },
// //         }),
// //     ],
// // // ال callbacks بتشتغل لما ال user يعمل login بنجاح
// //      callbacks:{
// //          async jwt({ token, user }) {
// //         if (user) {
// //             //encrypted data
// //             token.user = user?.student; // object {id, full_name, email, enrollment_status}
// //             token.token = user?.token;// jwt token from backend
// //         }
// //             return token; // object{user:..., token:...} encrypted ==> can access only on server side
// //     },
// //      async session({ session,  token }) {
// //         session.user = token.user;
// //         return session;
// //     },
// //     },

// // };


// // auth.ts
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwtDecode from "jwt-decode";




// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/login", // default login page (student or doctor can redirect)
    
//   },
//   providers: [
//     // ===== Student Provider =====
//     Credentials({
//       id: "student-credentials",
//       name: "Student Credentials",
//       credentials: { email: {}, password: {} },
//       authorize: async (credentials) => {
//         const res = await fetch(`http://localhost:5000/api/students/login`, {
//           method: "POST",
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//           headers: { "Content-Type": "application/json" },
//         });

//         const payload = await res.json();
//         if (payload.message === "Login successful") {
//           const decodeToken: { id: string } = jwtDecode(payload.token);
//           return {
//             id: decodeToken.id,
//             student: payload.student, // {id, full_name, email, enrollment_status, ...}
//             token: payload.token,
//           };
//         } else {
//           throw new Error(payload.message || "Wrong credentials");
//         }
//       },
//     }),

//     // ===== Doctor Provider =====
//     Credentials({
//       id: "doctor-credentials",
//       name: "Doctor Credentials",
//       credentials: { email: {}, password: {} },
//       authorize: async (credentials) => {
//         const res = await fetch(`http://localhost:5000/api/professors/login`, {
//           method: "POST",
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//           headers: { "Content-Type": "application/json" },
//         });

//         const payload = await res.json();
//         console.log("doctor payload", payload);
//         // return null;
//         // return payload;
//         if (payload.message === "Login successful") {
//             // return payload;

//           const decodeToken: { id: string } = jwtDecode(payload.token);
//           return {
//             id: decodeToken.id,
//             professor: payload.professor, // {id, name, email, departments, courses}
//             token: payload.token,
//           };
//         } else {
//           throw new Error(payload.message || "Wrong credentials");
         
//         }
//       },
//     }),

//     // ===== Admin Provider =====
// Credentials({
//   id: "admin-credentials",
//   name: "Admin Credentials",
//   credentials: { email: {}, password: {} },
//   authorize: async (credentials) => {
//     const res = await fetch(`http://localhost:5000/api/admin/login`, {
//       method: "POST",
//       body: JSON.stringify({
//         email: credentials?.email,
//         password: credentials?.password,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });


//     const payload = await res.json();
//     console.log("admin payload", payload);
//     if (payload.success === true) {
//       const decodeToken: { id: string } = jwtDecode(payload.data.token);
//       return {
//         id: decodeToken.id,
//         admin: payload.data.admin, // {id, name, email, role, ...}
//         token: payload.data.token,
//       };
//     } else {
//       throw new Error(payload.message || "Wrong credentials");
//     }
//   },
// }),

//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       // تخزين بيانات الـ user في الـ token
//       if (user?.student) {
//         token.user = user.student;
//         token.token = user.token;
//       } else if (user?.professor) {
//         token.user = user.professor;
//         token.token = user.token;
//       } else if (user?.admin) {
//         token.user = user.admin;
//         token.token = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // تخزين بيانات الـ user في الـ session
//       // session.user = token.user;
//       session.user = token.user as any;

//       return session;
//     },
//   },
// };

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    // student
    Credentials({
      id: "student-credentials",
      name: "Student Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const res = await fetch(`http://localhost:5000/api/students/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await res.json();
        
        if (payload.message === "Login successful") {
          const decodeToken: { id: string } = jwtDecode(payload.token);
          return {
            id: decodeToken.id,
            student: payload.student,
            token: payload.token,
          };
        }
        throw new Error(payload.message);
      },
    }),

    // doctor
    Credentials({
      id: "doctor-credentials",
      name: "Doctor Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const res = await fetch(`http://localhost:5000/api/professors/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await res.json();
        console.log("Doctor login payload:", JSON.stringify(payload, null, 2));
        if (payload.message === "Login successful") {
          const decodeToken: { id: string } = jwtDecode(payload.token);
          return {
            id: decodeToken.id,
            professor: payload.professor,
            token: payload.token,
          };
        }
        throw new Error(payload.message);
      },
    }),

    // admin
    Credentials({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const res = await fetch(`http://localhost:5000/api/admin/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await res.json();
        if (payload.success === true) {
          const decodeToken: { id: string } = jwtDecode(payload.data.token);
          return {
            id: decodeToken.id,
            admin: payload.data.admin,
            token: payload.data.token,
          };
        }
        throw new Error(payload.message);
      },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.user = user.student || user.professor || user.admin;
  //       token.token = user.token;
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     session.user = token.user;
  //     session.token = token.token; // مهم جدًا
  //     return session;
  //   },
  // },

  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = user.student || user.professor || user.admin ;
      token.token = user.token;
    }
    return token;
  },

  // async session({ session, token }) {
  //   session.user = token.user ?? null;
  //   session.token = token.token;
  //   return session;
  // }

  async session({ session, token }) {
  session.user = token.user;
  session.token = token.token;
  return session;
}



}

};

