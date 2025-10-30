import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProductByIdThunk } from "../features/products/productsThunks";
import { selectSelectedProduct } from "../features/products/productsSlice";
import Loader from "../components/Loader";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector((s) => s.products.loading);
  const error = useAppSelector((s) => s.products.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdThunk(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-contain mb-4"
        loading="lazy"
      />
      <p className="mb-5 text-lg">{product.description}</p>
      <p className="font-bold text-xl mb-5">
        Price: {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
      </p>
      <p className="text-lg">Rating: {product.rating}</p>
    </div>
  );
};

export default ProductDetail;
