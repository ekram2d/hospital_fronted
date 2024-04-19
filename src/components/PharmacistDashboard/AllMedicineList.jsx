import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import UpdateMedicinePrice from './UpdateMedicinePrice';
import Loading from '../../hooks/Loading';

const AllMedicineList = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedicineId, setSelectedMedicineId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('https://doctor-apps.vercel.app/api/v1/medicine/medicines-get');
                const data = await response.json();
                if (response.ok) {
                    setMedicines(data.data);
                } else {
                    console.error('Failed to fetch medicines:', data.message);
                }
            } catch (error) {
                console.error('Error fetching medicines:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    const handleUpdatePrice = (medicineId) => {
        setSelectedMedicineId(medicineId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedMedicineId(null);
        setModalIsOpen(false);
    };

    return (
       <div className='p-2 mt-4 bg-gradient-to-r from-slate-400 to-slate-200 rounded-md'>
         <div className='grid grid-cols-4 text-center font-bold'>
            <p>Medicine Name</p>
            <p>mg</p>
            <p>Price per unit</p>
            <p>Action</p>
         </div>
         <div className='max-h-60 overflow-auto  p-2 '>
            {loading ? (
                <p><Loading></Loading></p>
            ) : (
                <div className="overflow-auto">
                    <div>
                       
                        <div>
                            {medicines.map((medicine, index) => (
                                <div key={index} className='grid grid-cols-4 text-center mt-2 p-1 bg-gradient-to-r from-slate-200 to-slate-600 rounded-md'>
                                    <div className=''>{medicine.medicine_name}</div>
                                    <div>{medicine.mg}</div>
                                    <div>{medicine.price_per_unit}</div>
                                    <div> 
                                        <button className='p-1 bg-gradient-to-r from-blue-600 to-slate-400 rounded-md text-white hover:scale-105' onClick={() => handleUpdatePrice(medicine._id)}>Update Price</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Render UpdateMedicinePrice component within a modal */}
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Update Medicine Price Modal"
            >
                <div className="modal-content">
                    {selectedMedicineId && (
                        <UpdateMedicinePrice medicineId={selectedMedicineId} closeModal={closeModal} />
                    )}
                </div>
            </ReactModal>
        </div>
       </div>
    );
};

export default AllMedicineList;
