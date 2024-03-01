import React from 'react'
import HeroSectionImage from '../Images/HeroSection.png'; 

function Home() {
  return (
    <>
      <div>
        <header className='flex justify-between w-full h-16'>
          <div className='ml-4 mt-6'>#TheLabourForce</div>
          <div className='mt-6 mr-6 space-x-8'>
              <button >Login</button>
              <button className=''>SignUp</button>
          </div>
        </header>

        <div className='w-full h-40 flex'>
          <div className='flex-1 flex flex-col justify-center px-8'>
            <div>
              <h1>Where we all converge,</h1>
              <h1>We are Labours</h1>
              <p>Where we all converge, We are Labours</p>
            </div>

            <div className='flex'>
              <p>Hire Professionals</p>
              <button>How we work <span>&gt;</span></button>
            </div>
          </div>
          <div className='flex-1'>
            <img src={HeroSectionImage} alt=''/>
          </div>
        </div>

        <footer className='flex justify-center'>
          <h1>Coming Soon...</h1>
        </footer>
      </div>
    </>
  )
}

export default Home