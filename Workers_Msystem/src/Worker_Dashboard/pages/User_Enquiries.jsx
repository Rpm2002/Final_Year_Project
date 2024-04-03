import React from 'react'
import LoggedinUserImg from '../../Images/LoggedUser.svg'
import UserTable from '../Components/UserTable'
import { FaRegFolderOpen } from "react-icons/fa";
function UserEnquiries() {
  return (
    <>
      {/* Header type */}
      <div className='flex justify-between mt-5 mb-4'>
        <div className='ml-6 p-4'>
          <h1 className='font-semibold text-3xl'>Welcome Back, Aakash!</h1>
          <p className='text-[#6C6C6C]'>Here's what happening with your store Today</p>
        </div>
        <div className='flex mr-6 p-4'>
          <div>
            <img src={LoggedinUserImg} alt="LoggedinUserImg" className="h-12"/>
          </div>
          <div className='ml-2 leading-tight'>
            <h3 className='font-semibold m-0 p-0'>Prakash Sahu</h3>
            <h3 className='text-[#6C6C6C] font-semibold'>Admin</h3>
          </div>
        </div>
      </div>

      {/* Tabs  */}
      <div className='grid grid-cols-12 gap-2'>
        <div className='md:col-span-9'>
          <p className='ml-3 pl-3 font-semibold'>Recent User Enquiries</p>
          <UserTable/>
        </div>
        <div className='md:col-span-3'>
        <div className='flex flex-col w-64 p-4 ml-4 border-2 border-[#616161] rounded-xl'>
          <div className='flex justify-between mb-2'>
            <div>
              <p className='text-3xl font-semibold'>3</p>
              <p>Total Enquiries</p>
            </div>
            <div className='mt-2'>
              <FaRegFolderOpen className='text-[#616161] text-xl'/>
            </div>
          </div>
          <div>
            <p className='font-semibold'>+30%</p>
            <p>This Month</p>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default UserEnquiries