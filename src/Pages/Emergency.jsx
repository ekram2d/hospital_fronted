import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Emergency = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="p-8 bg-gradient-to-r from-slate-400 to-slate-700 text-black">
            <h1 className="text-3xl font-bold mb-4 text-center pb-8" data-aos="fade-down" data-aos-delay="0" data-aos-duration="2000">Emergency Services</h1>
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-slate-300 to-slate-600 shadow-md p-4 rounded-md row-start-1 col-start-1" data-aos="fade-left" data-aos-delay="0" data-aos-duration="2000">
                    <h2 className="text-xl font-semibold mb-2">Emergency Room</h2>
                    <p>Our emergency room is open 24/7 to provide immediate care for urgent medical conditions.</p>
                </div>
                <div className="bg-gradient-to-r from-slate-300 to-slate-600 shadow-md p-4 rounded-md row-start-2 col-start-2" data-aos="fade-right" data-aos-delay="0" data-aos-duration="2000">
                    <h2 className="text-xl font-semibold mb-2">Ambulance Service</h2>
                    <p>Contact our ambulance service for quick transport to the hospital in case of emergencies.</p>
                </div>
                <div className="bg-gradient-to-r from-slate-300 to-slate-600 shadow-md p-4 rounded-md row-start-3 col-start-1" data-aos="fade-left" data-aos-delay="0" data-aos-duration="2000">
                    <h2 className="text-xl font-semibold mb-2">Emergency Contact</h2>
                    <p>For immediate assistance, call our emergency hotline at 123-456-7890.</p>
                </div>
                <div className="bg-gradient-to-r from-slate-300 to-slate-600 shadow-md p-4 rounded-md row-start-4 col-start-2" data-aos="fade-up" data-aos-delay="0" data-aos-duration="2000">
                    <h2 className="text-xl font-semibold mb-2">Emergency Contact 2</h2>
                    <p>For immediate assistance, call our emergency hotline at 123-456-7890.</p>
                </div>
                {/* Add more emergency services here */}
            </div>
        </div>
    );
};

export default Emergency;
