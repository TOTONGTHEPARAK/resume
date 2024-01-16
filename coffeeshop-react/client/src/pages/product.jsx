import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import Swal from 'sweetalert2'
import { PRODUCTS } from "../products";
import 'animate.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  
  const cartItemCount = cartItems[id];

  const show = (id) => {
    for(let i=0;i<PRODUCTS.length;i++){
      if(id==PRODUCTS[i].id){
        Swal.fire({
          
          title: PRODUCTS[i].productName,
          text: PRODUCTS[i].raw,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__bounceIn'
          },
          hideClass: {
            popup: 'animate__flipOutX'
          }
        })
      }
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      
      '& > :not(style)': {
        m: 1,
        width: 500,
        height: 500,
      },
    }}>
      <Paper  elevation={24} >
    <div className="product">

      <a onClick={() => show(id)}>
        <img src={productImage} />
        
      </a>

      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 1 && <> ({cartItemCount})</>}
      </button>
    </div>
    </Paper>
      
    </Box>
  );
};
