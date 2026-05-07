"use client";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <form className="space-y-5">
      {children}
      <input
        type="submit"
        className="text-white rounded bg-green-600  font-bold py-2 w-full cursor-pointer"
        value="Agregar Producto"
      />
    </form>
  );
}
