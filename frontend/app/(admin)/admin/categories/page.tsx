import Heading from "@/components/ui/Heading";
import CategoriesTable from "@/components/categories/CategoriesTable";
import { CategoriesResponseSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getCategories() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) redirect("/login");

  const req = await fetch(`${process.env.API_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!req.ok) redirect("/login");

  const json = await req.json();
  return CategoriesResponseSchema.parse(json);
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      {/* Cabecera */}
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
            <span className="font-semibold text-green-600">
              {categories.length}
            </span>{" "}
            categoría{categories.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Tabla */}
      <CategoriesTable categories={categories} />
    </div>
  );
}
