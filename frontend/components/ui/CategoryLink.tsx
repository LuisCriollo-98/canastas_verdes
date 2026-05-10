// Componente para mostrar las categorias
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Category = {
    id: number
    name: string
    image: string
}

export default function CategoryLink({ category }: { category: Category }) {
    const pathname = usePathname()
    const isActive = pathname === `/${category.id}`

    return (
        <Link
            href={`/${category.id}`}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-150 ${isActive
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                }`}
        >
            <span className="text-sm font-medium leading-tight">{category.name}</span>
            {isActive && (
                <div className="ml-auto w-1 h-5 bg-green-600 rounded-full shrink-0" />
            )}
        </Link>
    )
}
