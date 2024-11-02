import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct, TReview } from "@/lib/types";

const initialState: TProduct = {
  price: {
    USD: 0,
    UAH: 0,
    ZL: 0,
  },
  discount: 0,
  reviews: [],
  tags: [],
  createdAt: "",
  updatedAt: "",
  stock: 0,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    addSingleProduct(_state, action) {
      return { ...action.payload };
    },
    updateSingleProduct(state, action) {
      return { ...(state || {}), ...action.payload };
    },
    updateReviews(state, action: PayloadAction<TReview>) {
      if (!state || !state.reviews) return;

      const index = state.reviews.findIndex(
        (r) => r.publicId === action.payload.publicId
      );

      if (index !== -1) {
        state.reviews[index] = { ...state.reviews[index], ...action.payload };
      }
    },
  },
});

export const { addSingleProduct, updateSingleProduct, updateReviews } =
  singleProductSlice.actions;
export default singleProductSlice.reducer;
