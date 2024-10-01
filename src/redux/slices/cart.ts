import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongodb";

type Tcart = { _id: ObjectId }[];

const initialState: Tcart = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      return [...state, action.payload];
    },
    removeFromCart(state, action) {
      const filteredCart = state.filter(
        (item) => item._id !== action.payload._id
      );

      return filteredCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
