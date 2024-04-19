import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import Error from '../Pages/Error';
import Home from '../Pages/Home/Home';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Emergency from '../Pages/Emergency';
import Services from '../Pages/Services';
import DoctorProfile from '../components/Profile/DoctorProfile';
import UpdateDoctorProfile from '../components/Profile/UpdateDoctorProfile';
import Appointment from '../Pages/Appointment';
import Dashboard from '../components/Dashboard/Dashboard';



const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
              
            },
            {
                path:'/login',
                element:<Login></Login>, 
            },
            {
                path:'/register',
                element:<Register></Register>, 
            },
            
            
            {
                path:'/dashboard',
                element: <Dashboard></Dashboard>, 
            },
            
           
            {
                path:'/appointment',
                element: <Appointment></Appointment>, 
            },
            {
                path:'/emergency',
                element:<Emergency></Emergency>,
            },
            {
                path:'/services',
                element:<Services></Services>,
            },
           
            {
                path:'/doctor-profile',
                element:<DoctorProfile></DoctorProfile>,
            },
            {
                path:'/update-doctor-profile',
                element:<UpdateDoctorProfile></UpdateDoctorProfile>,
            },
            
            
            
            
            
            
            
            

            
        ]
    }
])

export default router;