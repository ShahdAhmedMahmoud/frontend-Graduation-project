// import NextAuth , {User} from "next-auth"
// import { JWT } from "next-auth/jwt"


// declare module "next-auth" {
//   interface User {
//     student?: {
//       id: string;
//       full_name: string;
//       email: string;
//       enrollment_status: string;
//       student_id: string;
//       courses: string[];
//       professors: string[];
//       assistants: string[];
//     };
//     professor?: {
//       id: string;
//       name: string;
//       email: string;
//       departments: string[];
//       courses: string[];
//     };
//     admin?: {
//       id: string;
//       full_name: string;
//       email: string;
//       role?: "admin";
//     };
//     token: string;
//   }
  
//   interface Session {
//     user: User['student'] | User['professor'] | User['admin'];
//   }
// }
// declare module "next-auth/jwt" {

//   interface JWT extends User {
   
//     idToken?: string
//   }
// }

// // next-auth.d.ts
// // import NextAuth from "next-auth";

// // declare module "next-auth" {
// //   interface Session {
// //     user: {
// //       id: string;
// //       token: string;
// //       student?: {
// //         id: string;
// //         full_name: string;
// //         email: string;
// //         enrollment_status: string;
// //         student_id: string;
// //         courses: string[];
// //         professors: string[];
// //         assistants: string[];
// //       };
// //       professor?: {
// //         id: string;
// //         name: string;
// //         email: string;
// //         departments: string[];
// //         courses: any[];
// //       };
// //     };
// //   }

// //   interface User {
// //     student?: any;
// //     professor?: any;
// //     token: string;
// //   }
// // }

// // declare module "next-auth/jwt" {
// //   interface JWT {
// //     user?: any;
// //     token?: string;
// //   }
// // }


import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

/* ===========================
   1) Define Custom User Types
   =========================== */
export interface StudentUser {
  id: string;
  full_name: string;
  email: string;
  enrollment_status: string;
  student_id: string;
  courses: string[];
  professors: string[];
  assistants: string[];
  department: string,
  year: number,
  avatar: string
}

export interface ProfessorUser {
  id: string;
  name: string;
  email: string;
  departments: string[];
  courses: string[];
}

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: "admin";
}

/* ===========================
   2) Extend NextAuth User
   =========================== */
// declare module "next-auth" {
//   interface User {
//     student?: StudentUser;
//     professor?: ProfessorUser;
//     admin?: AdminUser;
//     token: string;
//   }

//   interface Session {
//     user: StudentUser | ProfessorUser | AdminUser | null;
//     token?: string;
//   }
// }

declare module "next-auth" {
  interface User {
    student?: StudentUser;
    professor?: ProfessorUser;
    admin?: AdminUser;
    token: string;
  }

  interface Session {
    user?: StudentUser | ProfessorUser | AdminUser;
    token?: string;
  }
}



/* ===========================
   3) Extend JWT Token
   =========================== */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: StudentUser | ProfessorUser | AdminUser;
    token?: string;
  }
}
