import './App.css';
import Sidebar from './componants/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Garphical from './rootofequations/garphical';
import Bisection from './rootofequations/bisection';
import FalsePosition from './rootofequations/falseposition';
import Newtonraphson from './rootofequations/newtonraphson';
import Onepoint from './rootofequations/onepoint';
import  Secent  from './rootofequations/secent';
import Carmers from './linearequations/carmersrule';
import Gauss_Elimination from './linearequations/gausselimination';
import Newtonlinear from './newtoninterpolation/newtonlinear';
import Newtonquadratic from './newtoninterpolation/newtonquadratic';
import Newtonpolynomial from './newtoninterpolation/newtonpolynomial';
import Lagrangelinear from './lagrangeinterpolation/lagrangelinear';
import Lagrangequadratic from './lagrangeinterpolation/lagrangequadratic';
import Lagrangepolynomial from './lagrangeinterpolation/lagrangepolynomial';
import Splinelinear from './splineinterpolation/splinelinear';
import Splinequadratic from './splineinterpolation/splinequadratic';
import Cubicspline from './splineinterpolation/cubicspline';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path='/rootofequations/garphical' element={<Garphical/>} />
        <Route path='/rootofequations/bisection' element={<Bisection/>} />
        <Route path='/rootofequations/falseposition' element={<FalsePosition/>} />
        <Route path='/rootofequations/newtonraphson' element={<Newtonraphson/>} />
        <Route path='/rootofequations/onepoint' element={<Onepoint/>} />
        <Route path='/rootofequations/secent' element={<Secent/>} />
        <Route path='/linearequations/carmersrule' element={<Carmers/>} />
        <Route path='/linearequations/gausselimination' element={<Gauss_Elimination/>} />
        <Route path='/newtoninterpolation/newtonlinear' element={<Newtonlinear/>} />
        <Route path='/newtoninterpolation/newtonquadratic' element={<Newtonquadratic/>} />
        <Route path='/newtoninterpolation/newtonpolynomial' element={<Newtonpolynomial/>} />
        <Route path='/lagrangeinterpolation/lagrangelinear' element={<Lagrangelinear/>} />
        <Route path='/lagrangeinterpolation/lagrangequadratic' element={<Lagrangequadratic/>} />
        <Route path='/lagrangeinterpolation/lagrangepolynomial' element={<Lagrangepolynomial/>} />
        <Route path='/splineinterpolation/splinelinear' element={<Splinelinear/>} />
        <Route path='/splineinterpolation/splinequadratic' element={<Splinequadratic/>} />
        <Route path='/splineinterpolation/cubicspline' element={<Cubicspline/>} />
      </Routes>
    </Router>
  );
}

export default App;
