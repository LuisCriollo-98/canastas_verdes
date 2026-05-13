"use client"

import { deleteMunicipality } from "@/actions/delete-municipality-action"
import { useTransition } from "react"
import { toast } from "react-toastify"

export default function DeleteMunicipalityForm({ municipalityId }: { municipalityId: number }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteMunicipality(municipalityId)
            if (result.error) toast.error(result.error)
            else toast.success(result.success)
        })
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-600 hover:text-red-800 cursor-pointer disabled:opacity-50"
        >
            {isPending ? "Eliminando..." : "Eliminar"}
        </button>
    )
}
