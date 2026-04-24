
// COMPONENTE PARA MOSTRAR LAS CATEGORIAS COMO UN SLIDER
"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

type Category = {
    id: string | number
    name: string
    image: string
}

export default function CategorySlider({ categories }: { categories: Category[] }) {
    const sliderRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (!sliderRef.current) return
        sliderRef.current.scrollBy({
            left: direction === "right" ? 300 : -300,
            behavior: "smooth",
        })
    }

    return (
        <div className="relative bg-green-50 py-6">

            {/* Botón izquierda */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-100 text-green-700 rounded-full w-9 h-9 flex items-center justify-center shadow-md border border-green-200 transition-colors duration-150 text-xl"
                aria-label="Desplazar izquierda"
            >
                ‹
            </button>

            {/* Tarjetas */}
            <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-12"
            >
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/${category.id}`}
                        className="relative flex-shrink-0 w-44 h-52 rounded-2xl overflow-hidden group cursor-pointer bg-white hover:shadow-lg border border-green-100 hover:border-green-300 transition-all duration-300"
                    >
                        {/* Imagen de categoría */}
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/img/${category.image}`}
                                alt={category.name}
                                fill
                                priority
                                className="object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>

                        {/* Degradado inferior */}
                        <div className="absolute inset-0 bg-gradient-to-t from-green-50/90 via-transparent to-transparent" />

                        {/* Nombre + línea verde */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-gray-800 font-bold text-base leading-tight">
                                {category.name}
                            </h3>
                            <div className="mt-2 w-8 h-0.5 bg-green-500 rounded-full" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Botón derecha */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-100 text-green-700 rounded-full w-9 h-9 flex items-center justify-center shadow-md border border-green-200 transition-colors duration-150 text-xl"
                aria-label="Desplazar derecha"
            >
                ›
            </button>

            {/* Degradados en los bordes */}
            <div className="absolute left-10 top-0 bottom-0 w-8 bg-gradient-to-r from-green-50 to-transparent pointer-events-none" />
            <div className="absolute right-10 top-0 bottom-0 w-8 bg-gradient-to-l from-green-50 to-transparent pointer-events-none" />
        </div>
    )
}
