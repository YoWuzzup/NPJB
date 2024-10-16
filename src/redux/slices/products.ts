import { createSlice } from "@reduxjs/toolkit";
import { TProductArray } from "@/lib/types";

const initialState: TProductArray = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      // remove duplicates
      let merged = [
        ...state.filter(
          (s) =>
            !action.payload.some(
              (newItem: any) => newItem.publicId === s.publicId
            )
        ),
        ...action.payload,
      ];

      return merged;
    },
  },
});

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
