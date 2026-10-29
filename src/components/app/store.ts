import { configureStore } from "@reduxjs/toolkit";
import { getCurrenciesApi } from "../../services/getCurrencies.api";
import currenciesReducer from "../../services/currenciesSlice";

export const store = configureStore({
  reducer: {
    converter: currenciesReducer,
    [getCurrenciesApi.reducerPath]: getCurrenciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getCurrenciesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
