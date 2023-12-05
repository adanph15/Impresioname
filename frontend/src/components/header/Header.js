import React, { useState } from 'react';
import { faUser, faBars, faCartShopping, faX } from '@fortawesome/free-solid-svg-icons'
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
            <div className="header-container">
                <a onClick={openNav}>
                    <FontAwesomeIcon icon={faBars} size="xl" />
                </a>
                <h1>IMPRESIÓNAME</h1>
                <a href='/profile'>
                    <FontAwesomeIcon icon={faUser} size="xl" />
                </a>
                <a >
                    <FontAwesomeIcon icon={faCartShopping} size="xl" />
                </a>
            </div>
            <Menu isOpen={isSidebarOpen} closeNav={closeNav} />
        </>
    );
}