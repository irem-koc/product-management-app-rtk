import { apiWithTag } from "@/api/emptySplitApi";
import productReducer from "@/features/productsSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
export const store = configureStore({
  reducer: {
    [apiWithTag.reducerPath]: apiWithTag.reducer,
    products: productReducer,
    carts: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiWithTag.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
