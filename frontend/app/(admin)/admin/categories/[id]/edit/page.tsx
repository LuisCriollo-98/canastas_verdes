import EditCategoryForm from "@/components/categories/EditCategoryForm"
import Heading from "@/components/ui/Heading"
import { CategorySchema } from "@/src/schemas"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getCategoryById(id: string) {
    const req = await fetch(`${process.env.API_URL}/categories/${id}`, {
        cache: "no-store",
    })
    if (!req.ok) notFound()
    const json = await req.json()
    return CategorySchema.parse(json)
}

type Params = Promise<{ id: string }>

export default async function EditCategoryPage({ params }: { params: Params }) {
    const { id } = await params
    const category = await getCategoryById(id)

    return (
        <>
            <Link
                href="/admin/categories"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Categorías
            </Link>
            <Heading>Editar Categoría: {category.name}</Heading>
            <EditCategoryForm>
                <div className="space-y-2">
                    <label htmlFor="name" className="block">Nombre Categoría</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={category.name}
                        placeholder="Nombre Categoría"
                        className="border border-gray-300 w-full p-2"
                    />
                </div>
            </EditCategoryForm>
        </>
    )
}
