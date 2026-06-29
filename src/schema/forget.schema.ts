import * as z from "zod";

export const forgetSchema = z.object({

email : z.email().nonempty("Email is required"),

})

export type forgetSchemaType = z.infer<typeof forgetSchema>;

