import { createContext,useContext,useState,useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup,onAuthStateChanged } from "firebase/auth";

const FirebaseContext=createContext(null)

const firebaseConfig = {
  apiKey: "AIzaSyCIYW-MI7U_xQ7xHALhhuylHM2P3liRbUk",
  authDomain: "workers-management-syste-1891b.firebaseapp.com",
  projectId: "workers-management-syste-1891b",
  storageBucket: "workers-management-syste-1891b.appspot.com",
  messagingSenderId: "407724480142",
  appId: "1:407724480142:web:0e0c37c03a8346caff9bdf"
};

export const useFirebase=()=>useContext(FirebaseContext)

const firebaseaApp = initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseaApp)
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider=(props)=>{

  const [user,setUser]=useState({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth,(user)=>{
    if(user) setUser(user);
    else setUser(null);
   })
 
  }, [])
  

  const SignUpwithEmailAndPassword=(email,password)=>{
    createUserWithEmailAndPassword(firebaseAuth,email,password)
  }

  const LoginwithEmailAndPassword=(email,password)=>{
    signInWithEmailAndPassword(firebaseAuth,email,password)
  }

  const LoginwithGoogle=()=>signInWithPopup(firebaseAuth,googleProvider)

  const isLoggedIn=user? true:false;

  return(
  <FirebaseContext.Provider 
    value={{SignUpwithEmailAndPassword,LoginwithEmailAndPassword,LoginwithGoogle,isLoggedIn,user}}>
     {props.children} 
  </FirebaseContext.Provider>)
}
