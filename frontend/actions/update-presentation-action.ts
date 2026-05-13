"use server"

import { ErrorResponseSchema, PresentationFormSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionStateType = { errors: string[]; success: string }

export async function updatePresentation(presentationId: number, prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
    const result = PresentationFormSchema.safeParse({ description: formData.get("description") })
    if (!result.success) {
        return { errors: result.error.issues.map((i) => i.message), success: "" }
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/products-presentation/${presentationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(result.data),
    })
    const json = await req.json()
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return { errors: errors.message, success: "" }
    }
    return { errors: [], success: "Presentación actualizada correctamente" }
}
