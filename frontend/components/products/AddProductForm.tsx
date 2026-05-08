"use client";
import { useActionState, useEffect } from "react";
import { addProduct } from "@/actions/add-product-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddProductForm({ children, }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, dispatch] = useActionState(addProduct, {
    errors: [],
    success: ""
  })
  // Mostrar los mensajes de error
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error))
    }
    if (state.success) {
      toast.success(state.success)
      router.push('/admin/products')
    }
  }, [state])

  return (
    <form className="space-y-5"
      action={dispatch}>

      {children}
      <input
        type="submit"
        className="text-white rounded bg-green-600  font-bold py-2 w-full cursor-pointer"
        value="Agregar Producto"
      />
    </form>
  );
}
