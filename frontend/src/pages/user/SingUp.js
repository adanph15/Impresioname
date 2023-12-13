import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState } from 'react';
import AuthService from "../../services/AuthService";

export default function SingUp() {
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [last_name, setlast_name] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const goToHome = () => {
        window.location.href = '/home';
    }

    const handleSignup = async () => {
        try {
            const response = await AuthService.register(username, name, last_name, mail, password);
            console.log("respuesta de .user ===" + response.user)
            localStorage.setItem("userInfo", JSON.stringify(response.user));
            goToHome();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <>
            <div>
                <Header />
                <div className="singin-form-container">
                    <h2>Sing Up</h2>
                    <form className='singin-form-container'>
                        <div className="singin-form-item">
                            <h4>Username</h4>
                            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>Name</h4>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>Last Name</h4>
                            <input type="text" value={last_name} onChange={(e) => setlast_name(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>Mail</h4>
                            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>Password</h4>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <button onClick={handleSignup}>Sign Up</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}


