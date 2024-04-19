import React, { useState, useEffect } from 'react';
import SeePatient from './SeePatient';
import Loading from '../../hooks/Loading';
import GetUser from '../../hooks/GetUser';
import Swal from 'sweetalert2';

const PatientList = ({ id }) => {
    const [patients, setPatients] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = GetUser();

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://doctor-apps.vercel.app/api/v1/patients/patients-get/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setPatients(data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [id]);

    const handleNext = () => {
        setStartIndex(prevIndex => prevIndex + 2);
    };

    const handlePrevious = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 2, 0));
    };

    const handleRemovePatient = async (patientId) => {
        try {
            const response = await fetch(`https://doctor-apps.vercel.app/api/v1/patients/patients-update/${patientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctorId: user.id,
                    active: false,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                // Remove the patient from the list
                setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
                Swal.fire({
                    icon: 'success',
                    title: 'Patient removed successfully',
                    timer: 2000,
                    timerProgressBar: true,
                });
       
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
        finally{
            window.location.reload();
        }
    };
    
    

    const handleCloseDetails = () => {
        setSelectedPatient(null);
    };

    return (
        <div className='text-black bg-gradient-to-r from-slate-700 to-slate-400 rounded-lg'>
            <h2 className="text-xl font-semibold text-zinc-200 p-4">Patient List</h2>
            {loading ? (
                <Loading />
            ) : (
                <div className=' rounded-t-xl shadow-xl'>
                    <ul>
                        {patients.slice(startIndex, startIndex + 2).map(patient => (
                            <div className='p-2'>
                                <li key={patient.id} className="flex bg-gradient-to-r from-slate-400 to-slate-700 pb-2 items-center justify-between px-4 py-2 rounded-lg ">
                                <span>{patient.name}</span>
                                <span>{patient.id}</span>
                                <div className='flex gap-4 '>
                                    <button className="bg-gradient-to-r from-slate-400 to-green-400 text-white rounded-md p-2 hover:scale-105" onClick={() => setSelectedPatient(patient)}>
                                        See Patient
                                    </button>
                                    <button className="bg-gradient-to-r from-slate-400 to-red-600 text-white rounded-md p-2 hover:scale-105" onClick={() => handleRemovePatient(patient._id)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                            </div>
            
                        ))}
                    </ul>
                </div>
            )}
            <div className="flex justify-between my-4  p-2  rounded-b-xl shadow-xl ">
                <button
                    className={`bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handlePrevious}
                    disabled={startIndex === 0}
                >
                    Previous
                </button>
                <button
                    className={`bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md ${startIndex + 2 >= patients.length ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handleNext}
                    disabled={startIndex + 2 >= patients.length}
                >
                    Next
                </button>
            </div>
            {selectedPatient && <SeePatient  patient={selectedPatient} onClose={handleCloseDetails} />}
        </div>
    );
};

export default PatientList;
