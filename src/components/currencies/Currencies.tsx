import { Currency } from "../../types/types";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import "./Currencies.scss";

type CurrenciesPropsType = {
  changeCurrency: (currency: string) => void;
  currentCurrency: string;
};

const Currencies = (props: CurrenciesPropsType) => {
  const { changeCurrency, currentCurrency } = props;

  const { mainCurrencies } = useSelector((state: RootState) => state.converter);

  return (
    <div className="currencies-switcher">
      <div className="switcher">
        {mainCurrencies.map((currency: Currency) => {
          const style = `switcher__item  ${currentCurrency === currency.CharCode ? "active" : ""}`;

          return (
            <div
              key={`${currency.ID} ${currency.CharCode}`}
              onClick={() => changeCurrency(currency.CharCode)}
              className={style}
            >
              {currency.CharCode}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Currencies;
