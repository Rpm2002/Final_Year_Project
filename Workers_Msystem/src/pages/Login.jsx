import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react';
import { useFirebase } from '../Firebase/Context'; // Import useFirebase only once
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import loginlogo from "../Images/LoginSignup.png";

const Login = () => {
  const firebase = useFirebase(); // Use useFirebase hook here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add password state variable
  const [role, setRole] = useState('admin');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (role === 'admin') {
        await firebase.LoginwithEmailAndPassword(email, password); // Use password variable for admin login
        navigate('/dashbord');
      } else {
        const userInfoSnapshot = await firebase.db.collection('UserInfo').where('email', '==', email).get();
        const workerInfoSnapshot = await firebase.db.collection('WorkerInfo').where('email', '==', email).get();

        if (!userInfoSnapshot.empty && role === 'user') {
          navigate('/userdashboard');
        } else if (!workerInfoSnapshot.empty && role === 'worker') {
          navigate('/workerdashboard');
        } else {
          setError('Invalid email or role');
        }
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <>  
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen grid grid-cols-5 items-center overflow-hidden no-scrollbar">
        <div className="mx-8 h-[45.5rem] w-[33.125rem] p-6 col-span-2 flex flex-col justify-center">
          <div>
            <h2 className="mt-6 text-center text-3xl  text-gray-900">Login to your account</h2>
          </div>
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 m-8" action="/login" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <label htmlFor="role" className="sr-only">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="worker">Worker</option>
              </select>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {role === 'admin' && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  value={password}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Login To Dashboard
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={firebase.LoginwithGoogle}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2  mt-3"
              >
                <span className="mr-2">
                  <FcGoogle className='h-5 w-5'/>
                </span>
                Login with Google
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-3">
          <img src={loginlogo} className="w-[57.875rem]  h-[45.5rem]"/>
        </div>
      </div>
    </> 
  );
};

export default Login;
