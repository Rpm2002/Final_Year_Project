import React from 'react'
import LoggedinUserImg from '../../Images/LoggedUser.svg'
import WorkerTable from './WorkerTab/WorkerTable'
function Workers() {
  console.log("Workers component rendered");
  return (
    <>
      {/* Header type */}
      <div className='flex justify-between mt-5 mb-4'>
        <div className='ml-6 p-4'>
          {/* <div className="ml-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 1a7 7 0 0 1 5.093 11.853l5.163 5.163a1 1 0 0 1-1.414 1.414l-5.163-5.163A7 7 0 1 1 8 1zm0 2a5 5 0 1 0 0 10A5 5 0 0 0 8 3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Worker..."
              className="pl-10 rounded-lg py-1 px-3 focus:outline-none border-none"
            />
          </div> */}
        </div>
        <div className='flex mr-6 p-4'>
          <div>
            <img src={LoggedinUserImg} alt="LoggedinUserImg" className="h-12"/>
          </div>
          <div className='ml-2 leading-tight'>
            <h3 className='font-semibold m-0 p-0'>Rhythm Mahale</h3>
            <h3 className='text-[#6C6C6C] font-semibold'>Admin</h3>
          </div>
        </div>
      </div>

      {/* Tabs  */}
      <div className='grid grid-cols-12 gap-2'>
        <div className='md:col-span-9'>
          <WorkerTable/>
        </div>
        <div className='md:col-span-3'>
          <div className='flex w-64 p-4 ml-4 border-2 mb-6 border-[#616161] rounded-xl'>
            <div className='flex justify-between mb-2'>
              <div>
                <p className='text-3xl font-semibold'>300</p>
                <p>Pending Enquiries</p>
              </div>
            </div>
            <div>
              <p className='bg-yellow-400 rounded-lg p-1 text-white'>Pending</p>
            </div>
          </div>

          <div className='flex w-64 p-4 ml-4 border-2 mb-6 border-[#616161] rounded-xl'>
            <div className='flex justify-between mb-2'>
              <div>
                <p className='text-3xl font-semibold'>1.17K</p>
                <p>Pending Enquiries</p>
              </div>
            </div>
            <div>
              <p className='bg-green-600 rounded-lg p-1 text-white'>Approved</p>
            </div>
          </div>

          <div className='flex w-64 p-4 ml-4 border-2  border-[#616161] rounded-xl'>
            <div className='flex justify-between mb-2'>
              <div>
                <p className='text-3xl font-semibold'>30</p>
                <p>Pending Enquiries</p>
              </div>
            </div>
            <div>
              <p className='bg-red-600 rounded-lg p-1 text-white'>Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Workers