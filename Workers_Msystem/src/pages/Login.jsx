import { FcGoogle } from "react-icons/fc";
import React ,{useState} from 'react';
import { useFirebase } from '../Firebase/Context';

const Login = () => {
  const firebase=useFirebase()
  const [email,setEmail]=useState('')
  const [pwd,setPwd]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log('Login a User');
    const result=await firebase. LoginwithEmailAndPassword(email,pwd)
    console.log('Login Successful',result);
  }
  console.log(firebase);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md p-8 rounded-lg w-full space-y-8 border-2 border-neutral-300">
        <div>
          <h2 className="mt-6 text-center text-3xl  text-gray-900">Login to your account</h2>
        </div>
        <form onSubmit={handleSubmit}  className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
             
            <input
              id="email-address"
              name="email"
              type="email"
              onChange={(e)=>setEmail(e.target.value)}  
              value={email}
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e)=>setPwd(e.target.value)}
              value={pwd}
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login To Dashboard
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={firebase.LoginwithGoogle}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3"
            >
              <span className="mr-2">
              <FcGoogle className='h-5 w-5'/>
              </span>
              Login with Google
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <a href="#" className="font-medium  text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
