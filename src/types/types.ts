export type Currency = {
  CharCode: string;
  Value: number;
  Previous: number;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
};

export type GetCurrenciesResponseType = {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: {
    [key: string]: Currency;
  };
};
