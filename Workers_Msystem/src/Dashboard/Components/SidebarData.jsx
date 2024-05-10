import { AiFillHome, AiOutlineTeam } from 'react-icons/ai';
import { GrUserWorker } from 'react-icons/gr';

export const SidebarData=[
  {
    title:'Home',
    path:'/dashboard',
    icon:<AiFillHome/>,
  },
  {
    title:'Workers',
    path:'/dashboard/workers',
    icon:<GrUserWorker/>,
  },
  {
    title:'Users',
    path:'/dashboard/users',
    icon:<AiOutlineTeam/>,
  },
  {
    title:'Work Enquiries',
    path:'/dashboard/enquiries',
    icon:<AiOutlineTeam/>,
  },
]