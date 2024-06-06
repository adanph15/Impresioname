import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import axios from 'axios';

const UserPageUpdate = ({ user, onClose }) => {
  const initialUserState = user || {
    name: '',
    last_name: '',
    username: '',
    mail: '',
  };

  const [updatedUser, setUpdatedUser] = useState(initialUserState);
  const [password, setPassword] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    setUpdatedUser(initialUserState);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = AuthService.getToken();
      if (token) {
        const userData = {};
        
        for (const key in updatedUser) {
          if (updatedUser[key] !== initialUserState[key]) {
            userData[key] = updatedUser[key];
          }
        }

        if (password) {
          userData.password = password;
        }

        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}api/users/${userInfo.id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile updated:', response.data);
        onClose();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setUpdatedUser(initialUserState);
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-gray-50 rounded-lg p-8 shadow-md border max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-terciary mb-10 text-center">Edit Profile</h2>
        <form className="w-full" onSubmit={handleUpdateProfile}>
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block tracking-wide text-gray-600 text-lg font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="input-field appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                id="firstName"
                type="text"
                name="name"
                value={updatedUser.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-primary text-lg font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="input-field appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                id="lastName"
                type="text"
                name="last_name"
                value={updatedUser.last_name || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="input-field appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                id="username"
                type="text"
                name="username"
                value={updatedUser.username || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-primary text-lg font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="input-field appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                id="email"
                type="text"
                name="mail"
                value={updatedUser.mail || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-primary text-lg font-bold mb-2" htmlFor="password" >
                Password
              </label>
              <input
                className="input-field appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="**********"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border mr-4"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-gray-400 hover:border-gray-400 hover-border-solid hover-border"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPageUpdate;
