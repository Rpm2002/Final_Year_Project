import React from 'react'
import HeroSectionImage from '../Images/HeroSection.png'; 
import Header from '../Components/Header';
import Button from '../Components/Button';

function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header/>
      <div className='flex-1 flex ml-4'>
        <div className='flex-1 flex flex-col justify-center px-8'>
          <div>
            <div className='lg:text-5xl text-2xl font-medium lg:mb-3 text-gray-600'>Where we all converge,<br/>We are Labours</div>
            <div className='mb-3 text-gray-600 font-semibold'>Where we all converge, We are Labours</div>
          </div>

          <div className='flex space-x-4 items-center'>
            <Button buttonText="Hire Professionals" buttonColor="orange" textColor="white"/>
            <Button buttonText="How we work" buttonColor="white" textColor="black"/>
          </div>
        </div>
        <div className='flex-auto lg:flex-1 overflow-hidden flex items-center justify-center'>
          <img src={HeroSectionImage} alt='' className='w-full object-cover h-full' />
        </div>
      </div>
      <div className='flex justify-center items-center h-36 flex-shrink-0  bg-orange-600'>
        <h1 className='text-white font-semibold'>Coming Soon...</h1>
      </div>
    </div>
  );
}

export default Home;
