import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Footer from "../../components/footer/Footer";
import "./Admin.css";
import YourComponent from './article.list';
export default function AdminPage() {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <body>
                <div className="admin-container">

                    <h2>administration page</h2>

                    <button
                        className={`accordion ${activeIndex === 0 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(0)}
                    >
                    </button>
                    <div className={`panel ${activeIndex === 0 ? 'active' : ''}`}>
                        <p>
                            crud
                        </p>
                    </div>

                    <button
                        className={`accordion ${activeIndex === 1 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(1)}
                    >
                        purcharses
                    </button>
                    <div className={`panel ${activeIndex === 1 ? 'active' : ''}`}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    <button
                        className={`accordion ${activeIndex === 2 ? 'active' : ''}`}
                        onClick={() => toggleAccordion(2)}
                    >
                        carries
                    </button>
                    <div className={`panel ${activeIndex === 2 ? 'active' : ''}`}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                </div>
                <Footer />
            </body>
        </>
    );
}