import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./pages/home/Home";
import SingIn from "./pages/user/SingIn";
import ShopMen from "./pages/shop/ShopMen";
import ShopWomen from "./pages/shop/ShopWomen";
import ShopKids from "./pages/shop/ShopKids";
import AdminPage from "./pages/admin/AdminPage";
import AdminArticle from "./pages/admin/article.list";
import GlassesPage from "./pages/shop/GlassPage";

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
          <Route path="/shop-kids" element={<ShopKids />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-article" element={<AdminArticle />} />
          <Route path="/glasses/:id" element={<GlassesPage />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
