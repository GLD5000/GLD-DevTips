import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth } from './firebase';
//additional
import { getUserRole } from "./firestore"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function useFirebaseAuth() { // auth function
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
        clear();
        return;
    }
    
    setAuthUser({
        uid: user.uid,
        email: user.email,
        isOwner: await checkRole(user),
        name: user.displayName
    });
    setIsLoading(false);
  }; 

  const signOut = () => authSignOut(auth).then(clear);
console.group(`auth.currentUser`);
console.log(auth.currentUser?.displayName || null);
console.groupEnd();
  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    console.count("Firebase Auth state change");
    return () => unsubscribe();
  }, [auth.currentUser]);
  return {
    authUser,
    isLoading,
    signOut
  };
}


const AuthUserContext = createContext({ // context
  authUser: null,
  isLoading: true,
  signOut: async () => {}
});
export function AuthUserProvider({ children }) { // context provider
  const auth = useFirebaseAuth();
  console.log(auth.authUser);
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext); // custom hook

//additional

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

async function checkRole(user, setSignedIn, setIsOwner) {
  console.log("checkRole");
  const uid = user.uid;
  const role = await getUserRole(uid);
  console.log(`got role ${role}`);
  const isOwner = role === "owner";
  if (isOwner) {
    // console.log("Is owner = " + isOwner);
    // console.log("signing in...");
    // setSignedIn(true);

    // setIsOwner(true);
  } else {
    // console.log("signing in...");
    // setSignedIn(true);
    // setIsOwner(false);

    // console.log(
    //   "You are not authorised to submit tips to the database- sorry!"
    // );

    // setIsOwner(false);
  }
  return isOwner;
}