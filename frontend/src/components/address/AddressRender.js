import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddressRender = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;
    const { id } = useParams();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, [userId]);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`https://localhost/api/direction/user/${userId}`);
            setAddresses(response.data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleUpdate = (address) => {
        setSelectedAddress(address);
        setShowUpdateForm(true);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost/api/direction/${id}`);
            // Actualizar lista de direcciones después de eliminar
            fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
    }

    const handleUpdateAddress = async (updatedAddress) => {
        try {
            await axios.put(`https://localhost/api/direction/${id}/`, updatedAddress);
            console.log(updatedAddress)
            // Actualizar lista de direcciones después de actualizar
            fetchAddresses()
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    return (
        <>
            <div className='grid gap-4'>
                {addresses.map((address) => (
                    <div className="border border-gray-200 rounded-lg p-4" key={address.id}>
                        <div className="mb-2">
                            <p className="font-bold">Street:</p>
                            <p className="ml-4">{address.direction}, {address.post_code}, {address.location}, {address.province}</p>
                        </div>
                        <div className="flex">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleUpdate(address)}>Update</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(address.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulario de actualización como pop-up */}
            {showUpdateForm && selectedAddress && (
                <div className="popup-container">
                    <div className="popup">
                        <h2>Update Address</h2>
                        <form>
                            <div className="singin-form-item">
                                <h4>Direction:</h4>
                                <input
                                    type="text"
                                    name="direction"
                                    value={selectedAddress.direction}
                                    onChange={(e) => setSelectedAddress({ ...selectedAddress, direction: e.target.value })}
                                />
                            </div>
                            <div className="singin-form-item">
                                <h4>Post code:</h4>
                                <input
                                    type="number"
                                    name="post_code"
                                    value={selectedAddress.post_code}
                                    onChange={(e) => setSelectedAddress({ ...selectedAddress, post_code: e.target.value })}
                                />
                            </div>
                            <div className="singin-form-item">
                                <h4>Location:</h4>
                                <input
                                    type="text"
                                    name="location"
                                    value={selectedAddress.location}
                                    onChange={(e) => setSelectedAddress({ ...selectedAddress, location: e.target.value })}
                                />
                            </div>
                            <div className="singin-form-item">
                                <h4>Province:</h4>
                                <input
                                    type="text"
                                    name="province"
                                    value={selectedAddress.province}
                                    onChange={(e) => setSelectedAddress({ ...selectedAddress, province: e.target.value })}
                                />
                            </div>
                            <button type="button" onClick={() => handleUpdateAddress(selectedAddress)}>Update Address</button>
                            <button type="button" onClick={handleCloseUpdateForm}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddressRender;
