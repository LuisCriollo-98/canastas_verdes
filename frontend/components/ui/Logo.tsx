// componente para mostrar el logo
export default function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
                <span className="text-lg font-extrabold text-gray-800 tracking-tight">
                    Canastas Verdes
                </span>
                <span className="text-xs text-gray-400 font-bold">
                    Frutas y verduras
                </span>
            </div>
        </div>
    )
}