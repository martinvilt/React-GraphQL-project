import React, {PureComponent} from 'react';
import { render } from 'react-dom';
import "./App.css"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const GET_DATA = gql`
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

function Categories() {
  const { loading, error, data } = useQuery(gql`
    {
      categories {
        name
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.categories.map(({ name }) => (
      <div key={name} className="header-button">
          {name}
      </div>
  ));
}

function Header() {
  return(
    <>
      <header className="header">
        <Categories/>
      </header>
    </>
  )
}

function All() {
    const {loading, error, data} = useQuery(GET_DATA, {
        variables: {
            "input": {
                "title": "all"
            }
        }})
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return(
        <div className="mainPage">
            <h1>All</h1>
            <ul>
            {data.category.products.map((product) =>(
                    <div key={product.id} className = "productComponent">
                      <div>
                        <img className = "productImage" src={product.gallery[0]}/>
                        <div>{product.name}</div>
                        {product.prices.map((price) =>(
                          <li key={price.currency.label}>{price.currency.symbol}{price.amount}, {price.currency.label}</li>
                        ))}
                      </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}


function Product(data) {
  return(
    <>

    </>
  )
}

class App extends PureComponent{
  render() {
    return (
        <ApolloProvider client={client}>
          <Header/>
          <All/>
        </ApolloProvider>

    );
  }
}

render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root'),
);

export default App;
