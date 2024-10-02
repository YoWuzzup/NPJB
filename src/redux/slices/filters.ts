import { createSlice } from "@reduxjs/toolkit";

type Tfilters = {
  search: string;
  category: string;
};

const initialState: Tfilters = {
  search: "",
  category: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(state, action) {
      return { ...state, ...action.payload };
    },
    clearFilter() {
      return initialState;
    },
  },
});

export const { changeFilter, clearFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
