// import React, { useEffect, useState } from 'react';
// import BuyMedicine from './BuyMedicine'; // Import the BuyMedicine component
// import ReactModal from 'react-modal';
// import DoctorName from '../Profile/DoctorName';
// import ViewPrescriptions from './ViewPrescription';
// import Clock from '../../Pages/Home/Clock';

// const PrescriptionsToPatient = ({ email }) => {
//     const [prescriptions, setPrescriptions] = useState([]);
//     const [selectedPatient, setSelectedPatient] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [showBuyMedicine, setShowBuyMedicine] = useState(false); // State to toggle between ViewPrescriptions and BuyMedicine

//     const handleViewPrescriptions = (patient) => {
//         setSelectedPatient(patient);
//         openModal();
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`https://doctor-apps.vercel.app/api/v1/patients/prescriptions-filter?email=${email}`);
//                 const data = await response.json();
//                 if (response.ok) {
//                     setPrescriptions(data);
//                 } else {
//                     console.error('Failed to fetch prescriptions:', data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching prescriptions:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const openModal = () => {
//         setModalIsOpen(true);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setShowBuyMedicine(false); // Reset the state when modal is closed
//     };

//     const handleBuyMedicine = () => {
//         setShowBuyMedicine(true);
//     };

//     const isPastAppointment = (appointmentDate) => {
//         return new Date(appointmentDate) < new Date();
//     };

//     return (
//         <div>
//             <div className="w-4/5 mx-auto p-2 bg-orange-500">
//                 {/* Display patient cards here */}
//                 {prescriptions.map(patient => {
//                     if (isPastAppointment(patient.appointment_date)) {
//                         return (
//                             <div key={patient._id} className="bg-white shadow-md p-4 rounded-md">
//                                 <DoctorName key={patient.doctorId} id={patient.doctorId}></DoctorName>
//                                 <p className='text-xs'>Appointment Date: {new Date(patient.appointment_date).toLocaleDateString()}</p>
//                                <div className='w-1/2 mx-auto'>
//                                <button onClick={() => handleViewPrescriptions(patient)} className=' text-xs text-white  bg-blue-500 py-1 px-4 rounded-md hover:scale-105'>View Prescriptions</button>
                            
//                                </div>
//                                </div>
//                         );
//                     }
//                     return null;
//                 })}
//             </div>
//             {/* Modal for displaying ViewPrescriptions or BuyMedicine component */}
//             <ReactModal
//                 isOpen={modalIsOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="View Prescriptions Modal"
//             >
//                 <div className="modal-content">
//                     {showBuyMedicine ? (
//                         <BuyMedicine patient={selectedPatient}/>
//                     ) : (
//                         selectedPatient && (
//                             <ViewPrescriptions patient={selectedPatient} />
//                         )
//                     )}
//                 </div>
//                 <div className='flex justify-between p-2'>
//                 <button onClick={closeModal} className='bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:scale-105'>Close</button>
            
//                 {showBuyMedicine ? null : (
//                     <button onClick={handleBuyMedicine} className='bg-green-500 px-4 py-2 font-bold   rounded-md text-white hover:scale-105'>Buy Medicine Now</button>
//                 )}
               
//                 </div>
//                 </ReactModal>
//         </div>
//     );
// };

// export default PrescriptionsToPatient;








































import React, { useEffect, useState } from 'react';
import BuyMedicine from './BuyMedicine'; // Import the BuyMedicine component
import ReactModal from 'react-modal';
import DoctorName from '../Profile/DoctorName';
import ViewPrescriptions from './ViewPrescription';
import Clock from '../../Pages/Home/Clock';

const PrescriptionsToPatient = ({ email }) => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showBuyMedicine, setShowBuyMedicine] = useState(false); // State to toggle between ViewPrescriptions and BuyMedicine

    const handleViewPrescriptions = (patient) => {
        setSelectedPatient(patient);
        openModal();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://doctor-apps.vercel.app/api/v1/patients/prescriptions-filter?email=${email}`);
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
        setShowBuyMedicine(false); // Reset the state when modal is closed
    };

    const handleBuyMedicine = () => {
        setShowBuyMedicine(true);
    };

    return (
        <div className=" w-4/5 mx-auto py-4 ">
          
                {/* Display patient cards here */}
                {prescriptions.map(patient => (
                    <div className='pb-4'>
                    <div key={patient._id} className="bg-gradient-to-r from-slate-500 to-slate-200 shadow-md p-4 rounded-md ">
                       <div>
                       <DoctorName key={patient.doctorId} id={patient.doctorId}></DoctorName>
                        <p className='text-xs'>Appointment Date: {new Date(patient.appointment_date).toLocaleDateString()}</p>
                        
                       </div>
                        <button onClick={() => handleViewPrescriptions(patient)} className='w-full mx-auto text-xs text-white  bg-gradient-to-r from-slate-400 to-blue-600 py-1 px-4 rounded-md hover:scale-105'>View Prescriptions</button>
                        </div>
                    
                    </div>
                ))}
          
            {/* Modal for displaying ViewPrescriptions or BuyMedicine component */}
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="View Prescriptions Modal"
            >
                <div className="modal-content">
                    {showBuyMedicine ? (
                        <BuyMedicine patient={selectedPatient}/>
                    ) : (
                        selectedPatient && (
                            <ViewPrescriptions patient={selectedPatient} />
                        )
                    )}
                </div>
                <div className='flex justify-between p-2'>
                    <button onClick={closeModal} className='bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:scale-105'>Close</button>
                
                    {showBuyMedicine ? null : (
                        <button onClick={handleBuyMedicine} className='bg-gradient-to-r from-slate-400 to-green-500 px-4 py-2 font-bold   rounded-md text-white hover:scale-105'>Buy Medicine Now</button>
                    )}
                </div>
            </ReactModal>
        </div>
    );
};

export default PrescriptionsToPatient;

