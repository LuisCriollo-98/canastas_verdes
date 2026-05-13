"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deletePresentation(presentationId: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/products-presentation/${presentationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!req.ok) return { success: "", error: "Error al eliminar la presentación" }

    revalidatePath("/admin/presentation")
    return { success: "Presentación eliminada correctamente", error: "" }
}
