// Componente para el formulario de registro

"use client";

import { register } from "@/actions/auth-actions";
import { useActionState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [state, dispatch, isPending] = useActionState(register, {
    errors: [],
    success: "",
  });

  return (
    <form action={dispatch} className="space-y-5">
      {/* Mostrar errores */}
      {state.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {state.errors.map((error, index) => (
            <p key={index} className="text-sm">
              {error}
            </p>
          ))}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Nombre completo
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Tu nombre"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="register-email"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Correo electrónico
        </label>
        <input
          id="register-email"
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Celular
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Tu número de celular"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Contraseña
        </label>
        <input
          id="register-password"
          type="password"
          name="password"
          placeholder="Mínimo 6 caracteres"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Repite la contraseña"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Dirección{" "}
          <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Tu dirección de entrega"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 uppercase tracking-wide"
      >
        {isPending ? "Registrando..." : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-green-600 hover:text-green-700 font-semibold hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
