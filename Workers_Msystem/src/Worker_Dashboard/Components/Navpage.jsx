import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserEnquiries from '../pages/User_Enquiries'
function Navpage() {
  return (
    <>
      <section>
        <Routes>
          <Route path='/workerdashboard' element={<UserEnquiries/>}/>
        </Routes>
      </section>
    </>
    
  )
}

export default Navpage