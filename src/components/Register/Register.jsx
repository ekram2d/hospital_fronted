import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../hooks/Loading';

const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State variable to track loading state
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when registration process starts
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const message = form.get('category');

        try {
            const response = await fetch('https://doctor-apps.vercel.app/api/v1/users/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, message }),
            });

            if (response.ok) {
                setError('');
                Swal.fire('Registration successful', 'You have successfully registered and logged in', 'success')
                    .then(() => navigate(location?.state?.from || '/login'));
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
            console.error('Error registering user:', error);
            setError('An unexpected error occurred');
            toast.error('An unexpected error occurred', {
                position: 'top-center',
                autoClose: 3000,
                className: 'error-toast',
                progressBar: false,
            });
        } finally {
            setLoading(false); // Set loading to false when registration process completes
        }
    };

    return (
       <div className='bg-gradient-to-r from-slate-400 to-slate-700 pb-6 '>
 <div className=' text-black flex justify-center items-center  '>
            {/* Centered container */}
            <div className="md:w-1/2 mx-auto pt-4">
                <p className="pl-5">Please Register..</p>
                <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select className="select select-bordered" required name="category">
                            <option value="">Select category</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required name="name" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required name="email" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required name="password" />
                    </div>
                    <p className="text-sm text-red-500 pb-2">{error}</p>
                    <div className="form-control">
                        {/* Show loading spinner when loading */}
                        {loading ? <Loading></Loading> : (
                            <button type="submit" className="btn bg-gradient-to-r from-slate-400 to-slate-700 text-white rounded-md p-2 hover:scale-105">
                                Register
                            </button>
                        )}
                    </div>
                </form>
                <p className="pl-4 pb-4">
                    Already have an Account { '  '}
                    <Link to="/login" className="text-zinc-200 hover:text-zinc-600">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
       </div>
    );
};

export default Register;
