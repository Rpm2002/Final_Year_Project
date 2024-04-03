import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeLogo from '../../Images/Group.svg'
import { SidebarData } from './SidebarData';
 
const Sidebar = () => {

    return (
        <>
            <section className='divide-x-2'>
                <div className="text-gray-500 p-4 m-2 flex items-center justify-center">
                    <img src={HomeLogo} alt="TheLabourForce" className="h-12 m-5" />
                </div>
                <hr className="mx-6 border-t-[2px] border-gray-400 mb-3"/>
                <div className='text-gray-500'>
                    {
                        SidebarData.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <NavLink to={item.path} className='flex justify-start pl-5 mt-2 items-center text-gray-600 p-4 hover:bg-[#F04800] hover:rounded-lg hover:mr-4 hover:ml-4 hover:text-white space-x-2'>
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                    </NavLink>   
                                </div>   
                            )
                        })
                    }
                </div>
            </section>
        </>
    );
};

export default Sidebar;
