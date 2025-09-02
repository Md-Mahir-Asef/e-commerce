import { z } from "zod/v4";

export const RegistrationUserDataSchema = z
    .object({
        user_name: z
            .string()
            .min(3, { message: "User name must be at least 3 characters." })
            .max(32, { message: "User name can't exceed 32 characters." }),
        email: z.email({ message: "Invalid Email." }),
        password: z
            .string()
            .min(4, { message: "Password must be at least 4 characters." })
            .max(32, { message: "Password can't exceed 32 characters." }),
        confirmPassword: z.string().min(4).max(32),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password Must Match",
        path: ["confirmPassword"],
    });
