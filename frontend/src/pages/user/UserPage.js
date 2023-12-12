import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = AuthService.getToken();
      if (token) {
        try {
          const response = await axios.get(`http://localhost:8000/api/users/${userInfo.id}`, {
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
       window.location.href = "/sing-in";
     }
  }

  return (
    <>
      <body>
        <Header />
        <div className="singin-form-container">
          <h2>My Account</h2>
          {user ? (
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
              <div className="singin-form-item">
                <Link to={`/direction`} className='link'>
                  <button>View Addresses</button>
                </Link>
              </div>
              <div className="singin-form-item">
                <Link to={`/purchases`} className='link'>
                  <button>View Purchases</button>
                </Link>
              </div>
              <div className="singin-form-item">
                <button onClick={handleLogout}>Log Out</button>
              </div>

            </form>
          ) : (
            <>
              {handleUser(user)}
            </>
          )}
        </div>
        <Footer />
      </body>
    </>
  );
} 
