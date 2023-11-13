import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./pages/home/Home";
import SingIn from "./pages/singIn/SingIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sing-in" element={<SingIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
