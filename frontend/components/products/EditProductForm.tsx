"use client";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { updateProduct } from "@/actions/update-product-action";


type Params = { id: string }

export default function EditProductForm({ children, }: { children: React.ReactNode }) {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    const updateProductWithId = updateProduct.bind(null, +id)
    const [state, dispath] = useActionState(updateProductWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/products')
        }
    }, [state])

    return (
        <form className="space-y-5"
            action={dispath}
        >
            {children}
            <input
                type="submit"
                className="text-white rounded bg-green-600  font-bold py-2 w-full cursor-pointer"
                value="Guardar cambios"
            />
        </form>
    );
}