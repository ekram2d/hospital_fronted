import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import GetUser from '../../hooks/GetUser';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [id, setId] = useState(null);
    const user = GetUser();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://doctor-apps.vercel.app/api/v1/doctors/doctor-features');
                const data = await response.json();
                if (response.ok) {
                    setDoctors(data.data);
                } else {
                    console.error('Failed to fetch doctors:', data.message);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 pb-4">
            {doctors.map((doctor, index) => (
                <div key={index} className="bg-gradient-to-r from-slate-600 to-slate-300 shadow-md rounded-md p-4 flex items-center " data-aos="fade-left" data-aos-delay="0" data-aos-duration="2000">
                    <img src={doctor.imgUrl} alt={doctor.name} className="w-16 h-16 rounded-full mr-4" />
                    <div className='p-4   ' >
                        <h2 className="text-xl font-semibold">{doctor.name}</h2>
                        <p>Category: {doctor.category}</p>
                        <p>Description: {doctor.description}</p>
                        <p>Fee: {doctor.fee}</p>
                        <button onClick={() => navigate('/appointment')} className='bg-gradient-to-r from-slate-600 to-slate-300 bg-gray-500 p-2 rounded-md hover:scale-105'>Appointment</button>
                    </div>
                </div>
            ))}
           
        </div>
    );
};

export default DoctorList;
