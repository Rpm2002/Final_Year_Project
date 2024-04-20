import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/Context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Components/Button'
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsSendArrowUpFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";

function ExpertDetail() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const workerDocRef = doc(db, 'WorkerInfo', id);
        const snapshot = await getDoc(workerDocRef);
        if (snapshot.exists()) {
          setWorker({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.log('No such worker document!');
        }
      } catch (error) {
        console.error('Error fetching worker:', error);
      }
    };

    fetchWorker();
  }, [id]);

  return (
    <>
      <Header />
      <div className='container mx-auto mt-8'>
        {worker && (
          <div className='flex mt-2'>
            <div className='w-1/3 ml-2'>
              <img src={worker.imgUrl} alt={worker.firstName} className='ml-6 h-[450px] w-[410px]' />
            </div>

            <div className='w-1/3 flex-grow mr-4'>
              <h1 className='text-2xl font-semibold'>{`${worker.firstName} ${worker.lastName}`}</h1>
              <p className='text-gray-600'>{worker.profession}</p>
              <div className='mt-4'> 
                <p className='text-[#494949] font-medium'>About</p>
                <p className='text-[#6D6D6D]'>{worker.about}</p>
              </div>
              
              <div className='flex justify-between items-center mt-4'>
                <div> 
                  <p className='text-[#494949] font-medium'>Location</p>
                  <p className='text-[#6D6D6D]'>{worker.location}</p>
                </div>  
                
                <div> 
                  <p className='text-[#494949] font-medium'>Experience</p>
                  <p className='text-[#6D6D6D]'>{worker.experience}</p>
                </div> 

                <div> 
                  <p className='text-[#494949] font-medium'>Speciality</p>
                  <p className='text-[#6D6D6D]'>{worker.profession}</p>
                </div> 
              </div>
               
              <div className='mt-4'>
                <p className='text-[#494949] mb-2 font-medium'>Skills</p>
                {worker.skills.split(',').map((skill, index) => (
                <p key={index} className='text-[#494949] inline-block bg-[#FFE2D8] rounded-full py-1 px-2 mr-2'>{skill.trim()}</p>
                ))}
              </div> 
            </div>

            <div className='w-1/3 flex flex-col justify-center bg-white p-6 rounded-lg ml-4 mr-8'>
              <h2 className='text-xl text-center font-semibold mb-4'>Enquire {`${worker.firstName} ${worker.lastName}`}</h2>
              <form className='flex flex-col mt-2'>
                <div className="mb-4 border-[#B1B1B1] border-2 p-2 rounded-lg">
                  <div className='flex justify-between'>
                    <label htmlFor="dateRange" className="block text-sm font-medium text-[#6C6C6C]">
                      Date Range
                    </label>
                    <FaRegCalendarAlt className='mt-1 text-[#6C6C6C]'/>
                  </div>
                  <DatePicker
                    id="dateRange"
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setStartDate(start);
                      setEndDate(end);
                    }}
                    className="mt-1 block p-2 w-full border-gray-300  rounded-md "
                  />
                </div>
                <div className="mb-4 border-[#B1B1B1] border-2 p-2 rounded-lg">
                  <div className='flex'>
                    <BsSendArrowUpFill className='mr-2 mt-1 text-[#6C6C6C]'/>
                    <label htmlFor="address" className="block text-sm font-medium text-[#6C6C6C]">
                      Address
                    </label>
                  </div>
                  
                  <input
                    type="text"
                    id="address"
                    className="mt-1 block p-2 w-full border-gray-300  rounded-md "
                  />
                </div>
                <div className="mb-4 border-[#B1B1B1] border-2 p-2 rounded-lg">
                  <div className='flex'>
                    <BiDetail className='mr-2 mt-1 text-[#6C6C6C]'/>
                    <label htmlFor="workDescription" className="block text-sm font-medium text-[#6C6C6C]">
                      Work Description
                    </label>
                  </div>
                  
                  <textarea
                    id="workDescription"
                    className="mt-1 block w-full p-2 border-gray-300 rounded-md "
                  />
                </div>
                <div className='flex justify-end mt-2'>
                  <Button buttonColor='orange' buttonText='Enquire' textColor='white'/>
                </div>
              </form>
            </div>

          </div>
        )}
        
      </div>
    </>
  );
}

export default ExpertDetail;
