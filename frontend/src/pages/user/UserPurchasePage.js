import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPurchasePage = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id = userInfo.id;
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/purchase/user/${id}`);
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching Purchases:', error);
            }
        };

        fetchPurchases();
    }, [id]);


    //   const handleDelete = async (id) => {
    //     try {
    //       await axios.delete(`http://localhost:8000/api/direction/${id}`);
    //     } catch (error) {
    //       console.error('Error deleting address:', error);
    //     }
    //   };

    return (
        <>
            <body>
                <Header />
                <div className="purchase">
                        <h2>My Purchases</h2>
                        {purchases.map((purchase) => (
                            <div className="purchase-container">
                                <div className="purchase-item">
                                    <p>Purchase: {purchase.date}, {purchase.total}€, {purchase.status}</p>
                                    <p>Purchase: {purchase.date}, {purchase.total}€, {purchase.status}</p>
                                    <p>Purchase: {purchase.date}, {purchase.total}€, {purchase.status}</p>
                                </div>
                                <div>
                                    <button className="purchase-button">Cancel Purchase</button>
                                    {/* <button className="direction-button" onClick={() => handleDelete(purchase.id)}>Delete</button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                <Footer />
            </body >
        </>
    );
};

export default UserPurchasePage;
