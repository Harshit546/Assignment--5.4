import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProductsThunk } from "../features/products/productsThunks";
import {
  selectProductsState,
  selectVisibleProducts,
  setPage,
  setSearch,
  setSort,
  setFilters,
  resetFilters,
} from "../features/products/productsSlice";
import type { SortBy, SortOrder } from "../features/products/types";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";

export default function ProductsList() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectProductsState);
  const products = useAppSelector(selectVisibleProducts);

  const [searchInput, setSearchInput] = useState(state.search);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch, state.page, state.search]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== state.search) {
        dispatch(setSearch(searchInput));
      }
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput, state.search, dispatch]);

  const hasPrev = state.page > 0;
  const hasNext = (state.page + 1) * state.limit < state.total;

  const sortOptions: { label: string; value: SortBy }[] = useMemo(
    () => [
      { label: "Relevance", value: "relevance" },
      { label: "Price", value: "price" },
      { label: "Rating", value: "rating" },
      { label: "Title", value: "title" },
    ],
    []
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          placeholder="Search..."
          className="border px-3 py-2 rounded w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="border px-3 py-2 rounded w-full"
            value={state.sortBy}
            onChange={(e) =>
              dispatch(
                setSort({
                  sortBy: e.target.value as SortBy,
                  sortOrder: state.sortOrder,
                })
              )
            }
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded w-full"
            value={state.sortOrder}
            onChange={(e) =>
              dispatch(
                setSort({
                  sortBy: state.sortBy,
                  sortOrder: e.target.value as SortOrder,
                })
              )
            }
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <input
          type="number"
          min={0}
          placeholder="Min price"
          className="border px-3 py-2 rounded w-full"
          value={state.minPrice || ""}
          onChange={(e) =>
            dispatch(setFilters({ minPrice: Number(e.target.value || 0) }))
          }
        />

        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            placeholder="Max price"
            className="border px-3 py-2 rounded w-full"
            value={state.maxPrice || ""}
            onChange={(e) =>
              dispatch(setFilters({ maxPrice: Number(e.target.value || 0) }))
            }
          />
          <input
            type="number"
            min={0}
            max={5}
            step={0.5}
            placeholder="Min rating"
            className="border px-3 py-2 rounded w-full"
            value={state.minRating || ""}
            onChange={(e) =>
              dispatch(setFilters({ minRating: Number(e.target.value || 0) }))
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Button onClick={() => dispatch(resetFilters())}>Reset</Button>
        <span className="text-sm text-gray-600">
          Showing {products.length} of {state.total} products
        </span>
      </div>

      {state.loading ? (
        <Loader />
      ) : state.error ? (
        <p className="text-red-600">{state.error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <Card key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button
          disabled={!hasPrev}
          onClick={() => dispatch(setPage(state.page - 1))}
        >
          Previous
        </Button>
        <span>Page {state.page + 1}</span>
        <Button
          disabled={!hasNext}
          onClick={() => dispatch(setPage(state.page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
