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
        <div className="singin-container">
          <div className="double-container">
            <div className='singin-form-container'>
              <h2>Directions Info</h2>

              {addresses.map((address) => (
                <div className="direction-container">
                  <div className="direction-item">
                    <p>Street: {address.direction}, {address.post_code}, {address.location}, {address.province}</p>
                  </div>
                  <div className="direction-item">
                    <button className="direction-button" onClick={() => handleUpdate(address.id)}>Update</button>
                    <button className="direction-button" onClick={() => handleDelete(address.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className='singin-form-container'>
              <h2>Add New Address</h2>
              <div className="singin-form-item">
                <h4>Direction:</h4>
                <input type="text" name="direction" value={newAddress.direction} onChange={handleInputChange} />
              </div>
              <div className="singin-form-item">
                <h4>Post Code:</h4>
                <input type="text" name="post_code" value={newAddress.post_code} onChange={handleInputChange} />
              </div>
              <div className="singin-form-item">
                <h4>Location:</h4>
                <input type="text" name="location" value={newAddress.location} onChange={handleInputChange} />
              </div>
              <div className="singin-form-item">
                <h4>Province:</h4>
                <input type="text" name="province" value={newAddress.province} onChange={handleInputChange} />
              </div>
              <div className="singin-form-item">
                <button onClick={addNewAddress}>add address</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </body >
    </>
  );
};

export default UserAddressesPage;
