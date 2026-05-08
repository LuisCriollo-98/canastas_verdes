import {
  CategoriesResponseSchema,
  MunicipalityResponseSchema,
  ProductPresentationResponseSchema,
} from "@/src/schemas";

async function getCategories() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  const categories = CategoriesResponseSchema.parse(json);
  return categories;
}

async function getMunicipalities() {
  const url = `${process.env.API_URL}/municipalities`;
  const req = await fetch(url);
  const json = await req.json();
  const municipalities = MunicipalityResponseSchema.parse(json);
  return municipalities;
}

async function getPresentations() {
  const url = `${process.env.API_URL}/products-presentations`;
  const req = await fetch(url);
  const json = await req.json();
  const presentations = ProductPresentationResponseSchema.parse(json);
  return presentations;
}

export default async function ProductForm() {
  const categories = await getCategories();
  const municipalities = await getMunicipalities();
  const presentations = await getPresentations();

  console.log(municipalities);
  console.log(presentations);
  return (
    <>
      {/* nombre del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="name" className="block">
          Nombre Producto
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre Producto"
          className="border border-gray-300 w-full p-2"
          name="name"
        />
      </div>

      {/* costo logistico del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="costLogistic" className="block">
          Costo logistico
        </label>
        <input
          id="costLogistic"
          type="number"
          placeholder="Costo logistico"
          className="border border-gray-300 w-full p-2"
          name="costLogistic"
          min={0}
        />
      </div>

      {/* costo transporte del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="costTransport" className="block">
          Costo Transporte
        </label>
        <input
          id="costTransport"
          type="number"
          placeholder="Costo transporte"
          className="border border-gray-300 w-full p-2"
          name="costTransport"
          min={0}
        />
      </div>

      {/* precio sugerido del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="priceSuggested" className="block">
          Precio sugerido
        </label>
        <input
          id="priceSuggested"
          type="number"
          placeholder="Precio sugerido"
          className="border border-gray-300 w-full p-2"
          name="priceSuggested"
          min={0}
        />
      </div>

      {/* precio final del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="priceFinal" className="block">
          Precio final
        </label>
        <input
          id="priceFinal"
          type="number"
          placeholder="Precio final"
          className="border border-gray-300 w-full p-2"
          name="priceFinal"
          min={0}
        />
      </div>
      {/* inventario del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="inventory" className="block">
          Inventario
        </label>
        <input
          id="inventory"
          type="number"
          placeholder="Cantidad Disponible"
          className="border border-gray-300 w-full p-2"
          name="inventory"
          min={0}
        />
      </div>

      {/* categoria del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="categoryId" className="block">
          Categoría
        </label>
        <select
          id="categoryId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="categoryId"
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* municipio del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="municipalityId" className="block">
          Municipio
        </label>
        <select
          id="municipalityId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="municipalityId"
        >
          <option value="">Seleccionar Municipio</option>
        </select>
      </div>

      {/* presentacion del producto*/}
      <div className="space-y-2 ">
        <label htmlFor="presentationId" className="block">
          Presentación
        </label>
        <select
          id="presentationId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="presentationId"
        >
          <option value="">Seleccionar Presentación</option>
        </select>
      </div>
    </>
  );
}
