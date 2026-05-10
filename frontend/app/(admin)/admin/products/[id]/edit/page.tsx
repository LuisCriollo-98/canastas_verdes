import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ProductEditSchema } from "@/src/schemas";

async function getProductById(id: string) {
    const url = `${process.env.API_URL}/products/${id}`
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    const req = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    })
    const json = await req.json()
    if (!req.ok) notFound()
    return ProductEditSchema.parse(json)
}

type Params = Promise<{ id: string }>

export default async function EditProductPage({ params }: { params: Params }) {
    const { id } = await params;
    const product = await getProductById(id)
    return (
        <>

            <Link
                href="/admin/products?page=1"
                className="rounded bg-green-600 text-white font-bold py-2 px-10"
            >
                Volver a Productos
            </Link>
            <Heading>Editar Producto: {product.name}</Heading>
            <EditProductForm>
                <ProductForm
                    product={product}
                />
            </EditProductForm>

        </>
    )
}