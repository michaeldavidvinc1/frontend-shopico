import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(5),
})

export const RegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(5),
})

export const CreateStoreSchema = z.object({
    userId: z.string(),
    name: z.string().min(1),
    slug: z.string(),
})