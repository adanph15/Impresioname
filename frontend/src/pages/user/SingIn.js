import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./SingIn.css";
import React, { useState } from 'react';
import axios from 'axios';


export default function SingIn() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const handleSignin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/signin', {
                mail: mail,
                password,
            });

            console.log('User signed in successfully:', response.data);
            setToken(response.data.access_token);

            // Puedes redirigir al usuario a la página principal u otra página después de iniciar sesión.
        } catch (error) {
            console.error('Error signing in:', error.response.data.message);
        }
    };
    return (
        <>
            <body>
                <Header />
                <div className="home-container">
                    <form className="singin-form-container">
                        <div className="singin-form-item">
                            <h4>mail</h4>
                            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                            <h4>password</h4>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="singin-form-item">
                        <button onClick={handleSignin}>Signin</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </body>
        </>
)}

