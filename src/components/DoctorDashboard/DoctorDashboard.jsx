import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientList from './PatientList';
import GetUser from '../../hooks/GetUser';
import GivePrescription from './GivePrescription';
import DoctorProfile from '../Profile/DoctorProfile';
import UpdateDoctorProfile from '../Profile/UpdateDoctorProfile';

const DoctorDashboard = () => {
    const [user] = GetUser();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [isDoctorProfileModalOpen, setIsDoctorProfileModalOpen] = useState(false);
    const [isUpdateDoctorProfileModalOpen, setIsUpdateDoctorProfileModalOpen] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const goToProfile = () => {
        console.log('Navigating to profile page...');
        setIsDoctorProfileModalOpen(true);
    };

    const updateProfile = () => {
        console.log('Navigating to update page...');
        setIsUpdateDoctorProfileModalOpen(true);
    };

    const handleShortcutSelection = () => {
        if (selectedOption === 'profile') {
            goToProfile();
        } else if (selectedOption === 'update') {
            updateProfile();
        }
    };

    return (
        <div className="text-white flex flex-col md:flex-row bg-gradient-to-r from-slate-400 to-slate-700 pb-20">
            <aside className="w-full md:w-1/5 bg-gradient-to-r from-slate-400 to-slate-700 shadow-md md:sticky top-0">
                <div className=" items-center justify-between h-16  px-4">
                    <h1 className="font-bold text-gray-800">Doctor Dashboard</h1>
                    <div className=" text-black  flex items-center bg-gradient-to-r from-slate-700 to-slate-400 rounded-md">
                        <select value={selectedOption} onChange={handleOptionChange} className="px-4 py-2  hover:bg-gradient-to-r from-slate-700 to-slate-400 rounded-l-md">
                            <option value="">Select</option>
                            <option value="profile">See Profile</option>
                            <option value="update">Update</option>
                        </select>
                        <button onClick={handleShortcutSelection} className="px-4 py-2 hover:bg-gradient-to-r from-slate-400 to-slate-700 cursor-pointer">Go</button>
                    </div>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gradient-to-r from-slate-700 to-slate-400 cursor-pointer">Dashboard</li>
                        <li className="px-4 py-2 hover:bg-gradient-to-r from-slate-700 to-slate-400 cursor-pointer">Appointments</li>
                        <li className="px-4 py-2 hover:bg-gradient-to-r from-slate-700 to-slate-400 cursor-pointer">Patients</li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-4">
                <div className="flex flex-col h-full">
                    
                    <div className=" px-4  shadow-md flex-grow">
                        <div className='w-full p-2 bg-gradient-to-r from-slate-700 to-slate-400 rounded-md'>
                            <div className=' rounded-md flex justify-between'>
                                <div className='bg-gradient-to-r from-slate-400 to-slate-700 h-20 w-1/6 rounded-md'></div>
                                <div className='bg-gradient-to-r from-slate-700 to-slate-400 h-20 w-1/6 rounded-md'></div>
                                <div className='bg-gradient-to-r from-slate-400 to-slate-700 h-20 w-1/6 rounded-md'></div>
                                <div className='bg-gradient-to-r from-slate-400 to-slate-700 h-20 w-1/6 rounded-md'></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 max-h-[calc(100vh - 250px)] overflow-y-auto">
                        <PatientList key={user?.id} id={user?.id}></PatientList>
                    </div>
                </div>
            </main>
            {/* Doctor Profile Modal */}
            {isDoctorProfileModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-400 p-8 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 max-w-lg max-h-70vh overflow-y-auto">
                        <DoctorProfile />
                        <button onClick={() => setIsDoctorProfileModalOpen(false)} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Close</button>
                    </div>
                </div>
            )}
            {/* Update Doctor Profile Modal */}
            {isUpdateDoctorProfileModalOpen && (
                <div className=" bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-400 p-2 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 max-w-lg max-h-70vh overflow-y-auto">
                        <div> <button onClick={() => setIsUpdateDoctorProfileModalOpen(false)} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Close</button>
                        <UpdateDoctorProfile />
                            </div>
                        </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;
