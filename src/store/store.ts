import { apiWithTag } from "@/api/emptySplitApi";
import productReducer from "@/features/productsSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    [apiWithTag.reducerPath]: apiWithTag.reducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiWithTag.middleware),
});
