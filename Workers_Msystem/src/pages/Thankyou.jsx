import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import ThankTop from '../Images/Thank_Top.svg';
import ThankBottom from '../Images/Thank_Bottom.svg';
import HomeLogo from '../Images/Group.svg';

function Thankyou() {
  const navigate = useNavigate(); // Initialize navigate

  const handleExploreMoreTeams = () => {
    // Navigate to ExpertSearch page
    navigate('/expertsearch');
  };

  const handleCreateAnotherEnquiry = () => {
    // Navigate to Enquiry page
    navigate('/enquiry');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="absolute top-0 right-0 w-[445.53px] h-[429.1px] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${ThankTop})` }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-[445.43px] h-[429.1px] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${ThankBottom})` }}
      ></div>

      {/* Content */}
      <div className='flex flex-col items-center'>
        <div className='mt-3 mb-8'>
          <img src={HomeLogo} alt="TheLabourForce" className="w-[289.3px] h-[143.1px]" />
        </div>

        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-semibold mb-2'>Your Enquiry has been submitted</h2>
          <h3 className='text-xl font-semibold'>We will contact you in 1 to 2 Business Days</h3>
        </div>

        <div className="flex space-x-4">
          {/* Call handleExploreMoreTeams when Explore More Teams button is clicked */}
          <button onClick={handleExploreMoreTeams} className="text-[#494949] font-medium text-sm focus:outline-none px-5 py-2 inline-block rounded-lg">
            Explore More Teams
          </button>
          {/* Call handleCreateAnotherEnquiry when Create Another Enquiry button is clicked */}
          <button onClick={handleCreateAnotherEnquiry} className="text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 px-5 py-2 inline-block rounded-lg">
            Create Another Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
