import React, {PureComponent, useState} from 'react';
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client";
import { Header } from './Header';
import { All } from './All';
import { Productpage } from './Productpage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

export const GET_DATA = gql`
    query Clothes($input: CategoryInput) {
      category(input: $input) {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    }
`;

export function App (){
  const[currency, setcurrency] = useState("0");
  const[category, setcategory] = useState("all");

    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
            <Header currency={currency} setcurrency={setcurrency} setcategory={setcategory}/>
            <Routes>
              <Route exact path="/" element={<All currency={currency} category={category}/>}></Route>
              <Route exact path="/Productpage" element={<Productpage/>}></Route>
            </Routes> 
          </ApolloProvider>
      </BrowserRouter>
    );
}
export default App;
