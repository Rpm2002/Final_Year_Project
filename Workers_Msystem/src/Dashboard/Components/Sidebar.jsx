import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineTeam } from 'react-icons/ai'; 
import { GrUserWorker } from "react-icons/gr";
import HomeLogo from '../../Images/Group.svg';

const Sidebar = () => {
    return (
        <div className="bg-[#fff6f2] border-r-[2px] h-screen w-64">
            <div className="text-gray-500 p-4 m-6">
                <img src={HomeLogo} alt="TheLabourForce" className="h-12 ml-8" />
            </div>
            <hr className="mx-6 border-t-[2px] border-gray-300" />
            <ul className="mt-8 items-center ml-4">
                <li>
                    <Link to="/dashboard/home" className="flex items-center text-gray-500 p-4 hover:bg-[#F04800] hover:rounded-lg hover:mr-2 hover:text-white">
                        <AiFillHome className="mr-2" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/workers" className="flex items-center text-gray-500 p-4 hover:bg-[#F04800] hover:rounded-lg hover:mr-2 hover:text-white">
                        <GrUserWorker className="mr-2" />
                        Workers
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/users" className="flex items-center text-gray-500 p-4 hover:bg-[#F04800] 
                  hover:rounded-lg hover:mr-2  hover:text-white">
                        <AiOutlineTeam className="mr-2" />
                        Users
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
