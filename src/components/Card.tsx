import React from "react";
import type { Product } from "../features/products/types";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const Card: React.FC<Props> = ({ product }) => (
  <Link
    to={`/products/${product.id}`}
    className="border rounded overflow-hidden hover:shadow-lg transition"
  >
    <img
      src={product.thumbnail}
      alt={product.title}
      className="w-full h-48 object-contain"
    />
    <div className="p-4">
      <h2 className="font-semibold">{product.title}</h2>
      <p className="text-blue-600 font-bold mt-2">${product.price}</p>
    </div>
  </Link>
);

export default Card;
