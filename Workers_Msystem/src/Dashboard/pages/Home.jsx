import React from 'react'
import LoggedinUserImg from '../../Images/LoggedUser.svg'
import { AiOutlineTeam } from 'react-icons/ai';
import { GrUserWorker } from 'react-icons/gr';
import { FaRegFolderOpen } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { IoFlagSharp } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import HomeTable from './HomeTable/HomeTable'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate=useNavigate()
  const handleSeeAllClick = () => {
    navigate('/dashboard/workers');
  };
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

{/* Box */}
      <div className='flex flex-row justify-evenly mt-2 mb-4'>
        <div className='flex flex-col w-64 p-4 ml-4 border-2 border-[#616161] rounded-xl'>
          <div className='flex justify-between mb-2'>
            <div>
              <p className='text-3xl font-semibold'>1.4K</p>
              <p>Registered Workers</p>
            </div>
            <div className='mt-2'>
              <GrUserWorker className='text-[#616161] text-xl'/>
            </div>
          </div>
          <div>
            <p className='font-semibold'>+30%</p>
            <p>This Month</p>
          </div>
        </div>

        <div className='flex flex-col w-64 p-4 ml-4 border-2 border-[#616161] rounded-xl'>
          <div className='flex justify-between mb-2'>
            <div>
              <p className='text-3xl font-semibold'>3.2K</p>
              <p>Registered Workers</p>
            </div>
            <div className='mt-1'>
              <AiOutlineTeam className='text-[#616161] text-2xl'/>
            </div>
          </div>
          <div>
            <p className='font-semibold'>+27%</p>
            <p>This Month</p>
          </div>
        </div>

        <div className='flex flex-col w-64 p-4 ml-4 border-2 border-[#616161] rounded-xl'>
          <div className='flex justify-between mb-2'>
            <div>
              <p className='text-3xl font-semibold'>300</p>
              <p>Total Enquiries</p>
            </div>
            <div className='mt-1'>
              <FaRegFolderOpen className='text-[#616161] text-2xl'/>
            </div>
          </div>
          <div>
            <p className='font-semibold'>+20%</p>
            <p>This Month</p>
          </div>
        </div>

        <div className='flex flex-col w-64 p-4 ml-4 border-2 border-[#616161] rounded-xl'>
          <div className='flex justify-between mb-2'>
            <div>
              <p className='text-3xl font-semibold'>1.2K</p>
              <p>Page Views</p>
            </div>
            <div className='mt-1'>
              <BsBoxArrowUpRight className='text-[#616161] text-xl'/>
            </div>
          </div>
          <div>
            <p className='font-semibold'>+16%</p>
            <p>This Month</p>
          </div>
        </div>
        
      </div>

      {/* Table aur side Activities */}

      <div className='grid grid-cols-12 gap-2'>
        <div className='md:col-span-9'>
          <div className='flex justify-between m-2 items-center'>
            <p className='text-xl font-semibold ml-9 mb-2'>Recent Worker Enquiries</p>
            <div className='flex justify-between items-center'>
              <span>See ALL</span><MdArrowOutward onClick={handleSeeAllClick} className='ml-2 hover:text-blue-600'/>
            </div>
          </div>
          <HomeTable/>
        </div>

        <div className='md:col-span-3 mr-1'>
          <p className='text-2xl font-semibold mb-2'>Activities</p>
          <div className='flex flex-col mb-3'>
            <div className='flex justify-center items-center'>
              <div className='mb-2'>
                <img src={LoggedinUserImg} alt="LoggedinUserImg" className='h-20 w-20 pb-2'/>
              </div>
              <div className='flex flex-col ml-2'>
                <div className='flex text-green-600 mb-1'>
                  <IoFlagSharp className='mt-1'/>
                  <span className='font-semibold text-sm'>Most Booked Order</span>
                </div>
                <div>
                  <p className='font-semibold'>Akash Verma had created an Worker Account, carpenter as profession</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col mb-3'>
          <div className='flex justify-center items-center'>
              <div className='mb-2'>
                <img src={LoggedinUserImg} alt="LoggedinUserImg" className='h-20 w-20 pb-2'/>
              </div>
              <div className='flex flex-col ml-2'>
                <div className='flex text-green-600 mb-1 mt-3'>
                  <IoFlagSharp className='mt-1'/>
                  <span className='font-semibold text-sm'>Most Booked Order</span>
                </div>
                <div>
                  <p className='font-semibold'>Akash Verma had created an Worker Account, carpenter as profession</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-center items-center'>
              <div className='mb-2'>
                <img src={LoggedinUserImg} alt="LoggedinUserImg" className='h-20 w-20 pb-2'/>
              </div>
              <div className='flex flex-col ml-2'>
                <div className='flex text-green-600 mb-1 mt-3'>
                  <IoFlagSharp className='mt-1'/>
                  <span className='font-semibold text-sm'>Most Booked Order</span>
                </div>
                <div>
                  <p className='font-semibold'>Akash Verma had created an Worker Account, carpenter as profession</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home