'use client'

import { previewPrices } from "@/actions/preview-prices";
import { useState } from "react"

type Category = { id: number; name: string }
type Municipality = { id: number; name: string }
type Presentation = { id: number; description: string }
type PricePreview = {
    price: number
    logisticsCost: number
    transportCost: number
    priceFinal: number
}

type Props = {
    categories: Category[]
    municipalities: Municipality[]
    presentations: Presentation[]
}

export default function ProductFormClient({ categories, municipalities, presentations }: Props) {
    const [preview, setPreview] = useState<PricePreview | null>(null)
    const [priceFinal, setPriceFinal] = useState(0)
    async function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        const price = Number(e.target.value)
        if (!price || price <= 0) { setPreview(null); return }
        const data = await previewPrices(price)
        if (!data) return
        setPreview(data)
        setPriceFinal(data.priceFinal)
    }

    return (
        <>
            {/* nombre */}
            <div className="space-y-2">
                <label htmlFor="name" className="block">Nombre Producto</label>
                <input id="name" type="text" placeholder="Nombre Producto"
                    className="border border-gray-300 w-full p-2" name="name" />
            </div>

            {/* precio base */}
            <div className="space-y-2">
                <label htmlFor="price" className="block">Precio base</label>
                <input id="price" type="number" placeholder="Precio base"
                    className="border border-gray-300 w-full p-2" name="price"
                    min={0} onBlur={handlePriceChange} />
            </div>

            {/* costo logistico — solo lectura */}
            <div className="space-y-2">
                <label htmlFor="costLogistics" className="block">
                    Costo logístico
                    <span className="text-xs text-gray-400 ml-1">(5% del precio)</span>
                </label>
                <input id="costLogistics" type="number"
                    className="border border-gray-200 w-full p-2 bg-gray-50 text-gray-500"
                    name="costLogistics"
                    value={preview?.logisticsCost ?? 0}
                    readOnly />
            </div>

            {/* costo transporte — solo lectura */}
            <div className="space-y-2">
                <label htmlFor="costTransport" className="block">
                    Costo transporte
                    <span className="text-xs text-gray-400 ml-1">(5% del precio)</span>
                </label>
                <input id="costTransport" type="number"
                    className="border border-gray-200 w-full p-2 bg-gray-50 text-gray-500"
                    name="costTransport"
                    value={preview?.transportCost ?? 0}
                    readOnly />
            </div>

            {/* precio sugerido — editable, al modificar actualiza priceFinal 
            <div className="space-y-2">
                <label htmlFor="priceFinal" className="block">
                    Precio sugerido
                    <span className="text-xs text-gray-400 ml-1">(valor modificado por el usuario)</span>
                </label>
                <input id="priceFinal" type="number"
                    className="border border-gray-300 w-full p-2"
                    name="priceFinal"
                    value={priceFinal}
                    onChange={handlePriceChange} />
            </div>*/}

            <div className="space-y-2">
                <label htmlFor="priceFinal" className="block">Precio final</label>
                <input id="priceFinal" type="number"
                    className="border border-gray-200 w-full p-2 bg-gray-50 text-gray-500"
                    name="priceFinal"
                    value={priceFinal}
                    readOnly />
            </div>

            {/* inventario */}
            <div className="space-y-2">
                <label htmlFor="inventory" className="block">Inventario</label>
                <input id="inventory" type="number" placeholder="Cantidad Disponible"
                    className="border border-gray-300 w-full p-2" name="inventory" min={0} />
            </div>

            {/* categoria */}
            <div className="space-y-2">
                <label htmlFor="categoryId" className="block">Categoría</label>
                <select id="categoryId" name="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white">
                    <option value="">Seleccionar Categoría</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* municipio */}
            <div className="space-y-2">
                <label htmlFor="municipalityId" className="block">Municipio</label>
                <select id="municipalityId" name="municipalityId"
                    className="border border-gray-300 w-full p-2 bg-white">
                    <option value="">Seleccionar Municipio</option>
                    {municipalities.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </div>

            {/* presentacion */}
            <div className="space-y-2">
                <label htmlFor="presentationId" className="block">Presentación</label>
                <select id="presentationId" name="presentationId"
                    className="border border-gray-300 w-full p-2 bg-white">
                    <option value="">Seleccionar Presentación</option>
                    {presentations.map(p => (
                        <option key={p.id} value={p.id}>{p.description}</option>
                    ))}
                </select>
            </div>
        </>
    )
}