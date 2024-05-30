"use client";

import { Provider } from "react-redux";
import { reduxStore, persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};
