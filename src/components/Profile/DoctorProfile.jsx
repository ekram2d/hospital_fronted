import React, { useState, useEffect } from 'react';
import GetUser from '../../hooks/GetUser';
import Loading from '../../hooks/Loading';

const DoctorProfile = () => {
    const [doctor] = GetUser();
    const [doctorFeatures, setDoctorFeatures] = useState(null); // State to store doctor features
    const [loading, setLoading] = useState(true); // State to store loading status
    const [error, setError] = useState(null); // State to store error message

    useEffect(() => {
        const fetchDoctorFeatures = async () => {
            try {
                const response = await fetch('https://doctor-apps.vercel.app/api/v1/doctors/doctor-features');
                const data = await response.json();
                if (response.ok) {
                    const doctorFeaturesData = data.data.filter(feature => feature.doctor_id == doctor?.id);
                    setDoctorFeatures(doctorFeaturesData);
                } else {
                    setError('Failed to fetch doctor features');
                }
            } catch (error) {
                setError('Error fetching doctor features: ' + error.message);
            } finally {
                setLoading(false); // Update loading state regardless of success or failure
            }
        };

        fetchDoctorFeatures();
    }, [doctor]);

    if (loading) {
        return <div><Loading></Loading></div>; // Render loading state while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {doctorFeatures && doctorFeatures.length > 0 && (
                <React.Fragment>
                    <div className='flex justify-center'>
                        <img src={doctorFeatures[0]?.imgUrl} alt="Doctor" className='h-40 w-40' />
                    </div>
                    <h3 className='bg-gradient-to-r from-slate-400 to-slate-700 mb-2 px-2 py-1 rounded-md'>{doctor?.name}</h3>
                    <div className='bg-gradient-to-r from-slate-400 to-slate-500 rounded-md px-2'>
                        <div className='flex justify-between '>
                            <p>Category: {doctorFeatures[0]?.category}</p>
                            <p>Qualification: {doctorFeatures[0]?.qualification}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Recognition: {doctorFeatures[0]?.recognition}</p>
                            <p>Available : Yes</p>
                        </div>
                    </div>
                    <div className='flex justify-between bg-gradient-to-r from-slate-400 to-slate-500 mt-2 p-1 rounded-md '>
                        <p>Fee: ${doctorFeatures[0]?.fee}</p>
                        <p>Duration: {doctorFeatures[0]?.duration} minutes</p>
                    </div>
                    <div className='bg-gradient-to-r from-slate-400 to-slate-500 mt-2 p-1 rounded-md'>
                    <p>Day: {doctorFeatures[0]?.day}</p>
                    <p>Description: {doctorFeatures[0]?.description}</p>
                    </div>
                    
                </React.Fragment>
            )}
        </div>
    );
};

export default DoctorProfile;
