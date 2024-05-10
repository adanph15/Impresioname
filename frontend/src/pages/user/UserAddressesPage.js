import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';

const UserAddressesPage = () => {
  useSocketService();
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
        const response = await axios.get(`https://localhost/api/direction/user/${id}`);
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

  const [addressErrors, setAddressErrors] = useState({
    direction: '',
    post_code: '',
    location: '',
    province: '',
  });

  const validateAddressForm = () => {
    let isValid = true;
    const errors = {
      direction: '',
      post_code: '',
      location: '',
      province: '',
    };

    if (!newAddress.direction.trim()) {
      errors.direction = 'Direction is required';
      isValid = false;
    }

    if (!newAddress.post_code.trim()) {
      errors.post_code = 'Post Code is required';
      isValid = false;
    } else if (!/^\d{5,}$/.test(newAddress.post_code.trim())) {
      errors.post_code = 'Post Code must be numeric and have at least 5 characters';
      isValid = false;
    }


    if (!newAddress.location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }

    if (!newAddress.province.trim()) {
      errors.province = 'Province is required';
      isValid = false;
    }

    setAddressErrors(errors);
    return isValid;
  };

  const addNewAddress = async (e) => {
    e.preventDefault();

    if (validateAddressForm()) {
      try {
        const response = await axios.post(`http://localhost:8000/api/direction`, {
          ...newAddress,
        });
        setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      } catch (error) {
        console.error('Error adding new address:', error);
      }
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/direction-update/${id}`;
  }


  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost/api/direction/${id}`);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <>
      <div>
        <div className="singin-container">
          <div className="double-container">
            <div className='singin-form-container'>
              <h2>Directions Info</h2>
              <br></br>
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
                <input
                  type="text"
                  name="direction"
                  value={newAddress.direction}
                  onChange={handleInputChange}
                />
                <p className="error-message">{addressErrors.direction}</p>
              </div>
              <div className="singin-form-item">
                <h4>Post Code:</h4>
                <input
                  type="text"
                  name="post_code"
                  value={newAddress.post_code}
                  onChange={handleInputChange}
                />
                <p className="error-message">{addressErrors.post_code}</p>
              </div>
              <div className="singin-form-item">
                <h4>Location:</h4>
                <input
                  type="text"
                  name="location"
                  value={newAddress.location}
                  onChange={handleInputChange}
                />
                <p className="error-message">{addressErrors.location}</p>
              </div>
              <div className="singin-form-item">
                <h4>Province:</h4>
                <input
                  type="text"
                  name="province"
                  value={newAddress.province}
                  onChange={handleInputChange}
                />
                <p className="error-message">{addressErrors.province}</p>
              </div>
              <div className="singin-form-item">
                <button onClick={addNewAddress}>Add Address</button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UserAddressesPage;
