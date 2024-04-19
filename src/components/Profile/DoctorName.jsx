import React, { useEffect, useState } from 'react';

const DoctorName = ({id}) => {
    const [name, setName] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://doctor-apps.vercel.app/api/v1/doctors/doctor-features/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setName(data.data);
                } else {
                    console.error('Failed to fetch prescriptions:', data.message);
                }
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchData();
    }, []);
    console.log("DocNameeeeee",id)
    return (
        <div>
            
            <p className='font-bold '> {name.name} 
                </p>
                <p className='text-xs'>
                {name.category}
                </p>
          
           
            
        </div>
    );
};

export default DoctorName;