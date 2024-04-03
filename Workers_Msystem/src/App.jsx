import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import Home from './pages/Home'
import MainDashboard from './Dashboard/Components/MainDashboard'

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      {/* <Route path="/dashboard/*" element={<MainDashboard />} /> */}
    </Routes>
  </>  
  )
}

export default App