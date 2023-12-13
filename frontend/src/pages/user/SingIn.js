import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState } from 'react';
import AuthService from "../../services/AuthService";
import { Link } from 'react-router-dom';


export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const goToHome = () => {
    window.location.href = '/home';
  }

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(username, password);
      console.log("respuesta de usuarioInfo" + response.user)
      localStorage.setItem("userInfo", JSON.stringify(response.user));
      goToHome();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="singin-container">
          <form className='singin-form-container'>
            <h2>Sing In</h2>
            <h3>Already have an account:</h3>
            <div className="singin-form-item">
              <h4>Username</h4>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="singin-form-item">
              <h4>Password</h4>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="singin-form-item">
              <button type="button" onClick={handleLogin}>
                Enter
              </button>
            </div>
          </form>
          <form className='singin-form-container'>
            <h2>Sing Up</h2>
            <h3>New Users:</h3>
            <div className="singin-form-item">
              <h4>Register to have more benefits:</h4>
            </div>
            <div className="singin-form-item">
              <h4>- Track your deliveries</h4>
            </div>
            <div className="singin-form-item">
              <h4>- Manage all your deliveries</h4>
            </div>
            <div className="singin-form-item">
              <Link to={`/sing-up`} className='link'>
                <button>Create Account</button>
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};