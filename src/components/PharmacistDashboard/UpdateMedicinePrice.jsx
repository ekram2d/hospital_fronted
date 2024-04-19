import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UpdateMedicinePrice = ({ medicineId, closeModal }) => {
    const [formData, setFormData] = useState({
        price_per_unit: null,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch(`https://doctor-apps.vercel.app/api/v1/medicine/medicines-update/${medicineId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Medicine price updated successfully');
                // Show SweetAlert notification
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Medicine price updated successfully!',
                }).then(() => {
                    closeModal(); // Close the modal after user interaction
                });
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Failed to update medicine price');
            }
        } catch (error) {
            console.error('Error updating medicine price:', error);
            setErrorMessage('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=''>
            <h2>Update Medicine Price</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="price_per_unit" className="block">Price per Unit:</label>
                    <input type="number" id="price_per_unit" name="price_per_unit" value={formData.price_per_unit} onChange={handleChange} placeholder="Enter new price per unit" className="input input-bordered w-full max-w-xs" required />
                </div>
               
                <button type="submit" disabled={loading} className="btn bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Update</button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default UpdateMedicinePrice;
