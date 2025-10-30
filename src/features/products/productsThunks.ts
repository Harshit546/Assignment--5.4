import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "./productsApi";
import type { RootState } from "../../app/store";
import type { ProductsResponse, Product } from "./types";

export const fetchProductsThunk = createAsyncThunk<
  ProductsResponse,
  void,
  { state: RootState }
>("products/fetchList", async (_arg, { getState }) => {
  const { page, limit, search } = getState().products;
  const skip = page * limit;
  const params = search ? { q: search } : {};
  const data = await fetchProducts(limit, skip, params);
  return data;
});

export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
  "products/fetchById",
  async (id: number) => {
    const data = await fetchProductById(id);
    return data;
  }
);
