import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { Coffee } from "./pages/coffee/coffee";
import { Tea } from "./pages/tea/tea";
import { Soda } from "./pages/soda/soda";
import { Store } from "./pages/store/store";
import { Addstore } from "./pages/store/addstore";
import { Setting } from "./pages/setting/setting";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/coffee" element={<Coffee />} />
            <Route path="/tea" element={<Tea />} />
            <Route path="/soda" element={<Soda />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/store" element={<Store />} />
            <Route path="/addstore" element={<Addstore />} />
            <Route path="/setting" element={<Setting />}/>
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
