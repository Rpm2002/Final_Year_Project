import React,{ useState } from 'react'
import HeroSectionImage from '../Images/HeroSection.png'; 
import { FaHashtag } from "react-icons/fa6";
import hashtag from '../Images/hashtag.png'

function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-white flex justify-between items-center px-4 py-6">
        <p className="text-3xl ml-2 flex items-center">
          <span className='text-orange-600  font-extrabold'><FaHashtag /></span>
          <span className="ml-1 text-gray-600 text-lg lg:text-3xl italic font-medium">TheLabourForce</span>
        </p>
        <nav className='lg:mr-4 mr-1'>
          <ul className="flex lg:space-x-4 space-x-2 justify-center items-center">
            <li>
              <a href="/login" className="text-gray-600 font-semibold">Login</a>
            </li>
            <li>
              <a href="/signup" className="text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 px-5 py-2 inline-block transform -skew-x-6">SignUp</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className='flex-1 flex ml-4'>
        <div className='flex-1 flex flex-col justify-center px-8'>
          <div>
            <div className='lg:text-5xl text-2xl font-medium lg:mb-3 text-gray-600'>Where we all converge,<br/>We are Labours</div>
            <div className='mb-3 text-gray-600 font-semibold'>Where we all converge, We are Labours</div>
          </div>

          <div className='flex space-x-4 items-center'>
            <p className='text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 px-5 py-2 inline-block transform -skew-x-6'>Hire Professionals</p>
            <a href="#" className='text-gray-600 font-semibold'>How we work<span className='text-sm'> &gt;</span></a>
          </div>
        </div>
        <div className='flex-auto lg:flex-1 overflow-hidden flex justify-center'>
          <img src={HeroSectionImage} alt='' className='w-full lg:h-full h-40 object-cover' />
          <div className='bg-[url("/Images/hashtag.png")]'></div>
        </div>

      </div>

      <div className='flex justify-center items-center h-15 flex-shrink-0 lg:h-[11.2rem] bg-orange-600'>
        <h1 className='text-white font-semibold'>Coming Soon...</h1>
      </div>
    </div>
  );
}

export default Home;
