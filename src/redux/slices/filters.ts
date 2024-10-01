import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Tfilters = {
  search: string;
  [key: string]: string;
};

const initialState: Tfilters = { search: "" };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(
      state,
      action: PayloadAction<{ filter: string; value: string }>
    ) {
      state[action.payload.filter] = action.payload.value;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
