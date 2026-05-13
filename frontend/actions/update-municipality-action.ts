"use server"

import { ErrorResponseSchema, MunicipalityFormSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionStateType = { errors: string[]; success: string }

export async function updateMunicipality(municipalityId: number, prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
    const result = MunicipalityFormSchema.safeParse({ name: formData.get("name") })
    if (!result.success) {
        return { errors: result.error.issues.map((i) => i.message), success: "" }
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/municipalities/${municipalityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(result.data),
    })
    const json = await req.json()
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return { errors: errors.message, success: "" }
    }
    return { errors: [], success: "Municipio actualizado correctamente" }
}
