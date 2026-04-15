// Acciones para el envio del pedido

"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type SubmitOrderState = {
    errors: string[]
    success: string
    requiresAuth?: boolean
}

// Funcion para enviar el pedido
export async function submitOrder(data: unknown): Promise<SubmitOrderState> {
    // Verificar si hay token en la cookie
    const cookieStore = await cookies()
    const tokenCookie = cookieStore.get("auth_token")

    if (!tokenCookie) {
        return {
            errors: [],
            success: '',
            requiresAuth: true
        }
    }

    const order = OrderSchema.parse(data)

    // Transformar priceFinal -> price para el backend
    const payload = {
        total: order.total,
        contents: order.contents.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.priceFinal,
        }))
    }

    const url = `${process.env.API_URL}/transactions`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenCookie.value}`,
        },
        body: JSON.stringify(payload)
    })
    const json = await req.json()
    // Si hay errores
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }
    const success = SuccessResponseSchema.parse(json)
    return {
        errors: [],
        success: success.message
    }
}