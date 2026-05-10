import Heading from "@/components/ui/Heading"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>No se encontro el producto</Heading>
            <p>
                Tal vez quiera regresar a {' '}
                <Link
                    href="/admin/products?page=1"
                    className="rounded bg-green-600 text-white font-bold py-2 px-10"
                >
                    Productos
                </Link>
            </p>
        </div>
    )
}