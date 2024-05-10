import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import { useParams } from 'react-router-dom';
import CartService from "../../services/CartService";
import { Link } from 'react-router-dom';
import useSocketService from '../../services/SocketService';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export default function GlassesPage() {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  console.log("ID:", id);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [cartItems, setCartItems] = useState([]);
  useSocketService();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://localhost/api/article/${id}`);
        setArticle(response.data);
        if (userInfo) {
          const cart = CartService.getCart(userInfo.id);
          setCartItems(cart);
        }
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const addToCart = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const newItem = {
      id: article.id,
      name: article.name,
      price: article.price,
      filename: `https://localhost/images/${article.filename}`,
      stock: article.stock,
    };

    const currentCart = CartService.getCart(userInfo.id);

    // Append the new item to the current cart
    const updatedCart = [...currentCart, newItem];

    // Save the updated cart to local storage
    CartService.setCart(userInfo.id, updatedCart);

    // Update the state with the updated cart
    setCartItems(updatedCart);
    console.log(updatedCart)

    goToShop();
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  const goToTryGlasses = (id) => {
    navigate(`/preview/${id}`);
  };

  const goToShop = () => {
    navigate(`/home#shop`);
  };

  //   .glasses {
  //     height: 100vh;
  // }

  // .glasses-container {
  //     margin-top: 10vh;
  //     display: flex;
  //     justify-content: center;
  // }

  // .glasses-item {
  //     width: 85%;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-evenly;
  //     align-items: center;    
  //     background-color: #333333;
  //     color: white;
  //     border-radius: 6px;
  // }

  // .glasses-item-info {
  //     margin-top: 3vh;
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     flex-direction: column;
  //     gap: 10px 60px;
  //     margin-bottom: 5vh;
  // }

  // .glasses-info {
  //     width: 100%;
  //     margin-top: -2vh;
  // }

  // .button-glasses {
  //     background-color: white;
  //     color: black;
  // }

  // .button-glasses:hover {
  //     background-color: black;
  //     color: white;
  // }

  // .glasses-item-img {
  //     border-radius: 6px;
  //     width: 30vw;
  // }


  return (
    <>
      <Header />
      <div className="flex flex-col justify-between items-center gap-y-5">
        <h2 className="text-4xl font-bold text-terciary mt-10">{article.name}</h2>
        <div className='flex flex-col items-center'>
          <img src={`https://localhost/images/${article.filename}`} className="w-2/3 rounded-lg mb-6 mt-5 border-b border-r border-primary" alt='articleImagesGlasses' />
          <div className='flex flex-col items-start w-2/3 '>
            <p className='text-xl font-semibold mt-5'>{article.price}€   |  {article.stock ? 'In stock' : 'Out of stock'}</p>
            <p className='text-lg mt-5'>{article.description}</p>
          </div>
          <div className="flex flex-row justify-center w-2/3 -mx-3 mb-6">
            <div className="flex flex-row justify-center w-full mb-6 mt-10">
              <button onClick={addToCart} className="bg-primary text-white w-2/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" >Add to Basket</button>
            </div>
            <div className="flex flex-row justify-center w-full mb-6 mt-10">
              <button onClick={() => goToTryGlasses(article.id)} className="bg-primary text-white w-2/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" >Try Me</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}