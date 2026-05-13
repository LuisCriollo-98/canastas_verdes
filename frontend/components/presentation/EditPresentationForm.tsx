"use client"

import { useActionState, useEffect } from "react"
import { updatePresentation } from "@/actions/update-presentation-action"
import { toast } from "react-toastify"
import { useParams, useRouter } from "next/navigation"

export default function EditPresentationForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    const updateWithId = updatePresentation.bind(null, +id)
    const [state, dispatch] = useActionState(updateWithId, { errors: [], success: "" })

    useEffect(() => {
        if (state.errors?.length) state.errors.forEach((e) => toast.error(e))
        if (state.success) {
            toast.success(state.success)
            router.push("/admin/presentation")
        }
    }, [state])

    return (
        <form className="space-y-5" action={dispatch}>
            {children}
            <input
                type="submit"
                className="text-white rounded bg-green-600 font-bold py-2 w-full cursor-pointer hover:bg-green-700 transition-colors"
                value="Guardar cambios"
            />
        </form>
    )
}
