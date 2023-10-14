import React, { useEffect, useState } from "react";
import { Firebase_Auth } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);
  const auth = Firebase_Auth;

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          setUser(null)
        } 
        else {
          setUser(user)
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
    user, 
  };
}