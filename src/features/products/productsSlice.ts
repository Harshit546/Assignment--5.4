import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchProductsThunk, fetchProductByIdThunk } from "./productsThunks";
import type { ProductsState, SortBy, SortOrder, Product } from "./types";

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 0,
  limit: 10,
  search: "",
  sortBy: "relevance",
  sortOrder: "asc",
  minRating: 0,
  minPrice: 0,
  maxPrice: 0,
  loading: false,
  error: null,
  byId: {},
  selectedId: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = Math.max(0, action.payload);
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 0;
    },
    setSort(
      state,
      action: PayloadAction<{ sortBy: SortBy; sortOrder: SortOrder }>
    ) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.page = 0;
    },
    setFilters(
      state,
      action: PayloadAction<{
        minRating?: number;
        minPrice?: number;
        maxPrice?: number;
      }>
    ) {
      if (action.payload.minRating !== undefined)
        state.minRating = action.payload.minRating;
      if (action.payload.minPrice !== undefined)
        state.minPrice = action.payload.minPrice;
      if (action.payload.maxPrice !== undefined)
        state.maxPrice = action.payload.maxPrice;
      state.page = 0;
    },
    resetFilters(state) {
      state.minRating = 0;
      state.minPrice = 0;
      state.maxPrice = 0;
      state.sortBy = "relevance";
      state.sortOrder = "asc";
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    // List
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });

    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload;
        state.byId[product.id] = product;
        state.selectedId = product.id;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load product";
      });
  },
});

export const { setPage, setSearch, setSort, setFilters, resetFilters } =
  productsSlice.actions;

export default productsSlice.reducer;

export const selectProductsState = (s: { products: ProductsState }) =>
  s.products;

export const selectVisibleProducts = (s: { products: ProductsState }) => {
  const { items, sortBy, sortOrder, minRating, minPrice, maxPrice } =
    s.products;

  let filtered = items.filter((p) => {
    const ratingOk = p.rating >= (minRating || 0);
    const minPriceOk = minPrice ? p.price >= minPrice : true;
    const maxPriceOk = maxPrice ? p.price <= maxPrice : true;
    return ratingOk && minPriceOk && maxPriceOk;
  });

  const compareMap: Record<SortBy, (a: Product, b: Product) => number> = {
    relevance: () => 0,
    price: (a, b) => a.price - b.price,
    rating: (a, b) => a.rating - b.rating,
    title: (a, b) => a.title.localeCompare(b.title),
  };
  const compare = compareMap[sortBy];
  filtered = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? compare(a, b) : compare(b, a)
  );

  return filtered;
};

export const selectSelectedProduct = (s: { products: ProductsState }) => {
  const { selectedId, byId } = s.products;
  return selectedId ? byId[selectedId] : null;
};
