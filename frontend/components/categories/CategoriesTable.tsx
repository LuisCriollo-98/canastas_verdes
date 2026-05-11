import { Category } from "@/src/schemas";
import Link from "next/link";
import DeleteCategoryForm from "./DeleteCategoryForm";

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-3 py-4 text-sm text-gray-500">
                {category.name}
              </td>
              <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <div className="flex gap-5 justify-end items-center">
                  <Link
                    className="text-green-600 hover:text-green-800"
                    href={`/admin/categories/${category.id}/edit`}
                  >
                    Editar
                  </Link>
                  <DeleteCategoryForm categoryId={category.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
