export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortBy = "relevance" | "price" | "rating" | "title";
export type SortOrder = "asc" | "desc";

export interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  minRating: number;
  minPrice: number;
  maxPrice: number;
  loading: boolean;
  error: string | null;
  byId: Record<number, Product>;
  selectedId: number | null;
}
