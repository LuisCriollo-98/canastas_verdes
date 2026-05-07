import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <>
      <Link
        href="/admin/products?page=1"
        className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
      >
        Volver a Productos
      </Link>
      <Heading>Nuevo Producto</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
