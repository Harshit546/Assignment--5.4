import type { Product, ProductsResponse } from "./types";

export async function fetchProducts(
  limit: number,
  skip: number,
  params: Record<string, string | number | undefined> = {}
): Promise<ProductsResponse> {
  const baseUrl = params.q
    ? `https://dummyjson.com/products/search`
    : `https://dummyjson.com/products`;

  const url = new URL(baseUrl);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  if (params.q) url.searchParams.set("q", String(params.q));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
