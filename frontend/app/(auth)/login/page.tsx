// Página de inicio de sesión

import LoginForm from "@/components/auth/LoginForm"

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string; registered?: string }>
}) {
    const { redirect: redirectTo = "/", registered } = await searchParams

    return (
        <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Iniciar sesión
            </h2>

            {registered && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-5">
                    <p className="text-sm">¡Cuenta creada exitosamente! Inicia sesión para continuar.</p>
                </div>
            )}

            <LoginForm redirectTo={redirectTo} />
        </>
    )
}
