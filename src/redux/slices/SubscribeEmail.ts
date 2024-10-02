import { createSlice } from "@reduxjs/toolkit";

type TSubscribeEmail = string;

const initialState: TSubscribeEmail = "";

const subscribeEmailSlice = createSlice({
  name: "subscribeEmail",
  initialState,
  reducers: {
    changeSubscribeEmail(_state, action) {
      return action.payload;
    },
  },
});

export const { changeSubscribeEmail } = subscribeEmailSlice.actions;
export default subscribeEmailSlice.reducer;
