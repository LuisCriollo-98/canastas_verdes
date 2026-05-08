"use server"

import { cookies } from "next/headers"

export async function previewPrices(price: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(
        `${process.env.API_URL}/products/preview-prices`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ price }),
        }
    )
    const data = await req.json()
    if (!req.ok) return null
    return data
}