import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut as authSignOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth as firebaseAuth } from './firebase';
// additional
import { getUserRole } from './firestore';

async function checkRole(user) {
  const { uid } = user;
  const role = await getUserRole(uid);
  const isOwner = role === 'owner';
  return isOwner;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

function useFirebaseAuth() {
  // auth function
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.count('useFirebaseAuth');
  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const signOut = () => authSignOut(firebaseAuth).then(clear);
  const signIn = () => signInWithPopup(firebaseAuth, provider);
  const clickHandler = () => {
    // console.count('click handler');
    if (firebaseAuth.currentUser === null) {
      signIn();
      return;
    }
    signOut();
  };

  useEffect(() => {
    let isMounted = true;
    if (!isMounted)
      return () => {
        isMounted = false;
      };
    const authStateChanged = async (user) => {
      // console.count('auth changed state');
      setIsLoading(true);
      if (!user) {
        clear();
        return;
      }
      setAuthUser({
        uid: user.uid,
        email: user.email,
        isOwner: await checkRole(user),
        name: user.displayName,
        photoUrl: user.photoURL,
      });
      setIsLoading(false);
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, authStateChanged);
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);
  return {
    authUser,
    isLoading,
    clickHandler,
  };
}

const AuthUserContext = createContext({
  // context
  authUser: null,
  isLoading: true,
  clickHandler: async () => {},
});
export const useAuthContext = () => useContext(AuthUserContext); // custom hook

export default function AuthUserProvider({ children }) {
  // context provider
  // console.count('AuthUserProvider');

  const appAuth = useFirebaseAuth();

  // console.group(`appAuth`);

  // console.groupEnd();
  return <AuthUserContext.Provider value={appAuth}>{children}</AuthUserContext.Provider>;
}
