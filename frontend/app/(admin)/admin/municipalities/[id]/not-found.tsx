import Link from "next/link"

export default function NotFound() {
    return (
        <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Municipio no encontrado.</p>
            <Link
                href="/admin/municipalities"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Municipios
            </Link>
        </div>
    )
}
