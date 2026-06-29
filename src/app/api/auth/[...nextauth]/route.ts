import { authOptions } from "@/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, handler as DELETE , handler as PUT , handler as PATCH }