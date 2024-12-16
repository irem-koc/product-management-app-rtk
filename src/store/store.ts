import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "../api/emptySplitApi";
import productReducer from "../features/productsSlice";
export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});
