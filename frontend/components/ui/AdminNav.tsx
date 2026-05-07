import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { logout } from "@/actions/auth-actions";

export default function AdminNav() {
  return (
    <header className="px-10 py-5 bg-white flex justify-between">
      <div className="flex gap-5 text-white">
        <Logo />
      </div>

      <div className="flex gap-2 items-center">
        <Link
          href={"/admin/products"}
          className="rounded text-black font-bold p-2"
        >
          Productos
        </Link>

        <Link
          href={"/admin/orders"}
          className="rounded text-black font-bold p-2"
        >
          Pedidos
        </Link>
        <Link
          href={"/admin/categories"}
          className="rounded text-black font-bold p-2"
        >
          Categorias
        </Link>

        <Link
          href={"/"}
          className="rounded bg-green-600 text-white font-bold py-2 px-10"
        >
          Tienda
        </Link>

        <form action={logout}>
          <button
            type="submit"
            className="rounded text-black cursor-pointer font-bold py-2 px-10"
          >
            Cerrar Sesión
          </button>
        </form>
      </div>
    </header>
  );
}
