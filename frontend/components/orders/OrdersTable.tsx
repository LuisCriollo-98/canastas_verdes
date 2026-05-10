import { Transaction } from "@/src/schemas"
import { formatCurrency } from "@/src/utils"
import OrderStatusSelect from "./OrderStatusSelect"

export default function OrdersTable({ orders }: { orders: Transaction[] }) {
    if (orders.length === 0) {
        return (
            <p className="text-center text-gray-500 py-10">
                No hay pedidos para mostrar.
            </p>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-600 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Fecha</th>
                        <th className="px-4 py-3">Cliente</th>
                        <th className="px-4 py-3">Teléfono</th>
                        <th className="px-4 py-3">Productos</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">
                                #{order.id}
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                {new Date(order.transactionsDate).toLocaleDateString("es-CO", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </td>
                            <td className="px-4 py-3">
                                <p className="font-medium text-gray-900">{order.user.name}</p>
                                <p className="text-xs text-gray-500">{order.user.email}</p>
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                                {order.user.phone}
                            </td>
                            <td className="px-4 py-3">
                                <ul className="space-y-0.5">
                                    {order.contents.map((item) => (
                                        <li key={item.id} className="text-xs text-gray-600">
                                            {item.quantity}x {item.product.name}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                                {formatCurrency(order.total)}
                            </td>
                            <td className="px-4 py-3">
                                <OrderStatusSelect
                                    orderId={order.id}
                                    currentStatus={order.status}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
