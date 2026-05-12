"use client"

import { useStore } from "@/src/store"
import ShoppingCart from "./ShoppingCart"

export default function MobileCart() {
    const isOpen = useStore(state => state.isCartOpen)
    const closeCart = useStore(state => state.closeCart)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Fondo oscuro */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={closeCart}
            />

            {/* Panel del carrito */}
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <h2 className="font-bold text-lg text-gray-900">Tu carrito</h2>
                    <button
                        onClick={closeCart}
                        aria-label="Cerrar carrito"
                        className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    <ShoppingCart />
                </div>
            </div>
        </div>
    )
}
