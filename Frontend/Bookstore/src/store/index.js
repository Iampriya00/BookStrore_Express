import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  auth: authReducer,
});
const persistedReducers = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth"],
  },
  reducers
);
const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(sagaMiddleware);
  },
});
export const persistor = persistStore(store);

export default store;
