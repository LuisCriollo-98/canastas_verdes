import AddMunicipalityForm from "@/components/municipalities/AddMunicipalityForm"
import Heading from "@/components/ui/Heading"
import Link from "next/link"

export default function NewMunicipalityPage() {
    return (
        <>
            <Link
                href="/admin/municipalities"
                className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
            >
                Volver a Municipios
            </Link>
            <Heading>Nuevo Municipio</Heading>
            <AddMunicipalityForm>
                <div className="space-y-2">
                    <label htmlFor="name" className="block">Nombre Municipio</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Nombre del municipio"
                        className="border border-gray-300 w-full p-2"
                    />
                </div>
            </AddMunicipalityForm>
        </>
    )
}
