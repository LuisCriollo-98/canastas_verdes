// componente para mostrar el logo
export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col leading-tight">
        <span className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-gray-800 tracking-tight">
          Canastas Verdes
        </span>
        <span className="text-xs sm:text-sm text-green-600 font-bold">
          Frutas y verduras
        </span>
      </div>
    </div>
  );
}
