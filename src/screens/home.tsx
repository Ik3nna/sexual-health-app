import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomFonts } from '../hooks/useCustomFonts';
import { StatusBar } from 'expo-status-bar';
import Icon from '../components/icons';
import colors from '../assets/themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '../types';
import { getFontSize } from '../utils/getFontSize';

// images


const Home = ({ navigation }: NavigationProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [userName, setUserName] = useState("");
  const cardDetails = [
    { header: "Sexual activity", subText: "Here you can track your protected or unprotected sexual activity" },

  ]

  useEffect(() => {
    AsyncStorage.getItem("name")
      .then((value: any) => {
        setUserName(value); 
      })
      .catch((error) => {
        console.error('Error fetching data from AsyncStorage:', error);
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar style='auto' />

      <ScrollView>
        <TouchableOpacity style={{ paddingVertical: Platform.OS === "ios" ? "6%" : "8%" }} onPress={()=>navigation.goBack()}>
          <Icon type="ant" name="arrowleft" size={27} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.name}>hello, {userName}</Text>

        <Text style={{ color: colors.filled, fontFamily: "pro-black", fontSize: getFontSize(0.03), paddingVertical: "5%" }}>Your featured activities</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%"
  },
  name: {
    textTransform: "uppercase",
    color: colors.nameColor,
    fontFamily: "pro-black",
    fontSize: getFontSize(0.055),
    marginVertical: "4%"
  }
})