import Heading from "@/components/ui/Heading"
import MunicipalitiesTable from "@/components/municipalities/MunicipalitiesTable"
import Pagination from "@/components/ui/Pagination"
import { MunicipalityResponseSchema } from "@/src/schemas"
import { isValidPage } from "@/src/utils"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

const PER_PAGE = 20

async function getMunicipalities() {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    if (!token) redirect("/login")

    const req = await fetch(`${process.env.API_URL}/municipalities`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    if (!req.ok) redirect("/login")
    return MunicipalityResponseSchema.parse(await req.json())
}

type SearchParams = Promise<{ page?: string }>

export default async function MunicipalitiesPage({ searchParams }: { searchParams: SearchParams }) {
    const { page } = await searchParams
    if (!isValidPage(+(page ?? 1))) redirect("/admin/municipalities?page=1")

    const currentPage = +(page ?? 1)
    const all = await getMunicipalities()
    const total = all.length
    const totalPages = Math.ceil(total / PER_PAGE)

    if (currentPage > totalPages && totalPages > 0) redirect("/admin/municipalities?page=1")

    const municipalities = all.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

    return (
        <div>
            <div className="flex flex-col mb-6">
                <div className="flex justify-end mb-4">
                    <Link
                        href="/admin/municipalities/new"
                        className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
                    >
                        Nuevo Municipio
                    </Link>
                </div>
                <div>
                    <Heading>Administrar Municipios</Heading>
                    <p className="text-sm text-gray-500 mt-1">
                        Actualmente tienes{" "}
                        <span className="font-semibold text-green-600">{total}</span>{" "}
                        municipio{total !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            <MunicipalitiesTable municipalities={municipalities} />

            {totalPages > 1 && (
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    baseUrl="/admin/municipalities"
                />
            )}
        </div>
    )
}
