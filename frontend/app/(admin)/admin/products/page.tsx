import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number) {
  // OBTENER TOKEN DE LAS COOKIES
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  // REDIRECCIONAR AL LOGIN SI NO HAY TOKEN
  if (!token) {
    redirect("/login");
  }

  // PETICION A LA API
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
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
    total: data.total,
  };
}

type SearchParams = {
  page: Promise<string>;
};

// tabla de productos que me trae toda la info de los productos y los muestra en una tabla
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;
  if (!isValidPage(+page)) redirect("/admin/products?page=1");

  //productos por pagina
  const productsParPage = 20;
  //salto que se hace para traer los productos
  const skip = (+page - 1) * productsParPage;
  const { products, total } = await getProducts(productsParPage, skip);

  //calculo del total de paginas
  const totalPages = Math.ceil(total / productsParPage);
  //Valida que la pagina sea menor o igual al total de paginas
  if (+page > totalPages) redirect("/admin/products?page=1");

  return (
    <div>
      {/* Header con título y botón */}
      <div className="flex flex-col mb-6">
        <div className="flex justify-end mb-4">
          <Link
            href="/admin/products/new"
            className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
          >
            Nuevo Producto
          </Link>
        </div>
        <div>
          <Heading>Administrar Productos</Heading>
          <p className="text-sm text-gray-500 mt-1">
            Actualmente tienes{" "}
            <span className="font-semibold text-green-600">{total}</span>{" "}
            productos
          </p>
        </div>
      </div>

      {/* Tabla */}
      <ProductsTable products={products} />

      {/* Paginacion */}
      <Pagination
        page={+page}
        totalPages={totalPages}
        baseUrl="/admin/products"
      />
    </div>
  );
}
