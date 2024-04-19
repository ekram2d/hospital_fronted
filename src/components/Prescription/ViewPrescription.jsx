import React, { useState, useEffect } from 'react';

const ViewPrescriptions = ({ patient }) => {
    const [doctor, setDoctor] = useState(null);
   

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`https://doctor-apps.vercel.app/api/v1/doctors/doctor-features/${patient.doctorId}`);
                const data = await response.json();
                if (response.ok) {
                    setDoctor(data.data); // Access the doctor details from the 'data' object in the API response
                } else {
                    console.error('Failed to fetch doctor:', data.message);
                }
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        };

        fetchDoctor();
    }, [patient.doctorId]); // Add patient.doctorId as a dependency for useEffect

    return (
        <div>
            <div className="text-xs bg-white shadow-md p-4 rounded-md">
                <div className=''>
                    <div className='border bottom-2'>
                        <h2 className="text-xl font-semibold mb-2"> {doctor && doctor.name}</h2>
                        <p>Doctor ID: {patient.doctorId}</p>
                        <p>Doctor Name: {doctor && doctor.name}</p>  {/* Ensure doctor is not null before accessing its properties */}
                        <p>Field of Service : {doctor && doctor.category}</p>
                        <p>{doctor && doctor.qualification}  ({doctor && doctor.recognition})</p>
                        
                    </div>
                    <div className=' border top-2 mt-4 md:grid grid-cols-3'>
                        <p><strong>Patient Name: </strong>{patient.name}</p>
                       
                        <p><strong>Age : </strong> {patient.age}</p>
                        <p><strong>Contact : </strong> {patient.contact}</p>
                        <p><strong>Appointment Date : </strong> {new Date(patient.appointment_date).toLocaleDateString()}</p>
                        <p><strong>Gender : </strong>{patient.gender}</p>
                        <p><strong>Email : </strong> {patient.email}</p>
                        
                    </div>
                </div>
                <div className="mt-4 border-t border-gray-300 pt-4">
                    <h3 className="text-lg font-semibold mt-4">Prescriptions:</h3>
                    {/* Table heading */}
                    <div className="border-t border-gray-300 pt-4 mt-4">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Medication</th>
                                    <th className="border px-4 py-2">Dosage</th>
                                    <th className="border px-4 py-2">Frequency</th>
                                    <th className="border px-4 py-2">Duration</th>
                                    <th className="border px-4 py-2">Notes</th>
                                    <th className="border px-4 py-2">Follow-up Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Prescription rows */}
                                {patient.prescriptions.map((prescription, idx) => (
                                    <tr key={idx}>
                                        <td className="border px-4 py-2">{prescription.medicine_name} {prescription.mg} mg </td>
                                        <td className="border px-4 py-2">{prescription.dosage}</td>
                                        <td className="border px-4 py-2">{prescription.frequency}</td>
                                        <td className="border px-4 py-2">{prescription.duration}</td>
                                        <td className="border px-4 py-2">{prescription.notes}</td>
                                        <td className="border px-4 py-2">{prescription.followUpMessage}</td>
                                        <td className="border px-4 py-2">{prescription.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                        
                    </div>
                   <div className='pt-5 text-white font-bold text-center'>
                  
                   </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPrescriptions;
