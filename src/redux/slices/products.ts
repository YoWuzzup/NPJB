import { createSlice } from "@reduxjs/toolkit";
import { TProductArray } from "@/lib/types";

const initialState: TProductArray = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      return action.payload;
    },
  },
});

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
