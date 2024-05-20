// import React, { useState } from 'react';
import Header from "../../components/header/Header";
import NewProducs from "../../components/NewProducs";
import HomeRender from "../../components/HomeRender";
import Shop from "../shop/Shop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSocketService from '../../services/SocketService';
import { useEffect, useRef } from 'react';


export default function Home() {
  useSocketService();
  
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
        <div className="bg-white min-h-screen">
          <div className="hidden md:block bg-white w-4/5 mx-auto p-4 rounded-lg ">
            <HomeRender />
            <NewProducs />
            <div className="flex bg-gray-200 p-4 pb-10 mt-20 rounded-lg shadow-inner text-terciary info-home ">
              <div className="w-1/4  " style={{ height: '304.5px' }}>
                <img src="/izquierda.jpeg" className=" rounded-lg" alt='model-iamge-right' />
              </div>
              <div className="w-1/4 p-4 mr-2 ml-2" style={{ height: '304.5px' }}>
              <p className="font-semibold text-2xl tracking-tight no-underline">Preview all glasses</p>
                <video ref={videoRef} loop muted className="w-full h-full">
                  <source src="/preview.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              <div className="w-1/4 p-4 mr-2 ml-2 " style={{ height: '304.5px' }}>
                <p className="font-semibold text-2xl tracking-tight no-underline text-right">You don't want to be left without the latest models, log in or create an account to start <span className="text-secundary">SHOWING</span> off your glasses with <span className="text-secundary">STYLE</span></p>
              </div>
              <div className="w-1/4 " style={{ height: '304.5px' }}>
                <img src="/derecha.jpeg" className=" rounded-lg" alt='model-iamge-right' />
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