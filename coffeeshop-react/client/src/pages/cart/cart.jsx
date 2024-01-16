import React, { useContext, useState, useEffect  } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";


import "./cart.css";
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout, addmenu, addbill, getbillid} = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  useEffect(() => {
    getbillid();
}, []);
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <div className="">
            Subtotal: ${totalAmount}
          </div>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button onClick={() => {checkout(); navigate("/"); addmenu(); addbill();} }> Checkout </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
