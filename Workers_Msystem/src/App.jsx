import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useFirebase } from './Firebase/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import ExpertSearch from './pages/ExpertsSearch';
import ExpertDetail from './pages/ExpertDetail';
import Join from './pages/Join';
import EnquiryList from './pages/EnquiryList.jsx';
import Workers from './Dashboard/pages/Workers.jsx';
import Users from './Dashboard/pages/Users.jsx';
import MainDashboard from './Dashboard/Components/MainDashboard.jsx';
import MainWorkerDashboard from './Worker_Dashboard/Components/Main_Worker_Dashboard.jsx';
import MainUserDash from './User_Dashboard/Components/Main_User_Dash.jsx';
import Thankyou from './pages/Thankyou.jsx';

function App() {
  const firebase = useFirebase();
  const [user, setUser] = useState(null); // State to store user data
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
        // Check if authenticated user's email matches admin email
        if (user.email === 'rhythm758002@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, [firebase]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/expertsearch" element={<ExpertSearch />} />
          <Route path="/expertdetail/:id" element={<ExpertDetail />} />
          <Route path="/join" element={<Join />} />
          <Route path="/enquiry" element={<EnquiryList />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
        {/* Redirect other users to the home page */}
        {user && isAdmin && <MainDashboard />} {/* Render admin dashboard if user is authenticated and admin */}
        {user && !isAdmin && <Navigate to="/" />} {/* Redirect other users to the home page */}
      </BrowserRouter>
    </>
  );
}

export default App;