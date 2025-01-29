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

export const CreateProductSellerSchema = z.object({
    storeId: z.string().min(1),
    categoryId: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    stock: z.number().min(1),
    price: z.number().min(1),
    weight: z.number().optional(),
    image: z.array(z.instanceof(File)).min(1, "At least one image is required")
})