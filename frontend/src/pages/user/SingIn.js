import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./SingIn.css";
import React, { useState } from 'react';
import axios from 'axios';
import AuthService from "../../services/AuthService";


export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await  AuthService.login(username, password);
      localStorage.setItem("userInfo", JSON.stringify(response.user));
      // window.location.href = '/home';
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};