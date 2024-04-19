import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import GetUser from '../hooks/GetUser';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from '../hooks/Loading';
import Login from '../components/Login/Login';
import PatientList from '../components/DoctorDashboard/PatientList';

const Appointment = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [categories, setCategories] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]); // Preserve the original list of doctors
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [appointmentDateTime, setAppointmentDateTime] = useState(null); // Date and time for appointment
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [user] = GetUser();

    useEffect(() => {
        const fetchCategoriesAndDoctors = async () => {
            try {
                const response = await fetch('https://doctor-apps.vercel.app/api/v1/doctors/doctor-features');
                const data = await response.json();
                if (response.ok) {
                    const categoryNames = data.data.map(item => item.category);
                    const uniqueCategories = [...new Set(categoryNames)];
                    setCategories(uniqueCategories);
                    setAllDoctors(data.data); // Store the original list of doctors
                    setDoctors(data.data);
                } else {
                    console.error('Failed to fetch categories and doctors:', data.message);
                }
            } catch (error) {
                console.error('Error fetching categories and doctors:', error);
            } finally {
                setLoading(false); // Set loading to false when fetching is done
            }
        };

        fetchCategoriesAndDoctors();
    }, []);

    const handleCategoryChange = (selectedCategory) => {
        setLoading(true);
        const filteredDoctors = allDoctors.filter(doctor => doctor.category === selectedCategory);
        setDoctors(filteredDoctors);
        setSelectedDoctorId('');
        setLoading(false); // Reset selected doctor when category changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.currentTarget);
        const doctorId = selectedDoctorId;
        const name = user.name;
        const email = user.email;
        const age = form.get('age');
        const gender = form.get('gender');
        const contact = form.get('contact');
        const appointment_date = appointmentDateTime;
        const additional_notes = form.get('additional_notes');
        const active = true;
        const prescriptions = [];

        try {
            const response = await fetch('https://doctor-apps.vercel.app/api/v1/patients/patients-create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctorId, name, email, age, gender, contact, appointment_date, additional_notes, active, prescriptions }),
            });

            if (response.ok) {
                setLoading(false);
                setError('');
                Swal.fire('Process successful', 'You have successfully Appointed', 'success');
                navigate(location?.state?.from || '/dashboard');
            } else {
                const data = await response.json();
                const errorMessage = data.message || ' failed';
                setError(errorMessage);
                toast.error(errorMessage, {
                    position: 'top-center',
                    autoClose: 3000,
                    className: 'error-toast',
                    progressBar: false,
                });
            }
        } catch (error) {
            console.error('Error :', error);
            setError('An unexpected error occurred');
            toast.error('An unexpected error occurred', {
                position: 'top-center',
                autoClose: 3000,
                className: 'error-toast',
                progressBar: false,
            });
        }
    };

    if (!user) {
        return <Login location={location}></Login>;
    }

    // Calculate the minimum time dynamically based on the selected date
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const selectedDate = appointmentDateTime || new Date();
    const minTime = new Date();

    // If the selected date is the present date
    if (
        selectedDate.getDate() === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
    ) {
        minTime.setHours(currentHour >= 8 ? currentHour : 8);
        minTime.setMinutes(0);
    } else {
        minTime.setHours(8);
        minTime.setMinutes(0);
    }

    // Calculate the maximum time dynamically based on the current time
    const maxTime = new Date();
    maxTime.setHours(20);
    maxTime.setMinutes(0);

    // Render PatientList component if user's role is doctor, otherwise render appointment form
    return user?.role === 'doctor' ? (
        <div className='min-h-[80vh] bg-gradient-to-r from-slate-600 to-slate-300'>
            <PatientList key={user?.id} id={user?.id}></PatientList>
        </div>
    ) : (
        <div className='pb-6 bg-gradient-to-r from-slate-400 to-slate-700 text-gray-600'>
            <div className="w-full mx-auto md:w-1/2  ">
                <h2 className="py-4 text-zinc-200 text-xl text-center font-semibold ">Appointment Form</h2>
                {loading ? (
                    <div className="text-center"><div className='h-screen '><Loading></Loading></div></div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mx-auto ">
                        <div className='w-full mx-auto md:flex justify-between gap-2 '>
                            <div className='w-2/4 mx-auto  md:w-1/2 '>
                                <label htmlFor="category" className="block text-zinc-200 ">Category</label>
                                <select id="category" name="category" onChange={(e) => handleCategoryChange(e.target.value)} className="select select-bordered w-full" required>
                                    <option value="" className=''>Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-1/2 mx-auto'>
                                <label htmlFor="doctor" className="block text-zinc-200 ">Doctor</label>
                                <select id="doctor" name="doctor" value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className="select select-bordered w-full" required>
                                    <option value="">Select Doctor</option>
                                    {doctors.map((doctor, index) => (
                                        <option key={index} value={doctor.doctor_id}>{doctor.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='md:flex justify-between gap-2 '>
                            <div className='w-1/2 mx-auto'>
                                <label htmlFor="age" className="block text-zinc-200">Age</label>
                                <input type="number" id="age" name="age" className="input input-bordered w-full" required />
                            </div>
                            <div className='w-1/2 mx-auto'>
                                <label htmlFor="gender" className="block text-zinc-200">Gender</label>
                                <select id="gender" name="gender" className="select select-bordered w-full " required>
                                    <option value="">Select Gender</option>
                                    <option value="male" className='p-'>Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='md:flex justify-between gap-2'>
                            <div className='w-1/2 mx-auto'>
                                <label htmlFor="contact" className="block text-zinc-200">Contact</label>
                                <input type="text" id="contact" name="contact" className="input input-bordered w-full" required />
                            </div>
                            <div className='w-1/2 mx-auto'>
                                <label htmlFor="appointment_date" className="block text-zinc-200">Appointment Date and Time</label>
                                <DatePicker
                                    selected={appointmentDateTime}
                                    onChange={(date) => setAppointmentDateTime(date)}
                                    showTimeSelect
                                    minDate={new Date()}
                                    maxDate={new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)} // Set max date to 6 days from today
                                    minTime={minTime}
                                    maxTime={maxTime}
                                    dateFormat="yyyy-MM-dd h:mm aa"
                                    timeIntervals={30}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-1/2 mx-auto md:w-full'>
                            <label htmlFor="additional_notes" className="block text-zinc-200">Additional Notes</label>
                            <input type="text" id="additional_notes" name="additional_notes" className="input input-bordered w-full" required />
                        </div>
                        <div className='w-1/2 mx-auto flex justify-center pt-2'>
                            <button type="submit" className=" text-center w-3/4 btn bg-gradient-to-r from-slate-700 to-slate-400 text-white rounded-md p-2 hover:scale-105">Submit</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Appointment;
