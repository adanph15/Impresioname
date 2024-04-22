import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import CartService from '../../services/CartService';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const cart = CartService.getCart(userInfo.id);
  console.log(cart)


  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="/miniIcon.png">
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <a className="font-semibold text-3xl tracking-tight no-underline" href='/home'>IMPRESIÓNAME</a>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="/miniIcon.png">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full ${isOpen ? 'block' : 'hidden'} lg:block flex-grow lg:flex lg:items-center lg:w-auto`}>
          <div className="text-xl lg:flex-grow">
            <a href="/shop/all" className="block mt-4 lg:inline-block lg:mt-0 text-secundary hover:text-white mr-4">
              Shop
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-secundary1 cursor-not-allowed mr-4">
              Custom Glasses
            </a>
            <a href="/sign-in" className="block mt-4 lg:inline-block lg:mt-0 text-teal-500 hover:text-white">
              Log-In
            </a>
          </div>
          <div>
            <a className="text-white no-underline relative" href='/profile'>
              <FontAwesomeIcon className="w-14" icon={faCircleUser} size="xl" />
            </a>
            <a className="text-white no-underline relative mr-10" href='/cart'>
            <span id="cart_menu_num" data-action="cart-can" class="absolute top-0 left-0 transform translate-x-7 translate-y-3 bg-red-500 w-5 h-5 rounded-full flex justify-center items-center text-sm text-white">{cart.length > 0 ? cart.length : 0}</span>
              <FontAwesomeIcon className="w-14" icon={faCartShopping} size="xl" />
            </a>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
          </div>
        </div>
      </nav>
    </>
  );
}
