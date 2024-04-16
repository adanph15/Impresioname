import React, { useState } from 'react';
import { faUser, faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu from "../menu/Menu";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openNav = () => {
    setSidebarOpen(true);
  };

  const closeNav = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-evenly mt-0 border-solid border-b-4 border-terciary ">
        <a>
          <FontAwesomeIcon className="hidden w-14" icon={faUser} size="xl" />
        </a>
        <a className="text-terciary no-underline" onClick={openNav}>
          <FontAwesomeIcon className='w-14' icon={faBars} size="xl" />
        </a>
        <a className="text-terciary no-underline" href='/home'>
          <h1 className='text-5xl bold text-terciary'>IMPRESIÓNAME</h1>
        </a>
        <a className="text-terciary no-underline" href='/profile'>
          <FontAwesomeIcon className="w-14" icon={faUser} size="xl" />
        </a>
        <a className="text-terciary no-underline" href='/cart'>
          <FontAwesomeIcon className="w-14" icon={faCartShopping} size="xl" />
        </a>
      </div>
      <Menu isOpen={isSidebarOpen} closeNav={closeNav} />
    </>
  );
}