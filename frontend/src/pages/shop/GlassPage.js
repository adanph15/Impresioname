import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import { useParams } from 'react-router-dom';
import CartService from "../../services/CartService";
import useSocketService from '../../services/SocketService';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import MoreProducts from '../../components/purchase/MoreProducts';
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function GlassesPage() {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [setCartItems] = useState([]);
  useSocketService();
  console.log(cartItems)
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
  }, [id, userInfo]); // Agregamos 'userInfo' al arreglo de dependencias

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

  return (
    <>
      <Header />
      <div className="flex flex-col justify-between items-center gap-y-5 mt-24">
        <div className='flex flex-col items-center'>
          <div className='flex flex-row justify-between'>
            <img src={`https://localhost/images/${article.filename}`} className="w-5/12 rounded-lg mb-6 mt-5 image-glasses " alt={article.name} />
            <div className='flex flex-col items-start w-1/3 mb-6 mt-6 ml-5 '>
              <h2 className="text-2xl font-bold text-terciary ">{article.name}</h2>
              <p className='text-lg font-semibold mt-5'>{article.price}€ </p>
              <p className='text-base mt-5'>{article.description}</p>
              <p className='text-base mt-5'>{article.stock ? 'In stock' : 'Out of stock'}</p>
            </div>
            <div className="flex flex-col justify-center w-1/3 -mx-3 mb-6">
              <div className="flex flex-row justify-center w-full mb-6 mt-10">
                <button onClick={addToCart} className="button-hover button-cart flex flex-row justify-around items-center bg-primary text-white w-2/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-white hover:border-primary hover:border-solid hover:border">
                  <p className='mr-10'>Add to Basket</p>
                  <div className="icon mr-2">
                    <ShoppingCartIcon className='w-6' />
                  </div>
                </button>
              </div>
              <div className="flex flex-row justify-center w-full mb-6 mt-10">
                <button onClick={() => goToTryGlasses(article.id)} className="button-hover bg-primary text-white w-2/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" >Try Me</button>
              </div>
            </div>
          </div>
          <MoreProducts excludedId={id} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
