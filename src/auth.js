import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth as firebaseAuth } from './firebase';
//additional
import { getUserRole } from "./firestore"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
prompt: "select_account",
});


export default function useFirebaseAuth() { // auth function
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.count("useFirebaseAuth");
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

  const signOut = () => authSignOut(firebaseAuth).then(clear);
  const signIn = () => signInWithPopup(firebaseAuth, provider);
  const clickHandler = () => {
    console.count("click handler")
    if (firebaseAuth.currentUser === null) {
      signIn();
      return;
    } 
    signOut();
  };

  // console.group(`firebaseAuth.currentUser`);
  // console.log(firebaseAuth.currentUser?.displayName || null);
  // console.groupEnd();
  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, authStateChanged);
    console.count("Firebase Auth state change");
    return () => unsubscribe();
// eslint-disable-next-line
  }, [firebaseAuth.currentUser]);
  return {
    authUser,
    isLoading,
    clickHandler
  };
}


const AuthUserContext = createContext({ // context
  authUser: null,
  isLoading: true,
  clickHandler: async () => {}
});
export function AuthUserProvider({ children }) { // context provider
  console.count("AuthUserProvider");

  const appAuth = useFirebaseAuth();
  // console.log(appAuth.authUser);
  console.group(`appAuth`);
  console.log(appAuth);
  console.groupEnd();
  return <AuthUserContext.Provider value={appAuth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext); // custom hook

//additional

// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
//   prompt: "select_account",
// });

// async function authClickHandler(appAuth) {

//   if (appAuth !== null) {
//     await appAuth.signOut();
//   } else if (appAuth === null) {
//     await signInWithPopup(firebaseAuth, provider);
//   }
// }


async function checkRole(user) {
  console.count("checkRole");
  const uid = user.uid;
  const role = await getUserRole(uid);
  console.log(`got role ${role}`);
  const isOwner = role === "owner";
  return isOwner;
}