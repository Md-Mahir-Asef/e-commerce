import { z } from "zod/v4";

export const UserDataSchema = z.object({
    user_name: z
        .string({ message: "Not a valid user name." })
        .min(3, { message: "User name must be at least 3 characters." })
        .max(32, { message: "User name must not exceed 32 characters." }),
    email: z.email({ message: "Not a valid email." }),
    password: z
        .string({ message: "Not a valid password" })
        .min(4, { message: "Password must be at least 4 characters." })
        .max(32, { message: "Password must not exceed 32 characters." }),
});

export const LogInUserDateSchema = z.object({
    email: z.email({ message: "Not a valid email." }),
    password: z
        .string({ message: "Not a valid password" })
        .min(4, { message: "Password must be at least 4 characters." })
        .max(32, { message: "Password must not exceed 32 characters." }),
});
