import React, {useState,useEffect} from 'react';
import backgroundimg from '../Images/LoginSignup.png';
import { useFirebase } from '../Firebase/Context';
import {useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import {ref,uploadBytes, getDownloadURL} from "firebase/storage";
import { storage,db } from '../Firebase/Context';
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
function Join() {

  const firebase = useFirebase();
  const [error, setError] = useState('');
  const [img,setImg] = useState('')
  const navigate=useNavigate();
  const [workerData,setWorkerdata]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    profession:"",
    location:"",
    experience:"",
    skills:"",
    about:"",
    speciality:"",
    member: "worker" 
  })

  let name,value;
  const postWorkerData=(event)=>{
    name=event.target.name;
    value=event.target.value;

    setWorkerdata({...workerData,[name]:value})
  }

  // Upload above data to firebase database
  const submitData = async (event) => {
    event.preventDefault();
  
    try {
      // Add user data to Firestore
      const userData = {
        firstName: workerData.firstName,
        lastName: workerData.lastName,
        email: workerData.email,
        profession: workerData.profession,
        location: workerData.location,
        experience: workerData.experience,
        skills: workerData.skills,
        about: workerData.about,
        imgUrl: img,
        speciality:workerData.speciality,
        member: workerData.member
      };
  
      // Add user data to Firestore WorkerInfo collection
      const workerInfoRef = collection(db, "WorkerInfo");
      await addDoc(workerInfoRef, userData);
  
      // Reset form fields
      setWorkerdata({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profession: "",
        location: "",
        experience: "",
        skills: "",
        about: "",
        member: "worker"
      });
      setImg("");
  
      // Show success message
      toast.success("Account created successfully!");
  
      // Navigate to home page
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error creating account:", error.message);
      setError(error.message);
      toast.error("Error creating account: " + error.message);
    }
  };
  
   
  
  // image upload handle
  const handleUpload = (e) =>{
    console.log(e.target.files[0])
    const imgs = ref(storage,`WorkerImages/${v4()}`)
    uploadBytes(imgs,e.target.files[0]).then(data=>{
        console.log(data,"WorkerImages")
        getDownloadURL(data.ref).then(val=>{
          console.log(val);
            setImg(val)
        })
    })
}
  
// Image upload on click
    const handleClick = async () =>{
      const valRef = collection(db,'WorkerInfo')
      await addDoc(valRef,{imgUrl:img})
      toast.success('Image Uploaded successfully');
  }

  


  return (
  <>  
    <Toaster position="top-center" reverseOrder={false} />
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0 bg-cover bg-no-repeat opacity-50 bg-center" style={{ backgroundImage: `url(${backgroundimg})`, backgroundSize: 'cover' }}></div>
      
      {/* White div */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10  max-w-screen-md bg-white py-6 px-6 h-[508px] w-[1500px] flex justify-between">
      
        <form  className="w-full mt-1 space-y-6 m-8" action="#" method="POST">
          
          <div className='flex'>
            <div className='flex-1 mr-4'>

            <div className='mb-4'>
              <p className="text-center text-4xl text-gray-900">Join Us in our Journey</p>
              <h2 className="mt-2 text-center text-[#6D6D6D] ">Create an Expert Account</h2>
            </div>

            <div className='flex mb-4'>
                <div className='flex-1 mr-2'>
                  <label htmlFor="first-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={workerData.firstName}
                    onChange={postWorkerData}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>

                <div className='flex-1'>
                  <label htmlFor="last-name" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    value={workerData.lastName}
                    onChange={postWorkerData}
                    type="text"
                    autoComplete="family-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
            </div>

            <div className='mb-4'>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                value={workerData.email}
                onChange={postWorkerData}
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div className='mb-4'>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={workerData.password}
                onChange={postWorkerData}
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className='mb-4'>
              <label htmlFor="confirm_password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirmPassword"
                value={workerData.confirmPassword}
                onChange={postWorkerData}
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>

            <div>
              <label htmlFor="profession" className="sr-only">
                Profession
              </label>
              <input
                id="profession"
                name="profession"
                value={workerData.profession}
                onChange={postWorkerData}
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Profession"
              />
            </div>

            </div>

            <div className='flex-1 ml-4'>
              <div className=' h-36 mb-4 flex flex-col justify-center items-center w-full border rounded-lg border-black  '>
                <input
                  type="file"
                  // onChange={(event) => {setImageUpload(event.target.files[0]);}}
                  onChange={(e)=>handleUpload(e)} 
                />
                <br/>
                <button
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F04800] hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={handleClick}
                >
                  Upload Image
                </button>
              </div>

              <div className='flex mb-4'>
                  <div className='flex-1 mr-2'>
                    <label htmlFor="location" className="sr-only">
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      value={workerData.location}
                      onChange={postWorkerData}
                      type="text"
                      autoComplete="given-name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                      placeholder="Location"
                    />
                  </div>
    
                  <div className='flex-1'>
                    <label htmlFor="experience" className="sr-only">
                      Experience
                    </label>
                    <input
                      id="experience"
                      name="experience"
                      value={workerData.experience}
                      onChange={postWorkerData}
                      type="text"
                      autoComplete="family-name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                      placeholder="Experience"
                    />
                  </div>
              </div>

              <div className='mb-4'>
                  <label htmlFor="skills" className="sr-only">
                    Skills
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    value={workerData.skills}
                    onChange={postWorkerData}
                    type="text"
                    autoComplete="given-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Skills"
                  />
              </div>

              <div className='mb-4'>
                  <label htmlFor="" className="sr-only">
                    About Yourself
                  </label>
                  <input
                    id="about"
                    name="about"
                    value={workerData.about}
                    onChange={postWorkerData}
                    type='textarea'
                    autoComplete="given-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="About Yourself"
                  />
              </div>

              <div className='mb-4'>
                  <label htmlFor="" className="sr-only">
                    Speciality
                  </label>
                  <input
                    id="speciality"
                    name="speciality"
                    value={workerData.speciality}
                    onChange={postWorkerData}
                    type='textarea'
                    autoComplete="given-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Speciality"
                  />
              </div>

              <div className='flex justify-end'>
                <button
                  type='submit'
                  onClick={submitData}
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F04800] hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Join Now
                </button>
              </div>

            </div>
          </div>
          

        </form>
          
      </div>
    </div>
  </>  
  );

}

export default Join;
