import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer, profileReducer, generalReducer, transactionReducer } from "./slices";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import constants from "../constants/envConstants";
import { Persistor } from "redux-persist";

const encryptor = encryptTransform({
  secretKey: constants.REDUX_PERSIST_KEY,
  onError: (error: any) => {
    console.error("Encryption error occurred", error);
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  general: generalReducer,
  transaction: transactionReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/refreshTokens",
          "auth/refreshToken/fulfilled",
          "persist/PERSIST",
          "persist/REHYDRATE",
        ],
      },
    }),
  devTools: true,
});

export const persistor: Persistor | any = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
