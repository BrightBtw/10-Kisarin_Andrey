import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCurrenciesQuery } from "../../services/getCurrencies.api";
import { changeFieldValue, setCurrencies, setCurrentCurrency, setMainCurrency } from "../../services/currenciesSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Converter from "../converter/Converter";

function App() {
  const dispatch = useDispatch();
  const { data: response } = useGetCurrenciesQuery("");

  useEffect(() => {
    if (response && response.Valute) {
      const currenciesArray = Object.values(response.Valute);

      const mainCurrencies = [
        response.Valute["USD"],
        response.Valute["EUR"],
        response.Valute["JPY"],
        response.Valute["KZT"],
        response.Valute["CAD"],
      ];

      dispatch(setCurrencies(currenciesArray));
      dispatch(setMainCurrency(mainCurrencies));
    }
  }, [response, dispatch]);

  const { currencies, currencyFirstField, currencySecondField, countFirstField } = useSelector(
    (state: RootState) => state.converter
  );
  // debugger;

  let currencyObjectOfFirstField = currencies.find((el) => el.CharCode === currencyFirstField);
  let currencyObjectOfSecondField = currencies.find((el) => el.CharCode === currencySecondField);

  let rateForChangeValue = 0;
  let rateForSecondField = 0;

  if (currencyObjectOfFirstField && currencyObjectOfSecondField) {
    rateForChangeValue = currencyObjectOfFirstField.Value / currencyObjectOfSecondField.Value;
    rateForSecondField = currencyObjectOfSecondField.Value / currencyObjectOfFirstField.Value;

    if (currencyObjectOfFirstField && currencyFirstField === "RUR") {
      rateForChangeValue = 1 / currencyObjectOfSecondField?.Value;
      rateForSecondField = currencyObjectOfSecondField?.Value ?? 0;
    }
    if (currencyObjectOfSecondField && currencySecondField === "RUR") {
      rateForChangeValue = currencyObjectOfFirstField?.Value ?? 0;
      rateForSecondField = 1 / currencyObjectOfFirstField?.Value;
    }
    if (
      currencyObjectOfFirstField &&
      currencyObjectOfSecondField &&
      currencyObjectOfFirstField.CharCode === "RUR" &&
      currencyObjectOfSecondField.CharCode === "RUR"
    ) {
      rateForChangeValue = 1;
      rateForSecondField = 1;
    }
  }

  const changeCurrency = (firstCurrency: string, secondCurrency: string, value: string) => {
    currencyObjectOfFirstField = currencies.find((el) => el.CharCode === firstCurrency);
    currencyObjectOfSecondField = currencies.find((el) => el.CharCode === secondCurrency);
    if (currencyObjectOfFirstField && currencyObjectOfSecondField) {
      rateForChangeValue = currencyObjectOfFirstField.Value / currencyObjectOfSecondField!.Value;
      if (currencyObjectOfFirstField!.CharCode === "RUR") {
        rateForChangeValue = 1 / currencyObjectOfSecondField.Value;
      }
      if (currencyObjectOfSecondField!.CharCode === "RUR") {
        rateForChangeValue = currencyObjectOfFirstField!.Value;
      }
      if (currencyObjectOfFirstField!.CharCode === "RUR" && currencyObjectOfSecondField!.CharCode === "RUR") {
        rateForChangeValue = 1;
      }
    }

    dispatch(
      setCurrentCurrency({
        currencyFirstField: firstCurrency,
        currencySecondField: secondCurrency,
      })
    );
    changeFirstFieldValue(value);
  };

  const changeFirstFieldValue = (value: string) => {
    if (value === "") {
      dispatch(
        changeFieldValue({
          amountFirstField: value,
          amountSecondField: value,
        })
      );
    } else {
      dispatch(
        changeFieldValue({
          amountFirstField: value,
          amountSecondField: (+value * rateForChangeValue).toFixed(2),
        })
      );
    }
  };

  const changeSecondFieldValue = (value: string) => {
    if (value === "") {
      dispatch(changeFieldValue({ amountFirstField: value, amountSecondField: value }));
    } else {
      dispatch(
        changeFieldValue({
          amountFirstField: (+value / rateForChangeValue).toFixed(2),
          amountSecondField: value,
        })
      );
    }
  };

  changeFirstFieldValue(countFirstField);

  return (
    <Converter
      rateSecondCurrency={rateForSecondField}
      rateFirstCurrency={rateForChangeValue}
      changeCurrency={changeCurrency}
      changeFirstFieldValue={changeFirstFieldValue}
      currencies={currencies}
      changeSecondFieldValue={changeSecondFieldValue}
    />
  );
}

export default App;
