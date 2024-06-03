import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const UserAddressesPage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const user_id = userInfo.id;
  const [addresses, setAddresses] = useState([]);
  
  const [direction, setDirection] = useState('');
  const [postCode, setPostCode] = useState('');
  const [location, setLocation] = useState('');
  const [province, setProvince] = useState('');

  const [directionError, setDirectionError] = useState('');
  const [postCodeError, setPostCodeError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [provinceError, setProvinceError] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`https://localhost/api/direction/user/${user_id}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [user_id]);

  const handleInputChange = (e, setState, setError) => {
    const value = e.target.value;
    setState(value);

    if (!value) {
      setError(`${e.target.name} is required`);
    } else {
      setError('');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!direction) {
      setDirectionError('Direction is required');
      isValid = false;
    } else {
      setDirectionError('');
    }

    if (!postCode) {
      setPostCodeError('Post code is required');
      isValid = false;
    } else {
      setPostCodeError('');
    }

    if (!location) {
      setLocationError('Location is required');
      isValid = false;
    } else {
      setLocationError('');
    }

    if (!province) {
      setProvinceError('Province is required');
      isValid = false;
    } else {
      setProvinceError('');
    }

    return isValid;
  };

  const addNewAddress = async (e) => {
    e.preventDefault();
    const newAddress = {
      direction: direction,
      post_code: postCode,
      location: location,
      province: province,
      user_id: user_id,
    };
    if (validateForm()) {
      try {
        const response = await axios.post(`https://localhost/api/direction`, newAddress);
        setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      } catch (error) {
        console.error('Error adding new address:', error);
      }
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/direction-update/${id}`;
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`https://localhost/api/direction/${id}`);
      setAddresses((prevAddresses) => prevAddresses.filter(address => address.id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div className='flex flex-row justify-around w-[80vw]'>
      <div className='w-1/2 items-center'>
        <h2 className="text-xl text-center font-bold text-terciary mt-6 mb-6">Your addresses</h2>
        <div>
          {addresses.map((address) => (
            <div key={address.id} className='flex flex-row align-middle shadow-md border rounded-md cursor-pointer bg-gray-50 pt-4 pb-4 m-6'>
              <div className='flex flex-col w-3/4 ml-4'>
                <p>St {address.direction}</p>
                <div className='flex flex-row'>
                  <p className='font-semibold'>{address.province}</p>
                  <p>, {address.location}, {address.post_code}</p>
                </div>
              </div>
              <div className='w-2/4 flex justify-end space-x-2 mr-4'>
                <button onClick={() => handleUpdate(address.id)} className="w-12 h-12 mt-2 px-4 py-2 bg-primary text-white rounded-lg updateAddress"><PencilIcon className="w-6 updateAddress-icon"/></button>
                <button onClick={() => deleteAddress(address.id)} className="w-12 h-12 mt-2 px-4 py-2 bg-primary text-white rounded-lg deleteAddress"><TrashIcon className="w-6 deleteAddress-icon"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-start items-center w-1/2 mb-10">
        <h2 className="text-xl font-bold text-terciary mt-6 mb-6">Add new Address</h2>
        <form className="w-full max-w-3xl bg-gray-50 rounded-lg p-6  shadow-md border">
          <div className="flex flex-wrap -mx-3 mb-6 mt-10">
            <div className="w-2/3 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="direction">
                Direction
              </label>
              <input className="shadow-md appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="direction" name="direction" type="text" placeholder="Street Address" value={direction} onChange={(e) => handleInputChange(e, setDirection, setDirectionError)} />
              <p className="text-red-500 text-xs italic">{directionError}</p>
            </div>
            <div className="w-1/3 px-3">
              <label className="block tracking-wide text-primary text-lg font-bold mb-2" htmlFor="postCode">
                Zip Code
              </label>
              <input className="shadow-md appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="postCode" name="postCode" type="text" placeholder="00000" value={postCode} onChange={(e) => handleInputChange(e, setPostCode, setPostCodeError)} />
              <p className="text-red-500 text-xs italic">{postCodeError}</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input className="shadow-md appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="location" name="location" type="text" placeholder="Location" value={location} onChange={(e) => handleInputChange(e, setLocation, setLocationError)} />
              <p className="text-red-500 text-xs italic">{locationError}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="province">
                Province
              </label>
              <input className="shadow-md appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary text-base" id="province" name="province" type="text" placeholder="Province" value={province} onChange={(e) => handleInputChange(e, setProvince, setProvinceError)} />
              <p className="text-red-500 text-xs italic">{provinceError}</p>
            </div>
          </div>
          <div className="flex flex-row justify-center -mx-3 mb-6 mt-10">
            <button onClick={addNewAddress} className="button-hover button-cart flex flex-row justify-around items-center bg-primary text-white w-48 h-14 font-bold rounded-md cursor-pointer text-base hover:bg-white hover:text-white hover:border-primary hover:border-solid hover:border">
                  <p className='mr-10'>Add address</p>
                  <div className="icon mr-2">
                    <PlusIcon className='w-6' />
                  </div>
                </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddressesPage;
