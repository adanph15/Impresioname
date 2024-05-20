import Header from "../../components/header/Header";
import { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";

export default function Login() {

    //Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //Sign-Up
    const [usernameNew, setUserNameNew] = useState('');
    const [name, setName] = useState('');
    const [last_name, setlast_name] = useState('');
    const [mail, setMail] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [usernameErroNew, setUserNameErrorNew] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordErrorNew, setPasswordErrorNew] = useState('');


    useEffect(() => {
        const switchers = document.querySelectorAll('.switcher');

        switchers.forEach(item => {
            item.addEventListener('click', function () {
                switchers.forEach(item => item.parentElement.classList.remove('is-active'));
                this.parentElement.classList.add('is-active');
            });
        });

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            switchers.forEach(item => {
                item.removeEventListener('click', () => { });
            });
        };
    }, []);

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

        if (validateFormLogin()) {
            try {
                const response = await AuthService.login(username, password);
                localStorage.setItem("userInfo", JSON.stringify(response.user));
                goToHome();
            } catch (error) {
                console.error('Login failed', error);
            }
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (validateFormSingUp()) {
            try {
                const response = await AuthService.register(usernameNew, name, last_name, mail, passwordNew);
                console.log("respuesta de .user ===" + response.user)
                localStorage.setItem("userInfo", JSON.stringify(response.user));
                goToHome();
            } catch (error) {
                console.error('Registration failed', error);
            }
        }
    };

    const validateFormLogin = () => {
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

    const validateFormSingUp = () => {
        let isValid = true;

        if (!usernameNew.trim()) {
            setUserNameErrorNew('Username is required');
            isValid = false;
        } else {
            setUserNameErrorNew('');
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

        if (!passwordNew.trim()) {
            setPasswordErrorNew('Password is required');
            isValid = false;
        } else {
            setPasswordErrorNew('');
        }

        return isValid;
    };

    return (
        <>
            <div>
                <Header />
                <section className="forms-section mt-24">
                    <h2 className="text-4xl font-bold text-terciary mt-10 mb-6">Login & Sign Up</h2>
                    <div className="forms">
                        <div className="form-wrapper is-active  ">
                            <button type="button" className="switcher switcher-login text-xl text-terciary font-bold">
                                Login
                                <span className="underline"></span>
                            </button>
                            <form className="form form-login h-[450px] w-[500px] border shadow-lg">
                                <fieldset>
                                    <div className="input-block">
                                        <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="username">Username</label>
                                        <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="username" type="text" placeholder="Username" value={username} onChange={(e) => handleInputChange(e, setUsername, setUsernameError)} />
                                        <p className="text-red-500 text-xs italic">{usernameError}</p>
                                    </div>
                                    <div className="input-block">
                                        <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="password">Password</label>
                                        <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="username" type="password" placeholder="**********" value={password} onChange={(e) => handleInputChange(e, setPassword, setPasswordError)} />
                                        <p className="text-red-500 text-xs italic">{passwordError}</p>
                                    </div>
                                </fieldset>
                                <div className="flex flex-row justify-center -mx-3 mb-6 mt-16">
                                    <button className="button-hover bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={handleLogin}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="form-wrapper  ">
                            <button type="button" className="switcher switcher-signup">
                                Sign Up
                                <span className="underline"></span>
                            </button>
                            <form className="form form-signup h-[450px] w-[500px] border shadow-lg">
                                <fieldset>
                                    <div className="flex flex-row" >
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
                                    <div class="w-full px-3">
                                        <label className="block  tracking-wide text-primary text-lg font-bold mb-2" for="grid-last-name">
                                            Mail
                                        </label>
                                        <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-last-name" type="text" placeholder="Mail" value={mail}
                                            onChange={(e) => handleInputChange(e, setMail, setMailError)} />
                                        <p className="text-red-500 text-xs italic">{mailError}</p>
                                    </div>
                                    <div className="flex flex-row" >
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" for="grid-first-name">
                                                Username
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-first-name" type="text" placeholder="Username" value={usernameNew}
                                                onChange={(e) => handleInputChange(e, setUserNameNew, setUserNameErrorNew)} />
                                            <p className="text-red-500 text-xs italic">{usernameErroNew}</p>
                                        </div>
                                        <div class="w-full md:w-1/2 px-3">
                                            <label className="block  tracking-wide text-gray-700 text-lg font-bold mb-2" for="grid-password">
                                                Password
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="grid-password" type="password" placeholder="******************" value={passwordNew}
                                                onChange={(e) => handleInputChange(e, setPasswordNew, setPasswordErrorNew)} />
                                            <p className="text-red-500 text-xs italic">{passwordErrorNew}</p>
                                        </div>
                                    </div>

                                </fieldset>
                                <div className="flex flex-row justify-center -mx-3 mb-6 mt-10">
                                    <button className="button-hover bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border" onClick={handleSignup}>
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}












