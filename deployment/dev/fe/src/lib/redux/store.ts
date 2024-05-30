/* Core */
import {
  applyMiddleware,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import logger from "redux-logger";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import storage from 'redux-persist/lib/storage';

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// const storage =
//   typeof window === "undefined" ? createNoopStorage() : createWebStorage();
const persistConfig = {
  key: "root",
  storage: storage,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const reduxStore = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
const persistor = persistStore(reduxStore);

sagaMiddleware.run(rootSaga);

export { persistor, reduxStore };
/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
