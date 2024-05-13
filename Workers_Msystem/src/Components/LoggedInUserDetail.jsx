import React from 'react'
import LoggedinUserImg from '../Images/LoggedUser.svg'

function LoggedUser() {
  return (
    <>
      <div className='flex'>
        <div>
        <img src={LoggedinUserImg} alt="LoggedinUserImg" className="h-12"/>
        </div>
        <div className='ml-2 leading-tight'>
          <h3 className='font-semibold m-0 p-0'>Rhythm Mahale</h3>
          <h3 className='text-gray-600 font-semibold'>Admin</h3>
        </div>
        
      </div>
    </>
  )
}

export default LoggedUser