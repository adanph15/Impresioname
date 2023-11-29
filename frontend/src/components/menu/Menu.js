import React, { useState } from 'react';
import "./Menu.css";

export default function Menu({ isOpen, closeNav }) {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
        &times;
      </a>
      <a href="/home">home</a>
      <a href="/shop-men">men</a>
      <a href="/shop-women">women</a>
      <a href="/shop-kids">kids</a>
      <a href="/sing-in">sing-in</a>
      <a href="/sing-up">sing-up</a>
    </div>
  );
}