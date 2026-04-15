import { number, z } from "zod"

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    presentation: z.object({
        description: z.string(),
    }),
    image: z.string(),
    //price: z.string().transform((value) => parseFloat(value)),
    //costLogistics: z.string().transform((value) => parseFloat(value)),
    //costTransport: z.string().transform((value) => parseFloat(value)),
    //priceSuggested: z.string().transform((value) => parseFloat(value)),
    priceFinal: z.string().transform((value) => parseFloat(value)),
    inventory: z.number(),
    //code: z.string(),
    //createdAt: z.string(),
    //updatedAt: z.string(),
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
})
export const CategoriesReponseSchema = z.array(CategorySchema)
export const CategoryWithProductsSchema = CategorySchema.extend({
    products: z.array(ProductSchema),
})

/**Carrito de compras  **/
const ShopingCartContentsSchema = ProductSchema.pick({
    name: true,
    priceFinal: true,
    image: true,
    inventory: true,
    presentation: true,
}).extend({
    productId: z.number(),
    quantity: z.number(),
})

export const ShopingCartSchema = z.array(ShopingCartContentsSchema)

export type Product = z.infer<typeof ProductSchema>
export type ShopingCart = z.infer<typeof ShopingCartSchema>
export type CartItem = z.infer<typeof ShopingCartContentsSchema>