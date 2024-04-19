import React, { useState, useEffect } from 'react';
import UpdateMedicinePrice from './UpdateMedicinePrice';
import ReactModal from 'react-modal';
import Loading from '../../hooks/Loading';

const AddMedicinePrice = () => {
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
                    // Filter medicines where price_per_unit is null
                    const filteredMedicines = data.data.filter(medicine => medicine.price_per_unit === null);
                    setMedicines(filteredMedicines);
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

    const handleAddPrice = (medicineId) => {
        setSelectedMedicineId(medicineId);
        openModal();
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className=' p-2 bg-gradient-to-r from-slate-200 to-slate-400 rounded-md'>
            <div className='grid grid-cols-3 font-bold '>
                        <p className='w-1/3 mx-auto  text-center'>Name</p>
                        <p className='w-1/3 mx-auto  text-center'>mg</p>
                        <p className='w-1/3 mx-auto  text-center'>Action</p>
                    </div>
                    <div className='max-h-60 overflow-auto p-2'>
            {loading ? (
                <p><Loading></Loading></p>
            ) : (
                <div>
                    
                    {medicines.map((medicine, index) => (
                        <div key={index} className='grid grid-cols-3 p-1 mt-2 bg-gradient-to-r from-slate-400 to-slate-200 rounded-md'>
                            <div className='w-1/3 mx-auto  text-center'>{medicine.medicine_name}</div>
                            <div className='w-1/3 mx-auto  text-center'>{medicine.mg} mg</div>
                            <div className='w-1/3 mx-auto  text-center'>
                                <button onClick={() => handleAddPrice(medicine._id)} className=' bg-gradient-to-r from-blue-600 to-slate-300 p-1 rounded-md text-white hover:scale-105'>Add Price</button>
                            </div>
                        </div>
                    ))}
                    
                </div>
            )}
            </div>
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
    );
};

export default AddMedicinePrice;
