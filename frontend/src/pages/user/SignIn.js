import Header from "../../components/header/Header";
import React, { useState } from 'react';
import AuthService from "../../services/AuthService";
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';

export default function Login() {
    useSocketService();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const goToHome = () => {
        window.location.href = '/home';
    }

    const handleInputChange = (e, setState, setError) => {
        const value = e.target.value.trim();
        setState(value);

        if (!value) {
            setError(`${e.target.name} is required`);
        } else {
            setError('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await AuthService.login(username, password);
                localStorage.setItem("userInfo", JSON.stringify(response.user));
                goToHome();
            } catch (error) {
                console.error('Login failed', error);
            }
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (!username.trim()) {
            setUsernameError('Username is required');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    return (
        <>
            <div>
                <Header />
                <div className="flex flex-col justify-around items-center">
                    <h2 className="text-4xl font-bold text-terciary mt-10">Login</h2>
                    <form className="w-full max-w-3xl">
                        <div className="flex flex-wrap -mx-3 mb-6 mt-20">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="username" type="text" placeholder="Username" value={username} onChange={(e) => handleInputChange(e, setUsername, setUsernameError)} />
                                <p className="text-red-500 text-xs italic">{usernameError}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-10">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="username" type="password" placeholder="**********" value={password} onChange={(e) => handleInputChange(e, setPassword, setPasswordError)} />
                                <p className="text-red-500 text-xs italic">{passwordError}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center -mx-3 mb-6 mt-10">
                            <button className="bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                        <div class="flex flex-row justify-center -mx-3 mb-6 mt-10 ">
                            <a href="/sign-up" className="text-primary font-semibold cursor-pointer text-sm">
                                Not have an  Account ?
                            </a>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
