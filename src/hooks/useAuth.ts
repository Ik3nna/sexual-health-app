import React, { useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

export function useAuth() {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();

  const onAuthStateChangedHandler = (user: FirebaseAuthTypes.User | null) => {
    setTimeout(() => {
      if (user) {
        setUser(user);
      } else {
        setUser(null)
      }
    }, 1000); 
  }

  useEffect(()=> {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChangedHandler);

    return unsubscribe
  }, [])

  return {
    user,
  };
}