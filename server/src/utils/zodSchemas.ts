import { z } from "zod/v4";

export const UserDataSchema = z.object({
    user_name: z.string().min(3).max(32),
    email: z.email(),
    password: z.string().min(4).max(32),
});

export const LogInUserDateSchema = z.object({
    email: z.email(),
    password: z.string().min(4).max(32),
});
