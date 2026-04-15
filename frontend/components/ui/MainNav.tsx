// componente para mostrar la barra de navegación
import { CategoriesReponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";
import { getAuthUser } from "@/actions/auth-actions";
import LogoutButton from "@/components/auth/LogoutButton";

export async function getCategories() {
    const url = `${process.env.API_URL}/categories`;
    const req = await fetch(url)
    const json = await req.json()
    const categories = CategoriesReponseSchema.parse(json)
    return categories
}

export default async function MainNav() {
    const categories = await getCategories()
    const user = await getAuthUser()

    return (
        <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
            <div className="flex justify-center">
                <Logo />
            </div>

            <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/${category.id}`}
                        className="text-white hover:text-green-400 font-bold p-2"
                    >{category.name}</Link>
                ))}

                {/* Separador */}
                <span className="hidden md:block text-gray-500">|</span>

                {/* Sección de autenticación */}
                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-green-400 font-semibold text-sm">
                            {user.name}
                        </span>
                        <LogoutButton />
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="text-white hover:text-green-400 font-bold p-2"
                    >
                        Iniciar sesión
                    </Link>
                )}
            </nav>
        </header>
    )
}