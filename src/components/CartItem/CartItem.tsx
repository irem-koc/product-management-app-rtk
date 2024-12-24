import React from "react";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../features/cartSlice";
import { updateProductStock } from "../../features/productsSlice";
import { useAppDispatch } from "../../store/hook";
import { Product } from "../../types/types";

interface CartItemProps extends Product {
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  image,
  price,
  stockAvailable,
  quantity,
}) => {
  console.log(
    stockAvailable - quantity,
    "stockAvailable - quantitystockAvailable - quantity"
  );
  const dispatch = useAppDispatch();
  const decreaseQuantityHandler = () => {
    dispatch(decreaseQuantity({ id }));
    dispatch(
      updateProductStock({ id, stockAvailable: stockAvailable - quantity + 1 })
    );
  };
  const increaseQuantityHandler = () => {
    dispatch(increaseQuantity({ id }));
    dispatch(
      updateProductStock({ id, stockAvailable: stockAvailable - quantity - 1 })
    );
  };
  const handleDeleteFromCart = () => {
    dispatch(removeFromCart({ id }));
    dispatch(updateProductStock({ id, stockAvailable: stockAvailable }));
  };
  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 rounded-lg object-contain bg-gray-100 p-2"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <p className="text-sm text-gray-500">
          Stok:{" "}
          <span
            className={`font-medium ${
              stockAvailable - quantity > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stockAvailable - quantity > 0
              ? `${stockAvailable - quantity} adet mevcut`
              : "Stokta yok"}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Fiyat:{" "}
          <span className="font-medium text-blue-600">
            ${(price * quantity).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            disabled={quantity === 0}
            onClick={decreaseQuantityHandler}
            className="disabled:bg-gray-100 px-2 py-1 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
          >
            -
          </button>
          <span>{quantity}</span>

          <button
            disabled={stockAvailable - quantity === 0}
            onClick={increaseQuantityHandler}
            className="disabled:bg-gray-100 px-2 py-1 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <button
          onClick={handleDeleteFromCart}
          className="px-2 py-1 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default CartItem;
