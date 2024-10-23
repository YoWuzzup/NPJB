import { createSlice } from "@reduxjs/toolkit";

const initialState: { language: string } = {
  language: "en",
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
