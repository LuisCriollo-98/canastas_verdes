"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deleteMunicipality(municipalityId: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/municipalities/${municipalityId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!req.ok) return { success: "", error: "Error al eliminar el municipio" }

    revalidatePath("/admin/municipalities")
    return { success: "Municipio eliminado correctamente", error: "" }
}
