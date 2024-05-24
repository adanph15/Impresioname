import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CreditCardIcon, ShoppingBagIcon, BuildingOffice2Icon, SparklesIcon } from "@heroicons/react/24/solid";
import CartService from '../../services/CartService';
import React, { useState, useEffect } from 'react';
import CartOverView from "./CartOverView";
import UserAddressesPage from "../../pages/user/UserAddressesPage";
import CreditCardForm from "./CreditCardForm";

const PurchaseStepper = () => {
    const [selectedAddress, setSelectedAddress] = useState(null); // Estado para almacenar la dirección seleccionada
    console.info(selectedAddress);
    // const handleUser = () => {
    //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //     if (!userInfo) {
    //         window.location.href = "/sing-in";
    //     }
    // }

    const [cartItems, setCartItems] = useState([]);

    // const image = (imageName) => {
    //     const newName = imageName.replace('https://localhost/images/', '');
    //     console.log("nuevo nombre: ", newName);
    //     return newName;
    // };

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const cart = CartService.getCart(userInfo.id);
        console.log(CartService.getCart(userInfo.id))
        console.log("Cart", cart);
        setCartItems(cart);
    }, []);



    // const handlePurchase = () => {
    //     PurchaseService.createPurchase(calculateTotalPrice());
    // };

    const Step4Content = () => <div>Contenido del Paso 4</div>;

    const steps = ["Cart Overview", "Shipping Info", "Payment", "Step 4"];
    const stepContents = [
        <CartOverView cartItems={cartItems} setCartItems={setCartItems} />,
        <UserAddressesPage setSelectedAddress={setSelectedAddress} />,
        <CreditCardForm cartItems={cartItems} />,
        <Step4Content />
    ];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);

    // Objeto que mapea los números de paso a los iconos correspondientes
    const stepIcons = {
        1: <ShoppingBagIcon className="w-7" />,
        2: <BuildingOffice2Icon className="w-7" />,
        3: <CreditCardIcon className="w-7" />,
        4: <SparklesIcon className="w-7" />,
    };

    const handleNext = () => {
        if (currentStep === steps.length) {
            setComplete(true);
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="flex justify-center">

        <div className="w-4/5 flex flex-col bg-gray-200">
            <div className="flex justify-between mt-32 mb-10 ml-24 mr-24">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 <= currentStep || complete) && "complete"
                            } `}
                    >
                        <div className="step">
                            {stepIcons[i + 1] || i + 1}
                        </div>
                        <p className="text-gray-500">{step}</p>
                    </div>
                ))}
            </div>
            <div className="step-content">
                {stepContents[currentStep - 1]}
            </div>
            {!complete && (
                <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8 pb-24" >
                    {currentStep !== 1 && (
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-secundary font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
                        >
                            <ChevronLeftIcon className="w-8" />
                            Back
                        </button>
                    )}
                    <button onClick={handleNext} className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-secundary font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">{currentStep === steps.length ? "Finish" : "Continue"}
                        <ChevronRightIcon className="w-8" />
                    </button>
                </div>
            )}
        </div>
        </div>

    );

};

export default PurchaseStepper;
