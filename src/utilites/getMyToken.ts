"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {

   let decodedtoken = (await cookies()).get(`next-auth.session-token`)?.value;
    let token = await decode({token: decodedtoken , secret: process.env.NEXTAUTH_SECRET!})
    
    return token?.token;
}

// "use server";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export default async function getMyToken() {
//   // @ts-ignore
//   const cookieStore: any = cookies(); // تخطي TypeScript مؤقتًا

//   const sessionCookie =
//     cookieStore.get?.("next-auth.session-token")?.value ||
//     cookieStore.get?.("__Secure-next-auth.session-token")?.value;

//   if (!sessionCookie) return null;

//   const token = await decode({
//     token: sessionCookie,
//     secret: process.env.NEXTAUTH_SECRET!,
//   });

//   return token?.token;
// }



// "use server";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export default async function getMyToken() {

//   const store = cookies(); // لا تستخدم await هنا

//   // ابحث عن الكوكي اللي يبدأ بـ next-auth.session-token
//   const sessionCookie = store
//     .getAll()
//     .find((c) => c.name.startsWith("next-auth.session-token"));

//   if (!sessionCookie) return null;

//   const decoded = await decode({
//     token: sessionCookie.value,
//     secret: process.env.NEXTAUTH_SECRET!,
//   });

//   return decoded?.token ?? null;
// }










