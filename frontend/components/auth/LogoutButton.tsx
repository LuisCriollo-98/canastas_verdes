// Botón para cerrar sesión (componente cliente)

"use client"

import { logout } from "@/actions/auth-actions"

export default function LogoutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="text-white hover:text-red-300 font-bold p-2 transition-colors duration-200"
            >
                Cerrar sesión
            </button>
        </form>
    )
}
