import { createSlice } from "@reduxjs/toolkit";

type TContactForm = {
  name: string;
  surname: string;
  email: string;
  subject?: string;
  message: string;
};

const initialState: TContactForm = {
  name: "",
  surname: "",
  email: "",
  subject: "",
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
