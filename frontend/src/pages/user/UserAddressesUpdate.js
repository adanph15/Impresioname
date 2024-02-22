import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';

const UserAddressesUpdate = () => {
  useSocketService();
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo.id;
  const [address, setAddress] = useState({
    direction: '',
    post_code: '',
    location: '',
    province: '',
    user_id: userId,
  });

  const [addressErrors, setAddressErrors] = useState({
    direction: '',
    post_code: '',
    location: '',
    province: '',
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`https://localhost/api/direction/${id}`);
        setAddress(response.data);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  const validateAddressForm = () => {
    let isValid = true;
    const errors = {
      direction: '',
      post_code: '',
      location: '',
      province: '',
    };
  
    if (!address.direction.trim()) {
      errors.direction = 'Direction is required';
      isValid = false;
    }
  
    if (!address.post_code.trim()) {
      errors.post_code = 'Post Code is required';
      isValid = false;
    } else if (!/^\d{5,}$/.test(address.post_code.trim())) {
      errors.post_code = 'Post Code must be numeric and have at least 5 characters';
      isValid = false;
    }
  
    if (!address.location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }
  
    if (!address.province.trim()) {
      errors.province = 'Province is required';
      isValid = false;
    }
  
    setAddressErrors(errors);
    return isValid;
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();


    if (validateAddressForm()) {
      try {
        await axios.put(`http://localhost:8000/api/direction/${id}`, address);
        console.log('Address updated successfully.');
        navigate('/direction');
      } catch (error) {
        console.error('Error updating address:', error);
      }
=======
  const handleUpdateAddress = async () => {
    try {
      await axios.put(`https://localhost/api/direction/${id}`, address);
      console.log('Address updated successfully.');
      navigate('/direction');
    } catch (error) {
      console.error('Error updating address:', error);
>>>>>>> develop
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="singin-container">
          <div className='singin-form-container'>
            <h2>Update Address</h2>
            <div className="singin-form-item">
              <h4>Direction:</h4>
              <input
                type="text"
                name="direction"
                value={address.direction}
                onChange={handleInputChange}
              />
              <p className="error-message">{addressErrors.direction}</p>
            </div>
            <div className="singin-form-item">
              <h4>Post code:</h4>
              <input
                type="text"
                name="post_code"
                value={address.post_code}
                onChange={handleInputChange}
              />
              <p className="error-message">{addressErrors.post_code}</p>
            </div>
            <div className="singin-form-item">
              <h4>Location:</h4>
              <input
                type="text"
                name="location"
                value={address.location}
                onChange={handleInputChange}
              />
              <p className="error-message">{addressErrors.location}</p>
            </div>
            <div className="singin-form-item">
              <h4>Province:</h4>
              <input
                type="text"
                name="province"
                value={address.province}
                onChange={handleInputChange}
              />
              <p className="error-message">{addressErrors.province}</p>
            </div>
            <div className="singin-form-item">
              <Link to={`/direction`} className='link'>
                <button onClick={handleUpdateAddress}>Update Address</button>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UserAddressesUpdate;