import React, { useEffect } from "react";
import { Firebase_Auth } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);

  const auth = Firebase_Auth;

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])

  return {
    user,
  };
}