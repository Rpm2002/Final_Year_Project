import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  )
}

export default App