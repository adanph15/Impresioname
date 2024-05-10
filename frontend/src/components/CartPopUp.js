import CartService from '../services/CartService';
// import PurchaseService from '../services/PurcharseService';
import AuthService from "../services/AuthService";
// import ArticleService from "../services/ArticleService";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CartPopUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);


  // function prueba() {
  //   CartService.setCart(user.id, ArticleService.getOneArticle(1));
  // };


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const userInfo = getUser();
    const cart = getCart(userInfo.id);
    const token = AuthService.getToken();
    if (token) {
      try {
        const response = await axios.get(`https://localhost/api/users/${userInfo.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setCartItems(cart);
      } catch (err) {
          console.log(err);
      }
    } else {
        handleUser(userInfo);
    }
  };

    const getUser = () => {
        return JSON.parse(localStorage.getItem('userInfo'));
    }


    const getCart = (id) => {
        return CartService.getCart(id);
    }


    const handleUser = () => {
        if (!user) {
            navigate('/sign-in');
        }
    }


    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };


    const goToBasket = () => {
        navigate('/cart');
    }


    // const handlePurchase = () => {
    //     PurchaseService.createPurchase(calculateTotalPrice());
    // };


    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        CartService.setCart(user.id, updatedCart);
        setCartItems(updatedCart);
    };


    const image = (imageName) => {
        const newName = imageName.replace('https://localhost/images/', '');
        console.log("nuevo nombre: ", newName);
        return newName;
    };




    const renderCartItems = () => {
      if (cartItems.length === 0) {
        return (
          <div className="cart-container">
            <p>Your Basket seems empty</p>
          </div>
        );
      } else {
          return (
            <>
            <div className='flex flex-col m-2 rounded'>
              {cartItems.map((article) => (
                <div className='w-full flex flex-row justify-between bg-quaternary rounded-l-lg mt-2 mb-2' key={article.id}>       
                  <img src={`https://localhost/images${image(article.filename)}`} className="w-16 h-16 bg-black text-white flex justify-center items-center rounded-md" alt={`foto`} />
                    <div className='flex w-1/2 justify-around items-center'>
                      <p>{article.name}</p>
                      <p>{article.price}€</p>
                    </div>
                    <button className="w-16 h-16 p-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-4 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => removeFromCart(article.id, user.id)}>X</button>
                </div>
              ))}
            </div>

            <div className='flex flex-row'>
              <div className="w-1/2 flex flex-col">
                <p className='font-semibold'>Resume</p>
                <p>Total: {calculateTotalPrice()}€</p>
              </div>
              <div className="w-1/2">
                <button className="w-5/6 bg-secundary text-primary hover:bg-yellow-400 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={goToBasket}>View in your Basket</button>
              </div>
            </div>
            </>
          );
      };
  }

  return (
    <>
      <div className='fixed top-0 right-0 m-8'>
        <div className="bg-blue-500 h-1/4 w-96 flex flex-col items-center mr-4">
          <div className='bg-white w-11/12 justify-center m-4 border-2 border-primary rounded'>
            <p>BASKET</p>           
            {renderCartItems()}
          </div>
        </div>
      </div>
    </>
  );
}


export default CartPopUp;



//     // return (
//     //     <>
//     //         <div>
//     //             <Header />
//     //             <div className="no-cart-container">
//     //                 <h2>My Basket</h2>
//     //                 {user ? (
//     //                     <>
//     //                         {renderCartItems()}
//     //                     </>
//     //                 ) : (
//     //                     <>
//     //                         {handleUser(user)}
//     //                     </>
//     //                 )}
//     //                 <ToastContainer />
//     //             </div>
//     //         </div>
//     //     </>
//     // );
// };