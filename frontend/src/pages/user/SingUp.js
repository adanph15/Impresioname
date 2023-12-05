import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import React, { useState } from 'react';
import axios from 'axios';

export default function SingUp() {
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/users', {
                username,
                name,
                last_name: lastName,
                mail,
                password,
            });

            console.log('User created successfully:', response.data);
        } catch (error) {
            console.error('Error creating user:', error.response.data.message);
        }
    };

    return (
        <>
            <body>
                <Header />
                <div className="singin-form-container">
                    <h2>sing-up</h2>
                    <form className='singin-form-container'>
                        <div className="singin-form-item">
                            <h4>username</h4>
                            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>name</h4>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>last name</h4>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>mail</h4>
                            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>password</h4>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <a href="home" className='link'>
                                <button onClick={handleSignup}>sign-up</button>
                            </a>
                        </div>
                    </form>
                </div>
                <Footer />
            </body>
        </>
    );
}


