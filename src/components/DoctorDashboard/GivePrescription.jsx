import React, { useState } from 'react';
import Loading from '../../hooks/Loading';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import GetUser from '../../hooks/GetUser';
import { useNavigate } from 'react-router-dom';

const GivePrescription = ({email}) => {
    const [loading, setLoading] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [medication, setMedication] = useState('');
    const [mg, setMg] = useState('');
    const [price, setPrice] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');
    const [notes, setNotes] = useState('');
    const [followUpMessage, setFollowUpMessage] = useState('');
    const [user]=GetUser();
    const navigate = useNavigate();
    const doctorId=user?.id;

    console.log("Email=====>",email,user?.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Create a prescription object
        const prescription = {
            medicine_name: medication,
            price_per_unit: price,
            mg,
            dosage,
            frequency,
            duration,
            notes,
            followUpMessage
        };
        // Add the prescription to the array of prescriptions
        setPrescriptions(prevPrescriptions => [...prevPrescriptions, prescription]);
        // Clear the form fields
        setMedication('');
        setPrice('');
        setMg('');
        setDosage('');
        setFrequency('');
        setDuration('');
        setNotes('');
        setFollowUpMessage('');
        
        // Prepare data to be sent to the server
        const data = {
            email,
            doctorId,
            prescriptions: [...prescriptions, prescription]
        };
    
        console.log("Data ==>  ", data);
    
        try {
            // Send a PUT request to the API
            const response = await fetch('https://doctor-apps.vercel.app/api/v1/patients/add-prescriptions-to-patient', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                console.log('Prescription submitted successfully');
               
                Swal.fire('successful', 'You have successfully Submitted ', 'success')
                    .then(() => navigate(location?.state?.from || '/dashboard'));
                   
                // Handle success
            } else {
                console.error('Failed to submit prescription');
                const dataMessage = await response.json();
                const errorMessage = dataMessage.message || 'Registration failed';
           
                toast.error(errorMessage, {
                    position: 'top-center',
                    autoClose: 3000,
                    className: 'error-toast',
                    progressBar: false,
                });
                // Handle failure
            }
        } catch (error) {
            console.error('Error submitting prescription:', error);
         
            toast.error('An unexpected error occurred', {
                position: 'top-center',
                autoClose: 3000,
                className: 'error-toast',
                progressBar: false,
            });
            // Handle error
        } finally {
            setLoading(false);
           // Set loading to false when registration process completes
        }

    };
    
    const handleAddMoreMedicine = () => {
        // Create a prescription object
        const prescription = {
            medicine_name: medication,
            price_per_unit: price,
            mg,
            price,
            dosage,
            frequency,
            duration,
            notes,
            followUpMessage
        };
        // Add the prescription to the array of prescriptions
        setPrescriptions(prevPrescriptions => [...prevPrescriptions, prescription]);
       
        // Clear the form fields
        setMedication('');
        setPrice('');
        setMg('');
        setDosage('');
        setFrequency('');
        setDuration('');
        setNotes('');
        setFollowUpMessage('');
    };

    return (

            <div className=' p-2 rounded-lg overflow-hidden'>
            <h2 className="text-xl font-semibold text-gray-800 p-4">Give Prescription</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className='flex gap-4'>
               <div className='w-2/3'>
                    <label htmlFor="medication" className="block">Medication</label>
                    <input type="text" id="medication" value={medication} onChange={(e) => setMedication(e.target.value)} className="input input-bordered w-full" required />
                </div>
                <div className='w-1/3 '>
                    <label htmlFor="mg" className="block"> mg</label>
                    <input type="number" id="mg" value={mg} onChange={(e) => setMg(e.target.value.toString())} className="input input-bordered w-full" required />
                </div>
               </div>
                <div>
                    <label htmlFor="dosage" className="block">Dosage</label>
                    <input type="number" id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="input input-bordered w-full" placeholder='2 Medicine per day' required />
                </div>
                <div>
                    <label htmlFor="frequency" className="block">Time</label>
                    <input type="text" id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} className="input input-bordered w-full" placeholder='Morning and Evening' required />
                </div>
                <div>
                    <label htmlFor="duration" className="block">Duration</label>
                    <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="input input-bordered w-full" placeholder='7 days' required />
                </div>
                <div>
                    <label htmlFor="notes" className="block">Notes</label>
                    <input type="text" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="input input-bordered w-full"  placeholder='Take after meal' required />
                </div>
                <div>
                    <label htmlFor="followUpMessage" className="block">Follow-up Message</label>
                    <input type="text" id="followUpMessage" value={followUpMessage} onChange={(e) => setFollowUpMessage(e.target.value)} className="input input-bordered w-full" placeholder='After 7 days' required />
                </div>
                <button onClick={handleAddMoreMedicine} className="btn bg-gradient-to-r from-pink-700 to-slate-400 text-white rounded-md p-2 hover:scale-105">Add More Medicine</button>
                {prescriptions.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Prescriptions Added:</h3>
                        <ul>
                            {prescriptions.map((prescription, index) => (
                                <li key={index}>
                                    <p><strong>Medication:</strong> {prescription.medicine_name}
                                    <strong> - </strong> {prescription.mg} mg 
                                    <strong> Dosage:</strong> {prescription.dosage}
                                    <strong> Frequency:</strong> {prescription.frequency}
                                    <strong> Duration:</strong> {prescription.duration}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
                {loading ? <Loading></Loading> : (
                            <button type="submit" className="btn bg-gradient-to-r from-green-700 to-slate-400 text-white rounded-md p-2 hover:scale-105">
                                Submit Prescription
                            </button>
                        )}
                </div>
               
            </form>
        </div>
     
    );
};

export default GivePrescription;
