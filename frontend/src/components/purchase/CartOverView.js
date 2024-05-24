import { TrashIcon } from "@heroicons/react/24/solid";
import CartService from '../../services/CartService';

const CartOverView = ({ cartItems, setCartItems }) => {

    const handleDeleteItem = (itemId) => {
        // Filter out the item to be removed
        const updatedCart = cartItems.filter(item => item.id !== itemId);

        // Save the updated cart to local storage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        CartService.setCart(userInfo.id, updatedCart);

        // Update the state with the updated cart
        setCartItems(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className="flex justify-center">
            <div className="w-11/12 flex flex-row">
                <div className="flex flex-wrap min-[550px]:gap-6 py-6 w-3/4 ml-20">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center flex-col w-80 min-[550px]:flex-row gap-3 min-[550px]:gap-6  max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto pb-4 border-b border-gray-200">
                            <div className="img-box"><img src={item.filename} alt={item.name} className="w-80 rounded-lg" /></div>
                            <div className="pro-data w-full max-w-sm">
                                <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{item.name}</h5>
                                <h6 className="font-medium text-lg leading-8 text-secundary  max-[550px]:text-center">{item.price}€</h6>
                                <button onClick={() => handleDeleteItem(item.id)} className="w-12 h-12 mt-2 px-4 py-2 bg-primary text-white rounded-lg delete"><TrashIcon className="w-6 delete-icon"/></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 w-1/4 mt-6">
                    <div className="flex items-center justify-between w-full mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                        <h6 className="font-semibold text-xl leading-8 text-gray-900">{calculateTotalPrice()}€</h6>
                    </div>
                    <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                        <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
                        <h6 className="font-semibold text-xl leading-8 text-gray-900">20€</h6>
                    </div>
                    <div className="flex items-center justify-between w-full py-6">
                        <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                        <h6 className="font-manrope font-medium text-2xl leading-9 text-secundary">{calculateTotalPrice() + 20}€</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartOverView;
