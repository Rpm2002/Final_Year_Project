import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useFirebase } from './Firebase/Context';
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from './pages/Home';
import ExpertSearch from './pages/ExpertsSearch';
import ExpertDetail from './pages/ExpertDetail';
import Join from './pages/Join';
import Workers from './Dashboard/pages/Workers.jsx';
import Users from './Dashboard/pages/Users.jsx';
import MainDashboard from './Dashboard/Components/MainDashboard.jsx';
import MainWorkerDashboard from './Worker_Dashboard/Components/Main_Worker_Dashboard.jsx';
import MainUserDash from './User_Dashboard/Components/Main_User_Dash.jsx';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/expertsearch' element={<ExpertSearch />} />
          <Route path='/expertdetail/:id' element={<ExpertDetail />} />
          <Route path='/join' element={<Join />} />
        </Routes>
          <MainDashboard />
          <MainWorkerDashboard />
          <MainUserDash />
      </BrowserRouter>
    </>
  );
}

export default App;
