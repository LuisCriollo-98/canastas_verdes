"use client"

import { deletePresentation } from "@/actions/delete-presentation-action"
import { useTransition } from "react"
import { toast } from "react-toastify"

export default function DeletePresentationForm({ presentationId }: { presentationId: number }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deletePresentation(presentationId)
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
