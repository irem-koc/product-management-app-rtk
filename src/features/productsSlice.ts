import { productsApi } from "@/api/productsApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface ProductState {
  filter: string;
  products: Product[];
  carts: (Product & { quantity: number })[];
}

const initialState: ProductState = {
  filter: "",
  products: [],
  carts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },

    addToCart: (state, action: PayloadAction<Product>) => {
      const existingCartItem = state.carts.find(
        (cart) => cart.id === action.payload.id
      );

      if (existingCartItem && action.payload.stockAvailable > 0) {
        existingCartItem.quantity += 1;
        existingCartItem.stockAvailable -= 1;
      } else if (action.payload.stockAvailable > 0) {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload.map((item: Product) => ({
          ...item,
          stockAvailable: Math.floor(Math.random() * 20) + 1,
          isFavorite: false,
        }));
      }
    );
  },
});

export const { setFilter, addToCart } = productSlice.actions;
export default productSlice.reducer;
