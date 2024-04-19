
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className=' text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black text-center h-[100vh] flex flex-col items-center justify-center'>
            <div className='text-2xl '><h2>Page Not Found</h2></div>

            <Link to={'/'}>
                <div className=' pt-5 flex items-center gap-2 justify-center text-center  '>
                    <h4 className=' hover:text-green-400'>Go to Home </h4>
                    <p className='text-xl first-line:text-green-400 hover:text-green-600'><AiFillHome /></p>
                </div>
            </Link>
        </div>
    );
};

export default Error;
