// Componente para el formulario de inicio de sesión

"use client"

import { login } from "@/actions/auth-actions"
import { useActionState } from "react"
import Link from "next/link"

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
    const loginWithRedirect = login.bind(null, redirectTo)
    const [state, dispatch, isPending] = useActionState(loginWithRedirect, {
        errors: [],
        success: "",
    })

    return (
        <form action={dispatch} className="space-y-5">
            {/* Mostrar errores */}
            {state.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {state.errors.map((error, index) => (
                        <p key={index} className="text-sm">{error}</p>
                    ))}
                </div>
            )}

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                >
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                >
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-green-600 hover:bg-green-600 disabled:bg-green-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 uppercase tracking-wide"
            >
                {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

            <p className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link
                    href="/register"
                    className="text-green-600 hover:text-green-600 font-semibold hover:underline"
                >
                    Regístrate aquí
                </Link>
            </p>
        </form>
    )
}
