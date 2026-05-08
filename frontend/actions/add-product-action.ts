"use server"

import { ProductFormSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}
export async function addProduct(prevState: ActionStateType, formData: FormData) {
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        priceFinal: formData.get('priceFinal'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
        municipalityId: formData.get('municipalityId'),
        presentationId: formData.get('presentationId'),
    })
    if (!product.success) {
        return {
            errors: product.error.issues.map((issue) => issue.message),
            success: ''
        }
    }

    return {
        errors: [],
        success: ""
    }
}