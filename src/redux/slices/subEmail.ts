import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

const subEmailSlice = createSlice({
  name: "subEmail",
  initialState,
  reducers: {
    changeSubEmail(_state, action) {
      return action.payload;
    },
  },
});

export const { changeSubEmail } = subEmailSlice.actions;
export default subEmailSlice.reducer;
