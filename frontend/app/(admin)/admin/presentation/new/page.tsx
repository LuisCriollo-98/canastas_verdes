import AddPresentationForm from "@/components/presentation/AddPresentationForm"
import Heading from "@/components/ui/Heading"
import Link from "next/link"

export default function NewPresentationPage() {
    return (
        <>
            <Link
                href="/admin/presentation"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Presentaciones
            </Link>
            <Heading>Nueva Presentación</Heading>
            <AddPresentationForm>
                <div className="space-y-2">
                    <label htmlFor="description" className="block">Descripción</label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Ej: Caja de 5kg"
                        className="border border-gray-300 w-full p-2"
                    />
                </div>
            </AddPresentationForm>
        </>
    )
}
