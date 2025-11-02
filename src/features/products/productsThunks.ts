import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "./productsApi";
import type { RootState } from "../../app/store";
import type { ProductsResponse, Product } from "./types";

// Async thunk to fetch a list of products and automatically retrieves pagination and search details from the Redux state
export const fetchProductsThunk = createAsyncThunk<
  ProductsResponse,
  void,
  { state: RootState }
>("products/fetchList", async (_arg, { getState }) => {
  // Access current pagination and search state from the store
  const { page, limit, search } = getState().products;
  // Calculate the offset
  const skip = page * limit;
  // If search query exists, it will be included as a parameter
  const params = search ? { q: search } : {};
  // Fetch product list from API using utility function
  const data = await fetchProducts(limit, skip, params);
  return data;
});

// Async thunk to fetch a single product by its ID
export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
  "products/fetchById",
  async (id: number) => {
    const data = await fetchProductById(id);
    return data;
  }
);
