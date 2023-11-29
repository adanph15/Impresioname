import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./SingIn.css";
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

            // Puedes redirigir al usuario a la página de inicio de sesión u otra página después de crear el usuario.
        } catch (error) {
            console.error('Error creating user:', error.response.data.message);
        }
    };

    return (
        <>
            <body>
                <Header />
                <div>
                    <h2>Signup</h2>
                    <label>username:</label>
                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                    <br />

                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />

                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <br />

                    <label>Email:</label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
                    <br />

                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />

                    <button onClick={handleSignup}>Signup</button>
                </div>
                <Footer />
            </body>
        </>
    );
}


