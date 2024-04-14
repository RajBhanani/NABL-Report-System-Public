import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice.js";
import { apiSlice } from "./slices/api slices/apiSlice.js";
import nablReducer from "./slices/nablSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedNablReducer = persistReducer(persistConfig, nablReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    nabl: persistedNablReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;
