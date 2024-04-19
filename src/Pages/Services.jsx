import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
    useEffect(() => {
        AOS.init(); // Initialize AOS library
    }, []);

    return (
        <div className='w-full mx-auto  py-4 px-4 bg-gradient-to-r from-slate-400 to-slate-700'>
            
                <h1 className="text-3xl text-center font-bold mb-6" data-aos="fade-down">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {/* Example services */}
                    <div className="bg-gradient-to-r from-slate-600 to-slate-300 shadow-md p-2 rounded-lg transform transition duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105" data-aos="fade-up" data-aos-delay="0" data-aos-duration="2000">
                        <img src="https://i.ibb.co/prdG8pD/emergency.jpg" alt="Emergency Care" className="w-16 h-16 rounded-full mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Emergency Care</h2>
                        <p className="text-gray-600">We provide 24/7 emergency care services with experienced medical staff.</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-600 to-slate-300 shadow-md p-2 rounded-lg transform transition duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105" data-aos="fade-up" data-aos-delay="400" data-aos-duration="2000">
                        <img src="https://i.ibb.co/9ZMJbrT/check.jpg" alt="General Checkups" className="w-16 h-16 rounded-full  mx-auto  mb-4" />
                        <h2 className="text-xl font-semibold mb-2">General Checkups</h2>
                        <p className="text-gray-600">Regular checkups for individuals to ensure overall health and well-being.</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-600 to-slate-300 shadow-md p-2 rounded-lg transform transition duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105" data-aos="fade-up" data-aos-delay="800" data-aos-duration="2000">
                        <img src="https://i.ibb.co/n7y2pVY/treats.png" alt="Specialized Treatments" className="w-16 h-16 rounded-full mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Specialized Treatments</h2>
                        <p className="text-gray-600">Specialized treatments for various medical conditions by expert specialists.</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-600 to-slate-300 shadow-md p-2 rounded-lg transform transition duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105" data-aos="fade-up" data-aos-delay="1200" data-aos-duration="2000">
                        <img src="https://i.ibb.co/7NJvDGt/srg.png" alt="Surgery" className="w-16 h-16 rounded-full mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Surgery</h2>
                        <p className="text-gray-600">State-of-the-art surgical procedures performed by skilled surgeons.</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-600 to-slate-300 shadow-md p-2 rounded-lg transform transition duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105" data-aos="fade-up" data-aos-delay="1600" data-aos-duration="2000">
                        <img src="https://i.ibb.co/VN9vYXm/img.jpg" alt="Diagnostic Imaging" className="w-16 h-16 rounded-full mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Diagnostic Imaging</h2>
                        <p className="text-gray-600">Advanced diagnostic imaging services for accurate diagnosis.</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-600 to-slate-300 shadow-md p-2 rounded-lg transform transition duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105" data-aos="fade-up" data-aos-delay="2000" data-aos-duration="2000">
                        <img src="https://i.ibb.co/19KQ4PK/rhb.png" alt="Rehabilitation Services" className="w-16 h-16 rounded-full mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Rehabilitation Services</h2>
                        <p className="text-gray-600">Comprehensive rehabilitation programs for patients recovering from injuries or surgeries.</p>
                    </div>
                    {/* Add more services here */}
                </div>
            
       </div>
    );
};

export default Services;
