import * as z from "zod";

export const registerSchema = z.object({
  full_name: z.string()
.nonempty("Full name is required")
.min(6, "Full name must be at least 6 characters")
.max(32, "Full name must be at most 32 characters"),
email : z.email().nonempty("Email is required"),
password : z.string().nonempty("Password is required").min(9,"Password must be at least 9 characters"),
confirm_password : z.string().nonempty("Confirm password is required"), 
}).refine((object)=>object.password === object.confirm_password,{
  path : ["confirm_password"],
  error:"password & confirm password do not match !!",
});

export type registerSchemaType = z.infer<typeof registerSchema>;

