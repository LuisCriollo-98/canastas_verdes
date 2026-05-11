import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number, search: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) redirect("/login");

  const params = new URLSearchParams({
    take: String(take),
    skip: String(skip),
  });
  if (search) params.set("name", search);

  const req = await fetch(`${process.env.API_URL}/products?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const json = await req.json();
  const data = ProductsResponseSchema.parse(json);
  return { products: data.products, total: data.total };
}

type SearchParams = Promise<{ page?: string; search?: string }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, search = "" } = await searchParams;
  if (!isValidPage(+(page ?? 1))) redirect("/admin/products?page=1");

  const currentPage = +(page ?? 1);
  const productsPerPage = 20;
  const skip = (currentPage - 1) * productsPerPage;
  const { products, total } = await getProducts(productsPerPage, skip, search);

  const totalPages = Math.ceil(total / productsPerPage);
  if (currentPage > totalPages && totalPages > 0)
    redirect("/admin/products?page=1");

  const searchExtraQuery = search
    ? `&search=${encodeURIComponent(search)}`
    : "";

  return (
    <div>
      {/* Cabecera */}
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
            producto{total !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Buscador */}
      <form method="GET" className="flex items-center gap-2 mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Buscar por nombre..."
          className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input type="hidden" name="page" value="1" />
        <button
          type="submit"
          className="bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-green-700 transition-colors"
        >
          Buscar
        </button>
        {search && (
          <Link
            href="/admin/products?page=1"
            className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
          >
            Limpiar
          </Link>
        )}
      </form>

      {/* Tabla */}
      <ProductsTable products={products} />

      {/* Paginación */}
      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          baseUrl="/admin/products"
          extraQuery={searchExtraQuery}
        />
      )}
    </div>
  );
}
