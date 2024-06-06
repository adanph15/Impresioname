import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io(process.env.REACT_APP_SERVER_URL, { transports: ["websocket"] });

const customButtonStyle = {
    background: '#ffcc00',
    border: 'none',
    borderRadius: '6px',
    color: '#333',
    cursor: 'pointer',
    width: '5vw',
    height: '5vh',
    backgroundColor: '#3C3C3C',
    fontSize: '16px',
};

const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = 'black';
    event.target.style.color = 'white';
};

const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = '#3C3C3C';
    event.target.style.color = 'white';
};

const useSocketService = () => {
    useEffect(() => {
        socket.on("new_glasses", (data) => {
            showToast(data.message);
        });

        return () => {
            socket.off("new_glasses");
        };
    }, []);

    const showToast = (message) => {
        toast.success(message, {
            position: "top-right",
            theme: "dark",
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
            closeButton: <button style={customButtonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>x</button>,
        });
    };

    return null;
};

export default useSocketService;