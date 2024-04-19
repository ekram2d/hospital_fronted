import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddMedicine = () => {
    const initialMedicineData = {
        medicine_name: null,
        price_per_unit: null,
        mg: null
    };

    const [medicineData, setMedicineData] = useState(initialMedicineData);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicineData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('https://doctor-apps.vercel.app/api/v1/medicine/medicines-create', {
                method: 'POST', // Change method to POST
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medicineData)
            });

            if (response.ok) {
                console.log('Medicine added successfully');
                // Show SweetAlert notification
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Medicine added successfully!',
                }).then(() => {
                    // Clear form data after displaying the SweetAlert
                    setMedicineData(initialMedicineData);
                });
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Failed to add medicine');
            }
        } catch (error) {
            console.error('Error adding medicine:', error);
            setErrorMessage('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-gradient-to-r from-slate-200 to-slate-400 p-4 rounded-lg'>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="medicine_name" className="block">Medicine Name:</label>
                    <input type="text" id="medicine_name" name="medicine_name" value={medicineData.medicine_name} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div>
                    <label htmlFor="price_per_unit" className="block">Price per Unit:</label>
                    <input type="number" id="price_per_unit" name="price_per_unit" value={medicineData.price_per_unit} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div>
                    <label htmlFor="mg" className="block">mg:</label>
                    <input type="number" id="mg" name="mg" value={medicineData.mg} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>
                <button type="submit" disabled={loading} className="btn bg-blue-500 text-white rounded-md p-2 bg-gradient-to-r from-blue-600 to-slate-400 hover:scale-105">Submit</button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AddMedicine;
