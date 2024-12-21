import { Product } from "@/types/types";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import FaHeart for the favorite icon
import { Link } from "react-router";

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
  // const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAddToCart = () => {
    console.log(`Product with id: ${id} added to cart`);
  };

  const toggleFavorite = () => {
    // setIsFavorite(!isFavorite);
    console.log(`Product with id: ${id} favorited`);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Link to={`#`}>
      <div className="overflow-scroll flex flex-col items-start justify-between max-w-sm h-[780px] p-4 border rounded-lg shadow-md bg-white transform transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full hover:opacity-70 h-44 object-contain my-4 transition duration-300"
        />
        <h2 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600">
          {title}
        </h2>

        {/* Description Section */}
        <p
          className={`text-gray-600 text-sm mt-2 line-clamp-2 transition-colors duration-300 ${
            showFullDescription ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {description}
        </p>

        {/* Show More Button */}
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

        {/* Stock Status - Tag */}
        <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-bold py-1 px-3 rounded-full">
          {stockAvailable > 0 ? "Available" : "Not Available"}
        </div>

        {/* Add to Cart Button */}
        {stockAvailable > 0 && (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        )}

        {/* Favorite Button */}
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
    </Link>
  );
};

export default ProductCard;
