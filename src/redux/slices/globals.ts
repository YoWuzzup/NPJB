import { createSlice } from "@reduxjs/toolkit";

const initialState: { language: string; currency: "USD" | "UAH" | "ZL" } = {
  language: "en",
  currency: "USD",
};

const globalSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    changeGlobals(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeGlobals } = globalSlice.actions;
export default globalSlice.reducer;
