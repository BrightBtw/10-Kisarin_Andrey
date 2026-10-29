import { Currency } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ConverterView from "../сonverterView/ConverterView";
import "./Converter.scss";

type ConverterPropsType = {
  rateFirstCurrency: number;
  rateSecondCurrency: number;
  changeCurrency: (currencyOfFirstField: string, currencyOfSecondField: string, value: string) => void;
  currencies: Currency[];
  changeFirstFieldValue: (value: string) => void;
  changeSecondFieldValue: (value: string) => void;
};

const Converter = (props: ConverterPropsType) => {
  const { changeFirstFieldValue, changeSecondFieldValue, changeCurrency, rateFirstCurrency, rateSecondCurrency } =
    props;

  const { currencyFirstField, currencySecondField, countFirstField, countSecondField } = useSelector(
    (state: RootState) => state.converter
  );

  const onChangeCurrencyFirstField = (currencyOfFirstField: string) => {
    changeCurrency(currencyOfFirstField, currencySecondField, countFirstField);
  };
  const onChangeCurrencySecondField = (currencyOfSecondField: string) => {
    changeCurrency(currencyFirstField, currencyOfSecondField, countFirstField);
  };

  const swapCurrencies = () => {
    changeCurrency(currencySecondField, currencyFirstField, countFirstField);
  };

  const rateForFirstField = rateFirstCurrency.toFixed(2);
  const rateForSecondField = rateSecondCurrency.toFixed(2);

  return (
    <>
      <header>
        <h1>Конвертер валют онлайн</h1>
      </header>
      <main className="main">
        <div className="converter">
          <div className="converter__title">У меня есть</div>
          <ConverterView
            count={countFirstField}
            changeCurrency={onChangeCurrencyFirstField}
            onChangeFieldValue={changeFirstFieldValue}
            currentCurrency={currencyFirstField}
          />
          <div className="box__rate">
            1 {currencyFirstField} = {rateForFirstField} {currencySecondField}
          </div>
        </div>
        <div className="direction">
          <div className="direction__reverse" onClick={() => swapCurrencies()}></div>
        </div>
        <div className="converter">
          <div className="converter__title">Хочу приобрести</div>
          <ConverterView
            count={countSecondField}
            changeCurrency={onChangeCurrencySecondField}
            onChangeFieldValue={changeSecondFieldValue}
            currentCurrency={currencySecondField}
            disabled
          />
          <div className="box__rate">
            1 {currencySecondField} = {rateForSecondField} {currencyFirstField}
          </div>
        </div>
      </main>
    </>
  );
};

export default Converter;
