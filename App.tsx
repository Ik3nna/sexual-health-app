import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from "./src/navigation";
import { AppProvider } from './src/context/useGlobalContext';

export default function App () {
  return (
    <AppProvider>
      <AppNavContainer />
    </AppProvider>
  );
}

