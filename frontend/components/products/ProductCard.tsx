
// componente para mostrar los productos
import { Product } from "@/src/schemas"
import { formatCurrency } from "@/src/utils"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className='rounded bg-white shadow relative p-3 md:p-5 flex flex-col'>
            <div className="flex flex-col flex-1">
                <div className="relative w-full aspect-video">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/img/products/${product.image}`}
                        alt={`Imagen de producto ${product.name}`}
                        fill
                        className="object-cover rounded"
                        priority
                    />
                </div>
                <div className="p-3 space-y-2 flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-600">{product.name}</h3>
                    <h3 className="text-sm md:text-base font-bold text-gray-400">{product.presentation.description}</h3>
                    <p className="text-xl md:text-2xl font-extrabold text-gray-900">{formatCurrency(product.priceFinal)}</p>
                </div>
                <AddProductButton product={product} />
            </div>
        </div>
    )
}