import { Product } from "@/types/types";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";
import { addToCart } from "../../features/cartSlice";
import { updateProductStock } from "../../features/productsSlice";
import { useAppDispatch } from "../../store/hook";

const ProductCard: React.FC<Product> = ({
  id,
  image,
  title,
  category,
  rating,
  description,
  price,
  stockAvailable,
  isFavorite,
}) => {
  const dispatch = useAppDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const toggleFavorite = () => {};

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        image,
        title,
        category,
        rating,
        description,
        price,
        stockAvailable,
        isFavorite,
      })
    );
    dispatch(updateProductStock({ id, stockAvailable: stockAvailable - 1 }));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <div>
      <div className="overflow-scroll flex flex-col items-start justify-between max-w-sm h-[780px] p-4 border rounded-lg shadow-md bg-white transform transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer">
        <Link to={`products/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-full hover:opacity-70 h-44 object-contain my-4 transition duration-300"
          />
          <h2 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600">
            {title}
          </h2>

          <p
            className={`text-gray-600 text-sm mt-2 line-clamp-2 transition-colors duration-300 ${
              showFullDescription ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {description}
          </p>

          {description.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-blue-600 text-sm mt-2 hover:text-blue-800 transition-colors duration-300"
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}

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

          <div
            className={`absolute top-4 left-4 text-sm font-bold py-1 px-3 rounded-full ${
              stockAvailable > 0
                ? "bg-green-100 text-green-800 border border-green-500 shadow-md"
                : "bg-red-100 text-red-800 border border-red-500 shadow-md"
            }`}
          >
            {stockAvailable > 0 ? "Available" : "Not Available"}
          </div>
        </Link>

        <button
          onClick={stockAvailable > 0 && !isAdded ? handleAddToCart : undefined}
          disabled={stockAvailable <= 0 || isAdded}
          className={`mt-4 w-full py-2 px-4 font-semibold rounded-md transition-all duration-300 ${
            isAdded
              ? "bg-green-500 text-white hover:bg-green-600 cursor-default"
              : stockAvailable > 0
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isAdded
            ? "Added"
            : stockAvailable > 0
            ? "Add to Cart"
            : "Out of Stock"}
        </button>

        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors duration-300"
        >
          {isFavorite ? (
            <FaHeart size={30} className="text-red-600" />
          ) : (
            <FaRegHeart size={30} className="text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
