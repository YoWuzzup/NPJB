import { createSlice } from "@reduxjs/toolkit";
import { TCart } from "@/lib/types";

const initialState: TCart = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      return [...state, action.payload];
    },
    changeItemAddQuantity(state, action) {
      const updatedItem = state.map((i) =>
        i.publicId === action.payload.publicId
          ? { ...i, quantity: i.quantity + action.payload.quantity }
          : i
      );

      return updatedItem;
    },
    changeItemMinusQuantity(state, action) {
      const updatedItem = state.map((i) =>
        i.publicId === action.payload.publicId
          ? { ...i, quantity: i.quantity - action.payload.quantity }
          : i
      );

      return updatedItem;
    },
    removeFromCart(state, action) {
      const filteredCart = state.filter(
        (item) => item.publicId !== action.payload.publicId
      );

      return filteredCart;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeItemAddQuantity,
  changeItemMinusQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
