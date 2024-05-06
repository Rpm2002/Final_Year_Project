import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import ExpertCard from '../Components/ExpertCard';
import { collection, getDocs, where, query,addDoc } from 'firebase/firestore';
import { db } from '../Firebase/Context';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function EnquiryList() {
  const [enquiredTeams, setEnquiredTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryDate: '',
    address: '',
    workDescription: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate mobile number
      if (name === 'phone') {
      // Check if the value is numeric
      if (!/^\d*$/.test(value)) {
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
          phoneError: 'Mobile number should contain only digits'
        }));
      } else if (value.length!==10) {
        // Check if the value exceeds 10 digits
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
          phoneError: 'Mobile number should not exceed 10 digits'
        }));
      } else {
        // Clear any previous error message
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
          phoneError: ''
        }));
      }
    } else {
      // For other fields, update the form data normally
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate mobile number
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error('Mobile number should be 10 digits');
        return;
      }

      const docRef = await addDoc(collection(db, 'EnquiryInfo'), formData);
      console.log('Document written with ID: ', docRef.id);
      setFormData({
        name: '',
        email: '',
        phone: '',
        enquiryDate: '',
        address: '',
        workDescription: ''
      });
      toast.success('Enquiry submitted successfully')
       // Redirect to the Thankyou page after 3 seconds
       setTimeout(() => {
        navigate('/thankyou');
      }, 3000);
      
    } catch (error) {
      toast.error('Form not submitted, see console for error')
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    const fetchEnquiredTeams = async () => {
      try {
        const q = query(collection(db, 'WorkerInfo'), where('enquiry', '==', true));
        const snapshot = await getDocs(q);
        const enquiredTeamsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEnquiredTeams(enquiredTeamsData);
      } catch (error) {
        console.error('Error fetching enquired teams:', error);
      }
    };

    fetchEnquiredTeams();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className='flex mt-2'>
        <div className='w-[70%] ml-2'>
          <h2 className=" text-2xl font-bold pl-10 ml-9  mb-4">Team Enquiry List</h2>
          <div className='flex flex-wrap justify-evenly overflow-x-hidden'>
            {enquiredTeams.map(team => (
              <ExpertCard
                key={team.id}
                firstName={team.firstName}
                lastName={team.lastName}
                profession={team.profession}
                imgUrl={team.imgUrl}
              />
            ))}
          </div>
        </div>


        <div className=' flex-grow w-[410px] h-[580px] mr-10 pt-6 bg-white rounded-xl'>
          <form className='pl-6 pr-6' onSubmit={handleSubmit}>
            <h2 className=" text-xl text-center font-semibold mb-4">Your Details</h2>
            <div className="mb-4">
              <input type="text" placeholder='Name' id="name" value={formData.name} onChange={handleChange} name="name" className="mt-1 p-2 w-full border-[#B1B1B1] outline-0 border-2 rounded-lg" />
            </div>

            <div className="mb-4">
              <input type="email" placeholder='Email' id="email" value={formData.email} onChange={handleChange} name="email" className="mt-1 p-2 w-full border-[#B1B1B1] border-2 outline-0 rounded-lg" />
            </div>

            <div className="mb-4">
              <input
                type="tel"
                id="phone"
                placeholder='PhoneNumber'
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                className="mt-1 p-2 w-full border-[#B1B1B1] border-2 outline-0 rounded-lg"
              />
              {formData.phoneError && <p className="text-red-500">{formData.phoneError}</p>}
            </div>

            <div className="mb-4">
              <input type="date" id="enquiryDate" placeholder='Date' value={formData.enquiryDate} onChange={handleChange} name="enquiryDate" className="mt-1 p-2 w-full border-[#B1B1B1] outline-0 border-2 rounded-lg" />
            </div>

            <div className="mb-4"> 
              <input type="text" id="address" placeholder='Address' value={formData.address} onChange={handleChange} name="address" className="mt-1 p-2 w-full border-[#B1B1B1] outline-0 border-2 rounded-lg" />
            </div>

            <div className="mb-4">
              <textarea id="workDescription" placeholder='Work Description' value={formData.workDescription} onChange={handleChange} name="workDescription" rows="3" className="mt-1 p-2 w-full outline-0 border-[#B1B1B1] border-2 rounded-lg"></textarea>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="text-white  hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium text-sm dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 px-5 py-2 inline-block rounded-lg"
                >
                Submit Enquiry 
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </>
  );
}

export default EnquiryList;
