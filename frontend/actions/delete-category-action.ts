"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deleteCategory(categoryId: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/categories/${categoryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!req.ok) {
        return { success: "", error: "Error al eliminar la categoría" }
    }

    revalidatePath("/admin/categories")
    return { success: "Categoría eliminada correctamente", error: "" }
}
