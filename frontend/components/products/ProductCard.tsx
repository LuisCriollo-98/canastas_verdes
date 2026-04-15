
// componente para mostrar los productos
import { Product } from "@/src/schemas"
import { formatCurrency } from "@/src/utils"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div
            className='rounded bg-white shadow relative p-5'
        >
            <div>
                <Image
                    src={`${process.env.API_URL}/img/${product.image}`}
                    alt={`Imagen de producto ${product.name}`}
                    width={600}
                    height={500}
                    priority
                />
                {/* informacion del producto*/}
                <div className="p-3 space-y-2">
                    {/* nombre del producto*/}
                    <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                    {/* presentacion del producto*/}
                    <h3 className="text-xl font-bold text-gray-400">{product.presentation.description}</h3>
                    {/* precio del producto*/}
                    <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.priceFinal)}</p>
                </div>
                <AddProductButton
                    product={product}
                />
            </div>
        </div>
    )
}