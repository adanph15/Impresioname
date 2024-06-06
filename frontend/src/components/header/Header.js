import { useState } from 'react';
import CartService from '../../services/CartService';
import CartPopUp from '../purchase/CartPopUp';
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let cart = 0;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    cart = CartService.getCart(userInfo.id).length;
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6 fixed w-full top-0 z-50">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="/miniIcon.png">
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <a className="font-semibold text-3xl tracking-tight no-underline" href='/home'>IMPRESI<span className="text-secundary">Ó</span>NAME</a>
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
          <div className="text-xl lg:flex-grow text-white">
            <a href="/home#shop" className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" style={{ scrollBehavior: 'smooth' }}>
              Shop
            </a>
            <a href="/custom" className="block mt-4 lg:inline-block lg:mt-0  mr-4">
              Custom Glasses
            </a>
            <a href="/sign-in" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white">
              Log-In
            </a>
          </div>
          <div className='flex flex-row justify-between mr-16 gap-8'>
            <a href='/profile' className="text-white no-underline relative">
              <UserCircleIcon className="w-8" />
            </a>
            <button onClick={() => setIsOpen(true)} className="text-white no-underline relative mr-10">
              <span id="cart_menu_num" data-action="cart-can" className="absolute top-0 left-0 transform translate-x-5 translate-y-5 bg-secundary w-5 h-5 rounded-full flex justify-center items-center text-sm text-white cursor-pointer">{cart > 0 ? cart : 0}</span>
              <ShoppingCartIcon className="w-8 cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>
      {isOpen && <CartPopUp isOpen={isOpen} setOpen={setIsOpen} />}
    </>
  );
}