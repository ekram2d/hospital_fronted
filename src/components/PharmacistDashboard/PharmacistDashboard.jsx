import React, { useState } from 'react';
import GetUser from '../../hooks/GetUser';
import PrescriptionsToPatient from '../Prescription/PrescriptionsToPatients';
import AddMedicinePrice from './AddMedicinePrice';
import AllMedicineList from './AllMedicineList';
import AddMedicine from './AddMedicine';
import Clock from '../../Pages/Home/Clock';

const PharmacistDashboard = () => {
    const [user] = GetUser();
    const [showAddMedicine, setShowAddMedicine] = useState(false);

    if (!user) return <div className='h-[100vh] bg-gradient-to-r from-slate-600 to-slate-300 flex items-center justify-center'><p>Please Login...</p></div>;

    const handleToggleAddMedicine = () => {
        setShowAddMedicine(prevState => !prevState);
    };

    return (
        <div className="flex bg-gradient-to-r from-slate-400 to-slate-700">
            <aside className="w-1/4 bg-gradient-to-r from-slate-400 to-slate-700 shadow-md">
                <div className="flex items-center justify-center h-16 border-b ">
                    <h1 className="text-lg font-bold text-gray-800">Pharmacist Dashboard</h1>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Medicine </li>
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Add Price</li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-4">
                <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                <div className="mt-4 p-4 bg-gradient-to-r from-slate-400 to-slate-200 shadow-md rounded md">
                    <p ><Clock></Clock></p>
                </div>
                <section className='pt-4'>
                    <AddMedicinePrice></AddMedicinePrice>
                </section>
                <section>
                    <AllMedicineList></AllMedicineList>
                </section>
                <section>
                    <button onClick={handleToggleAddMedicine} className="bg-gradient-to-r from-green-400 to-slate-700 text-white px-4 py-2 rounded-md my-4 hover:scale-105">
                        {showAddMedicine ? 'Hide Form' : 'Add a New Medicine'}
                    </button>
                    {showAddMedicine && <AddMedicine />}
                </section>
            </main>
        </div>
    );
};

export default PharmacistDashboard;
