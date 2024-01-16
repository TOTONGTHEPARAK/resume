import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { Chart, Series } from 'devextreme-react/chart';
export const Setting = () => {
    const [showstore,setShowstore] = useState([]);
    const getmenu = () => {
        Axios.get('http://localhost:3001/chart').then((response) => {
            setShowstore(response.data);
        })
    }

    useEffect(() => {
        getmenu()
    },[])
    
    return(
            <div>
            <TableContainer component={Paper} >
      <Box sx={{ flexShrink: 0, ml: 0 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="Left">ID</TableCell>
            <TableCell align="Left">Name</TableCell>
            <TableCell align="right">amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showstore.map((row) => (
            <TableRow
              key={row.Product_Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="Left">{row.menu_id}</TableCell>
              <TableCell align="right">{row.menu_name}</TableCell>
              <TableCell align="right">{row.count_word}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Box>
      <Chart id="chart" dataSource={showstore}>
            <Series
              valueField="count_word"
              argumentField="menu_name"
              type="bar"
              color="#ffaa66" 
              />
          </Chart>
    </TableContainer>
    
    </div>
    )
}