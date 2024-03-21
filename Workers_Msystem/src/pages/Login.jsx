import { FcGoogle } from "react-icons/fc";
import React ,{useState,useEffect} from 'react';
import { useFirebase } from '../Firebase/Context';
import toast, { Toaster } from "react-hot-toast";
import {useNavigate,useLocation} from 'react-router-dom'
import loginlogo from "../Images/LoginSignup.png"

const Login = () => {
  const firebase=useFirebase()
  const [email,setEmail]=useState('')
  const [pwd,setPwd]=useState('')
  const [error, setError] = useState(null); // State variable to store error
  console.log(firebase);

  const navigate=useNavigate()

  const location = useLocation();
  useEffect(() => {
    if (firebase.isLoggedIn && location.pathname !== '/') {
      const form = document.querySelector('form');
      form.addEventListener('submit', (e) => 
      e.preventDefault());
      navigate('/');
    }
  }, [firebase, navigate, location.pathname]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Login a User');
  //   const result=await firebase.LoginwithEmailAndPassword(email, pwd);
  //   console.log('Login successful',result);
  //   toast.success('Login success')
  //   setTimeout(() => {
  //     navigate('/')
  //   },2000);
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (firebase.isLoggedIn) {
  //     setError('You are already logged in.');
  //     return;
  //   }
  //   try {
  //     await firebase.LoginwithEmailAndPassword(email, pwd);
  //     toast.success('Login successful');
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 2000);
  //   } catch (error) {
  //     console.error('Login Error:', error.message);
  //     toast.error('Login failed. Please try again later.');
  //     if (error.code === 'auth/user-not-found') {
  //       setError('User not found. Please check your email or sign up for an account.');
  //     } else if (error.code === 'auth/wrong-password') {
  //       setError('Invalid password. Please try again.');
  //     } else {
  //       setError('Login failed. Please try again later.');
  //     }
  //   }
  // };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     // Check if the user exists before attempting to log in
  //     const userCredential = await firebase.LoginwithEmailAndPassword(email, pwd);
  
  //     if (!userCredential) {
  //       // User does not exist, display appropriate error message
  //       setError('User does not exist. Please check your email or sign up for an account.');
  //       return;
  //     }
  
  //     // User exists, log in successful
  //     toast.success('Login successful');
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 2000);
  //   } catch (error) {
  //     console.error('Login Error:', error.message);
  //     toast.error('Login failed. Please try again later.');
  
  //     if (error.code === 'auth/wrong-password') {
  //       setError('Invalid password. Please try again.');
  //     } else {
  //       setError('Login failed. Please try again later.');
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await firebase.LoginwithEmailAndPassword(email, pwd);
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (error) {
      setError(error.message)
      console.log(error.message);
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
        {error && ( // Display error message if error is not null
            <div className="text-red-500 text-center">{error}</div>
          )}
        <form onSubmit={handleSubmit}  className="mt-8 space-y-6 m-8" action="/login" method="POST">
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
              aria-invalid={error ? "true" : "false"}
              aria-describedby="email-error"
              className="appearance-none rounded-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            {/* {error && <p id="email-error" className="text-red-500">{error}</p>} */}
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
              aria-invalid={error ? "true" : "false"}
  aria-describedby="password-error"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            {/* {error && <p id="password-error" className="text-red-500">{error}</p>} */}
          </div>
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
