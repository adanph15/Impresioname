import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import Header from '../../components/header/Header';
import ProfileInfo from '../../components/profile/ProfileInfo';
import UserPageUpdate from './UserPageUpdate'; // Import the update component
import UserAddressesPage from './UserAddressesPage';
import UserPurchasePage from './UserPurchasePage';

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchData = async () => {
      if (!userInfo || !userInfo.id) {
        navigate('/sign-in');
        return;
      }

      const token = AuthService.getToken();
      if (!token) {
        navigate('/sign-in');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/users/${userInfo.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.log(err);
        navigate('/sign-in');
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
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/users/${userInfo.id}`, {
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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      {user ? (
        <>
          <Header />
          <div className="flex flex-col justify-between items-center gap-y-5">
            <h2 className="text-4xl font-bold text-terciary mt-10">Categories</h2>

            <ul className="flex border-b border-gray-300" value>
              <TabItem
                label="Profile"
                tabId="profile"
                activeTab={activeTab}
                onClick={handleTabClick}
              />
              <TabItem
                label="Addresses"
                tabId="addresses"
                activeTab={activeTab}
                onClick={handleTabClick}
              />
              <TabItem
                label="Purchases"
                tabId="purchases"
                activeTab={activeTab}
                onClick={handleTabClick}
              />
            </ul>
            <TabContent tabId="profile" activeTab={activeTab}>
              <ProfileInfo user={user} onEditProfile={handleUpdate} />
            </TabContent>
            <TabContent tabId="addresses" activeTab={activeTab}>
              <UserAddressesPage />
            </TabContent>
            <TabContent tabId="purchases" activeTab={activeTab}>
              <UserPurchasePage />
            </TabContent>
          </div>
          {isUpdatePopupOpen && (
            <div className="popup">
              <div className="popup-inner">
                <UserPageUpdate user={user} onClose={handleUpdateClose} />
              </div>
            </div>
          )}
        </>
      ) : (
        null
      )}
    </>
  );

}

function TabItem({ label, tabId, activeTab, onClick }) {
  const isActive = tabId === activeTab;
  return (
    <li
      className={`relative flex items-center cursor-pointer py-2 px-4 text-xl ${isActive ? "text-terciary font-bold " : "text-primary font-medium"
        }`}
      onClick={() => onClick(tabId)}
    >
      {label}
    </li>
  );
}

function TabContent({ tabId, activeTab, children }) {
  return (
    <div
      className={`content ${tabId === activeTab ? "block" : "hidden"}`}
      id={tabId}
    >
      {children}
    </div>
  );
}