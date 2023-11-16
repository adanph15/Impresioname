import React, { useState } from 'react';

import "./Header.css";
import { faUser, faBars, faCartShopping, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu from "../menu/Menu";

export default function Header() {
    const [isMenuVisible, setMenuVisibility] = useState(false);

    const toggleMenu = () => {
        setMenuVisibility(!isMenuVisible);
    };
    return (
        <>
            <body>
                <div className="header-container">
                    <a onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isMenuVisible ? faX : faBars } size="xl" />
                    </a>
                    <h1>IMPRESIÓNAME</h1>
                    <a><FontAwesomeIcon icon={faUser} size="xl" /></a>
                    <a><FontAwesomeIcon icon={faCartShopping} size="xl" /></a>
                </div>
                <Menu isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />


            </body>
        </>
    );
}

// import Navbar from "../menu/Navbar";
