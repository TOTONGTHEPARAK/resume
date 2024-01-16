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
import { Cholesky } from './linearequations/cholesky';
import { Coniugate } from './linearequations/coniugate';
import Gauss_Elimination from './linearequations/gausselimination';
import { Gaussjordan } from './linearequations/gaussjordan';
import { Gaussseidel } from './linearequations/gaussseidel';
import { Jacobi } from './linearequations/jacobi';
import { LUdecomposion } from './linearequations/ludecomposion';
import { Matrixinversion } from './linearequations/matrixinversion';
import Newtonlinear from './newtoninterpolation/newtonlinear';
import Newtonquadratic from './newtoninterpolation/newtonquadratic';
import Newtonpolynomial from './newtoninterpolation/newtonpolynomial';
import Lagrangelinear from './lagrangeinterpolation/lagrangelinear';
import Lagrangequadratic from './lagrangeinterpolation/lagrangequadratic';
import Lagrangepolynomial from './lagrangeinterpolation/lagrangepolynomial';
import Splinelinear from './splineinterpolation/splinelinear';
import Splinequadratic from './splineinterpolation/splinequadratic';
import Cubicspline from './splineinterpolation/cubicspline';
import Regressionlinear from './leastsquaresregression/regressionlinear';

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
        <Route path='/linearequations/cholesky' element={<Cholesky/>} />
        <Route path='/linearequations/coniugate' element={<Coniugate/>} />
        <Route path='/linearequations/gausselimination' element={<Gauss_Elimination/>} />
        <Route path='/linearequations/gaussjordan' element={<Gaussjordan/>} />
        <Route path='/linearequations/gaussseidel' element={<Gaussseidel/>} />
        <Route path='/linearequations/jacobi' element={<Jacobi/>} />
        <Route path='/linearequations/ludecomposion' element={<LUdecomposion/>} />
        <Route path='/linearequations/matrixinversion' element={<Matrixinversion/>} />
        <Route path='/newtoninterpolation/newtonlinear' element={<Newtonlinear/>} />
        <Route path='/newtoninterpolation/newtonquadratic' element={<Newtonquadratic/>} />
        <Route path='/newtoninterpolation/newtonpolynomial' element={<Newtonpolynomial/>} />
        <Route path='/lagrangeinterpolation/lagrangelinear' element={<Lagrangelinear/>} />
        <Route path='/lagrangeinterpolation/lagrangequadratic' element={<Lagrangequadratic/>} />
        <Route path='/lagrangeinterpolation/lagrangepolynomial' element={<Lagrangepolynomial/>} />
        <Route path='/splineinterpolation/splinelinear' element={<Splinelinear/>} />
        <Route path='/splineinterpolation/splinequadratic' element={<Splinequadratic/>} />
        <Route path='/splineinterpolation/cubicspline' element={<Cubicspline/>} />
        <Route path='/leastsquaresregression/regressionlinear' element={<Regressionlinear/>} />
      </Routes>
    </Router>
  );
}

export default App;
