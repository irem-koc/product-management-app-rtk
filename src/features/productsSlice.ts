import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";
import { Category, Product } from "../types/types";

interface ProductState {
  filter: Category;
  products: Product[];
  filteredProducts: Product[];
  carts: (Product & { quantity: number })[];
}

const initialState: ProductState = {
  filter: {
    category: "",
    search: "",
  },
  products: [],
  filteredProducts: [],
  carts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleFilter: (state, action: PayloadAction<Category>) => {
      state.filter = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        const matchesCategory =
          action.payload.category && action.payload.category !== "all"
            ? product.category === action.payload.category
            : true;
        const matchesSearch = action.payload.search
          ? product.title
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          : true;
        return matchesCategory && matchesSearch;
      });
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
        state.filteredProducts = state.products;
      }
    );
  },
});

export const { handleFilter, addToCart } = productSlice.actions;
export default productSlice.reducer;
