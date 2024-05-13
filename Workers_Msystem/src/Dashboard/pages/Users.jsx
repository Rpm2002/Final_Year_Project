import React from 'react'
import LoggedinUserImg from '../../Images/LoggedUser.svg'
import UserTable from './UserTable/UserTable';
import { AiOutlineTeam } from 'react-icons/ai';

function Users() {
  console.log("Users component rendered");
  return (
    <>
      {/* Header type */}
      <div className='flex justify-between mt-5 mb-4'>
        <div className='ml-6 p-4'>
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
          <UserTable/>
        </div>
        <div className='md:col-span-3'>
          <div className='flex justify-between items-center w-56 p-4 ml-4 border-2 mb-6 border-[#616161] rounded-xl'>
            <div>
              <div>
                <p className='text-3xl font-semibold'>300</p>
                <p>Pending Enquiries</p>
              </div>
            </div>
                <AiOutlineTeam className='text-4xl mb-3'/>
            <div>

            </div>
           
          </div>

        </div>
      </div>
    </>
  )
}

export default Users