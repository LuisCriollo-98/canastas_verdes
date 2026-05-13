import Heading from "@/components/ui/Heading";
import CategoriesTable from "@/components/categories/CategoriesTable";
import Pagination from "@/components/ui/Pagination";
import { CategoriesResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const PER_PAGE = 20;

async function getCategories() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) redirect("/login");

  const req = await fetch(`${process.env.API_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!req.ok) redirect("/login");
  return CategoriesResponseSchema.parse(await req.json());
}

type SearchParams = Promise<{ page?: string; search?: string }>;

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, search = "" } = await searchParams;
  if (!isValidPage(+(page ?? 1))) redirect("/admin/categories?page=1");

  const currentPage = +(page ?? 1);
  const all = await getCategories();

  const filtered = search
    ? all.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : all;

  const total = filtered.length;
  const totalPages = Math.ceil(total / PER_PAGE);

  if (currentPage > totalPages && totalPages > 0)
    redirect("/admin/categories?page=1");

  const categories = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const searchExtraQuery = search
    ? `&search=${encodeURIComponent(search)}`
    : "";

  return (
    <div>
      <div className="flex flex-col mb-6">
        <div className="flex justify-end mb-4">
          <Link
            href="/admin/categories/new"
            className="rounded bg-green-600 text-white font-bold py-2 px-10 hover:bg-green-700 transition-colors"
          >
            Nueva Categoría
          </Link>
        </div>
        <div>
          <Heading>Administrar Categorías</Heading>
          <p className="text-sm text-gray-500 mt-1">
            Actualmente tienes{" "}
            <span className="font-semibold text-green-600">{total}</span>{" "}
            categoría{total !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

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
            href="/admin/categories?page=1"
            className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
          >
            Limpiar
          </Link>
        )}
      </form>

      <CategoriesTable categories={categories} />

      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          baseUrl="/admin/categories"
          extraQuery={searchExtraQuery}
        />
      )}
    </div>
  );
}
