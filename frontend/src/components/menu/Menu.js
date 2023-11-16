import React, { useState } from 'react';
import "./Menu.css";
const Menu = ({ isMenuVisible, toggleMenu }) => {
    return (
      <div className={`slide-menu ${isMenuVisible ? 'show' : ''}`}>
        <ul>
          <a href="/home"><li>home</li></a>
          <a href="/shop-men"><li>men</li></a>
          <a href="/shop-women"><li>women</li></a>
          <a href="/shop-kids"><li>kids</li></a>
          <a><li>account</li></a>
        </ul>
      </div>
    );
  };
  
  export default Menu;