// Layout para las páginas de autenticación (sin navbar)

import Link from "next/link"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4 py-8">

            {/* Botón regresar - alineado a la izquierda del contenedor */}
            <div className="w-full max-w-md mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200 group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Regresar a la tienda
                </Link>
            </div>

            {/* Logo */}
            <div className="mb-8">
                <Link href="/">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Canastas verdes
                    </h1>
                    <h3 className="text-sm text-center font-semibold text-green-500">Frutas y verduras</h3>
                </Link>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {children}
            </div>
        </div>
    )
}