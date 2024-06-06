import axios from 'axios';
import CartService from '../../services/CartService';
import AuthService from "../../services/AuthService";
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function CartPopUp({ isOpen, setOpen }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = getUser();
      if (!userInfo) {
        navigate('/sign-in');
        return;
      }
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
        setCartItems([]);
      }
    };
    fetchData();
  }, [navigate]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getUser = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  };

  const getCart = (id) => {
    return CartService.getCart(id);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    CartService.setCart(user.id, updatedCart);
    setCartItems(updatedCart);
  };

  const goToBasket = () => {
    navigate('/cart');
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex mt-20 h-4/5 flex-col overflow-y-scroll bg-gray-300 shadow-xl rounded-bl-lg">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8 h-96">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-primary">
                            {cartItems.map((article) => (
                              <li key={article.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`${article.filename}`}
                                    alt={article.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={`/glasses/${article.id}`}>{article.name}</a>
                                      </h3>
                                      <p className="ml-4">{article.price}€</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {article.quantity}</p>
                                    <div className="flex">
                                      <button onClick={() => removeFromCart(article.id)} className="w-12 h-12 mt-2 px-4 py-2 bg-primary text-white rounded-lg delete"><TrashIcon className="w-6 delete-icon" /></button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-primary px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{calculateTotalPrice()}€</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6 flex items-center justify-center" onClick={goToBasket}>
                        <button className="button-hover bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}