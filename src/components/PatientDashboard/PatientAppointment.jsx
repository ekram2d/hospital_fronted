import React, { useEffect, useState } from 'react';
import DoctorName from '../Profile/DoctorName';
import { Link } from 'react-router-dom';

const CountdownClock = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime();
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            return { days, hours, minutes, seconds };
        } else {
            return null; // Return null if remaining time is 0 or negative
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (!timeLeft) {
        return null; // If remaining time is 0 or negative, return null to hide the countdown
    }

    return (
        <div>
            <p className='text-xs' >Remaining Time : <span className='font-bold'>{timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span></p>
        </div>
    );
};

const PatientAppointment = ({ email }) => {
    const [prescriptions, setPrescriptions] = useState([]);

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

    return (
        
            <div className=" w-4/5 mx-auto p-2 pb-8 ">
                {/* Display patient cards here */}
                {prescriptions.map(patient => {
                    const appointmentDate = new Date(patient.appointment_date);
                    const currentTime = new Date();

                    if (appointmentDate <= currentTime) {
                        return null; // Hide appointment if appointment time is before present time
                    }

                    return (
                       <div className='pb-4'>
                         <div key={patient._id} className="bg-gradient-to-r from-slate-200 to-slate-500 shadow-md p-2 rounded-md">
                            <DoctorName key={patient.doctorId} id={patient.doctorId}></DoctorName>
                            <p className='text-xs'>Appointment Date: {appointmentDate.toLocaleString()}</p>
                            <CountdownClock targetDate={appointmentDate} />
                        </div>
                       </div>
                    
                    );
                })}

<Link to="/appointment" className='block w-full mx-auto bg-gradient-to-r from-slate-400 to-green-600 p-2 text-center text-white rounded-md hover:scale-105'>
    <button className="w-full h-full bg-transparent border-none">
        Make a New Appointment
    </button>
</Link>
                           
            </div>
       
    );
};

export default PatientAppointment;
