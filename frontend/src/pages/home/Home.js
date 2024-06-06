import React, { useRef, useEffect, Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSocketService from '../../services/SocketService';

const Header = lazy(() => import('../../components/header/Header'));
const NewProducs = lazy(() => import('../../components/NewProducs'));
const HomeRender = lazy(() => import('../../components/HomeRender'));
const Shop = lazy(() => import('../shop/Shop'));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <div className="bg-white min-h-screen">
          <div className="hidden md:block bg-white w-4/5 mx-auto p-4 rounded-lg">
            <Suspense fallback={<div>Loading...</div>}>
              <HomeRender />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <NewProducs />
            </Suspense>
            <div className="flex bg-gray-200 p-4 pb-10 mt-20 rounded-lg shadow-inner text-terciary info-home">
              <div className="w-1/4" style={{ height: '304.5px' }}>
                <img src="/izquierda.jpeg" className="rounded-lg" alt='model-iamge-left' />
              </div>
              <div className="w-1/4 p-4 mr-2 ml-2" style={{ height: '304.5px' }}>
                <p className="font-semibold text-2xl text-center tracking-tight no-underline">Preview all glasses</p>
                <video ref={videoRef} loop muted className="w-full h-full">
                  <source src="/preview.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              <div className="w-1/4 p-4 mr-2 ml-2" style={{ height: '304.5px' }}>
                <p className="font-semibold text-2xl tracking-tight no-underline text-right">You don't want to be left without the latest models, log in or create an account to start <span className="text-secundary">SHOWING</span> off your glasses with <span className="text-secundary">STYLE</span></p>
              </div>
              <div className="w-1/4" style={{ height: '304.5px' }}>
                <img src="/derecha.jpeg" className="rounded-lg" alt='model-iamge-right' />
              </div>
            </div>
            <div id="shop" className='mt-20'>
              <Suspense fallback={<div>Loading...</div>}>
                <Shop />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer />
        </Suspense>
      </div>
    </>
  );
}
