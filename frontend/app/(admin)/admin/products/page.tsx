import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { ProductsResponseSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
async function getProducts() {
  // OBTENER TOKEN DE LAS COOKIES
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  // REDIRECCIONAR AL LOGIN SI NO HAY TOKEN
  if (!token) { redirect("/login"); }

  // PETICION A LA API
  const url = `${process.env.API_URL}/products`;
  // TRAER TOKEN DE LAS COOKIES (COMENTAR PARA DESARROLLO)
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const json = await req.json();
  const data = ProductsResponseSchema.parse(json);
  return {
    products: data.products,
    total: data.total
  }
}

export default async function ProductsPage() {
  const { products, total } = await getProducts()
  return (
    <>
      <Heading>Administrar Productos {total}</Heading>
      <ProductsTable
        products={products}
      />
    </>
  );
}
