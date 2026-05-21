import EditFarmForm from "@/components/farms/EditFarmForm"
import Heading from "@/components/ui/Heading"
import { FarmDetailSchema, MunicipalityResponseSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

async function getFarmById(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    const req = await fetch(`${process.env.API_URL}/farms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    if (!req.ok) notFound()
    return FarmDetailSchema.parse(await req.json())
}

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

type Params = Promise<{ id: string }>

export default async function EditFarmPage({ params }: { params: Params }) {
    const { id } = await params
    const [farm, municipalities] = await Promise.all([getFarmById(id), getMunicipalities()])

    return (
        <>
            <Link
                href="/admin/farms"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Fincas
            </Link>
            <Heading>Editar Finca: {farm.name}</Heading>
            <EditFarmForm>
                <div className="space-y-2">
                    <label htmlFor="name" className="block">Nombre</label>
                    <input id="name" type="text" name="name" defaultValue={farm.name}
                        placeholder="Nombre de la finca" className="border border-gray-300 w-full p-2" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="address" className="block">Dirección</label>
                    <input id="address" type="text" name="address" defaultValue={farm.address}
                        placeholder="Dirección" className="border border-gray-300 w-full p-2" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="block">Teléfono</label>
                    <input id="phone" type="text" name="phone" defaultValue={farm.phone}
                        placeholder="Teléfono" className="border border-gray-300 w-full p-2" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block">Email</label>
                    <input id="email" type="email" name="email" defaultValue={farm.email}
                        placeholder="correo@ejemplo.com" className="border border-gray-300 w-full p-2" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="block">Descripción</label>
                    <textarea id="description" name="description" defaultValue={farm.description}
                        placeholder="Descripción de la finca" rows={3}
                        className="border border-gray-300 w-full p-2" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="municipalityId" className="block">Municipio</label>
                    <select id="municipalityId" name="municipalityId" defaultValue={farm.municipality.id}
                        className="border border-gray-300 w-full p-2 bg-white">
                        <option value="">Seleccionar Municipio</option>
                        {municipalities.map((m) => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                </div>
            </EditFarmForm>
        </>
    )
}
