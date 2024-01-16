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
import axios from "axios";

const Parser = require('expr-eval').Parser;


class Falseposition extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {XL:'',XR:'',ErrorApox:'',func:'',Arr:[]}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.componantDidMount = this.componantDidMount.bind(this) 
    }
	
		componantDidMount(){
      axios.get('http://localhost:3800/falseposition')
      .then(res => {
        const data = res.data
        console.log(data)
        this.setState({XL:(res.data[0].XL)})
        this.setState({XR:(res.data[0].XR)})
        this.setState({ErrorApox:(res.data[0].Errorapox)})
        this.setState({Funct:(res.data[0].funct)})
        console.log("XL: "+res.data[0].XL)
    })
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
        var data={xl:0,xr:0,xm:0,err:"",count:1};
        data.xl = parseFloat(XL);
        data.xr = parseFloat(XR);
        var xold;
        data.err = 1000000;
        var ErrorApox_Answer = parseFloat(ErrorApox)

        while(data.err>ErrorApox_Answer)
            {
                data.xm=((data.xl*fx(data.xr))-(data.xr*fx(data.xl)))/(fx(data.xr)-fx(data.xl));
                if(fx(data.xm)*fx(data.xr)<0)
                {
                    xold=data.xl
                    data.xl=data.xm
                }
                if(fx(data.xm)*fx(data.xr)>0)
                {
                    xold=data.xr
                    data.xr=data.xm
                }
                data.err = Math.abs((data.xm-xold)/data.xm)*100
              arr=this.state.Arr;
              arr.push({xl:data.xl,xr:data.xr,xm:data.xm,err:data.err,count:data.count});
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
                <TableCell align="left">XL</TableCell>
                <TableCell align="left">XR</TableCell>
                <TableCell align="left">XM</TableCell>
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
                  <TableCell align="left">{data.xl}</TableCell>
                  <TableCell align="left">{data.xr}</TableCell>
                  <TableCell align="left">{data.xm}</TableCell>
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
            <form >
            <div>
              {JSON.stringify()}
                <h1 className="h1">&emsp;False-position Method&emsp;</h1>
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
            &emsp;<button className="hbutton" onClick={this.handleSubmit}>Calculate</button>
            </div>
          </form>
          <button className="hbutton" onClick={this.componantDidMount}>API</button>
          </div>
        )
      }
    }

export default Falseposition