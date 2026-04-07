
"use client"
import { Product } from "@/src/schemas"
import { ShoppingCart } from "lucide-react"
import { useStore } from "@/src/store"

export default function AddProductButton({ product }: { product: Product }) {
    const addToCart = useStore(state => state.addToCart)
    return (
        <button
            type="button"
            className="absolute top-5 -right-3"
            onClick={() => addToCart(product)}
        >
            <ShoppingCart className="w-8 h-8 bg-indigo-600 rounded-full text-white p-1" />
        </button>
    )
}