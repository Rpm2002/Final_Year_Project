import React from 'react'
import { Routes,Route,useLocation } from 'react-router-dom'
import Workers from '../pages/Workers'
import Users from '../pages/Users'
import Home from '../pages/Home'
import Enquiries from '../pages/Enquiries'

function Navpage() {
  
  const location = useLocation(); // Using useLocation hook to access the current location

  console.log('Current Location:', location.pathname); // Log the current path
  
  return (
    <>
      <section>
        <Routes>
          <Route path='/dashboard' element={<Home/>}/>
          <Route path='/dashboard/workers' element={<Workers/>}/>
          <Route path='/dashboard/users' element={<Users/>}/>
          <Route path='/dashboard/enquiries' element={<Enquiries/>}/>
        </Routes>
      </section>
    </>
    
  )
}

export default Navpage