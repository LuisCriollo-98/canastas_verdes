import { TransactionsResponseSchema } from "@/src/schemas"
import { formatCurrency } from "@/src/utils"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { searchParams } = req.nextUrl
    const dateFrom = searchParams.get("dateFrom") ?? ""
    const dateTo = searchParams.get("dateTo") ?? ""

    const params = new URLSearchParams({ limit: "10000", page: "1" })
    if (dateFrom) params.set("dateFrom", dateFrom)
    if (dateTo) params.set("dateTo", dateTo)

    const res = await fetch(`${process.env.API_URL}/transactions?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })

    if (!res.ok) return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 })

    const json = await res.json()
    const { transactions } = TransactionsResponseSchema.parse(json)

    const headers = ["ID", "Fecha", "Cliente", "Email", "Teléfono", "Productos", "Total", "Estado"]
    const statusLabel: Record<string, string> = {
        pending: "Pendiente",
        delivered: "Entregado",
        cancelled: "Cancelado",
    }

    const rows = transactions.map((t) => [
        t.id,
        new Date(t.transactionsDate).toLocaleDateString("es-CO"),
        t.user.name,
        t.user.email,
        t.user.phone,
        t.contents.map((c) => `${c.quantity}x ${c.product.name}`).join(" | "),
        formatCurrency(t.total),
        statusLabel[t.status] ?? t.status,
    ])

    const csv = [headers, ...rows]
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        .join("\n")

    const filename = `pedidos${dateFrom ? `_${dateFrom}` : ""}${dateTo ? `_${dateTo}` : ""}.csv`

    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    })
}
