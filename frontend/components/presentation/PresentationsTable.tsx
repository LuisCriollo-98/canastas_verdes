import Link from "next/link"
import DeletePresentationForm from "./DeletePresentationForm"

type Presentation = { id: number; description: string }

export default function PresentationsTable({ presentations }: { presentations: Presentation[] }) {
    if (presentations.length === 0) {
        return <p className="text-center text-gray-500 py-10">No hay presentaciones para mostrar.</p>
    }

    return (
        <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Descripción
                        </th>
                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {presentations.map((presentation) => (
                        <tr key={presentation.id}>
                            <td className="px-3 py-4 text-sm text-gray-500">{presentation.description}</td>
                            <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <div className="flex gap-5 justify-end items-center">
                                    <Link
                                        className="text-green-600 hover:text-green-800"
                                        href={`/admin/presentation/${presentation.id}/edit`}
                                    >
                                        Editar
                                    </Link>
                                    <DeletePresentationForm presentationId={presentation.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
