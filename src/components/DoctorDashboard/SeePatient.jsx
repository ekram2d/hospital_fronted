import React, { useState } from 'react';
import GivePrescription from './GivePrescription';
import PrescriptionsToDoctor from '../Prescription/PrescriptionsToDoctor';
import GetUser from '../../hooks/GetUser';

const SeePatient = ({ patient }) => {
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [showPrescription, setShowPrescription] = useState(false);
    const [user]=GetUser();


    console.log("dpppppp",user);

    const togglePrescriptionForm = () => {
        setShowPrescriptionForm(prevState => !prevState);
    };
    const togglePrescription = () => {
        setShowPrescription(prevState => !prevState);
    };

    return (
        <div className='p-4 '>
            <div className="md:flex gap-4 p-4 ">
            <div className="card bg-gradient-to-r from-slate-200 to-slate-400 w-3/4 mx-auto bg-base-100 shadow-xl p-4 mb-4">
                
                    <h2 className="card-title">{patient.name}</h2>
                    <p>Email: {patient.email}</p>
                    <p>Contact: {patient.contact}</p>
                    <p>Age: {patient.age}</p>
                    <p>Appointment Date: {patient.appointment_date}</p>
                    <p>Gender: {patient.gender}</p>
                    <p>Note: {patient.additional_notes}</p>

                   <div className='flex justify-around gap-2'>
                   <div>
                    <button className="btn  text-xs bg-gradient-to-r from-slate-400 to-yellow-600 rounded-md p-2 hover:scale-105" onClick={togglePrescription}>
                            {showPrescription ? 'Hide Previous Prescription ' : 'Previous Prescription'}
                        </button>
                    </div>

                    <div className="card-actions justify-end">
                        <button className="btn text-xs bg-gradient-to-r from-slate-400 to-green-600  rounded-md p-2 hover:scale-105" onClick={togglePrescriptionForm}>
                            {showPrescriptionForm ? 'Hide Prescription Form' : 'Give Prescription'}
                        </button>
                    </div>
                   </div>
                
            </div>

           
            
        </div>
        {showPrescriptionForm && (
                <div className="card p-4 mt-4 bg-gradient-to-r from-slate-300 to-slate-500 shadow-xl overflow-y-auto max-h-80">
                    <div className="card-body ">
                        <GivePrescription email={patient.email} />
                    </div>
                </div>
            )}
        {showPrescription && (
                <div className="card mt-4 bg-base-100 shadow-xl overflow-y-auto max-h-80">
                    <div className="card-body bg-gradient-to-r from-slate-400 to-slate-600">
                        <PrescriptionsToDoctor key={patient.email} email={patient.email} id={user?.id}></PrescriptionsToDoctor>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeePatient;
