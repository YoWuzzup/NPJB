import { createSlice } from "@reduxjs/toolkit";

type TNavSearch = string;

const initialState: TNavSearch = "";

const navSearchSlice = createSlice({
  name: "navSearch",
  initialState,
  reducers: {
    changeNavSearch(_state, action) {
      return action.payload;
    },
  },
});

export const { changeNavSearch } = navSearchSlice.actions;
export default navSearchSlice.reducer;
