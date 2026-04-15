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
const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    priceFinal: true,
    image: true,
    inventory: true,
    presentation: true,
}).extend({
    productId: z.number(),
    quantity: z.number(),
})
export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)

// Esquemas para el pedido
const OrderContentsSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    priceFinal: z.number(),
})
export const OrderSchema = z.object({
    total: z.number(),
    contents: z.array(OrderContentsSchema).min(1, {message: 'El carrito no puede ir vacio'})
})

// Esquemas para la respuesta del servidor
export const SuccessResponseSchema = z.object({
  message: z.string()
})
export const ErrorResponseSchema = z.object({
  message: z.union([z.array(z.string()), z.string()]).transform((val) => 
    Array.isArray(val) ? val : [val]
  ),
  error: z.string().optional(),
  statusCode: z.number().optional(),
})


export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>