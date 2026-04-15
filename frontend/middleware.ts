// Middleware de Next.js para protección de rutas privadas

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas que requieren autenticación
const protectedPaths = [
    "/orders",
    "/profile",
]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("auth_token")

    // Verificar si la ruta actual es una ruta protegida
    const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))

    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Si el usuario ya está autenticado y va a login/register, redirigir al inicio
    if (token && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

// Configurar el matcher para que el middleware se aplique en las rutas correctas
export const config = {
    matcher: [
        /*
         * Excluir:
         * - _next (archivos estáticos de Next.js)
         * - api (rutas API)
         * - favicon.ico
         * - archivos estáticos (images, etc.)
         */
        "/((?!_next|api|favicon\\.ico|.*\\.).*)",
    ],
}
