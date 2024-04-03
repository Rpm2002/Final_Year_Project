import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Workers from '../pages/Workers'
import Users from '../pages/Users'
import Home from '../pages/Home'
function Navpage() {
  return (
    <>
      <section>
        <Routes>
          <Route path='/dashboard' element={<Home/>}/>
          <Route path='/dashboard/workers' element={<Workers/>}/>
          <Route path='/dashboard/users' element={<Users/>}/>
        </Routes>
      </section>
    </>
    
  )
}

export default Navpage