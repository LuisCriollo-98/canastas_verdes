"use client"

import { updateOrderStatus } from "@/actions/order-actions"
import { useTransition } from "react"

const STATUS_OPTIONS = [
    { value: "pending", label: "Pendiente" },
    { value: "delivered", label: "Entregado" },
    { value: "cancelled", label: "Cancelado" },
]

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300",
}

export default function OrderStatusSelect({
    orderId,
    currentStatus,
}: {
    orderId: number
    currentStatus: string
}) {
    const [isPending, startTransition] = useTransition()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value
        startTransition(async () => {
            await updateOrderStatus(orderId, newStatus)
        })
    }

    return (
        <select
            defaultValue={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className={`text-xs font-semibold px-2 py-1 rounded border cursor-pointer transition-opacity ${STATUS_COLORS[currentStatus]} ${isPending ? "opacity-50" : ""}`}
        >
            {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    )
}
