import Header from "../../components/header/Header";
import React, { useState } from 'react';
import AuthService from "../../services/AuthService";
import { ToastContainer } from 'react-toastify';
import useSocketService from '../../services/SocketService';
         
export default function SingUp() {
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
                <div className="singin-container">
                    <div className="singin-form-container">
                        <h2>Sign Up</h2>
                        <form className='signup-form-container'>
                            <div className="singin-form-item">
                                <h4>Username</h4>
                                <input
                                    type="text"
                                    name="Username"
                                    value={username}
                                    onChange={(e) => handleInputChange(e, setUserName, setUserNameError)}
                                />
                                <p className="error-message">{usernameError}</p>
                            </div>
                            <div className="singin-form-item">
                                <h4>Name</h4>
                                <input
                                    type="text"
                                    name="Name"
                                    value={name}
                                    onChange={(e) => handleInputChange(e, setName, setNameError)}
                                />
                                <p className="error-message">{nameError}</p>
                            </div>
                            <div className="singin-form-item">
                                <h4>Last Name</h4>
                                <input
                                    type="text"
                                    name="Last Name"
                                    value={last_name}
                                    onChange={(e) => handleInputChange(e, setlast_name, setLastNameError)}
                                />
                                <p className="error-message">{lastNameError}</p>
                            </div>
                            <div className="singin-form-item">
                                <h4>Mail</h4>
                                <input
                                    type="email"
                                    name="Mail"
                                    value={mail}
                                    onChange={(e) => handleInputChange(e, setMail, setMailError)}
                                />
                                <p className="error-message">{mailError}</p>
                            </div>
                            <div className="singin-form-item">
                                <h4>Password</h4>
                                <input
                                    type="password"
                                    name="Password"
                                    value={password}
                                    onChange={(e) => handleInputChange(e, setPassword, setPasswordError)}
                                />
                                <p className="error-message">{passwordError}</p>
                            </div>
                            <div className="singin-form-item">
                                <button onClick={handleSignup}>
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}