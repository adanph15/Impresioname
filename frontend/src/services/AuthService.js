// src/services/AuthService.js
import axios from 'axios';

const API_URL = "http://localhost:8000/api/users/";

const AuthService = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token) {
    localStorage.setItem('token', token);
  }, //verificar

  removeToken() {
    localStorage.removeItem('token');
  },

  login: async (username, password) => {
    const response = await axios.post('http://localhost:8000/api/users/signin', {
      username, password
    });
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    console.log(response.data);
    return response.data;
  },

  // logout: async () => {
  //   localStorage.setItem('token', "");
  //   localStorage.setItem('userInfo', "");
  //   window.location.href = '/home';
  // }
  
};

export default AuthService;
