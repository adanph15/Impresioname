import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';
import Tabs from "../../components/fffff";

export default function UserPage() {
  useSocketService();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = AuthService.getToken();
      if (token) {
        try {
          const response = await axios.get(`https://localhost/api/users/${userInfo.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    AuthService.logout();
  };

  const handleUser = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate("/sign-in");
    }
  }

  const goToPurchases = () => {
    navigate('/purchases');
  }

  const goToAddresses = () => {
    navigate('/addresses');
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-around items-center">
        {user ? (
          <>
            <h2 className>{user.username}</h2>
            <form className='singin-form-container'>
              <div className="singin-form-item">
                <h4>Username</h4>
                <input name="username" type="text" value={user.username} ></input>
              </div>
              <div className="singin-form-item">
                <h4>Name</h4>
                <input name="name" type="text" value={user.name}></input>
              </div>
              <div className="singin-form-item">
                <h4>Last Name</h4>
                <input name="last_name" type="text" value={user.last_name} ></input>
              </div>
              <div className="singin-form-item">
                <h4>Mail</h4>
                <input name="mail" type="text" value={user.mail} ></input>
              </div>

              <div className="flex flex-row justify-center -mx-3 mb-6 mt-10">
                <button className="bg-primary text-white w-full h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={() => goToAddresses()}>
                  View Addresses
                </button>
              </div>

              <div className="flex flex-row justify-center -mx-3 mb-6 mt-10">
                <button className="bg-primary text-white w-full h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={() => goToPurchases()}>
                  View Purchases
                </button>
              </div>

              <div className="flex flex-row justify-center -mx-3 mb-6 mt-10">
                <button className="bg-primary text-white w-full h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {handleUser(user)}
          </>
        )}
      </div>
      <Tabs />
      <ToastContainer />
    </>
  );
} 
