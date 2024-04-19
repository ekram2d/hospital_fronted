import { Navigate, useLocation } from 'react-router-dom';
import GetUser from '../hooks/GetUser';
import { useState, useEffect } from 'react';

const PrivateRoutes = ({ children }) => {
    const location = useLocation();
    const [user] = GetUser();
   

    console.log("User Privateeeee",user);

    if (user) {
        
        return children;
       
        
    } else {
        return <Navigate state={location.pathname} to='/login' />;
    }
};

export default PrivateRoutes;
