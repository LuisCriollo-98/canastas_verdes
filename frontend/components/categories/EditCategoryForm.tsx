"use client"

import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useParams, useRouter } from "next/navigation"
import { updateCategory } from "@/actions/update-category-action"

export default function EditCategoryForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    const updateCategoryWithId = updateCategory.bind(null, +id)
    const [state, dispatch] = useActionState(updateCategoryWithId, {
        errors: [],
        success: ""
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(e => toast.error(e))
        }
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/categories')
        }
    }, [state])

    return (
        <form className="space-y-5" action={dispatch}>
            {children}
            <input
                type="submit"
                className="text-white rounded bg-green-600 font-bold py-2 w-full cursor-pointer"
                value="Guardar cambios"
            />
        </form>
    )
}
