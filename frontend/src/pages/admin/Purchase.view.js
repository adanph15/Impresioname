import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminPurchaseList = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/purchase`);
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);



    return (
        <div className="purchase">
            <h2>All Purchases</h2>

            {purchases.map((purchase) => (
                <div className='purchase-container' key={purchase.id}>
                    <div className='purchase-item'>
                        <strong>Purchase Number:</strong> {purchase.id}<br />
                        <strong>Date:</strong> {purchase.date}<br />
                        <strong>Total:</strong> {purchase.total}<br />
                        <strong>Status:</strong> {purchase.status}<br />
                        <strong>User ID:</strong> {purchase.user_id}<br />
                    </div>
                    <Link to={`/admin-purchases/update/${purchase.id}`}>
                        <button className="purchase-button">Update Purchase</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AdminPurchaseList;
