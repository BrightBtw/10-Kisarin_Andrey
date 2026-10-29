import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./lib/baseURL";
import { GetCurrenciesResponseType } from "../types/types";

export const getCurrenciesApi = createApi({
  reducerPath: "currenciesApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<GetCurrenciesResponseType, string>({
      query: () => ``,
    }),
  }),
});

export const { useGetCurrenciesQuery } = getCurrenciesApi;
