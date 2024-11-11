import { configureStore } from "@reduxjs/toolkit";

import globalsReducer from "./slices/globals";
import productsReducer from "./slices/products";
import singleProductReducer from "./slices/singleProduct";
import filtersReducer from "./slices/filters";
import cartReducer from "./slices/cart";
import contactFormReducer from "./slices/contactForm";
// import subscribeEmailReducer from "./slices/subscribeEmail";
import navSearchReducer from "./slices/navSearch";

export const makeStore = () => {
  return configureStore({
    reducer: {
      globals: globalsReducer,
      products: productsReducer,
      singleProduct: singleProductReducer,
      filters: filtersReducer,
      cart: cartReducer,
      contactForm: contactFormReducer,
      // subscribeEmail: subscribeEmailReducer,
      navSearch: navSearchReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
