import React, { useState, useEffect } from 'react';

const BuyMedicine = ({ patient }) => {
    const [doctor, setDoctor] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [medicinePrices, setMedicinePrices] = useState({});

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`https://doctor-apps.vercel.app/api/v1/doctors/doctor-features/${patient.doctorId}`);
                const data = await response.json();
                if (response.ok) {
                    setDoctor(data.data);
                } else {
                    console.error('Failed to fetch doctor:', data.message);
                }
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        };

        fetchDoctor();
    }, [patient.doctorId]);

    useEffect(() => {
        const fetchMedicinePrices = async () => {
            const prices = {};
            let total = 0;
            await Promise.all(patient.prescriptions.map(async (prescription) => {
                try {
                    const response = await fetch(`https://doctor-apps.vercel.app/api/v1/medicine/medicines-get?name=${prescription.medicine_name}`);
                    const data = await response.json();
                    if (response.ok) {
                        const medicine = data.data.find(med => med.mg === prescription.mg);
                        const price = medicine ? medicine.price_per_unit : 0;
                        prices[prescription.medicine_name] = price;
                        total += price * (prescription.dosage * prescription.duration); // Calculate total price
                    } else {
                        console.error('Failed to fetch medicine prices:', data.message);
                        prices[prescription.medicine_name] = 0;
                    }
                } catch (error) {
                    console.error('Error fetching medicine prices:', error);
                    prices[prescription.medicine_name] = 0;
                }
            }));
            setMedicinePrices(prices);
            setTotalPrice(total);
        };

        fetchMedicinePrices();
    }, [patient.prescriptions]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <div className="bg-white shadow-md p-4 rounded-md">
                <div>
                    <div className='border bottom-2'>
                        <h2 className="text-xl font-semibold mb-2"> {doctor && doctor.name}</h2>
                        <p>Doctor ID: {patient.doctorId}</p>
                        <p>Doctor Name: {doctor && doctor.name}</p>
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
                    <div className="border-t border-gray-300 pt-4 mt-4">
                        <table className="table-auto w-full text-center">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Medication</th>
                                    <th className="border px-4 py-2">mg</th>
                                    
                                    <th className="border px-4 py-2">Amount</th>
                                    <th className="border px-4 py-2">Unit Price</th>
                                    <th className="border px-4 py-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patient.prescriptions.map((prescription, idx) => (
                                    <tr key={idx}>
                                        <td className="border px-4 py-2">{prescription.medicine_name} </td>
                                        <td className="border px-4 py-2">{prescription.mg} mg</td>
                                       <td className="border px-4 py-2">{prescription.dosage * prescription.duration}</td>
                                        <td className="border px-4 py-2">{medicinePrices[prescription.medicine_name] <= 0 ? 'N/A' : `${medicinePrices[prescription.medicine_name]} EUR`}</td>
                                        <td className="border px-4 py-2">{medicinePrices[prescription.medicine_name] <= 0 ? 'N/A' : `${medicinePrices[prescription.medicine_name] * (prescription.dosage * prescription.duration)} EUR`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <p className='text-end'><strong>Total Price : </strong> <span>{totalPrice <= 0 ? 'N/A' : `${totalPrice}  EUR`}</span></p>
                            <div className='text-end'>
                                <button className='bg-orange-400 py-1 px-2 rounded-md text-white hover:scale-105' onClick={handlePrint} >Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyMedicine;
