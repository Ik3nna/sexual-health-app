import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCustomFonts } from '../hooks/useCustomFonts';
import { StatusBar } from 'expo-status-bar';
import Icon from '../components/icons';
import colors from '../assets/themes/colors';

const Home = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <StatusBar style='auto' />
      
      <TouchableOpacity style={{ paddingVertical: "6%" }}>
        <Icon type="ant" name="arrowleft" size={27} color={colors.black} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})