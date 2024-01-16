import React, { useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ShopContext } from "../../context/shop-context";
import Button from '@mui/material/Button';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Addstore = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [amount,setAmount] = useState(0);
    const [other,setOther] = useState("");
    const [arr,setArr] = useState( [] )
    const [maxproductid,setmaxproductid] = useState(0)
    
    const getarr = () => {
        setArr([name, type, amount, other]);
    }

    const getproductid = async () => {
        try {
          const response = await Axios.get('http://localhost:3001/getproduct');
          setmaxproductid(response.data);
          console.log(maxproductid[0]?.value);
        } catch (error) {
          console.log(error);
        }
      }
    
    const setdefelt = () => {
        setName("")
        setType("")
        setAmount(0)
        setOther("")
        Swal.fire({
            position: 'top-middle',
            icon: 'success',
            title: 'SUSCCESS',
            showConfirmButton: false,
            timer: 1500
          })
    }

    const addStore = () => {
        Axios.post('http://localhost:3001/addproduct', {
          Product_Id: maxproductid[0]?.value+1,
          Product_Name: name,
          Product_Type: type,
          amount: amount,
          other: other,
        })
        .then((response) => {
            console.log(response.data);
            setArr([]);
            setName("");
            setType("");
            setAmount(0);
            setOther("");
        })
        .catch((error) => {
            console.log(error);
        });
      }

      useEffect(() => {
        getproductid();
    }, []);
    
    return(
        <div>
            <Box>
            <TextField
            type="text"
            value={name}
            placeholder="Name"
            onChange={(event) => {
                setName(event.target.value)
            }}
            />
            <TextField
            type="text"
            value={type}
            placeholder="Type"
            onChange={(event) => {
                setType(event.target.value)
            }}
            />
            <TextField
            type="number"
            value={amount}
            placeholder="amount"
            onChange={(event) => {
                setAmount(event.target.value)
            }}
            />
            <TextField
            type="text"
            value={other}
            placeholder="other"
            onChange={(event) => {
                setOther(event.target.value)
            }}
            />
            <Button variant="contained" color="success" onClick={() => {getarr(); addStore(); setdefelt(); navigate("/store")}}>
                OK
            </Button>
            </Box>
        </div>
    )
}