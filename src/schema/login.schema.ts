import * as z from "zod";

export const loginSchema = z.object({

email : z.email().nonempty("Email is required"),
password : z.string().nonempty("Password is required").min(9,"Password must be at least 9 characters"),
})

export type loginSchemaType = z.infer<typeof loginSchema>;

