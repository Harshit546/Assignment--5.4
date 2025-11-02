import type { Product, ProductsResponse } from "./types";

// Fetches a paginated list of products from the API
export async function fetchProducts(
  limit: number, // Number of products to fetch per request
  skip: number, // Number of products to skip for pagination
  params: Record<string, string | number | undefined> = {}
): Promise<ProductsResponse> {
  const baseUrl = params.q
    ? `https://dummyjson.com/products/search`
    : `https://dummyjson.com/products`;

  // Construct the url with query parameters  
  const url = new URL(baseUrl);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  if (params.q) url.searchParams.set("q", String(params.q));

  // Data will be fetched from the API
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Fetches a single product by its ID from the API
export async function fetchProductById(id: number): Promise<Product> {
  // Fetch product data by ID
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
