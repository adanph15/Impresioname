import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";
import "./SingIn.css";
import axios from 'axios';


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

    const handleLogout =  () => {
        AuthService.logout();
    };

 
    return (
        <>
            <body>
                <Header />

                <div className="user-form-container">
                    <h2>my account</h2>
                    {user ? (
                        <div>
                            <p>Username: {user.username}</p>
                            <p>Name: {user.name}</p>
                            <p>Last Name: {user.last_name}</p>
                            <p>Email: {user.mail}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <p>sing - in</p>
                    )}
                </div>
                <Footer />
            </body>
        </>
    );
}