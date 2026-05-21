import Link from "next/link"
import DeleteFarmForm from "./DeleteFarmForm"

type Farm = {
    id: number
    name: string
    address: string
    phone: string
    email: string
    municipality: { id: number; name: string }
}

export default function FarmsTable({ farms }: { farms: Farm[] }) {
    if (farms.length === 0) {
        return <p className="text-center text-gray-500 py-10">No hay fincas para mostrar.</p>
    }

    return (
        <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nombre</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Municipio</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Teléfono</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {farms.map((farm) => (
                        <tr key={farm.id}>
                            <td className="px-3 py-4 text-sm text-gray-900 font-medium">{farm.name}</td>
                            <td className="px-3 py-4 text-sm text-gray-500">{farm.municipality.name}</td>
                            <td className="px-3 py-4 text-sm text-gray-500">{farm.phone}</td>
                            <td className="px-3 py-4 text-sm text-gray-500">{farm.email}</td>
                            <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <div className="flex gap-5 justify-end items-center">
                                    <Link
                                        className="text-green-600 hover:text-green-800"
                                        href={`/admin/farms/${farm.id}/edit`}
                                    >
                                        Editar
                                    </Link>
                                    <DeleteFarmForm farmId={farm.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
