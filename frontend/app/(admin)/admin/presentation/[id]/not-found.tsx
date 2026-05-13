import Link from "next/link"

export default function NotFound() {
    return (
        <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Presentación no encontrada.</p>
            <Link
                href="/admin/presentation"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Presentaciones
            </Link>
        </div>
    )
}
