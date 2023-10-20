import React, { useState, useEffect, useContext, useRef } from "react";

const AppContext = React.createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode})=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<Object>({})

  return(
    <AppContext.Provider value={{
      setIsLoggedIn, isLoggedIn, setAppointmentDetails, appointmentDetails
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}