// ProductCard.tsx
import { Product } from "@/types/types";
import React from "react";
import { Link } from "react-router";

const ProductCard: React.FC<Product> = ({
  id,
  image,
  title,
  category,
  rating,
  description,
  price,
}) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="max-w-sm h-[700px] p-4 border rounded-lg shadow-md bg-white transform transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full hover:opacity-70 h-48 object-contain mb-4 transition duration-300 "
        />
        <h2 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2 transition-colors duration-300 hover:text-gray-800">
          {description}
        </p>
        <p className="text-lg font-bold text-blue-600 mt-2">
          ${price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mt-1 transition-colors duration-300 hover:text-gray-700">
          Kategori: {category}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-yellow-500">
            <span>⭐ {rating.rate}</span>
          </div>
          <span className="text-sm text-gray-500 transition-colors duration-300 hover:text-gray-700">
            ({rating.count} yorum)
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
