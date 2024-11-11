"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/redux/store";

interface ReduxStoreProviderProps {
  children: React.ReactNode;
}

const ReduxStoreProvider: React.FC<ReduxStoreProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxStoreProvider;
