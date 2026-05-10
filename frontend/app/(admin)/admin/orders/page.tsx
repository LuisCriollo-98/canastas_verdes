import Heading from "@/components/ui/Heading"
import OrdersTable from "@/components/orders/OrdersTable"
import Pagination from "@/components/ui/Pagination"
import { TransactionsResponseSchema } from "@/src/schemas"
import { isValidPage } from "@/src/utils"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

const ORDERS_PER_PAGE = 20

type SearchParams = Promise<{
    page?: string
    dateFrom?: string
    dateTo?: string
}>

async function getOrders(page: number, dateFrom: string, dateTo: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    if (!token) redirect("/login")

    const params = new URLSearchParams({
        page: String(page),
        limit: String(ORDERS_PER_PAGE),
    })
    if (dateFrom) params.set("dateFrom", dateFrom)
    if (dateTo) params.set("dateTo", dateTo)

    const res = await fetch(`${process.env.API_URL}/transactions?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })

    if (!res.ok) redirect("/login")

    const json = await res.json()
    return TransactionsResponseSchema.parse(json)
}

export default async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
    const { page, dateFrom = "", dateTo = "" } = await searchParams

    if (!isValidPage(+(page ?? 1))) redirect("/admin/orders?page=1")

    const currentPage = +(page ?? 1)
    const { transactions, total } = await getOrders(currentPage, dateFrom, dateTo)
    const totalPages = Math.ceil(total / ORDERS_PER_PAGE)

    if (currentPage > totalPages && totalPages > 0) redirect("/admin/orders?page=1")

    const dateExtraQuery = [
        dateFrom ? `&dateFrom=${dateFrom}` : "",
        dateTo ? `&dateTo=${dateTo}` : "",
    ].join("")

    const reportParams = new URLSearchParams()
    if (dateFrom) reportParams.set("dateFrom", dateFrom)
    if (dateTo) reportParams.set("dateTo", dateTo)
    const reportUrl = `/api/orders/report${reportParams.size ? `?${reportParams}` : ""}`

    return (
        <div>
            {/* Cabecera */}
            <div className="flex flex-col mb-6 gap-4">
                <div className="flex items-center justify-between">
                    <Heading>Pedidos</Heading>
                    <Link
                        href={reportUrl}
                        className="rounded bg-green-600 text-white font-bold py-2 px-6 hover:bg-green-700 transition-colors text-sm"
                    >
                        Descargar Reporte CSV
                    </Link>
                </div>
                <p className="text-sm text-gray-500">
                    Total:{" "}
                    <span className="font-semibold text-green-600">{total}</span> pedido
                    {total !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Filtro por fechas */}
            <form method="GET" className="flex flex-wrap items-end gap-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Desde</label>
                    <input
                        type="date"
                        name="dateFrom"
                        defaultValue={dateFrom}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">Hasta</label>
                    <input
                        type="date"
                        name="dateTo"
                        defaultValue={dateTo}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <input type="hidden" name="page" value="1" />
                <button
                    type="submit"
                    className="bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-green-700 transition-colors"
                >
                    Filtrar
                </button>
                {(dateFrom || dateTo) && (
                    <Link
                        href="/admin/orders?page=1"
                        className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                        Limpiar filtro
                    </Link>
                )}
            </form>

            {/* Tabla */}
            <OrdersTable orders={transactions} />

            {/* Paginación */}
            {totalPages > 1 && (
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    baseUrl="/admin/orders"
                    extraQuery={dateExtraQuery}
                />
            )}
        </div>
    )
}
