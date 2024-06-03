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

  verifyRole: () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log("usario: ",user)
    console.log("rol: ",user.role)

    // if (!session) {
    //   // If the user is on the /login or /signup page, do not redirect
    //   if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/form' ) {
    //     navigate('/landing')
    //   }
    // } else {
    //   if (window.location.pathname !== '/form') {
    //     navigate('/')
    //   }
    // }

    if (user === null) {
      return ""
    } else {
      const role = user.role;


      if (role === "user") {
        if (window.location.pathname === '/admin') {
          window.location.href = '/home';
        }

      } else if (role === "admin") {
  
      } else {
  
      }
    }
  }

};

export default AuthService;
