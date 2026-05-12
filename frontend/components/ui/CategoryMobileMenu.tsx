"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import CategoryLink from "./CategoryLink"

type Category = { id: number; name: string; image: string }

export default function CategoryMobileMenu({ categories }: { categories: Category[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Cierra el menú al navegar a otra categoría
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div className="lg:hidden border-b border-green-100 bg-white">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-green-700"
            >
                <span>Categorías</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <nav className="flex flex-col gap-1 px-3 pb-3">
                    {categories.map((category) => (
                        <CategoryLink key={category.id} category={category} />
                    ))}
                </nav>
            )}
        </div>
    )
}
