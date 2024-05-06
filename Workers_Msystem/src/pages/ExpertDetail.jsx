import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc,updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Context';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';

function ExpertDetail() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);

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

  const handleAddToEnquiryList = async () => {
    try {
      if (worker) {
        // Update the WorkerInfo document with the enquiry information
        const workerDocRef = doc(db, 'WorkerInfo', id);
        await updateDoc(workerDocRef, {
          enquiry: true,
        });
        console.log('Enquiry added for worker:', id);
        toast.success('Team added');
      }
    } catch (error) {
      toast.error('Team not Added, see console for error');
      console.error('Error adding enquiry:', error);
    }
  };

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className='container mx-auto mt-8'>
        {worker && (
          <div className='flex mt-2'>
            <div className='w-3/5 ml-2'>
              <img src={worker.imgUrl} alt={worker.firstName} className='ml-6 h-[550px] w-[850px]' />
            </div>

            <div className='w-2/5 flex-grow mr-4'>
              <h1 className='text-2xl font-semibold'>{`${worker.firstName} ${worker.lastName}`}</h1>
              <p className='text-gray-600'>{worker.profession}</p>
              <div className='mt-4'> 
                <p className='text-[#494949] font-medium'>About</p>
                <p className='text-[#6D6D6D]'>{worker.about}</p>
              </div>
              
              <div className='flex justify-start items-center mt-4'>
                <div className='mr-8'> 
                  <p className='text-[#494949] font-medium'>Location</p>
                  <p className='text-[#6D6D6D]'>{worker.location}</p>
                </div>  
                
                <div className='mr-8'> 
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

              <div className='mt-6'> 
                <button
                  onClick={handleAddToEnquiryList}
                  className="text-white w-2/3 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 px-5 py-2 inline-block rounded-lg"
                >
                  Add To Team Enquiry List 
                </button>
              </div>  

            </div>

          </div>
        )}
        
      </div>
    </>
  );
}

export default ExpertDetail;
