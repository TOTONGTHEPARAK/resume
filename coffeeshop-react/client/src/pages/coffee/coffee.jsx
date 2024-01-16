import React from "react";
import { COFFEE } from "../../coffee";
import { Product } from "../product";
import "../pages.css";

export const Coffee = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1></h1>
      </div>

      <div className="products">
        {COFFEE.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};