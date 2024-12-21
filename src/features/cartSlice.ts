import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.carts.find((cart) => cart.id === action.payload.id)) {
        console.log("here");
      } else {
        console.log("new item added to cart");
      }
    },
  },
});

export const { setFilter } = cartSlice.actions;
export default cartSlice.reducer;
