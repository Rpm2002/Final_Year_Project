import React ,{useState} from 'react';
import { useFirebase } from '../Firebase/Context';

const Signup = () => {
  const firebase=useFirebase()
  const [email,setEmail]=useState('')
  const [pwd,setPwd]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log('Signup a User');
    const result=await firebase.SignUpwithEmailAndPassword(email,pwd)
    console.log('SignUp Successful',result);
  }
  console.log(firebase);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md p-8 rounded-lg w-full space-y-8 border-2 border-neutral-300">
        <div>
          <h2 className="mt-6 text-center text-gray-600 ">Get 14 Day Free Trial</h2>
          <p className="text-center text-4xl text-gray-900">Create a new Account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email-address"  className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              onChange={(e)=>setEmail(e.target.value)}  
              name="email"
              type="email"
              autoComplete="email"
              value={email}
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
              onChange={(e)=>setPwd(e.target.value)}
              value={pwd}
              type="password"
              autoComplete="new-password"
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
              Create Account
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
