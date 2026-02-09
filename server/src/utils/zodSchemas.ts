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

export const AddToCartSchema = z.object({
    productId: z
        .number()
        .int()
        .positive({ message: "Product ID must be a positive integer." }),
    quantity: z
        .number()
        .int()
        .min(1, { message: "Quantity must be at least 1." })
        .max(10, { message: "Quantity cannot exceed 10." }),
});

export const UpdateCartSchema = z.object({
    productId: z
        .number()
        .int()
        .positive({ message: "Product ID must be a positive integer." }),
    quantity: z
        .number()
        .int()
        .min(1, { message: "Quantity must be at least 1." })
        .max(10, { message: "Quantity cannot exceed 10." }),
});

export const ProductDataSchema = z
    .object({
        name: z.string().min(1, { message: "Product name is required." }),
        description: z.string().optional().nullable(),
        price: z
            .number()
            .int()
            .positive({ message: "Price must be a positive integer." }),
        rating: z.number().min(0).max(5).default(5),
        discountPrice: z.number().int().positive().optional().nullable(),
        images: z.array(z.string()).default([]),
        categoryNames: z.array(z.string()).default([]),
    })
    .refine(
        (data) =>
            data.discountPrice === null ||
            data.discountPrice === undefined ||
            data.discountPrice <= data.price,
        {
            message: "Discount price must be less than or equal to price.",
            path: ["discountPrice"],
        },
    );

export const UpdateProductDataSchema = z
    .object({
        id: z.number().int().positive(),
        name: z.string().min(1, { message: "Product name is required." }),
        description: z.string().optional().nullable(),
        price: z
            .number()
            .int()
            .positive({ message: "Price must be a positive integer." }),
        rating: z.number().min(0).max(5).default(5),
        discountPrice: z.number().int().positive().optional().nullable(),
        images: z.array(z.string()).default([]),
        categoryNames: z.array(z.string()).default([]),
    })
    .refine(
        (data) =>
            data.discountPrice === null ||
            data.discountPrice === undefined ||
            data.discountPrice <= data.price,
        {
            message: "Discount price must be less than or equal to price.",
            path: ["discountPrice"],
        },
    );

export const UpdateCategorySchema = z.object({
    new_name: z.string().min(1, { message: "New Category name is required." }),
});

export const UpdateOrderStatusSchema = z.object({
    status: z.enum(
        ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
        {
            message: "Invalid order status",
        },
    ),
});
