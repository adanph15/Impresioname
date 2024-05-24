/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

// const CartPopUp = () => {
  // const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  // const [cartItems, setCartItems] = useState([]);


  // function prueba() {
  //   CartService.setCart(user.id, ArticleService.getOneArticle(1));
  // };


  // useEffect(() => {
  //   fetchData();
  // }, []);


  // const fetchData = async () => {
  //   const userInfo = getUser();
  //   const cart = getCart(userInfo.id);
  //   const token = AuthService.getToken();
  //   if (token) {
  //     try {
  //       const response = await axios.get(`https://localhost/api/users/${userInfo.id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(response.data);
  //       setCartItems(cart);
  //     } catch (err) {
  //         console.log(err);
  //     }
  //   } else {
  //       handleUser(userInfo);
  //   }
  // };

  //   const getUser = () => {
  //       return JSON.parse(localStorage.getItem('userInfo'));
  //   }


  //   const getCart = (id) => {
  //       return CartService.getCart(id);
  //   }


  //   const handleUser = () => {
  //       if (!user) {
  //           navigate('/sign-in');
  //       }
  //   }


  //   const calculateTotalPrice = () => {
  //       return cartItems.reduce((total, item) => total + item.price, 0);
  //   };


  //   const goToBasket = () => {
  //       navigate('/cart');
  //   }


  //   const handlePurchase = () => {
  //       PurchaseService.createPurchase(calculateTotalPrice());
  //   };


  //   const removeFromCart = (itemId) => {
  //       const updatedCart = cartItems.filter(item => item.id !== itemId);
  //       CartService.setCart(user.id, updatedCart);
  //       setCartItems(updatedCart);
  //   };


  //   const image = (imageName) => {
  //       const newName = imageName.replace('https://localhost/images/', '');
  //       console.log("nuevo nombre: ", newName);
  //       return newName;
  //   };




  //   const renderCartItems = () => {
  //     if (cartItems.length === 0) {
  //       return (
  //         <div className="cart-container">
  //           <p>Your Basket seems empty</p>
  //         </div>
  //       );
  //     } else {
  //         return (
  //           <>
  //           <div className='flex flex-col m-2 rounded'>
  //             {cartItems.map((article) => (
  //               <div className='w-full flex flex-row justify-between bg-quaternary rounded-l-lg mt-2 mb-2' key={article.id}>       
  //                 <img src={`https://localhost/images${image(article.filename)}`} className="w-16 h-16 bg-black text-white flex justify-center items-center rounded-md" alt={`foto`} />
  //                   <div className='flex w-1/2 justify-around items-center'>
  //                     <p>{article.name}</p>
  //                     <p>{article.price}€</p>
  //                   </div>
  //                   <button className="w-16 h-16 p-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-4 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => removeFromCart(article.id, user.id)}>X</button>
  //               </div>
  //             ))}
  //           </div>

  //           <div className='flex flex-row'>
  //             <div className="w-1/2 flex flex-col">
  //               <p className='font-semibold'>Resume</p>
  //               <p>Total: {calculateTotalPrice()}€</p>
  //             </div>
  //             <div className="w-1/2">
  //               <button className="w-5/6 bg-secundary text-primary hover:bg-yellow-400 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={goToBasket}>View in your Basket</button>
  //             </div>
  //           </div>
  //           </>
  //         );
  //     };
  // }

//   return (
//     <>
//       <div className='fixed top-0 right-0 m-8'>
//         <div className="bg-blue-500 h-1/4 w-96 flex flex-col items-center mr-4">
//           <div className='bg-white w-11/12 justify-center m-4 border-2 border-primary rounded'>
//             <p>BASKET</p>           
//             {/* {renderCartItems()} */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// export default CartPopUp;



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

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

export default function CartPopUp() {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
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

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
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
  )
}

