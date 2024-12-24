import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface CartState {
  items: (Product & { quantity: number })[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        if (action.payload.stockAvailable > 0) {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.quantity < item.stockAvailable) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
