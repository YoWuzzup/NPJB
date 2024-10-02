import { createSlice } from "@reduxjs/toolkit";

type TContactForm = {
  [key: string]: string;
  name: string;
  surname: string;
  email: string;
  message: string;
};

const initialState: TContactForm = {
  name: "",
  surname: "",
  email: "",
  message: "",
};

const contactFormSlice = createSlice({
  name: "contactForm",
  initialState,
  reducers: {
    changeContactForm(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeContactForm } = contactFormSlice.actions;
export default contactFormSlice.reducer;
