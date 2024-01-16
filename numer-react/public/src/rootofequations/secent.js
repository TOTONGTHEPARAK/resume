import { render } from "@testing-library/react";
import React,{ Component } from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const Parser = require('expr-eval').Parser;


class Secent extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {XL:'',XR:'',ErrorApox:'',func:'',Arr:[]}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
    }

    FalsePositionCalcFunction(XL,XR,ErrorApox,Funct)
    {
        const parser = new Parser();
        function fx(x)
        {
            let expr = parser.parse(Funct)
            console.log("fx = "+expr.evaluate({ x: (x) }))
            return expr.evaluate({ x: (x) })
        }
        var arr=[];
        var data={x0:0,x1:0,err:"",count:1};
        data.x0 = parseFloat(XL);
        data.x1 = parseFloat(XR);
        var func,funcdiff,xn;
        data.err = 1000000;
        var ErrorApox_Answer = parseFloat(ErrorApox)

        while(data.err>ErrorApox_Answer)
            {
              func = fx(data.x0)
              funcdiff = (fx(data.x0)-fx(data.x1))/(data.x0-data.x1)
              xn = data.x0-(func/funcdiff)
              data.err = Math.abs((func-funcdiff)/xn)*100
              data.x0 = data.x1
              data.x1 = xn
              arr=this.state.Arr;
              arr.push({x0:data.x0,x1:data.x1,err:data.err,count:data.count});
              console.log(arr)
              console.log("xm="+data.xm)
              data.count++
            //render("XM = "+data.xm.toFixed(6)+" Errorapox = "+data.err.toFixed(6)+" at iteration #"+data.count)//calc wont re-render so i stuck at this
            
        }
        render(
          <div>
            <p className="texttable">Table</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Count</TableCell>
                <TableCell align="left">Error</TableCell>
                <TableCell align="left">X0</TableCell>
                <TableCell align="left">X1</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {arr.map((data) => (
                <TableRow
                  key={data.count}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.count}
                  </TableCell>
                  <TableCell align="left">{data.err}</TableCell>
                  <TableCell align="left">{data.x0}</TableCell>
                  <TableCell align="left">{data.x1}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        )
        return //calc wont re-render so i stuck at this
    }


    handleSubmit(event){
        const {XL,XR,ErrorApox,Funct} = this.state
       
        const xm = this.FalsePositionCalcFunction(XL,XR,ErrorApox,Funct)
        event.preventDefault()
        console.log("XL = "+XL)   //console log for debugging
        console.log("XR = "+XR)
        console.log("Function = "+Funct)
        console.log("Errorapox = "+ErrorApox)
        render(xm) //same here at line 53 i literally stuck at re-rendering
       

    }

    handleChange(event){
      this.setState({[event.target.name] : event.target.value});
      this.setState({Arr:[]});
    }
    
    render(){
        return(
          <div>
            <form onSubmit={this.handleSubmit}>
            <div>
                <h1 className="h1">&emsp;Secent Method&emsp;</h1>
              <label htmlFor='XL' className="XLtext">&emsp;XL :&emsp;</label>
              <input
                className="XLfield"
                name='XL'
                placeholder='XL'
                value = {this.state.XL}
                onChange={this.handleChange}
                size='16'
              />
              <label htmlFor='XR' className="XRtext" >&emsp;XR :&emsp;</label>
              <input
                className="XRfield"
                name='XR'
                placeholder='XR'
                value={this.state.XR}
                onChange={this.handleChange}
                size='16'
              />
              <label htmlFor='ErrorApox' className="Errortext">&emsp;Error :&emsp;</label>
              <input
                className="Errorfield"
                name='ErrorApox'
                placeholder='ErrorApox'
                value={this.state.ErrorApox}
                onChange={this.handleChange}
                size='17'
              />
              </div>
              <p></p>
              <div>
              <label htmlFor='Funct' className="Functext">&emsp;Funct :&emsp;</label>
              <input
                className="Funcfield"
                name='Funct'
                placeholder='FUNCTION'
                value={this.state.Funct}
                onChange={this.handleChange}
                size='30'
              />
            </div>
            <p></p>
            <div>
            &emsp;<button className="hbutton">Calculate</button>
            </div>
          </form>
          </div>
        )
      }
    }

export default Secent