import React, { useState, useEffect, useContext, useRef } from "react";

const AppContext = React.createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode})=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <AppContext.Provider value={{
      setIsLoggedIn, isLoggedIn
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}