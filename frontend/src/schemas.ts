import { z } from "zod"

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
// lo que me permite traer la lista de productos de la peticion a /products
export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number(),
})

/**Schema que me permite trabajar con la categoria */
export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
})
/**lo que me permite traer la categoria con los productos */
export const CategoriesResponseSchema = z.array(CategorySchema)
export const CategoryWithProductsSchema = CategorySchema.extend({
    products: z.array(ProductSchema),
})

/**Schema que me permite trabajar con la presentacion del producto */
export const ProductPresentationSchema = z.object({
    id: z.number(),
    description: z.string(),
})

export const ProductPresentationResponseSchema = z.array(ProductPresentationSchema)

/**Schema que me permite trabajar con las fincas */
export const FarmSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const FarmsResponseSchema = z.object({
    farms: z.array(FarmSchema),
    total: z.number(),
})

export const FarmDetailSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    description: z.string(),
    municipality: z.object({ id: z.number(), name: z.string() }),
})

export const FarmFormSchema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    address: z.string().min(1, { message: 'La dirección es requerida' }),
    phone: z.string().min(1, { message: 'El teléfono es requerido' }),
    email: z.string().email({ message: 'El email no es válido' }),
    description: z.string().min(1, { message: 'La descripción es requerida' }),
    municipalityId: z.coerce.number({ message: 'El municipio no es válido' }).min(1, { message: 'Selecciona un municipio' }),
})

/**Schema que me permite trabajar con el municipio */
export const MunicipalitySchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const MunicipalityResponseSchema = z.array(MunicipalitySchema)

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
    contents: z.array(OrderContentsSchema).min(1, { message: 'El carrito no puede ir vacio' })
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

/**
 * Schema que me permite trabajar con el formulario de productos
 */
export const ProductFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre del producto no puede ir vacío' }),
    price: z.coerce.number({ message: 'Precio no válido' })
        .min(1, { message: 'El precio debe ser mayor a 0' }),
    priceFinal: z.coerce.number({ message: 'Precio final no válido' })
        .min(1, { message: 'El precio final debe ser mayor a 0' }),
    inventory: z.coerce.number({ message: 'Inventario no válido' })
        .min(1, { message: 'El inventario debe ser mayor a 0' }),
    categoryId: z.coerce.number({ message: 'La categoría no es válida' })
        .min(1, { message: 'Selecciona una categoría' }),
    municipalityId: z.coerce.number({ message: 'El municipio no es válido' })
        .min(1, { message: 'Selecciona un municipio' }),
    presentationId: z.coerce.number({ message: 'La presentación no es válida' })
        .min(1, { message: 'Selecciona una presentación' }),
    farmId: z.coerce.number().optional(),
})

export const TransactionUserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
})

export const TransactionContentsItemSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.string().transform((v) => parseFloat(v)),
    product: z.object({
        id: z.number(),
        name: z.string(),
    }),
})

export const TransactionSchema = z.object({
    id: z.number(),
    total: z.string().transform((v) => parseFloat(v)),
    status: z.enum(['pending', 'delivered', 'cancelled']),
    transactionsDate: z.string(),
    user: TransactionUserSchema,
    contents: z.array(TransactionContentsItemSchema),
})

export const TransactionsResponseSchema = z.object({
    transactions: z.array(TransactionSchema),
    total: z.number(),
})

export const ProductEditSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string().transform((v) => parseFloat(v)),
    priceFinal: z.string().transform((v) => parseFloat(v)),
    inventory: z.number(),
    category: z.object({ id: z.number(), name: z.string() }),
    municipality: z.object({ id: z.number(), name: z.string() }),
    presentation: z.object({ id: z.number(), description: z.string() }),
    farm: z.object({ id: z.number(), name: z.string() }).nullable().optional(),
})

export const CategoryFormSchema = z.object({
    name: z.string().min(1, { message: 'El nombre de la categoría no puede ir vacío' }),
})

export const MunicipalityFormSchema = z.object({
    name: z.string().min(1, { message: 'El nombre del municipio no puede ir vacío' }),
})

export const PresentationFormSchema = z.object({
    description: z.string().min(1, { message: 'La descripción no puede ir vacía' }),
})

export type Transaction = z.infer<typeof TransactionSchema>
export type ProductEdit = z.infer<typeof ProductEditSchema>
export type Product = z.infer<typeof ProductSchema>
export type Category = z.infer<typeof CategorySchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>