import React from 'react'
import Sidebar from './Sidebar'
import Navpage from './Navpage'
function MainUserDashboard() {
  return (
    <>
        <section>
            <div className='grid grid-cols-12'>
                <div className='cols-span-3 bg-[#fff6f2] h-screen pl-2 border-r-[2px] md:col-span-2'>
                    <Sidebar/>
                </div>
                <div className='cols-span-9 bg-[#fff6f2] h-screen md:col-span-10'>
                    <Navpage/>
                </div>
            </div>
        </section> 
        </>
  )
}

export default MainUserDashboard