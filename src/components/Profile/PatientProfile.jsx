import React, { useEffect, useState } from 'react';
import GetUser from '../../hooks/GetUser';

const PatientProfile = ({ email }) => {
    const [user] = GetUser();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://doctor-apps.vercel.app/api/v1/patients/prescriptions-filter?email=${email}`);
                const data = await response.json();
                if (response.ok) {
                    setPatient(data[0]); // Assuming the first patient data in the array is the relevant one
                } else {
                    console.error('Failed to fetch patient data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, [email]);

    return (
        <div>
            {patient && (
                <div>
                    <h2>Name: {patient.name}</h2>
                    <p>Age: {patient.age}</p>
                    <p>Gender: {patient.gender}</p>
                    <p>Contact Number: {patient.contact}</p>
                    <p>Email: {patient.email}</p>
                </div>
            )}
        </div>
    );
};

export default PatientProfile;
