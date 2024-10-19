import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@/lib/types";

const initialState: TProduct | null = null;

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    addSingleProduct(_state, action) {
      return { ...action.payload };
    },
  },
});

export const { addSingleProduct } = singleProductSlice.actions;
export default singleProductSlice.reducer;
