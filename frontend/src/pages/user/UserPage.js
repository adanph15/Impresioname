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



  const goToSingIn = () => {
    window.location.href = '/sing-in';
  };

  const goToDirection = () =>{
    window.location.href = '/direction';
  };


/// HACER TODOS LOS PTOS ENLACES CON LINK


  return (
    <>
      <body>
        <Header />

        <div className="singin-form-container">
          <h2>my account</h2>
          {user ? (
            <form className='singin-form-container'>
              <div className="singin-form-item">
                <h4>username</h4>
                <input name="username" type="text" value={user.username} ></input>
              </div>
              <div className="singin-form-item">
                <h4>name</h4>
                <input name="name" type="text" value={user.name}></input>
              </div>
              <div className="singin-form-item">
                <h4>last name</h4>
                <input name="last_name" type="text" value={user.last_name} ></input>
              </div>
              <div className="singin-form-item">
                <h4>mail</h4>
                <input name="mail" type="text" value={user.mail} ></input>
              </div>
              <div className="singin-form-item">
                <button onClick={goToDirection}>View Addresses</button>
              </div>
              <div className="singin-form-item">
                <button>log-out</button>
              </div>

            </form>
          ) : (
            <>
              <p>you must sing in</p>
              <button onClick={goToSingIn}>sing-in</button>
            </>
          )}
        </div>
        <Footer />
      </body>
    </>
  );
} 
