import React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";



export const Categories = ({setcategory}) => {

  const changeCategory = (newCategory) => {
    setcategory(newCategory);
  }

  const { loading, error, data } = useQuery(gql`
    {
      categories {
        name
      }
    }
  `);

  if (loading)
    return <p>Loading...</p>;
  if (error)
    return <p>Error :(</p>;

  return data.categories.map(({ name }) => (
    <div key={name} className="header-button" onClick={(e) => changeCategory(name)}>
        {name}
    </div>
  ));
}; 
