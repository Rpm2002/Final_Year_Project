import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCIYW-MI7U_xQ7xHALhhuylHM2P3liRbUk",
  authDomain: "workers-management-syste-1891b.firebaseapp.com",
  projectId: "workers-management-syste-1891b",
  storageBucket: "workers-management-syste-1891b.appspot.com",
  messagingSenderId: "407724480142",
  appId: "1:407724480142:web:0e0c37c03a8346caff9bdf"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, [firebaseAuth]);

  const SignUpwithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  const LoginwithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  const LoginwithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  }

  const isLoggedIn = user !== null;

  return (
    <FirebaseContext.Provider
      value={{ SignUpwithEmailAndPassword, LoginwithEmailAndPassword, LoginwithGoogle, isLoggedIn, user }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
}
