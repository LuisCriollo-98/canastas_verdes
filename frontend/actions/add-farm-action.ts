"use server"

import { ErrorResponseSchema, FarmFormSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionStateType = { errors: string[]; success: string }

export async function addFarm(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
    const result = FarmFormSchema.safeParse({
        name: formData.get("name"),
        address: formData.get("address"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        description: formData.get("description"),
        municipalityId: formData.get("municipalityId"),
    })
    if (!result.success) {
        return { errors: result.error.issues.map((i) => i.message), success: "" }
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/farms`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(result.data),
    })
    const json = await req.json()
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return { errors: errors.message, success: "" }
    }
    return { errors: [], success: "Finca agregada correctamente" }
}
