import React from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ user, onEditProfile }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/home');
    };

    return (
        <div className="flex flex-col justify-around items-center w-[80vw]">
            <h2 className="text-3xl font-bold text-terciary mt-6 mb-10">Profile</h2>
            <form className="w-full max-w-3xl bg-gray-50 rounded-lg p-6 shadow-md border">
                <div className="flex flex-wrap -mx-3 mb-6 ">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-1">
                        <label className="block tracking-wide text-gray-600 text-lg font-bold mb-2" htmlFor="first-name">
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            id="first-name"
                            type="text"
                            placeholder="James"
                            value={user.name}
                            disabled
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block  tracking-wide text-primary text-lg font-bold mb-2" htmlFor="last-name">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            id="last-name"
                            type="text"
                            placeholder="Doe"
                            value={user.last_name}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-5 md:mb-1">
                        <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="first-name">
                            Username
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            id="first-name"
                            type="text"
                            placeholder="Username"
                            value={user.username}
                            disabled
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block  tracking-wide text-primary text-lg font-bold mb-2" htmlFor="last-name">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            id="last-name"
                            type="text"
                            placeholder="Mail"
                            value={user.mail}
                            disabled
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block  tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                        id="password"
                        type="password"
                        placeholder="******************"
                        disabled
                    />
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        className="bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border"
                        onClick={onEditProfile}
                    >
                        Update Profile
                    </button>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        className="bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileInfo;
