"use client"

import { useActionState, useEffect } from "react"
import { addCategory } from "@/actions/add-category-action"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function AddCategoryForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [state, dispatch] = useActionState(addCategory, {
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
                value="Agregar Categoría"
            />
        </form>
    )
}
