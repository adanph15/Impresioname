import { useState } from 'react';
import PurchaseService from '../../services/PurcharseService';

const CreditCardForm = ({cartItems}) => {
    const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000');
    const [expDate, setExpDate] = useState('12/24');
    const [ccvNumber, setCcvNumber] = useState('111');
    const [cardName, setCardName] = useState('John Doe');
    const [isRearVisible, setIsRearVisible] = useState(false);

    const handleCardNumberChange = (event) => {
        let formattedInput = event.target.value.replace(/\D/g, '');
        formattedInput = formattedInput.slice(0, 20);
        formattedInput = formattedInput.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formattedInput);
    };

    const handleExpDateChange = (event) => {
        let formattedInput = event.target.value.replace(/\D/g, '');
        formattedInput = formattedInput.slice(0, 4);
        if (formattedInput.length > 2) {
            formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(2)}`;
        }
        setExpDate(formattedInput);
    };

    const flipCard = (flip) => {
        if (flip === 'flipToRear' && !isRearVisible) {
            setIsRearVisible(true);
        } else if (flip === 'flipToFront' && isRearVisible) {
            setIsRearVisible(false);
        } else if (flip === 'flip') {
            setIsRearVisible((prev) => !prev);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handlePurchase = () => {
        PurchaseService.createPurchase(calculateTotalPrice());
    };

    return (
        <div className='flex flex-row w-full  justify-around'>
            <div class="w-1/3  px-6 py-8 rounded-md  ml-24">
                <div className="bg-gray-50 rounded-xl p-6 w-full mb-6 mt-6 max-lg:max-w-xl max-lg:mx-auto shadow-md">
                    <div className="pb-6 border-b border-gray-200 flex flex-col">
                        {cartItems.map((article) => (
                            <div className='flex items-center justify-between w-full '>
                                <p className="font-normal text-xl leading-8 text-gray-400">{article.name}</p>
                                <h6 className="font-semibold text-xl leading-8 text-gray-900">{article.price}€</h6>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between w-full mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                        <h6 className="font-semibold text-xl leading-8 text-gray-900">{calculateTotalPrice()}€</h6>
                    </div>
                    <div className="flex items-center justify-between w-full mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
                        <h6 className="font-semibold text-xl leading-8 text-gray-900">20€</h6>
                    </div>
                    <div className="flex items-center justify-between w-full mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-400">Taxes</p>
                        <h6 className="font-semibold text-xl leading-8 text-gray-900">Included</h6>
                    </div>

                    <div className="flex items-center justify-between border-t w-full py-6">
                        <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                        <h6 className="font-manrope font-medium text-2xl leading-9 text-secundary">{calculateTotalPrice() + 20}€</h6>
                    </div>
                </div>
            </div>
            <main className="flex  flex-col w-3/4 items-center justify-between p-8 lg:p-24">
                <form className="bg-white w-full max-w-4xl  px-6 py-8 rounded-md flex ">
                    <div className="w-1/2 pr-8 border-r-2 border-slate-300">
                        <label className="text-neutral-800 font-bold text-sm mb-2 block">Card number:</label>
                        <input
                            type="text"
                            className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                            id="cardNumber"
                            onClick={() => flipCard('flipToFront')}
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                        />
                        <div className="flex gap-x-2 mb-4">
                            <div className="flex-1">
                                <label className="text-neutral-800 font-bold text-sm mb-2 block">Exp. date:</label>
                                <input
                                    type="text"
                                    className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                                    id="expDate"
                                    onClick={() => flipCard('flipToFront')}
                                    placeholder="MM/YY"
                                    value={expDate}
                                    onChange={handleExpDateChange}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-neutral-800 font-bold text-sm mb-2 block">CCV:</label>
                                <input
                                    type="text"
                                    className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                                    id="ccvNumber"
                                    onClick={() => flipCard('flipToRear')}
                                    maxLength="3"
                                    placeholder="123"
                                    value={ccvNumber}
                                    onChange={(event) => setCcvNumber(event.target.value.replace(/\D/g, '').slice(0, 3))}
                                />
                            </div>
                        </div>

                        <label className="text-neutral-800 font-bold text-sm mb-2 block">Card holder:</label>
                        <input
                            type="text"
                            className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="cardName"
                            onClick={() => flipCard('flipToFront')}
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(event) => setCardName(event.target.value.slice(0, 25))}
                        />
                    </div>
                    <div className="w-1/2 pl-8">
                        <div className="w-full h-56" style={{ perspective: '1000px' }}>
                            <div
                                id="creditCard"
                                className={`crediCard relative cursor-pointer transition-transform duration-500 ${isRearVisible ? 'rearIsVisible' : ''
                                    }`}
                                style={{ transformStyle: 'preserve-3d' }}
                                onClick={() => flipCard('flip')}
                            >
                                {/* Credit card front */}
                                <div className="w-full m-auto rounded-xl shadow-2xl absolute" style={{ backfaceVisibility: 'hidden' }}>
                                    <img
                                        src="https://i.ibb.co/swnZ5b1/Front-Side-Card.jpg"
                                        className="relative object-cover w-full h-full rounded-xl"
                                        alt="Front Side Card"
                                    />
                                    <div className="w-full px-8 absolute top-8 text-white">
                                        <div className="pt-1">
                                            <p className="font-light">Card Number</p>
                                            <p id="imageCardNumber" className="font-medium tracking-more-wider h-6">
                                                {cardNumber}
                                            </p>
                                        </div>
                                        <div className="pt-6 flex justify-between">
                                            <div>
                                                <p className="font-light">Name</p>
                                                <p id="imageCardName" className="font-medium tracking-widest h-6">
                                                    {cardName}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-light">Expiry</p>
                                                <p id="imageExpDate" className="font-medium tracking-wider h-6 w-14">
                                                    {expDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Credit card back */}
                                <div
                                    className="w-full m-auto rounded-xl shadow-2xl absolute"
                                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    <img
                                        src="https://i.ibb.co/Fn11jBc/Rear-Side-Card.jpg"
                                        className="relative object-cover w-full h-full rounded-xl"
                                        alt="Rear Side Card"
                                    />
                                    <div className="w-full absolute top-8">
                                        <div className="px-8 mt-12">
                                            <p id="imageCCVNumber" className="text-black flex items-center pl-4 pr-2 w-14 ml-auto">
                                                {ccvNumber}
                                            </p>
                                            <p className="text-white font-light flex justify-end text-sm mt-2">security code</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <button className='button-hover mt-10 rounded-md bg-secundary text-white hover:bg-white w-40 h-14 hover:text-black' onClick={() => handlePurchase()}>Do Purchase</button>
            </main>
        </div>
    );
}

export default CreditCardForm;











