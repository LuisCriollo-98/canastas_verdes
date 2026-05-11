import Logo from "./Logo";
import Link from "next/link";
import { getAuthUser } from "@/actions/auth-actions";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function MainNav() {
  const user = await getAuthUser();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between gap-6 h-16">
        <div className="shrink-0">
          <Logo />
        </div>
        <div className="flex items-center gap-3 shrink-0 pl-3 border-l border-green-600">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/admin/products?page=1"
                  className="text-sm font-semibold text-white bg-green-700 hover:bg-green-800 px-4 py-1.5 rounded-full transition-colors duration-150 hidden sm:block"
                >
                  Panel de administrador
                </Link>
              )}
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
  );
}
