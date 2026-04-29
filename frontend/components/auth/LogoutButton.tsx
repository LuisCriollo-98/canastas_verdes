// Botón para cerrar sesión (componente cliente)

"use client";

import { logout } from "@/actions/auth-actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-green-600 hover:text-black font-bold p-2 cursor-pointer transition-colors duration-200"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
