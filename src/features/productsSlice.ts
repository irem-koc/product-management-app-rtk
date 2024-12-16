import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "@/api/productsApi";

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
        state.products = action.payload;
      }
    );
  },
});

export const { setFilter } = productSlice.actions;
export default productSlice.reducer;
