/* eslint-disable react/prop-types */

import { useState} from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../hooks/Loading';


const Login = ({location}) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State variable to track loading state
    
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when login process starts
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        try {
            const response = await fetch('https://doctor-apps.vercel.app/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem('userData', JSON.stringify(userData?.user));
                Swal.fire('Login Successful', 'You have successfully logged in!', 'success');
                navigate(location?.state ? location.state : '/');
            } else {
                const data = await response.json();
                const errorMessage = data.message || 'Login failed';
                setError(errorMessage);
                toast.error(errorMessage, {
                    position: 'top-center',
                    autoClose: 3000,
                    className: 'error-toast',
                    progressBar: false,
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An unexpected error occurred');
            toast.error('An unexpected error occurred', {
                position: 'top-center',
                autoClose: 3000,
                className: 'error-toast',
                progressBar: false,
            });
        } finally {
            setLoading(false);
            navigate(location?.pathname);
            window.location.reload(); // Set loading to false when login process completes
        }
    };

    return (
        <div className='bg-gradient-to-r from-slate-400 to-slate-700'>
            <div className="md:w-1/2 mx-auto pb-5 ">
                <form onSubmit={handleLogin} className="card-body">
                    <h2 className="text-center">Continue with email </h2>
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
    {/* Disable the button and show spinner when loading */}
    <button className="btn bg-gradient-to-r from-slate-700 to-slate-400 text-white rounded-md p-2 hover:scale-105" disabled={loading}>
        {loading ? (
            <Loading></Loading> // Show spinner when loading
        ) : (
            'Login'
        )}
    </button>
</div>

                </form>
                
                <p className="pl-4 pb-4">
               
                    Do not have an Account  <Link to={'/register'} className="text-zinc-200 hover:text-zinc-600">Register</Link>{' '}
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;

