import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAddressesPage = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id = userInfo.id;
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        direction: '',
        post_code: '',
        location: '',
        province: '',
        user_id: id,
    });

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/direction/user/${id}`);
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const addNewAddress = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/direction`, {
                ...newAddress
            });
            setAddresses((prevAddresses) => [...prevAddresses, response.data]);
        } catch (error) {
            console.error('Error adding new address:', error);
        }
    };

    const handleUpdate = (id) => {
        window.location.href = `/direction-update/${id}`;
    }


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/direction/${id}`);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <>
            <body>
                <Header />
                <div className='singin-form-container'>
                    <h2>directions info</h2>

                    {addresses.map((address) => (
                        <div className="direction-container">
                            <div className="direction-item">
                                <h5>direction: </h5>
                                <p>{address.direction}</p>
                            </div>
                            <div className="direction-item">
                                <h5>post code</h5>
                                <p>{address.post_code}</p>
                            </div>
                            <div className="direction-item">
                                <h5>location</h5>
                                <p>{address.location}</p>
                            </div>
                            <div className="direction-item">
                                <h5>province</h5>
                                <p>{address.province}</p>
                            </div>
                            <div className="direction-item">
                                <button className="direction-button" onClick={() => handleUpdate(address.id)}>Update Address</button>
                                <button className="direction-button" onClick={() => handleDelete(address.id)}>Delete Address</button>
                            </div>
                        </div>
                    ))}

                    <div>
                        <h2>add new address</h2>
                        <div className="singin-form-item">
                            <h4>direction:</h4>
                            <input type="text" name="direction" value={newAddress.direction} onChange={handleInputChange} />
                        </div>
                        <div className="singin-form-item">
                            <h4>post code:</h4>
                            <input type="text" name="post_code" value={newAddress.post_code} onChange={handleInputChange} />
                        </div>
                        <div className="singin-form-item">
                            <h4>location:</h4>
                            <input type="text" name="location" value={newAddress.location} onChange={handleInputChange} />
                        </div>
                        <div className="singin-form-item">
                            <h4>province:</h4>
                            <input type="text" name="province" value={newAddress.province} onChange={handleInputChange} />
                        </div>
                        <div className="singin-form-item">
                            <button onClick={addNewAddress}>Add Address</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </body >
        </>
    );
};

export default UserAddressesPage;
