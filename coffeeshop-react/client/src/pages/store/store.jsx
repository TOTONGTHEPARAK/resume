import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Box } from "@mui/material";

export const Store = () => {
    
    const [showstore,setShowstore] = useState([]);
    const navigate = useNavigate();
    const [newamount,setNewamount] = useState( 0 )
    const [maxproductid,setmaxproductid] = useState(0)
    const [reloadPage, setReloadPage] = useState(false);

    useEffect(() => {
        getstore();
        getproductid();
        if (reloadPage) {
          window.location.reload();
        }
    }, [reloadPage]);

    const reload = () => {
      setReloadPage(true);
    };

    const getproductid = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/getproduct');
        setmaxproductid(response.data);
        console.log(maxproductid[0]?.value);
      } catch (error) {
        console.log(error);
      }
    }

    const addStore = (arr) => {
      Axios.post('http://localhost:3001/addproduct', {
        Product_Id: maxproductid[0]?.value+1,
        Product_Name: arr.Product_Name,
        Product_Type: arr.Product_Type,
        amount: arr.amount,
        other: arr.other,
      })
      .catch((error) => {
          console.log(error);
      });
      console.log(arr)
    }

    const getstore = () => {
        Axios.get('http://localhost:3001/product').then((response) => {
            setShowstore(response.data);
        })
    }

    
    function show(event) {
      Swal.fire({
        title: 'Do you want to delete?',

        showCancelButton: true,
        confirmButtonText: 'Confirm',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Delete!', '', 'success')
          del(event)
        }
      })
    }

    const del = (num) => {
      Axios.delete(`http://localhost:3001/delete/${num}`).then((response) => {
        setShowstore(
          showstore.filter((val) => {
            return val.num != num;
          })
        )
      })
    }

    const upproduct = (event,id) => {
      let num=event;
      Swal.fire({
        confirmButtonText: 'Confirm',
        title: 'What number you want to change?',
        icon: 'info',
        input: 'range',
        inputLabel: 'Amount',
        inputAttributes: {
          min: 0,
          max: event+10,
          step: 1
        },
        inputValue: event
      }).then((result) => {
        
        if (result.isConfirmed) {
          Swal.fire('Change!', '', 'success')
          num = result.value;
          console.log(num);
          updata(num,id);
        }
      })
    }

    const updata = (num,id) => {
      Axios.put("http://localhost:3001/update", {amount: num, id:id}).then((response) => {
        setShowstore(
          showstore.map((val) => {
            return val.id == id ? {
              Product_Id: val.id,
              Product_Name: val.name,
              Product_Type: val.type,
              amount: num,
              other: val.other
            }: val;
          })
        )
      })
    }

    const insert = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Product',
        html:
          '<input id="swal-input1" class="swal2-input" name="name" placeholder="Name">' +
          '<input id="swal-input2" class="swal2-input" name="type" placeholder="Weight">' +
          '<input id="swal-input3" class="swal2-input" name="amount" placeholder="Amount">' +
          '<input id="swal-input4" class="swal2-input" name="other" placeholder="Type">',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        preConfirm: () => {
          return {
            Product_Name: document.getElementById('swal-input1').value,
            Product_Type: document.getElementById('swal-input2').value,
            amount: parseInt(document.getElementById('swal-input3').value),
            other: document.getElementById('swal-input4').value
          }
        }
      })
      if (formValues) {
        Swal.fire({
          position: 'top-middle',
          icon: 'success',
          title: 'SUCCESS',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(formValues)
        addStore(formValues)
      }
    }
    

    return(
        <div>
          <Button variant="outlined" onClick={() => insert()}>
        Insert
        </Button>

            <TableContainer component={Paper} >
      <Box sx={{ flexShrink: 0, ml: 85 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="Left">Name</TableCell>
            <TableCell align="right">weight</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showstore.map((row) => (
            <TableRow
              key={row.Product_Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0,backgroundColor: "white" }, '&:nth-of-type(odd)': {
                backgroundColor: "white",
              }}}
            >
              <TableCell align="right">{row.Product_Id}</TableCell>
              <TableCell align="Left">{row.Product_Name}</TableCell>
              <TableCell align="right">{row.Product_Type}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.other}</TableCell>
              <Button variant="outlined" onClick={() => {upproduct(row.amount,row.Product_Id)}}>
            Update
        </Button>
        <Button variant="outlined" onClick={() => {show(row.Product_Id);}} >
            Delete
        </Button>
            </TableRow>
          ))}
        </TableBody>
      </Box>
    </TableContainer>

    </div>
    );
};