import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./pages/home/Home";
import SingIn from "./pages/singIn/SingIn";
import ShopMen from "./pages/shop/ShopMen";
import ShopWomen from "./pages/shop/ShopWomen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sing-in" element={<SingIn />} />
          <Route path="/shop-men" element={<ShopMen />} />
          <Route path="/shop-women" element={<ShopWomen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
