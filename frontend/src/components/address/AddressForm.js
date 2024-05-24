import React, { useState } from 'react';
import axios from 'axios';
import useSocketService from '../../services/SocketService';

const AddressForm = () => {
    useSocketService();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id = userInfo.id;

    const [direction, setDirection] = useState("")
    const [postCode, setPostCode] = useState(0)
    const [location, setLocation] = useState("")
    const [province, setProvince] = useState("")

    const handleInputChange = (setState) => (e) => {
        const value = e.target.value.trim();
        setState(value);
    };

    const [addressErrors, setAddressErrors] = useState({
        direction: '',
        postCode: '',
        location: '',
        province: '',
    });

    const validateAddressForm = () => {
        let isValid = true;
        const errors = {
            direction: '',
            postCode: '',
            location: '',
            province: '',
        };

        if (!direction.trim()) {
            errors.direction = 'Direction is required';
            isValid = false;
        }

        if (!postCode.trim()) {
            errors.postCode = 'Post Code is required';
            isValid = false;
        } else if (!/^\d{5,}$/.test(postCode.trim())) {
            errors.postCode = 'Post Code must be numeric and have at least 5 characters';
            isValid = false;
        }


        if (!location.trim()) {
            errors.location = 'Location is required';
            isValid = false;
        }

        if (!province.trim()) {
            errors.province = 'Province is required';
            isValid = false;
        }

        setAddressErrors(errors);
        return isValid;
    };

    const addNewAddress = async () => {

        if (validateAddressForm()) {
            const newAddress = {
                direction: direction,
                post_code: postCode,
                location: location,
                province: province,
                user_id: id,
            };

            try {
                await axios.post('http://localhost/api/direction/',newAddress);
                console.log("new :  ",newAddress)
            } catch (error) {
                console.error('Error adding new address:', error);
            }
        }
    };

    return (
        <>
            <div className='flex flex-col justify-around items-center'>
                <form className='w-full max-w-3xl'>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-10">
                        <label className="block tracking-wide text-gray-700 text-base font-bold mb-2">Direction:</label>
                        <input
                            type="text"
                            name="direction"
                            className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            value={direction}
                            onChange={handleInputChange(setDirection)}
                        />
                        <p className="text-red-500 text-xs italic">{addressErrors.direction}</p>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-8">
                        <label className="block tracking-wide text-gray-700 text-base font-bold mb-2">Post Code:</label>
                        <input
                            type="number"
                            name="post_code"
                            className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            value={postCode}
                            onChange={handleInputChange(setPostCode)}
                        />
                        <p className="text-red-500 text-xs italic">{addressErrors.postCode}</p>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-8">
                        <label className="block tracking-wide text-gray-700 text-base font-bold mb-2">Location:</label>
                        <input
                            type="text"
                            name="location"
                            className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            value={location}
                            onChange={handleInputChange(setLocation)}
                        />
                        <p className="text-red-500 text-xs italic">{addressErrors.location}</p>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-8">
                        <label className="block tracking-wide text-gray-700 text-base font-bold mb-2">
                            Province:
                        </label>
                        <select
                            name="province"
                            className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            value={province}
                            onChange={handleInputChange(setProvince)}
                        >
                            <option value="">Select a province</option>
                            <option value="Álava" className="text-primary text-base bg-gray-200">Álava</option>
                            <option value="Albacete" className="text-primary text-base bg-gray-200">Albacete</option>
                            <option value="Alicante" className="text-primary text-base bg-gray-200">Alicante</option>
                            <option value="Almería" className="text-primary text-base bg-gray-200">Almería</option>
                            <option value="Asturias" className="text-primary text-base bg-gray-200">Asturias</option>
                            <option value="Ávila" className="text-primary text-base bg-gray-200">Ávila</option>
                            <option value="Badajoz" className="text-primary text-base bg-gray-200">Badajoz</option>
                            <option value="Barcelona" className="text-primary text-base bg-gray-200">Barcelona</option>
                            <option value="Burgos" className="text-primary text-base bg-gray-200">Burgos</option>
                            <option value="Cáceres" className="text-primary text-base bg-gray-200">Cáceres</option>
                            <option value="Cádiz" className="text-primary text-base bg-gray-200">Cádiz</option>
                            <option value="Cantabria" className="text-primary text-base bg-gray-200">Cantabria</option>
                            <option value="Castellón" className="text-primary text-base bg-gray-200">Castellón</option>
                            <option value="Ciudad Real" className="text-primary text-base bg-gray-200">Ciudad Real</option>
                            <option value="Córdoba" className="text-primary text-base bg-gray-200">Córdoba</option>
                            <option value="Cuenca" className="text-primary text-base bg-gray-200">Cuenca</option>
                            <option value="Gerona" className="text-primary text-base bg-gray-200">Gerona</option>
                            <option value="Granada" className="text-primary text-base bg-gray-200">Granada</option>
                            <option value="Guadalajara" className="text-primary text-base bg-gray-200">Guadalajara</option>
                            <option value="Guipúzcoa" className="text-primary text-base bg-gray-200">Guipúzcoa</option>
                            <option value="Huelva" className="text-primary text-base bg-gray-200">Huelva</option>
                            <option value="Huesca" className="text-primary text-base bg-gray-200">Huesca</option>
                            <option value="Islas Baleares" className="text-primary text-base bg-gray-200">Islas Baleares</option>
                            <option value="Jaén" className="text-primary text-base bg-gray-200">Jaén</option>
                            <option value="La Coruña" className="text-primary text-base bg-gray-200">La Coruña</option>
                            <option value="La Rioja" className="text-primary text-base bg-gray-200">La Rioja</option>
                            <option value="Las Palmas" className="text-primary text-base bg-gray-200">Las Palmas</option>
                            <option value="León" className="text-primary text-base bg-gray-200">León</option>
                            <option value="Lérida" className="text-primary text-base bg-gray-200">Lérida</option>
                            <option value="Lugo" className="text-primary text-base bg-gray-200">Lugo</option>
                            <option value="Madrid" className="text-primary text-base bg-gray-200">Madrid</option>
                            <option value="Málaga" className="text-primary text-base bg-gray-200">Málaga</option>
                            <option value="Murcia" className="text-primary text-base bg-gray-200">Murcia</option>
                            <option value="Navarra" className="text-primary text-base bg-gray-200">Navarra</option>
                            <option value="Orense" className="text-primary text-base bg-gray-200">Orense</option>
                            <option value="Palencia" className="text-primary text-base bg-gray-200">Palencia</option>
                            <option value="Pontevedra" className="text-primary text-base bg-gray-200">Pontevedra</option>
                            <option value="Salamanca" className="text-primary text-base bg-gray-200">Salamanca</option>
                            <option value="Segovia" className="text-primary text-base bg-gray-200">Segovia</option>
                            <option value="Sevilla" className="text-primary text-base bg-gray-200">Sevilla</option>
                            <option value="Soria" className="text-primary text-base bg-gray-200">Soria</option>
                            <option value="Tarragona" className="text-primary text-base bg-gray-200">Tarragona</option>
                            <option value="Santa Cruz de Tenerife" className="text-primary text-base bg-gray-200">Santa Cruz de Tenerife</option>
                            <option value="Teruel" className="text-primary text-base bg-gray-200">Teruel</option>
                            <option value="Toledo" className="text-primary text-base bg-gray-200">Toledo</option>
                            <option value="Valencia" className="text-primary text-base bg-gray-200">Valencia</option>
                            <option value="Valladolid" className="text-primary text-base bg-gray-200">Valladolid</option>
                            <option value="Vizcaya" className="text-primary text-base bg-gray-200">Vizcaya</option>
                            <option value="Zamora" className="text-primary text-base bg-gray-200">Zamora</option>
                            <option value="Zaragoza" className="text-primary text-base bg-gray-200">Zaragoza</option>
                        </select>
                    </div>
                    {/* <div className="flex flex-wrap -mx-3 mb-6 mt-10">
                        <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2">Province:</label>
                        <input
                            type="text"
                            name="province"
                            className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base"
                            value={newAddress.province}
                            onChange={handleInputChange}
                        />
                        <p className="text-red-500 text-xs italic">{addressErrors.province}</p>
                    </div> */}
                    <div className="flex flex-wrap -mx-3 mb-6 mt-8 justify-center">
                        <button className='bg-primary text-white w-1/3 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-terciary hover:border-primary hover:border-solid hover:border' onClick={addNewAddress}>Add Address</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddressForm;
