import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/header/Header';
import ProfileInfo from '../../components/profile/ProfileInfo';
import UserPageUpdate from './UserPageUpdate';

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchData = async () => {
      if (!userInfo || !userInfo.id) {
        localStorage.setItem('authError', 'Debes iniciar sesión para acceder a esta página.');
        navigate('/sign-in');
        return;
      }

      const token = AuthService.getToken();
      if (!token) {
        localStorage.setItem('authError', 'Debes iniciar sesión para acceder a esta página.');
        navigate('/sign-in');
        return;
      }

      try {
        const response = await axios.get(`https://localhost/api/users/${userInfo.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.log(err);
        navigate('/sign-in');
        localStorage.setItem('authError', 'Debes iniciar sesión para acceder a esta página.');
      }
    };

    fetchData();
  }, [navigate]);

  const handleUpdate = () => {
    setIsUpdatePopupOpen(true);
  };

  const handleUpdateClose = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = AuthService.getToken();
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
    setIsUpdatePopupOpen(false);
  };

  return (
    <>
      {user ? (
        <>
          <Header />
          <ProfileInfo user={user} onEditProfile={handleUpdate} />
          {isUpdatePopupOpen && (
            <div className="popup">
              <div className="popup-inner">
                <UserPageUpdate user={user} onClose={handleUpdateClose} />
              </div>
            </div>
          )}
          <ToastContainer />
        </>
      ) : null}
    </>
  );
}
