import React from 'react';
import {useLocation} from 'react-router-dom';

export const Productpage = (product) => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <div>
        {location.state.id}
        {location.state.name}
        {location.state.description}
        {location.state.price}
        {location.state.img.map((img, i) =>(
          <div key={i}>
            <img className="productImage" src={location.state.img[i]}/>
          </div>
        ))}
        </div>
    </>
  );
};
