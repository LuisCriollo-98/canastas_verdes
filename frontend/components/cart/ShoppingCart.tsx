// componente para mostrar el carrito de compras

"use client"
import { useStore } from "@/src/store"
import ShoppingCartItem from "./ShoppingCartItem"
import Amount from "./Amount"
import SubmitOrderForm from "./SubmitOrderForm"

export default function ShoppingCart() {
    const contents = useStore(state => state.contents)
    const total = useStore(state => state.total)
    return (
        <>
            {contents.length ? (
                <>
                    <h2 className="text-2xl font-bold text-center">Resumen de pedido</h2>
                    <ul role="list" className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
                        {contents.map((item) => (
                            <ShoppingCartItem
                                key={item.productId}
                                item={item}
                            />
                        ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-600">
                        <Amount
                            label="Total a pagar"
                            amount={total}
                        />
                    </dl>
                    <SubmitOrderForm />
                </>
            ) : (
                <p className="text-xl text-center font-bold text-gray-900">El carrito esta vacio</p>
            )}
        </>
    )
}