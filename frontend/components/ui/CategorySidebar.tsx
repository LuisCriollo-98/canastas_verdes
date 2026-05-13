import { CategoriesResponseSchema } from "@/src/schemas";
import CategoryLink from "./CategoryLink";
import CategoryMobileMenu from "./CategoryMobileMenu";

async function getCategories() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  return CategoriesResponseSchema.parse(json);
}

export default async function CategorySidebar() {
  const categories = await getCategories();

  return (
    <>
      {/* Sidebar — solo pantallas grandes */}
      <aside className="hidden lg:flex lg:flex-col w-56 flex-shrink-0 bg-white border-r border-green-100 h-screen overflow-y-auto pt-6 pb-32">
        <nav className="flex flex-col gap-1 px-3">
          <h2 className="px-5 text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            Categorías
          </h2>
          {categories.map((category) => (
            <CategoryLink key={category.id} category={category} />
          ))}
        </nav>
      </aside>

      {/* Menú desplegable — solo móvil */}
      <div className="lg:hidden">
        <CategoryMobileMenu categories={categories} />
      </div>
    </>
  );
}
