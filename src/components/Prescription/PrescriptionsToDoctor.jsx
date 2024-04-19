import React, { useEffect, useState } from 'react';
import ViewPrescriptions from './ViewPrescription';
import ReactModal from 'react-modal';
import DoctorName from '../Profile/DoctorName';

const PrescriptionsToDoctor = ({email,id}) => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleViewPrescriptions = (patient) => {
        setSelectedPatient(patient);
        openModal();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://doctor-apps.vercel.app/api/v1/patients/prescriptions-filter?email=${email}&doctorId=${id}`);
                const data = await response.json();
                if (response.ok) {
                    setPrescriptions(data);
                } else {
                    console.error('Failed to fetch prescriptions:', data.message);
                }
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchData();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className=''>
            <div className="grid grid-cols-2 gap-4 ">
                {/* Display patient cards here */}
                {prescriptions.map(patient => (
                    <div key={patient._id} className="bg-gradient-to-r from-slate-200 to-slate-400 shadow-md p-2 rounded-md">
                        <h2 className=" font-semibold ">Patient Name : {patient.name}</h2>
                        <p className='flex'><DoctorName key={patient.doctorId} id={patient.doctorId}> </DoctorName></p>
                        <p className='text-xs'>Appointment Date: {new Date(patient.appointment_date).toLocaleDateString()}</p>
                        <button onClick={() => handleViewPrescriptions(patient)} className='p-1 bg-gradient-to-r from-slate-300 to-slate-500 hover:scale-105 rounded-md'>View Prescriptions</button>
                    </div>
                ))}
            </div>
            {/* Modal for displaying ViewPrescriptions component */}
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="View Prescriptions Modal"
            >
                <div className="modal-content">
                      {selectedPatient && (
                        <ViewPrescriptions patient={selectedPatient} />
                        
                        
                    )}
                    
                </div>
               <button onClick={closeModal} className='bg-red-500 px-6 py-4 rounded-lg text-white font-bold'>Close</button>
                   
            </ReactModal>
        </div>
    );
};

export default PrescriptionsToDoctor;
