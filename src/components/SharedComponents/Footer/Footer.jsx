import React from 'react';




const Footer = () => {
    return (
        <div className='bg-gradient-to-r from-slate-400 to-slate-700'>
            <div className=' text-black border border-teal-900 '>
            <section className=" py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                    <p>Address: Hospital address</p>
                    <p>Phone: +0 000 00 00 </p>
                    <p>Email: info@hospital.com</p>
                </div>
            </section>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Hospital Name. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
        </div>
    );
};

export default Footer;