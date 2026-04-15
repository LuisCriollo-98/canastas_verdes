import { CategoriesReponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";
import { getAuthUser } from "@/actions/auth-actions";
import LogoutButton from "@/components/auth/LogoutButton";
import CategorySlider from "@/components/ui/CategorySlider";

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
        <>
            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white border-b border-green-200 shadow-sm">
                <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between gap-6 h-16">
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 pl-3 border-l border-green-600">
                        {user ? (
                            <>
                                <span className="text-green-600 font-semibold text-sm hidden sm:block">
                                    {user.name}
                                </span>
                                <LogoutButton />
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm font-semibold text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-full transition-colors duration-150"
                            >
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* SLIDER */}
            <CategorySlider categories={categories} />
        </>
    )
}