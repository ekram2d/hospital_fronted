import React, { useState, useEffect, useRef } from 'react';
import Info from './Info';
import Chart from './Chart';

const AdminDashboard = () => {
    // State to manage doctor and patient lists
    const [doctors, setDoctors] = useState([]);
    const [doctorsCount, setDoctorsCount] = useState(0);
    const [patientsCount, setPatientsCount] = useState(0);
    const [patients, setPatients] = useState([]);
    const [doctorRequests, setDoctorRequests] = useState([]);
    const [doctorRequestsCount, setDoctorRequestsCount] = useState(0);

    const doctorRequestsRef = useRef(null);
    const doctorsRef = useRef(null);
    const patientsRef = useRef(null);

    // Fetch doctors and patients data from backend on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://doctor-apps.vercel.app/api/v1/users');
                const data = await response.json();
                if (data.status === 'success') {
                    const users = data.data;
                    const doctorRequestsData = users.filter(user => user.message === 'doctor');
                    const doctorsData = users.filter(user => user.role === 'doctor');
                    const patientsData = users.filter(user => user.role === 'user');
    
                    setDoctorRequests(doctorRequestsData);
                    setDoctorRequestsCount(doctorRequestsData.length);
                    
                    setDoctors(doctorsData);
                    setDoctorsCount(doctorsData.length);
                    
                    setPatients(patientsData);
                    setPatientsCount(patientsData.length);
                } else {
                    console.error('Failed to fetch users data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };
    
        // Call the fetch function
        fetchData();
    }, []);
    

    // Function to handle adding a user as a doctor
    const addUserAsDoctor = async (id) => {
        try {
            const response = await fetch(`https://doctor-apps.vercel.app/api/v1/users/user-role/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'doctor', message: 'patient' }),
            });
            const data = await response.json();
            if (response.ok) {
                // Update the role and message of the user in the local state
                const updatedUser = data.data;
                setDoctors([...doctors, updatedUser]);
                setDoctorRequests(doctorRequests.filter(user => user._id !== id));
                console.log('User role updated to doctor successfully');
            } else {
                console.error('Failed to update user role to doctor:', data.message);
            }
        } catch (error) {
            console.error('Error updating user role to doctor:', error);
        }
    };

    // Function to handle adding a user as a user
    const addUserAsUser = async (id) => {
        try {
            const response = await fetch(`https://doctor-apps.vercel.app/api/v1/users/user-role/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'user', message: 'patient' }),
            });
            const data = await response.json();
            if (response.ok) {
                // Update the role and message of the user in the local state
                const updatedUser = data.data;
                setPatients([...patients, updatedUser]);
                setDoctorRequests(doctorRequests.filter(user => user._id !== id));
                console.log('User role updated to user successfully');
            } else {
                console.error('Failed to update user role to user:', data.message);
            }
        } catch (error) {
            console.error('Error updating user role to user:', error);
        }
    };

    // Function to handle adding a doctor as a user
    const addUserAsUserInDoctorTable = async (id) => {
        try {
            const response = await fetch(`https://doctor-apps.vercel.app/api/v1/users/user-role/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'user' }),
            });
            const data = await response.json();
            if (response.ok) {
                // Update the role of the user in the local state
                const updatedUser = data.data;
                setDoctors(doctors.filter(user => user._id !== id));
                setPatients([...patients, updatedUser]);
                console.log('User role updated to user successfully');
            } else {
                console.error('Failed to update user role to user:', data.message);
            }
        } catch (error) {
            console.error('Error updating user role to user:', error);
        }
    };

    const scrollToDoctorRequests = () => {
        doctorRequestsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll to the Doctors table
    const scrollToDoctors = () => {
        doctorsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll to the Patients table
    const scrollToPatients = () => {
        patientsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Prevent default behavior of shortcut clicks
    const handleShortcutClick = (event) => {
        console.log('Shortcut clicked');
        event.preventDefault();
    };

    return (
        <div className='bg-gradient-to-r from-slate-400 to-slate-700'>
            <div className='flex'>
                <div className="flex w-4/5">
                    <aside className="bg-gradient-to-r from-slate-400 to-slate-700 text-white w-60">
                        <div className="py-4 px-2">
                            <h1 className="text-xl font-bold">Hospital Admin</h1>
                        </div>
                        <nav className="mb-8">
                            <ul>
                                <li className="py-2 px-6 hover:bg-gray-700 cursor-pointer" onClick={(event) => { scrollToDoctors(); handleShortcutClick(event); }}>Doctors</li>
                                <li className="py-2 px-6 hover:bg-gray-700 cursor-pointer" onClick={(event) => { scrollToPatients(); handleShortcutClick(event); }}>Patients</li>
                                <li className="py-2 px-6 hover:bg-gray-700 cursor-pointer" onClick={(event) => { scrollToDoctorRequests(); handleShortcutClick(event); }}>Doctor Requests</li>
                            </ul>
                        </nav>
                    </aside>
                    <div className='w-full p-2'>
                        <div className='w-full  rounded-lg'>
                            <Info key={patientsCount} drc={doctorRequestsCount} dc={doctorsCount} pc={patientsCount}></Info>
                        </div>
                        <div className='text-white'>
                            <main className="w-full   overflow-hidden">
                                <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 4rem)" }}>
                                <h2 className="text-3xl font-bold pt-4" ref={doctorRequestsRef}>Doctor Requests</h2>
                                       <div className="max-h-60  overflow-y-auto bg-gradient-to-r from-slate-700 to-slate-400 rounded-lg p-2">
                                       <div className="mb-8 overflow-x-auto">
                                            <table className="min-w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2">Name</th>
                                                        <th className="px-4 py-2">Email</th>
                                                        <th className="px-4 py-2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {doctorRequests.map(user => (
                                                        <tr key={user._id}>
                                                            <td className="border ">{user.name}</td>
                                                            <td className="border px-4 py-2">{user.email}</td>
                                                            <td className="border px-4 py-2">
                                                                <button onClick={() => addUserAsDoctor(user._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-1 text-xs">Add Doctor</button>
                                                                <button onClick={() => addUserAsUser(user._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">Make User</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                    <h2 className="text-3xl font-bold mt-8" ref={doctorsRef}>Doctors</h2>
                                       <div className="max-h-60 overflow-y-auto bg-gradient-to-r from-slate-700 to-slate-400 rounded-lg  p-2 ">
                                       <div className="mb-8 overflow-x-auto">
                                            <table className="min-w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2">Name</th>
                                                        <th className="px-4 py-2">Email</th>
                                                        <th className="px-4 py-2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {doctors.map(user => (
                                                        <tr key={user._id}>
                                                            <td className="border px-4 py-2">{user.name}</td>
                                                            <td className="border px-4 py-2">{user.email}</td>
                                                            <td className="border px-4 py-2">
                                                                <button onClick={() => addUserAsUserInDoctorTable(user._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1 text-xs">Make User</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-bold mt-8" ref={patientsRef}>Patients</h2>
                                       
                                    <div className="max-h-60 overflow-y-auto bg-gradient-to-r from-slate-700 to-slate-400 rounded-lg p-2">
                                         <div className="mb-8 overflow-x-auto">
                                            <table className="min-w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2">Name</th>
                                                        <th className="px-4 py-2">Email</th>
                                                        <th className="px-4 py-2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {patients.map(user => (
                                                        <tr key={user._id}>
                                                            <td className="border px-4 py-2">{user.name}</td>
                                                            <td className="border px-4 py-2">{user.email}</td>
                                                            <td className="border px-4 py-2">
                                                                {/* Add action buttons here */}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </main>
                        </div>
                    </div>
                </div>
                <div className='text-white p-4 w-1/4'>
                    <div className='  overflow-y-auto bg-gradient-to-r from-slate-400 to-slate-700   rounded-lg shadow-xl text-center text-xl font-bold  '>
                        <p className='p-2'>Graphical Analysis</p>
                        <Chart key={patientsCount} drc={doctorRequestsCount} dc={doctorsCount} pc={patientsCount}></Chart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
