import React from 'react';
import DoctorDashboard from '../DoctorDashboard/DoctorDashboard';
import PatientDashboard from '../PatientDashboard/PatientDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import GetUser from '../../hooks/GetUser';
import { Navigate, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import PharmacistDashboard from '../PharmacistDashboard/PharmacistDashboard';

const Dashboard = () => {
    const [user] = GetUser();
    const location = useLocation();
    let dashboardNavLink;

    if (user) {
        switch (user.role) {
            case 'doctor':
                dashboardNavLink = <DoctorDashboard />;
                break;
            case 'admin':
                dashboardNavLink = <AdminDashboard />;
                break;
            case 'pharmacist':
                dashboardNavLink = <PharmacistDashboard/>;
                break;
            default:
                dashboardNavLink = <PatientDashboard />;
        }
    } else {
        dashboardNavLink=<Login></Login>    }

    return (
        <div>
            {dashboardNavLink}
        </div>
    );
};

export default Dashboard;
