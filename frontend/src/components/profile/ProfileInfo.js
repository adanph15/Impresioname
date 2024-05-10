import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";

export default function ProfileInfo() {
    // const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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

    const handleLogout = () => {
        AuthService.logout();
    };


    return (
        <>
            <div className="flex flex-col justify-around items-center">
                <h2 className>{user.username}</h2>
                <form className='singin-form-container'>


                    <p className='text-base'>{user.name} {user.last_name}</p>
                    <p className='text-base'>{user.mail}</p>


                    <div className="flex flex-row justify-center -mx-3 mb-6 mt-10">
                        <button className="bg-primary text-white w-full h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
} 