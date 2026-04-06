import { z } from "zod"
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.string().transform((value) => parseFloat(value)),
    costLogistics: z.string().transform((value) => parseFloat(value)),
    costTransport: z.string().transform((value) => parseFloat(value)),
    priceSuggested: z.string().transform((value) => parseFloat(value)),
    priceFinal: z.string().transform((value) => parseFloat(value)),
    inventory: z.number(),
    code: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const CategoryWithProductsSchema = CategorySchema.extend({
    products: z.array(ProductSchema),
})
export type Product = z.infer<typeof ProductSchema>