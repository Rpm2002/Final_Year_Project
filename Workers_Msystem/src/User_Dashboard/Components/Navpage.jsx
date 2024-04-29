import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Enquiries from '../pages/Enquiries'
function Navpage() {
  console.log('navpage userdash');
  return (
    <>
      <section>
        <Routes>
          <Route path='/userdashboard' element={<Enquiries/>}/>
        </Routes>
      </section>
    </>
    
  )
}

export default Navpage