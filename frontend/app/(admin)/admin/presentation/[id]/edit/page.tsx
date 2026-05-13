import EditPresentationForm from "@/components/presentation/EditPresentationForm"
import Heading from "@/components/ui/Heading"
import { ProductPresentationSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getPresentationById(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const req = await fetch(`${process.env.API_URL}/products-presentation/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    if (!req.ok) notFound()
    return ProductPresentationSchema.parse(await req.json())
}

type Params = Promise<{ id: string }>

export default async function EditPresentationPage({ params }: { params: Params }) {
    const { id } = await params
    const presentation = await getPresentationById(id)

    return (
        <>
            <Link
                href="/admin/presentation"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Presentaciones
            </Link>
            <Heading>Editar Presentación: {presentation.description}</Heading>
            <EditPresentationForm>
                <div className="space-y-2">
                    <label htmlFor="description" className="block">Descripción</label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        defaultValue={presentation.description}
                        placeholder="Ej: Caja de 5kg"
                        className="border border-gray-300 w-full p-2"
                    />
                </div>
            </EditPresentationForm>
        </>
    )
}
