<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
=======
// import "./Menu.css";

// export default function Menu({ isOpen, closeNav }) {
//   return (
//     <div className={`sidenav ${isOpen ? 'open' : ''}`}>
//       <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
//         &times;
//       </a>
//       <a className="menu-a" href="/home">Home</a>
//       <a className="menu-a" href="/shop-men">Men</a>
//       <a className="menu-a" href="/shop-women">Women</a>
//       <a className="menu-a" href="/shop-kids">Kids</a>
//       <a className="menu-a" href="/sing-in">Sing-in</a>
//       <a className="menu-a" href="/sing-up">Sing-up</a>
//     </div>
//   );
// }


>>>>>>> develop
import "./Menu.css";

export default function Menu({ isOpen, closeNav }) {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="#!" className="closebtn" onClick={closeNav}>
        &times;
      </a>
      <a className="menu-a" href="/home">Home</a>
      <a className="menu-a" href="/shop-men">Men</a>
      <a className="menu-a" href="/shop-women">Women</a>
      <a className="menu-a" href="/shop-kids">Kids</a>
<<<<<<< HEAD
      <a className="menu-a" href="/sing-in">Sing-in</a>
      <a className="menu-a" href="/sing-up">Sing-up</a>
      <Link to="http://localhost:5488/templates/Obk5LjW" target="blank" className='menu-a'>Report</Link> 
=======
      <a className="menu-a" href="/sing-in">Sign-in</a>
      <a className="menu-a" href="/sing-up">Sign-up</a>
>>>>>>> develop
    </div>
  );
}

