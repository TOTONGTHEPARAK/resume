import React from "react";
import { SODA } from "../../soda";
import { Product } from "../product";
import "../pages.css";

export const Soda = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1></h1>
      </div>
      <div className="products">
        {SODA.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};