import { createSlice } from "@reduxjs/toolkit";

type Tproduct = {
  name: string;
};

type TproductList = Tproduct[];

const initialState: TproductList = [];

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
