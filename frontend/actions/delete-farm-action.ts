"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deleteFarm(farmId: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/farms/${farmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!req.ok) return { success: "", error: "Error al eliminar la finca" }

    revalidatePath("/admin/farms")
    return { success: "Finca eliminada correctamente", error: "" }
}
