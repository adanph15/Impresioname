import Header from "../../components/header/Header";
import Scroll from "../../components/scroll/Scroll";
import jasonCategories from "../../assets/images/jasonCategories"
import "./Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import io from 'socket.io-client';


export default function Home() {

  const runEvent = () => {
    const socket = io("https://localhost:8000", {transports: ["websocket"]});
    console.log("ran 1st")
    socket.emit("new_user_login", {message: "User has logged In"});
  };

  const runLocalEvent = () => {
    toast.success("This is a local event",{
      position: "top-right",
      theme: "dark",
      autoClose: 2000,
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    const socket = io("https://localhost:8000", {transports: ["websocket"]});

    socket.on("new_user_login", (data) => {
      toast.info(data.message,{
        position: "top-right",
        theme: "dark",
        autoClose: 2000,
        pauseOnHover: false,
      });    
    });

    socket.on("new_glasses", (data) => {
      toast.info(data.message, {
          position: "top-right",
          theme: "dark",
          autoClose: 20000,
          pauseOnHover: false,
      });
  });


  }, []);



  return (
    <>
      <div>
        <Header />
        <div className="home-container">
          <h2>Newest</h2>
          <div className="home-container-newest">
            <Scroll />
          </div>
          <h2>Category</h2>
          <div className="home-container-category">
            <a href="/shop-men">
              <div className="home-container-category-item" >
                <img src={jasonCategories[0]} alt="men" className="home-container-category-item-img" />
                <h3>Men</h3>
              </div>
            </a>
            <a href="/shop-women">
              <div className="home-container-category-item" >
                <img src={jasonCategories[1]} alt="women" className="home-container-category-item-img" />
                <h3>Women</h3>
              </div>
            </a>
            <a href="/shop-kids">
              <div className="home-container-category-item" >
                <img src={jasonCategories[2]} alt="kids" className="home-container-category-item-img" />
                <h3>Kids</h3>
              </div>
            </a>
          </div>
        </div>
        <ToastContainer />
        <button onClick={() => runEvent()}>REAL TIME EVENT</button>
        <button onClick={() => runLocalEvent()}>LOCAL TIME EVENT</button>
      </div>
    </>
  );
}
