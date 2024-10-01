import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Tcart = {}[];

const initialState: Tcart = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      return [...state, action.payload];
    },
    removeFromCart(state, action) {},
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
