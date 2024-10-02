import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products";
import filtersReducer from "./slices/filters";
import cartReducer from "./slices/cart";
import contactFormReducer from "./slices/contactForm";
import subscribeEmailReducer from "./slices/SubscribeEmail";
import navSearchReducer from "./slices/navSearch";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      cart: cartReducer,
      contactForm: contactFormReducer,
      subscribeEmail: subscribeEmailReducer,
      navSearch: navSearchReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
