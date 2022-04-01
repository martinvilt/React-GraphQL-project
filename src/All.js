import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_DATA } from './App';
import {useNavigate } from "react-router-dom";

export function All({currency, category}) {

  let navigate = useNavigate();

  const routeChange = (product) =>{ 
    let path = `./Productpage`
    navigate(path, 
      {state: 
        {
          id: product.id, 
          name: product.name, 
          description: product.description,
          price: product.price,
          img: product.gallery,
        }});
  }

  const { loading, error, data } = useQuery(GET_DATA, {
    variables: {
      "input": {
        "title": category
      }
    }
  });
  if (loading)
    return <p>Loading...</p>;
  if (error)
    return <p>Error :(</p>;

  return (
    <div>
      <h1 className="productCategory">{category}</h1>
      <ul className="mainPage">
        {data.category.products.map((product, index) => (
          <div key={index}
           className="productComponent"
           onClick={() => routeChange(product)}
          >
            <div>
              <img className="productImage" src={product.gallery[0]}/>
              <div>{product.name}</div>
              {product.prices.map((price, id) => (
                <ul key={id} className="price">
                  {
                    parseInt(currency, 10) === id ? price.currency.symbol + price.amount + price.currency.label  : ""
                  }
                </ul>
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
