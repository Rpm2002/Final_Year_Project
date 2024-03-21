import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './pages/Home';
import Workers from './pages/Workers';
import Users from './pages/Users';

const MainDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-4">
                <Routes>
                    <Route path="/dashboard/home" component={Home} />
                    <Route path="/dashboard/workers" component={Workers} />
                    <Route path="/dashboard/users" component={Users} />
                </Routes>
            </div>
        </div>
    );
};

export default MainDashboard;
