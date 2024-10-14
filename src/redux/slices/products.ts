import { createSlice } from "@reduxjs/toolkit";

type Tproduct = {
  name: string;
  publicId: string;
  description: {
    en: string;
    ua: string;
  };
  price: {
    USD: number;
    UAH: number;
  };
  discount: number;
  imageUrls: string[];
  // specifications for weight, length, height etc.
  specifications: {};
  returnPolicy: string;
  contents: string[];
  reviews: string[];
  manufacturer: string;
  category: string[];
  subCategory: string[];
  tags: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  stock: number;
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
