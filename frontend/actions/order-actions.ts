"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function updateOrderStatus(orderId: number, status: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    if (!token) return { error: "No autorizado" }

    const res = await fetch(`${process.env.API_URL}/transactions/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    })

    if (!res.ok) return { error: "Error al actualizar el estado" }

    revalidatePath("/admin/orders")
    return { success: true }
}
