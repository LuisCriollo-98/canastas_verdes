import Heading from "@/components/ui/Heading"
import FarmsTable from "@/components/farms/FarmsTable"
import Pagination from "@/components/ui/Pagination"
import { FarmDetailSchema } from "@/src/schemas"
import { isValidPage } from "@/src/utils"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { z } from "zod"

const PER_PAGE = 20

const FarmsListResponseSchema = z.object({
    farms: z.array(FarmDetailSchema),
    total: z.number(),
})

async function getFarms(take: number, skip: number, search: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    if (!token) redirect("/login")

    const params = new URLSearchParams({ take: String(take), skip: String(skip) })
    if (search) params.set("name", search)

    const req = await fetch(`${process.env.API_URL}/farms?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    if (!req.ok) redirect("/login")
    return FarmsListResponseSchema.parse(await req.json())
}

type SearchParams = Promise<{ page?: string; search?: string }>

export default async function FarmsPage({ searchParams }: { searchParams: SearchParams }) {
    const { page, search = "" } = await searchParams
    if (!isValidPage(+(page ?? 1))) redirect("/admin/farms?page=1")

    const currentPage = +(page ?? 1)
    const skip = (currentPage - 1) * PER_PAGE
    const { farms, total } = await getFarms(PER_PAGE, skip, search)

    const totalPages = Math.ceil(total / PER_PAGE)
    if (currentPage > totalPages && totalPages > 0) redirect("/admin/farms?page=1")

    const searchExtraQuery = search ? `&search=${encodeURIComponent(search)}` : ""

    return (
        <div>
            <div className="flex flex-col mb-6">
                <div className="flex justify-end mb-4">
                    <Link
                        href="/admin/farms/new"
                        className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
                    >
                        Nueva Finca
                    </Link>
                </div>
                <div>
                    <Heading>Administrar Fincas</Heading>
                    <p className="text-sm text-gray-500 mt-1">
                        Actualmente tienes{" "}
                        <span className="font-semibold text-green-600">{total}</span>{" "}
                        finca{total !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            <form method="GET" className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Buscar por nombre..."
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
                        href="/admin/farms?page=1"
                        className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                    >
                        Limpiar
                    </Link>
                )}
            </form>

            <FarmsTable farms={farms} />

            {totalPages > 1 && (
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    baseUrl="/admin/farms"
                    extraQuery={searchExtraQuery}
                />
            )}
        </div>
    )
}
