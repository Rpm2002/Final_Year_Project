import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { FirebaseProvider } from './Firebase/Context'
import MainDashboard from './Dashboard/Components/MainDashboard.jsx'
import MainUserDashboard from './Worker_Dashboard/Components/Main_User_Dashboard.jsx'
import MainUserDash from './User_Dashboard/Components/Main_User_Dash.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <FirebaseProvider>
           <App />
           <MainDashboard />
           <MainUserDashboard/>
           <MainUserDash/>
        </FirebaseProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
