import axios from 'axios';

// const API_URL = "https://localhost/api/users/";

const AuthService = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token) {
    localStorage.setItem('token', token);
  }, 

  removeToken() {
    localStorage.removeItem('token');
  },

  login: async (username, password) => {
    const response = await axios.post('https://localhost/api/users/signin', {
      username, password
    });
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    console.log(response.data);
    return response.data;
  },

  register: async (username, name, last_name, mail, password) => {
    const response = await axios.post('https://localhost/api/users/signup', {
      username,
      name,
      last_name,
      mail,
      password,
    });
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/home';
  },

};

export default AuthService;
