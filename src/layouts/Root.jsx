import React from 'react';

import { Outlet } from 'react-router-dom';
import NavBar from '../components/SharedComponents/Navbar/Navbar';
import Footer from '../components/SharedComponents/Footer/Footer';



const Root = () => {
    return (
        <div className='font-pops max-w-[1440px] mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;