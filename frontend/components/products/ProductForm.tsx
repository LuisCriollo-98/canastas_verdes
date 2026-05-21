import { CategoriesResponseSchema, FarmsResponseSchema, MunicipalityResponseSchema, ProductEdit, ProductPresentationResponseSchema } from "@/src/schemas"
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

async function getFarms() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value
  const req = await fetch(`${process.env.API_URL}/farms?take=200`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (!req.ok) return []
  const data = FarmsResponseSchema.parse(await req.json())
  return data.farms
}

export default async function ProductForm({ product }: { product?: ProductEdit }) {
  const [categories, municipalities, presentations, farms] = await Promise.all([
    getCategories(),
    getMunicipalities(),
    getPresentations(),
    getFarms(),
  ])

  return (
    <ProductFormClient
      categories={categories}
      municipalities={municipalities}
      presentations={presentations}
      farms={farms}
      product={product}
    />
  )
}