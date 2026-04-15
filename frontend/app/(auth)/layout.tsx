// Layout para las páginas de autenticación (sin navbar)

import Link from "next/link"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
            <div className="mb-8">
                <Link href="/">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Canastas verdes{" "}
                        <span className="text-green-500 text-xl">Frutas y verduras</span>
                    </h1>
                </Link>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {children}
            </div>
        </div>
    )
}
