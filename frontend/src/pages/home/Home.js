import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from "../../components/header/Header";
import Scroll from "../../components/scroll/Scroll";
import HomeRender from "../../components/HomeRender";
import Shop from "../shop/Shop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSocketService from '../../services/SocketService';
import { useEffect, useRef } from 'react';


export default function Home() {
  useSocketService();

  // // Funciones de manejo de cambios para los selectores de opciones
  // const handleFrameChange = (event) => {
  //   setFrame(parseInt(event.target.value));
  // };

  // const handleTempleChange = (event) => {
  //   setTemple(parseInt(event.target.value));
  // };

  // const handleLensesChange = (event) => {
  //   setLenses(parseInt(event.target.value));
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true, // Habilitar el desplazamiento al arrastrar
    draggable: true // Permitir arrastrar con el ratón
  };

  const OptionsSelector = ({ title, selectedOption, setSelectedOption, options }) => (
    <div className='flex flex-col items-center'>
      <p className='text-2xl mb-8 font-semibold text-secundary'>{title}</p>
      <div className='w-full mt-6'>
        <div className='flex justify-around items-center'>
          {options.map((option) => (
            <div
              key={option}
              className={`flex flex-col items-center cursor-pointer ${selectedOption === option ? 'bg-gray-300' : ''}`}
              onClick={() => setSelectedOption(option)}
            >
              <div className={`w-12 h-12 rounded-full mb-2 ${selectedOption === option ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`text-center ${selectedOption === option ? 'text-blue-500' : 'text-gray-700'}`}>{option}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );




  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];


  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => console.error('Error al reproducir el video automáticamente:', error));
    }
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="bg-quaternary min-h-screen">
          <div className="hidden md:block bg-white w-3/4 mx-auto p-4 rounded-lg shadow-md">
            <HomeRender />

            <div className=" h-96 p-4 mt-20">
              <Scroll />
            </div>
            <div className="flex bg-primary p-4 mt-20 rounded-lg  text-white ">
              <div className="w-1/4 mr-2 ml-2 " style={{ height: '304.5px' }}>
                <img src="/izquierda.jpeg" className="w-full rounded-lg" />
              </div>
              <div className="w-1/4 p-4 mr-2 ml-2" style={{ height: '304.5px' }}>
              <p className="font-semibold text-2xl tracking-tight no-underline"><span className="text-secundary">PREVIEW</span> all <span className="text-secundary">GLASSES</span> </p>
                <video ref={videoRef} loop muted className="w-full h-full">
                  <source src="/preview.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              <div className="w-1/4 p-4 mr-2 ml-2 " style={{ height: '304.5px' }}>
                <p className="font-semibold text-2xl tracking-tight no-underline text-right">You don't want to be left without the latest models, log in or create an account to start <span className="text-secundary">SHOWING</span> off your glasses with <span className="text-secundary">STYLE</span></p>
              </div>
              <div className="w-1/4 mr-2 ml-2" style={{ height: '304.5px' }}>
                <img src="/derecha.jpeg" className="w-full rounded-lg" />
              </div>
            </div>
            <div id="shop" className='mt-20'>
              <Shop />
            </div>

          </div>

        </div>

        <ToastContainer />
      </div>
    </>
  );
}