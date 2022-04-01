import React from 'react';
import { CurrencySwitcher } from "./CurrencySwitcher";
import { ShoppingCart } from "./ShoppingCart";
import { Categories } from "./Categories";

export const Header = ({currency, setcurrency, setcategory}) => {
  return (
    <>
      <header className="header">
        <Categories setcategory={setcategory} />
        <ShoppingCart />
        <CurrencySwitcher currency={currency} setcurrency={setcurrency} />
      </header>
    </>
  );
};
