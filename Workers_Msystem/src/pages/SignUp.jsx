import React, { useState } from 'react';
import { useFirebase } from '../Firebase/Context';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import loginlogo from '../Images/LoginSignup.png';

const Signup = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup a User');
    if (pwd !== confirmPwd) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      const result = await firebase.SignUpwithEmailAndPassword(email, pwd);
      console.log('SignUp Successful', result);
      // Store additional user information in the "UserInfo" collection
      await firebase.storeUserInfo(result.user.uid, { firstName, lastName, email });
      toast.success('Account Created');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error creating account:', error.message);
      setError(error.message);
      toast.error('Error creating account: ' + error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen grid grid-cols-5 items-center overflow-hidden no-scrollbar">
        <div className="mx-8 h-[45.5rem] w-[33.125rem] p-6 col-span-2 flex flex-col justify-center">
          <div className="max-w-md p-8 rounded-lg w-full space-y-8">
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="confirm_password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center">
              <p className="text-sm">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <img src={loginlogo} className="w-[57.875rem]  h-[45.5rem]" alt="login logo" />
        </div>
      </div>
    </>
  );
};

export default Signup;
