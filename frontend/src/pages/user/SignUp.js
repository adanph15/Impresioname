import Header from "../../components/header/Header";
import React, { useState } from 'react';
import AuthService from "../../services/AuthService";
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';

export default function SignUp() {
    useSocketService();
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [last_name, setlast_name] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUserNameError] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [mailError, setMailError] = useState('');
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

    const handleSignup = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await AuthService.register(username, name, last_name, mail, password);
                console.log("respuesta de .user ===" + response.user)
                localStorage.setItem("userInfo", JSON.stringify(response.user));
                goToHome();
            } catch (error) {
                console.error('Registration failed', error);
            }
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (!username.trim()) {
            setUserNameError('Username is required');
            isValid = false;
        } else {
            setUserNameError('');
        }

        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!last_name.trim()) {
            setLastNameError('Last Name is required');
            isValid = false;
        } else {
            setLastNameError('');
        }

        if (!mail.trim()) {
            setMailError('Email is required');
            isValid = false;
        } else {
            setMailError('');
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
                        <h2 className="text-4xl font-bold text-terciary  mt-10">Sign Up</h2>
                        <form className="w-full max-w-3xl">
                            <div className="flex flex-wrap -mx-3 mb-6  mt-20">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" for="grid-first-name">
                                        First Name
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-first-name" type="text" placeholder="James" value={name}
                                        onChange={(e) => handleInputChange(e, setName, setNameError)} />
                                    <p className="text-red-500 text-xs italic">{nameError}</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label className="block  tracking-wide text-primary text-lg font-bold mb-2" for="grid-last-name">
                                        Last Name
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-last-name" type="text" placeholder="Doe" value={last_name}
                                        onChange={(e) => handleInputChange(e, setlast_name, setLastNameError)} />
                                    <p className="text-red-500 text-xs italic">{lastNameError}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" for="grid-first-name">
                                        Username
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-first-name" type="text" placeholder="Username" value={username}
                                        onChange={(e) => handleInputChange(e, setUserName, setUserNameError)} />
                                    <p className="text-red-500 text-xs italic">{usernameError}</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label className="block  tracking-wide text-primary text-lg font-bold mb-2" for="grid-last-name">
                                        Mail
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-last-name" type="text" placeholder="Mail" value={mail}
                                        onChange={(e) => handleInputChange(e, setMail, setMailError)} />
                                    <p className="text-red-500 text-xs italic">{mailError}</p>
                                </div>
                            </div>
                            <div >
                                <div class="w-full px-3">
                                    <label className="block  tracking-wide text-gray-700 text-lg font-bold mb-2" for="grid-password">
                                        Password
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-password" type="password" placeholder="******************" value={password}
                                        onChange={(e) => handleInputChange(e, setPassword, setPasswordError)} />
                                    <p className="text-red-500 text-xs italic">{passwordError}</p>
                                </div>
                            </div>
                            <div class="flex flex-row justify-center -mx-3 mb-6 mt-10 ">
                                <button className="bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={handleSignup}>
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>

                <ToastContainer />
            </div>
        </>
    );
}