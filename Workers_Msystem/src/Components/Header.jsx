// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../Images/Group.svg';
import LoggedUser from './LoggedInUserDetail';
import { useFirebase } from '../Firebase/Context';

function Header({ isAdmin }) {
  console.log('isAdmin in Header:', isAdmin); // Add console log to check isAdmin prop
  const firebase = useFirebase();

  const handleSignOut = () => {
    firebase.SignOut();
  };

  return (
    <div>
      <header className="flex w-full justify-between items-center px-4 py-6">
        <div className="flex items-center">
          <nav className="text-3xl ml-2 flex items-center">
            <img src={HomeLogo} alt="TheLabourForce" className="h-12" />
          </nav>
        </div>

        <div className="flex items-center">
          <div className="ml-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a7 7 0 0 1 5.093 11.853l5.163 5.163a1 1 0 0 1-1.414 1.414l-5.163-5.163A7 7 0 1 1 8 1zm0 2a5 5 0 1 0 0 10A5 5 0 0 0 8 3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Try to search something..."
              className="pl-10 rounded-lg py-1 px-3 focus:outline-none border-none"
            />
          </div>
          <nav className="lg:mr-4 mr-1 px-4">
            <ul className="flex lg:space-x-7 justify-center items-center">
              <li>
                <Link to="/expertsearch" className="text-gray-600 font-semibold hover:text-gray-400">
                  Explore Experts
                </Link>
              </li>

              {/* Add conditional rendering based on isAdmin */}
              {isAdmin ? null : (
                <li>
                  <Link to="/enquiry" className="text-gray-600 font-semibold hover:text-gray-400">
                    Enquiry List
                  </Link>
                </li>
              )}
              
              {firebase.isLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 px-5 py-2 inline-block rounded-lg"
                    >
                      Sign Out
                    </button>
                  </li>
                  
                  <li>
                    <LoggedUser />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-gray-600 font-semibold hover:text-gray-400">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 px-5 py-2 inline-block rounded-lg">
                      SignUp
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
