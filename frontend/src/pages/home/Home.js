import React, { useRef } from 'react';
// import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from "../../components/header/Header";
import Scroll from "../../components/scroll/Scroll";
import HomeRender from "../../components/HomeRender";
import Shop from "../shop/Shop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSocketService from '../../services/SocketService';

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

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   swipeToSlide: true, // Habilitar el desplazamiento al arrastrar
  //   draggable: true // Permitir arrastrar con el ratón
  // };

  // const OptionsSelector = ({ title, selectedOption, setSelectedOption, options }) => (
  //   <div className='flex flex-col items-center'>
  //     <p className='text-2xl mb-8 font-semibold text-secundary'>{title}</p>
  //     <div className='w-full mt-6'>
  //       <div className='flex justify-around items-center'>
  //         {options.map((option) => (
  //           <div
  //             key={option}
  //             className={`flex flex-col items-center cursor-pointer ${selectedOption === option ? 'bg-gray-300' : ''}`}
  //             onClick={() => setSelectedOption(option)}
  //           >
  //             <div className={`w-12 h-12 rounded-full mb-2 ${selectedOption === option ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
  //             <div className={`text-center ${selectedOption === option ? 'text-blue-500' : 'text-gray-700'}`}>{option}</div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );




  // const [selectedOption, setSelectedOption] = useState(null);
  // const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];


  const videoRef = useRef(null);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (video) {
  //     video.play().catch(error => console.error('Error al reproducir el video automáticamente:', error));
  //   }
  // }, []);

  return (
    <>
      <div>



{/* <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> */}


<div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            
            <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Unions General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
           
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div>
        </div>
    </div>
</div>

        <Header />
        <div className="bg-quaternary min-h-screen">
          <div className="hidden md:block bg-white w-3/4 mx-auto p-4 rounded-lg shadow-md">
            <HomeRender />

            <div className=" h-96 p-4 mt-20">
              <Scroll />
            </div>
            <div className="flex bg-primary p-4 mt-20 rounded-lg  text-white ">
              <div className="w-1/4 mr-2 ml-2 " style={{ height: '304.5px' }}>
                <img src="/izquierda.jpeg" className="w-full rounded-lg" alt='izquierda'/>
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
                <img src="/derecha.jpeg" className="w-full rounded-lg" alt='derecha'/>
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