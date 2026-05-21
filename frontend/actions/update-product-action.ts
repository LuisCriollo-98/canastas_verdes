"use server"

import { ErrorResponseSchema, Product, ProductFormSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionStateType = {
    errors: string[]
    success: string
}
export async function updateProduct(productId: Product['id'], prevState: ActionStateType, formData: FormData) {
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        priceFinal: formData.get('priceFinal'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
        municipalityId: formData.get('municipalityId'),
        presentationId: formData.get('presentationId'),
        farmId: formData.get('farmId') || undefined,
    })
    if (!product.success) {
        return {
            errors: product.error.issues.map((issue) => issue.message),
            success: ''
        }
    }
    //Comunicar con la API a travez de una peticion 
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const url = `${process.env.API_URL}/products/${productId}`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product.data),
    })
    const json = await req.json()

    //validacion de la respuesta del servidor 
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }
    return {
        errors: [],
        success: 'Producto actualizado correctamente'
    }
}