import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState } from 'react';
import AuthService from "../../services/AuthService";
import { Link } from 'react-router-dom';


export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(username, password);
      console.log("respuesta de usuarioInfo" + response.user)
      localStorage.setItem("userInfo", JSON.stringify(response.user));
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
      <body>
        <Header />
        <div className="singin-container">
          <form className='singin-form-container'>
            <h2>sing-in</h2>
            <h3>already have an account:</h3>
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
                enter
              </button>
            </div>
          </form>
          <form className='singin-form-container'>
            <h2>sing-up</h2>
            <h3>new users:</h3>
            <div className="singin-form-item">
              <h4>register to have more benefits:</h4>
            </div>
            <div className="singin-form-item">
              <h4>- track your deliveries</h4>
            </div>
            <div className="singin-form-item">
              <h4>- manage all your deliveries</h4>
            </div>
            <div className="singin-form-item">
              <Link to={`/sing-up`} className='link'>
                <button>create account</button>
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </body>
    </>
  );
};