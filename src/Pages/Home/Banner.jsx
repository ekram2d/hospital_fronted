import React, { useState, useEffect } from 'react';


// Import your images from the assets folder


import image2 from '../../../src/assets/images/hp4.jpg'
import image3 from '../../../src/assets/images/hp3.jpg'
import { Link } from 'react-router-dom';



// Add more imports if you have additional images

const Banner = () => {
  
    const [imageIndex, setImageIndex] = useState(0);

    // Create an array of image URLs
    const images = [ image2, image3]; // Add more images here if needed

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const imageStyle = {
        backgroundImage: `url("${images[imageIndex]}")`,
        transition: 'background-image 1s ease-in-out',
    };

    return (
        <div className="relative w-full h-80 bg-cover bg-center" style={imageStyle}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-end p-6 text-white">
                <div className="">
                <Link to="/appointment" className='block w-full  bg-gradient-to-r from-slate-300 to-slate-500 p-2  text-white rounded-md hover:scale-105'>
    <button className="w-full h-full bg-transparent border-none">
        Make a New Appointment
    </button>
</Link>
                    </div>
            </div>
        </div>
    );
};

export default Banner;
