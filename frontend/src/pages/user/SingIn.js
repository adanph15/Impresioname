import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState } from 'react';
import axios from 'axios';
import AuthService from "../../services/AuthService";


export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(username, password);
      console.log("respuesta de usuarioInfo" + response.user)
      localStorage.setItem("userInfo", JSON.stringify(response.user));
      // window.location.href = '/home';
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
      <body>
        <Header />
        <div className="singin-form-container">
          <h2>sing-in</h2>
          <form className='singin-form-container'>
            <div className="singin-form-item">
              <h4>username</h4>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="singin-form-item">
              <h4>password</h4>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="singin-form-item">
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </body>
    </>
  );
};