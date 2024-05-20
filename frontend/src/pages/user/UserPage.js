import Header from "../../components/header/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
// import ProfileOptions from "../../components/fffff";

export default function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchData = async () => {
      const token = AuthService.getToken();
      if (token) {
        try {
          const response = await axios.get(`https://localhost/api/users/${userInfo.id}`, {
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

  const handleUser = () => {
      navigate("/sign-in");
  }


  return (
    <>
      {userInfo ? (
        <>
          <Header />
          {/* <ProfileOptions /> */}
        </>
      ) : (
        <>
          {handleUser()}
        </>
      )}
    </>
  );
} 
