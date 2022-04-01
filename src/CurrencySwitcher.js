import React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";


export const CurrencySwitcher = ({currency, setcurrency}) => {

  const changeCurrency = (newCurrency) => {
    setcurrency(newCurrency);
  }

  const { loading, error, data } = useQuery(gql`
        {
      currencies {
        label
        symbol
      }
    }
  `);
  if (loading)
    return <p>Loading...</p>;
  if (error)
    return <p>Error :(</p>;

  return (
    <div className="currencySelector">
      <label />
      <select onChange={(e) => changeCurrency(e.target.value)}>
        {data.currencies.map((currency, id) => (
          <option value={id}>{currency.symbol}{currency.label}</option>
        ))}
      </select>
    </div>
  );
};
