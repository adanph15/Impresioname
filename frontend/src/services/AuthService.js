import axios from 'axios';

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
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api/users/signin`, {
      username, password
    });
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    console.log(response.data);
    return response.data;
  },

  register: async (username, name, last_name, mail, password) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api/users/signup`, {
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

  verifyRole: () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log("usuario: ", user);
  
    if (user) {
      console.log("rol: ", user.role);
      const role = user.role;
  
      if (role === "user") {
        if (window.location.pathname === '/admin') {
          window.location.href = '/home';
        }
      } 
    } else {
      if (window.location.pathname === '/admin') {
        window.location.href = '/home';
      }
      if (window.location.pathname === '/profile') {
        window.location.href = '/sign-in';
      }
      if (window.location.pathname === '/cart') {
        window.location.href = '/sign-in';
      }
    }
  }
  

};

export default AuthService;
