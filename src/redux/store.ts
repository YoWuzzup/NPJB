import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products";
import filtersReducer from "./slices/filters";
import cartReducer from "./slices/cart";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      cart: cartReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
