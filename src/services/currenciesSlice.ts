import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../types/types";

const initialState = {
  loading: true,
  currenciesForList: [] as Currency[],
  currencies: [
    {
      CharCode: "RUR",
      Value: 1,
      Previous: 1,
      ID: "1423hgdfg5",
      Name: "Российский рубль",
      Nominal: 1,
      NumCode: "",
    },
  ],
  mainCurrencies: [
    {
      CharCode: "RUR",
      Value: 1,
      Previous: 1,
      ID: "1423hgdfg5",
      Name: "Российский рубль",
      Nominal: 1,
      NumCode: "",
    },
  ],
  countFirstField: "100",
  countSecondField: "",
  currencyFirstField: "RUR",
  currencySecondField: "USD",
};

export type CurrencyReducerStateType = typeof initialState;

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setCurrencies(state, action: PayloadAction<Currency[]>) {
      const filteredCurrencies = action.payload.filter((el) => el.CharCode !== "XDR" && el.CharCode !== "TJS");

      const sortedAndNormalizedCurrencies = filteredCurrencies
        .sort((a, b) => a.Name.localeCompare(b.Name)) // Используется localeCompare
        .map((el) => (el.Nominal > 1 ? { ...el, Value: el.Value / el.Nominal, Nominal: 1 } : el));
      state.currencies = [...state.currencies, ...sortedAndNormalizedCurrencies];

      state.currenciesForList = filteredCurrencies;
    },
    setCurrentCurrency: (state, action: PayloadAction<{ currencyFirstField: string; currencySecondField: string }>) => {
      state.currencyFirstField = action.payload.currencyFirstField;
      state.currencySecondField = action.payload.currencySecondField;
    },
    changeFieldValue: (state, action: PayloadAction<{ amountFirstField: string; amountSecondField: string }>) => {
      const { amountFirstField, amountSecondField } = action.payload;
      state.countFirstField = amountFirstField;
      state.countSecondField = amountSecondField;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMainCurrency: (state, action: PayloadAction<Currency[]>) => {
      state.mainCurrencies = [...state.mainCurrencies, ...action.payload];
    },
  },
});

export const { setCurrencies, setCurrentCurrency, changeFieldValue, setLoading, setMainCurrency } =
  currenciesSlice.actions;
export default currenciesSlice.reducer;
