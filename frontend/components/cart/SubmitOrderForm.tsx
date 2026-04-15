// Componente para el envio del pedido

"use client"

import { submitOrder } from "@/actions/submit-order-actions"
import { useActionState, useEffect } from "react"
import { useStore } from "@/src/store"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function SubmitOrderForm() {
    const router = useRouter()
    const total = useStore(state => state.total)
    const contents = useStore(state => state.contents)
    const clearCart = useStore(state => state.clearCart)

    const order = {
        total,
        contents
    }

    const submitOrderWithData = submitOrder.bind(null, order)
    const [state, dispatch, isPending] = useActionState(submitOrderWithData, {
        errors: [],
        success: ''
    })
    // Mostrar notificacion de carrito
    useEffect(() => {
        // Mostrar errores
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        // Mostrar éxito
        if (state.success) {
            toast.success(state.success)
            clearCart()
        }
    }, [state])

    // Si requiere autenticación, redirigir a login
    useEffect(() => {
        if (state.requiresAuth) {
            router.push("/login?redirect=/")
        }
    }, [state.requiresAuth, router])

    return (
        <form
            action={dispatch}
        >
            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white uppercase font-bold p-3 "
                value="Confirmar Compra"
            />
        </form>
    )
}