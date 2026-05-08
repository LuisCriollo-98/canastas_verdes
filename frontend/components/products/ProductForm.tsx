import { CategoriesResponseSchema, MunicipalityResponseSchema, ProductPresentationResponseSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import ProductFormClient from "./ProductFormClient"

async function getCategories() {
  const url = `${process.env.API_URL}/categories`
  const req = await fetch(url)
  return CategoriesResponseSchema.parse(await req.json())
}

async function getMunicipalities() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value
  const req = await fetch(`${process.env.API_URL}/municipalities`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  return MunicipalityResponseSchema.parse(await req.json())
}

async function getPresentations() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value
  const req = await fetch(`${process.env.API_URL}/products-presentation`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  return ProductPresentationResponseSchema.parse(await req.json())
}

export default async function ProductForm() {
  const [categories, municipalities, presentations] = await Promise.all([
    getCategories(),
    getMunicipalities(),
    getPresentations(),
  ])

  return (
    <ProductFormClient
      categories={categories}
      municipalities={municipalities}
      presentations={presentations}
    />
  )
}