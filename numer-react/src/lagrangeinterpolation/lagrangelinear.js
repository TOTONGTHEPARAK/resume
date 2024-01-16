import { render } from "@testing-library/react";
import React,{ Component } from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chart, Series } from 'devextreme-react/chart';


class Lagrangelinear extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {point1:'',point2:'',x:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
    }

    LagrangelinearCalcFunction(point1,point2,x)
    {
        var arr=[{point:1,x:0,y:9.81},
                 {point:2,x:20000,y:9.7487},
                 {point:3,x:40000,y:9.6879},
                 {point:4,x:60000,y:9.6879},
                 {point:5,x:80000,y:9.5682}];
        var x = parseInt(x);
        var pointx = parseInt(point1);
        var pointy = parseInt(point2);
        var fx0 = arr[pointx-1].y
        var x0 = arr[pointx-1].x
        var fx1 = arr[pointy-1].y
        var x1 = arr[pointy-1].x
        var L0 = (x1-x)/(x1-x0);
        var L1 = (x0-x)/(x0-x1);
        var fans = (L0*fx0)+(L1*fx1)
        
        render(<div className="ans">f({x}) = {fans}</div>)
    }


    handleSubmit(event){
        const {point1,point2,x} = this.state
        this.LagrangelinearCalcFunction(point1,point2,x)
        event.preventDefault()
        console.log("point1 = "+point1)
        console.log("point2 = "+point2)
        console.log("x = "+x)
    }

    handleChange(event){
      this.setState({[event.target.name] : event.target.value});
    }
    
    render(){
      var arr=[{point:1,x:0,y:9.81},
        {point:2,x:20000,y:9.7487},
        {point:3,x:40000,y:9.6879},
        {point:4,x:60000,y:9.6879},
        {point:5,x:80000,y:9.5682}];
        return(
        <div>
          <div>
            <h1 className="h1">&emsp;Linear Interpolation&emsp;</h1>
            </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">point</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">y</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((arr) => (
              <TableRow
                key={arr.point}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {arr.point}
                </TableCell>
                <TableCell align="center">{arr.x}</TableCell>
                <TableCell align="center">{arr.y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
            <p className="textchart">Chart</p>
          <Chart id="chart" dataSource={arr}>
            <Series
              valueField="y"
              argumentField="point"
              type="line"
              color="#ffaa66" />
          </Chart>
          </div>
      <div>
          <form onSubmit={this.handleSubmit}>
              <label htmlFor='point1' className="XLtext">&emsp;Point :&emsp;</label>
              <input
                className="XLfield"
                name='point1'
                placeholder='point1'
                value = {this.state.point1}
                onChange={this.handleChange}
                size='16'
              />
              <input
                className="XLfield"
                name='point2'
                placeholder='point2'
                value = {this.state.point2}
                onChange={this.handleChange}
                size='16'
              />
              <label htmlFor='x' className="XLtext">&emsp;X :&emsp;</label>
              <input
                className="XLfield"
                name='x'
                placeholder='x'
                value = {this.state.x}
                onChange={this.handleChange}
                size='16'
              />
            <div>
            <button className="hbutton">Calculate</button>
            </div>
          </form>
      </div>
      </div>
      
      
        )
      }
    }

export default Lagrangelinear