import { productsApi } from "@/api/productsApi";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    filter: "",
    products: [],
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload.map((item) => {
          const stockAvailable = Math.floor(Math.random() * 20) + 1;
          return { ...item, stockAvailable, isFavorite: false };
        });
      }
    );
  },
});

export const { setFilter } = productSlice.actions;
export default productSlice.reducer;
