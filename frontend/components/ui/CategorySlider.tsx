// COMPONENTE PARA MOSTRAR LAS CATEGORIAS COMO UN SLIDER
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Category = {
  id: string | number;
  name: string;
  image: string;
};

export default function CategorySlider({
  categories,
}: {
  categories: Category[];
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

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
        className="flex gap-4 overflow-x-auto scrollbar-hide px-12 scroll-smooth"
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="relative flex-shrink-0 w-44 h-52 rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-100"
          >
            {/* Imagen de fondo ocupando toda la tarjeta */}
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/img/categories/${category.image}`}
              alt={category.name}
              fill
              priority={true}
              sizes="176px"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Degradado oscuro de abajo hacia arriba */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />

            {/* Texto abajo */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-base leading-tight">
                {category.name}
              </h3>
              <div className="mt-2 w-8 h-0.5 bg-green-400 rounded-full" />
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
  );
}
