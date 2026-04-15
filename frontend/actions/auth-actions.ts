// Acciones de autenticación

"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorResponseSchema } from "@/src/schemas"

type AuthState = {
    errors: string[]
    success: string
}

// Función para iniciar sesión
export async function login(redirectTo: string, prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Validación básica en el frontend
    const errors: string[] = []
    if (!email) errors.push("El correo electrónico es obligatorio")
    if (!password) errors.push("La contraseña es obligatoria")
    if (password && password.length < 6) errors.push("La contraseña debe tener al menos 6 caracteres")

    if (errors.length > 0) {
        return { errors, success: "" }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    const json = await req.json()

    if (!req.ok) {
        const errorResponse = ErrorResponseSchema.parse(json)
        return {
            errors: errorResponse.message.map(issue => issue),
            success: "",
        }
    }

    // Guardar el token en una cookie HttpOnly
    const cookieStore = await cookies()
    cookieStore.set("auth_token", json.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 horas
        path: "/",
    })

    // Guardar datos del usuario en una cookie legible (para el navbar)
    cookieStore.set("auth_user", JSON.stringify({
        id: json.user.id,
        name: json.user.name,
        email: json.user.email,
        role: json.user.role,
    }), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 horas
        path: "/",
    })

    // Redirigir al destino indicado o a la página principal
    redirect(redirectTo || "/")
}

// Función para registrarse
export async function register(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const address = formData.get("address") as string

    // Validación básica
    const errors: string[] = []
    if (!name) errors.push("El nombre es obligatorio")
    if (!email) errors.push("El correo electrónico es obligatorio")
    if (!password) errors.push("La contraseña es obligatoria")
    if (password && password.length < 6) errors.push("La contraseña debe tener al menos 6 caracteres")
    if (password !== confirmPassword) errors.push("Las contraseñas no coinciden")

    if (errors.length > 0) {
        return { errors, success: "" }
    }

    const url = `${process.env.API_URL}/auth/register`
    const body: Record<string, string> = { name, email, password }
    if (address) body.address = address

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    const json = await req.json()

    if (!req.ok) {
        const errorResponse = ErrorResponseSchema.parse(json)
        return {
            errors: errorResponse.message.map(issue => issue),
            success: "",
        }
    }

    redirect("/login?registered=true")
}

// Función para cerrar sesión
export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("auth_token")
    cookieStore.delete("auth_user")
    redirect("/")
}

// Función para obtener el usuario autenticado desde la cookie
export async function getAuthUser() {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get("auth_user")

    if (!userCookie) return null

    try {
        return JSON.parse(userCookie.value) as {
            id: number
            name: string
            email: string
            role: string
        }
    } catch {
        return null
    }
}
