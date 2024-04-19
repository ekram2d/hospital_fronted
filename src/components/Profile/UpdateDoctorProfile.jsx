import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetUser from '../../hooks/GetUser';
import Loading from '../../hooks/Loading';

const UpdateDoctorProfile = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading state
    const navigate = useNavigate();
    const location = useLocation();
    const [user] = GetUser();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when update process starts
        const form = new FormData(e.currentTarget);
        const doctor_id = user.id;
        const name = user.name;
        const fee = form.get('fee');
        const duration = form.get('duration');
        const day = form.get('day');
        const durationTime = form.get('durationTime');
        const category = form.get('category');
        const description = form.get('description');
        const qualification = form.get('qualification');
        const recognition = form.get('recognition');
        const imgUrl = form.get('imgUrl');

        try {
            const response = await fetch('https://doctor-apps.vercel.app/api/v1/doctors/doctor-features-add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctor_id, name, fee, duration, day, durationTime, category, description, qualification, recognition, imgUrl }),
            });

            if (response.ok) {
                setError('');
                Swal.fire('Updated successful', 'You have successfully updated', 'success');
                navigate(location?.state?.from || '/');
            } else {
                const data = await response.json();
                const errorMessage = data.message || 'Registration failed';
                setError(errorMessage);
                toast.error(errorMessage, {
                    position: 'top-center',
                    autoClose: 3000,
                    className: 'error-toast',
                    progressBar: false,
                });
            }
        } catch (error) {
            console.error('Error Updating user:', error);
            setError('An unexpected error occurred');
            toast.error('An unexpected error occurred', {
                position: 'top-center',
                autoClose: 3000,
                className: 'error-toast',
                progressBar: false,
            });
        } finally {
            setLoading(false); // Set loading to false when update process ends
        }
    };

    return (
        <div className=' max-h-80  '>
            
                <form onSubmit={handleUpdate} className="card-body">
                    <div className="p-1 bg-gradient-to-r from-slate-200 to-slate-400 rounded-md">
                        <label className="label">
                            <span className="label-text">Name</span>
                            <div>{user?.name}</div>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Image</span>
                        </label>
                        <input type="text" placeholder="Image URL" className="input input-bordered" required name="imgUrl" />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className="form-control text-white">
                            <label className="label">
                                <span className="label-text text-white">Category</span>
                            </label>
                            <input type="text" placeholder="Category" className="input input-bordered" required name="category" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Qualification</span>
                            </label>
                            <input type="text" placeholder="Qualification" className="input input-bordered" required name="qualification" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Recognition</span>
                            </label>
                            <input type="text" placeholder="Recognition" className="input input-bordered" required name="recognition" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Day</span>
                            </label>
                            <input type="text" placeholder="Available on" className="input input-bordered" required name="day" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Time</span>
                            </label>
                            <input type="number" placeholder="Time" className="input input-bordered" required name="durationTime" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Fee</span>
                            </label>
                            <input type="number" placeholder="Fee" className="input input-bordered" required name="fee" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Duration</span>
                            </label>
                            <input type="number" placeholder="Duration" className="input input-bordered" required name="duration" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Description</span>
                        </label>
                        <input type="text" placeholder="Description" className="input input-bordered" required name="description" />
                    </div>
                    {/* Spinner */}
                    {loading && <Loading></Loading>}
                    <p className="text-sm text-red-500 pb-2">{error}</p>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary bg-gradient-to-r from-slate-400 to-blue-700 hover:scale-105" disabled={loading}>
                            Update
                        </button>
                    </div>
                </form>
           
            <ToastContainer />
        </div>
    );
};

export default UpdateDoctorProfile;
