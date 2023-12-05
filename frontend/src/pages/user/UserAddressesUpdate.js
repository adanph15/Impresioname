import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserAddressesUpdate = () => {
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

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/direction/${id}`);
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

  const goToDirection = () => {
    window.location.href = '/direction';
  };

  const handleUpdateAddress = async () => {
    try {
      await axios.put(`http://localhost:8000/api/direction/${id}`, address);
      console.log('Address updated successfully.');
      navigate('/direction');
      // Puedes redirigir al usuario a la página principal u otra página después de la actualización.
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <>
      <body>
        <Header />
        <div className='singin-form-container'>
          <h2>Update Address</h2>
          <div className="singin-form-item">
            <h4>direction:</h4>
            <input type="text" name="direction" value={address.direction} onChange={handleInputChange} />
          </div>
          <div className="singin-form-item">
            <h4>post code:</h4>
            <input type="text" name="post_code" value={address.post_code} onChange={handleInputChange} />
          </div>
          <div className="singin-form-item">
            <h4>location:</h4>
            <input type="text" name="location" value={address.location} onChange={handleInputChange} />
          </div>
          <div className="singin-form-item">
            <h4>province:</h4>
            <input type="text" name="province" value={address.province} onChange={handleInputChange} />
          </div>
          <div className="singin-form-item">
            <button onClick={handleUpdateAddress}>Update Address</button>
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
};

export default UserAddressesUpdate;