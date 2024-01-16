import React from "react";
import { TEA } from "../../tea";
import { Product } from "../product";
import "../pages.css";

export const Tea = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1></h1>
      </div>

      <div className="products">
        {TEA.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};