import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect } from '@react-navigation/native'
import { LOGIN } from '../constants/routeName';
import { getFontSize } from '../utils/getFontSize'
import { useCustomFonts } from '../hooks/useCustomFonts';
import { NavigationProps } from '../types';

// images
import splashBg from "../assets/images/splash-bg.png";
import colors from '../assets/themes/colors';

const Splash = ({ navigation}: NavigationProps) => {
 
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate(LOGIN)
    }, 2000);
  },[])

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate(LOGIN);
      }, 2000);

      return () => clearTimeout(timer); 
    }, [navigation])
  );

  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <StatusBar style='auto' />
      <Image source={splashBg} />
      <View style={styles.text_container}>
        <Text style={{ color: colors.white, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>WELCOME TO</Text>
        <Text style={{ color: colors.brown, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>GO CHECK UP</Text>
        <Text style={{ color: colors.blue, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>YOURSELF</Text>
      </View>
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  text_container: {
    position: "absolute",
    top: "35%",
    paddingLeft: "7%",
  }, 
})