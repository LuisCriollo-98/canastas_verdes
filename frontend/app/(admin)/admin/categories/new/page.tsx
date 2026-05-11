import AddCategoryForm from "@/components/categories/AddCategoryForm"
import Heading from "@/components/ui/Heading"
import Link from "next/link"

export default function NewCategoryPage() {
    return (
        <>
            <Link
                href="/admin/categories"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Categorías
            </Link>
            <Heading>Nueva Categoría</Heading>
            <AddCategoryForm>
                <div className="space-y-2">
                    <label htmlFor="name" className="block">Nombre Categoría</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Nombre Categoría"
                        className="border border-gray-300 w-full p-2"
                    />
                </div>
            </AddCategoryForm>
        </>
    )
}
