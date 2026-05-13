import Heading from "@/components/ui/Heading"
import PresentationsTable from "@/components/presentation/PresentationsTable"
import Pagination from "@/components/ui/Pagination"
import { ProductPresentationResponseSchema } from "@/src/schemas"
import { isValidPage } from "@/src/utils"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

const PER_PAGE = 20

async function getPresentations() {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    if (!token) redirect("/login")

    const req = await fetch(`${process.env.API_URL}/products-presentation`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    if (!req.ok) redirect("/login")
    return ProductPresentationResponseSchema.parse(await req.json())
}

type SearchParams = Promise<{ page?: string; search?: string }>

export default async function PresentationsPage({ searchParams }: { searchParams: SearchParams }) {
    const { page, search = "" } = await searchParams
    if (!isValidPage(+(page ?? 1))) redirect("/admin/presentation?page=1")

    const currentPage = +(page ?? 1)
    const all = await getPresentations()

    const filtered = search
        ? all.filter((p) => p.description.toLowerCase().includes(search.toLowerCase()))
        : all

    const total = filtered.length
    const totalPages = Math.ceil(total / PER_PAGE)

    if (currentPage > totalPages && totalPages > 0) redirect("/admin/presentation?page=1")

    const presentations = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

    const searchExtraQuery = search ? `&search=${encodeURIComponent(search)}` : ""

    return (
        <div>
            <div className="flex flex-col mb-6">
                <div className="flex justify-end mb-4">
                    <Link
                        href="/admin/presentation/new"
                        className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
                    >
                        Nueva Presentación
                    </Link>
                </div>
                <div>
                    <Heading>Administrar Presentaciones</Heading>
                    <p className="text-sm text-gray-500 mt-1">
                        Actualmente tienes{" "}
                        <span className="font-semibold text-green-600">{total}</span>{" "}
                        presentación{total !== 1 ? "es" : ""}
                    </p>
                </div>
            </div>

            <form method="GET" className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Buscar por descripción..."
                    className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input type="hidden" name="page" value="1" />
                <button
                    type="submit"
                    className="bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-green-700 transition-colors"
                >
                    Buscar
                </button>
                {search && (
                    <Link
                        href="/admin/presentation?page=1"
                        className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                    >
                        Limpiar
                    </Link>
                )}
            </form>

            <PresentationsTable presentations={presentations} />

            {totalPages > 1 && (
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    baseUrl="/admin/presentation"
                    extraQuery={searchExtraQuery}
                />
            )}
        </div>
    )
}
