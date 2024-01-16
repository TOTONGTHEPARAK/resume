import React,{ useContext} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { GiCakeSlice } from "react-icons/gi";
import { ShopContext } from "../context/shop-context";
import  Peter  from "../assets/products/peter.png"
import  EqualizerIcon  from '@mui/icons-material/Equalizer';
import Swal from 'sweetalert2'

export const Navbar = () => {
  const show = () => {
    Swal.fire({
      showConfirmButton: false,
      imageUrl: Peter,
      imageWidth: 400,
      imageHeight: 400,
    })
    
  }
  return (
    
    
    <div className="navbar2">
    <div className="peter" onClick={() => {show()}}>
        <img style={{ width: 80, height: 80 }} src={Peter} alt="React Logo" />
    </div>
      <div className="links">
        <Link to="/setting">
          <EqualizerIcon fontSize="large"/>
        </Link>
        <Link to="/store"> 
          <GiCakeSlice size={32} color="white"/>
        </Link>
        <Link to="/"> Shop </Link>
        <Link to="/coffee"> Coffee </Link>
        <Link to="/tea"> Tea </Link>
        <Link to="/soda"> Soda </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
      </div>
  );
};
