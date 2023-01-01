import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth } from './firebase';
//additional
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
        email: user.email
    });
    setIsLoading(false);
  }; 

  const signOut = () => authSignOut(auth).then(clear);

  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

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
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext); // custom hook

//additional

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
