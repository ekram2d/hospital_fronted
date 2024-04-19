import React from 'react';

import PrescriptionsToPatient from '../../components/Prescription/PrescriptionsToPatients';
import GetUser from '../../hooks/GetUser';
import PatientAppointment from '../../components/PatientDashboard/PatientAppointment';
import PatientProfile from '../../components/Profile/PatientProfile';
import Clock from '../../Pages/Home/Clock';

const PatientDashboard = () => {
    const [user] = GetUser();
    if (!user) return <div className='flex items-center justify-center'><p>Please Login</p></div>;
    return (
        <div className='bg-gradient-to-r from-slate-400 to-slate-700 w-full flex gap-2'>
            <div className='w-1/4  p-2'>
                <div className=''>
                    <Clock></Clock>
                    <div className='text-zinc-200 pt-6'>
                    <PatientProfile key={user?.email} email={user?.email}></PatientProfile>
               
                    </div>
                    </div>
            </div>

            <div className='w-3/4 bg-gradient-to-r from-slate-400 to-slate-700'>
                <div className='w-full p-2  rounded-md'>
                    <div className=' rounded-md p-2 flex justify-between'>
                        <div className='bg-gradient-to-r from-slate-700 to-slate-400 h-20 w-1/6 rounded-md'>field 1</div>
                        <div className='bg-gradient-to-r from-slate-400 to-slate-700 h-20 w-1/6 rounded-md'>field 2</div>
                        <div className='bg-gradient-to-r from-slate-400 to-slate-700 h-20 w-1/6 rounded-md'>field</div>
                        <div className='bg-gradient-to-r from-slate-700 to-slate-400 h-20 w-1/6 rounded-md'>field</div>
                    </div>
                </div>
                <div>
                 <div className='flex h-80 gap-2 p-2 bg-gradient-to-r from-slate-400 to-slate-700 '>
                    <div className='p-2 rounded-lg bg-gradient-to-r from-slate-700 to-slate-400 w-1/2 overflow-hidden'>
                       <p className='text-white'> Appointment</p>
                        <div className="overflow-y-auto h-full">
                            <PatientAppointment key={user.id} email={user.email} />
                        </div>
                    </div>
                    <div className='p-2 rounded-lg bg-gradient-to-r from-slate-700 to-slate-400 w-1/2 overflow-hidden'>
                       <p className='text-white'> Prescription</p>
                        <div className="overflow-y-auto h-full">
                            <PrescriptionsToPatient key={user.id} email={user.email} />
                        </div>
                    </div>
                   
                </div>
                <div className=' h-60 p-4 flex justify-between gap-2 '>
                 
                    <div className='rounded-lg w-1/3 bg-gradient-to-r from-slate-700 to-slate-400'>section 1</div>
                    <div className='rounded-lg w-1/3 bg-gradient-to-r from-slate-700 to-slate-400'>section 2</div>
                    <div className='rounded-lg w-1/3 bg-gradient-to-r from-slate-700 to-slate-400'>section 3</div>

                </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
