import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const AdminPurchaseUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [purchase, setPurchase] = useState({
    status: '',
  });

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await axios.get(`https://localhost:8000/api/purchase/${id}`);
        setPurchase({ status: response.data.status });
      } catch (error) {
        console.error('Error fetching purchase:', error);
      }
    };

    fetchPurchase();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      [name]: value,
    }));
  };

  const handleUpdatePurchaseStatus = async () => {
    try {
      await axios.put(`https://localhost:8000/api/purchase/${id}`, {
        status: purchase.status,
      });
      console.log('Purchase status updated successfully.');
      navigate('/admin-purchases'); // Redirect to the purchases list page
    } catch (error) {
      console.error('Error updating purchase status:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className='singin-form-container'>
          <h2>Update Purchase Status</h2>
          <div className="singin-form-item">
            <h4>Status:</h4>
            <input
              type="text"
              name="status"
              value={purchase.status}
              onChange={handleInputChange}
            />
          </div>
          <div className="singin-form-item">
            <button onClick={handleUpdatePurchaseStatus}>Update Purchase Status</button>
          </div>
        </div>
      </div>
    </>
  );
};



export default AdminPurchaseUpdate;

