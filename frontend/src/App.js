import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import './styles/Main.css';
import Home from "./pages/home/Home";
import SingIn from "./pages/user/SingIn";
import ShopMen from "./pages/shop/ShopMen";
import ShopWomen from "./pages/shop/ShopWomen";
import ShopKids from "./pages/shop/ShopKids";
import AdminArticle from "./pages/admin/Article.crud";
import GlassesPage from "./pages/shop/GlassPage";
import SingUp from "./pages/user/SingUp";

function App() {
  document.title = "IMPRESIÓNAME";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sing-in" element={<SingIn />} />
          <Route path="/sing-up" element={<SingUp />} />
          <Route path="/shop-men" element={<ShopMen />} />
          <Route path="/shop-women" element={<ShopWomen />} />
          <Route path="/shop-kids" element={<ShopKids />} />
          <Route path="/admin-article" element={<AdminArticle />} />
          <Route path="/glasses/:id" element={<GlassesPage />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
