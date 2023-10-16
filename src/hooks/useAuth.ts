import React, { useEffect, useState } from "react";
import { Firebase_Auth } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useGlobalContext } from "../context/useGlobalContext";

export function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);
  const auth = Firebase_Auth;
  const { isLoggedIn } = useGlobalContext();

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (isLoggedIn) {
          setUser(user);
          console.log(isLoggedIn);
        } else {
          setUser(null)
        }
      } 
      else {
        setUser(null)
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])

  return {
    user
  };
}