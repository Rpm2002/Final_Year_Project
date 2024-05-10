import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  console.log("FirebaseProvider initialized");
  
  // Add console.log to check firebaseApp and firebaseAuth
  console.log("firebaseApp:", firebaseApp);
  console.log("firebaseAuth:", firebaseAuth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
    // Cleanup subscription
    return () => unsubscribe();
  }, [firebaseAuth]);


  const SignUpwithEmailAndPassword = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      // Store user information in Firestore
      await storeUserInfo(result.user.uid, { email });
      return result;
    } catch (error) {
      throw error;
    }
  }

  const storeUserInfo = async (uid, userInfo) => {
    try {
      await setDoc(doc(db, 'UserInfo', uid), userInfo);
    } catch (error) {
      throw error;
    }
  }

  const LoginwithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  const LoginwithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  }

  const SignOut = () => {
    return signOut(firebaseAuth); // Call signOut function from Firebase auth
  }

  const isLoggedIn = user !== null;

  return (
    <FirebaseContext.Provider
      value={{ SignUpwithEmailAndPassword, LoginwithEmailAndPassword, LoginwithGoogle, isLoggedIn, user, SignOut,storeUserInfo }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
}
