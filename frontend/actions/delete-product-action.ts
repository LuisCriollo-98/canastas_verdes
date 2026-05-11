"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deleteProduct(productId: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!req.ok) {
        return { success: "", error: "Error al eliminar el producto" }
    }

    revalidatePath("/admin/products")
    return { success: "Producto eliminado correctamente", error: "" }
}
