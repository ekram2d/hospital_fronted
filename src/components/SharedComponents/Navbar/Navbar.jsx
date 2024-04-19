import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import GetUser from '../../../hooks/GetUser';


const NavBar = () => {
    const [user] = GetUser();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    

    const handleSignOut = () => {
        alert('sign out');
        localStorage.removeItem('userData');
        navigate('/');
        window.location.reload();
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className=" bg-gradient-to-r from-slate-200 to-slate-700 w-full text-white border-b-2 border-zinc-500">
            <div className="flex flex-wrap items-center justify-between mx-auto p-1">
                <Link to={'/'} className="flex items-center">
                    <img src='https://i.ibb.co/cwDWJSg/L1-2.png' className="h-[60px] w-[60px]" alt="" />
                    <h6 className="text-lime-950 font-bold pl-1">Hospital</h6>
                </Link>

                <div className="md:hidden">
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        onClick={toggleMobileMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-zinc-500 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div className={`px-4 w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-600 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li className="hover:text-zinc-200">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-zinc-300 " : ""
                                }
                            >
                                <p>HOME</p>
                            </NavLink>
                        </li>
                        <li className="hover:text-zinc-200">
                            <NavLink to="/emergency" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-zinc-300 " : ""
                            }>
                                <p>EMERGENCY</p>
                            </NavLink>
                        </li>
                        <li className="hover:text-zinc-200">
                            <NavLink to="/services" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-zinc-300 " : ""
                            }>
                                <p>SERVICES</p>
                            </NavLink>
                        </li>
                        <li className="hover:text-zinc-200">
                            <NavLink to="/appointment" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-zinc-300 " : ""
                            }>
                                <p>APPOINTMENT</p>
                            </NavLink>
                        </li>
                        <li className="hover:text-zinc-200">
                            <NavLink to="/dashboard" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-zinc-300 " : ""
                            }>
                                <p>DASHBOARD</p>
                            </NavLink>
                        </li>

                       

                        <div className="flex order-2 items-center">
                            {user && (
                                <div className="px-4 md:flex items-center gap-2">
                                    <div className='flex gap-2'>
                                    <div>
                                        <p className='text-xs text-zinc-300'>{user.name}</p>
                                    </div>
                                    {user.photoURL ? (
                                        <div className="h-[25px] w-[25px] rounded-full">
                                            <img src={user.photoURL} alt="" className="object-cover overflow-hidden rounded-full" />
                                        </div>
                                    ) : (
                                        <div className="text-xl text-zinc-500">
                                            <BsPersonCircle />
                                        </div>
                                    )}
                                    </div>


                                    <button
                                        onClick={() => handleSignOut()}
                                        type="button"
                                        className=" text-white bg-gray-500 hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                            {!user && (
                                <Link to="/login">
                                    <button
                                        type="button"
                                        className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                                    >
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar
