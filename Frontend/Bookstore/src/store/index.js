import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./auth/productSlice";
import cartReducer from "./auth/cartSlice";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistedReducers = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth", "product", "cart"],
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
