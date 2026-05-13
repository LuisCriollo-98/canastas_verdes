import EditMunicipalityForm from "@/components/municipalities/EditMunicipalityForm"
import Heading from "@/components/ui/Heading"
import { MunicipalitySchema } from "@/src/schemas"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getMunicipalityById(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/municipalities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    if (!req.ok) notFound()
    return MunicipalitySchema.parse(await req.json())
}

type Params = Promise<{ id: string }>

export default async function EditMunicipalityPage({ params }: { params: Params }) {
    const { id } = await params
    const municipality = await getMunicipalityById(id)

    return (
        <>
            <Link
                href="/admin/municipalities"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Municipios
            </Link>
            <Heading>Editar Municipio: {municipality.name}</Heading>
            <EditMunicipalityForm>
                <div className="space-y-2">
                    <label htmlFor="name" className="block">Nombre Municipio</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={municipality.name}
                        placeholder="Nombre del municipio"
                        className="border border-gray-300 w-full p-2"
                    />
                </div>
            </EditMunicipalityForm>
        </>
    )
}
