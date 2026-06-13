import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(2),
    price: z.number().min(0),
    category: z.string(),
    description: z.string().optional(),
    stock: z.number().min(0).default(0)
});

export const updateProductSchema = z.object({
    name: z.string().min(2).optional(),
    price: z.number().min(0).optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    stock: z.number().min(0).default(0).optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required'
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;