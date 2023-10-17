import { Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomFonts } from '../hooks/useCustomFonts';
import { StatusBar } from 'expo-status-bar';
import Icon from '../components/icons';
import colors from '../assets/themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '../types';
import { getFontSize } from '../utils/getFontSize';
import Cards from '../components/cards';

// images
import sexualAct from "../assets/images/sexual-activity.png";
import checkup from "../assets/images/calendar-check-1.png";
import results from "../assets/images/Document.png";
import pills from "../assets/images/pill.png";

const Home = ({ navigation }: NavigationProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [userName, setUserName] = useState("");
  const cardDetails = [
    { img: sexualAct, header: "Sexual activity", subText: "Here, you can track your protected or unprotected sexual activity" },
    { img: checkup, header: "Check ups", subText: "Here, you can track medical appointments" },
    { img: results, header: "Test results", subText: "Here, you can track your test results" },
    { img: pills, header: "Pill reminder", subText: "Here, you can set a reminder to take your pills" }
  ]
  const getWidth = Dimensions.get("screen").width;

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{ paddingVertical: Platform.OS === "ios" ? "6%" : "8%" }} onPress={()=>navigation.goBack()}>
          <Icon type="ant" name="arrowleft" size={27} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.name}>hello, {userName}</Text>

        <Text style={{ color: colors.filled, fontFamily: "pro-black", fontSize: getFontSize(0.03), paddingVertical: "5%", marginBottom: "4%" }}>Your featured activities</Text>

        {cardDetails.map((item, index)=>
          <View key={index} style={styles.card_container}>
            <Cards>
              <View style={{ flexDirection: "row", alignItems: "center", columnGap: 25 }}>
                {index === 2 ? <Icon type="ionicons" name="document-text-sharp" size={46} color={colors.brown} /> : <Image style={{ width: "15%", objectFit: "cover" }} source={item.img} />}
                <Text style={styles.header}>{item.header}</Text>
              </View>

              <Text style={{ paddingVertical: "2%", fontSize: getFontSize(0.019), fontFamily: "pro-light" }}>{item.subText}</Text>
            </Cards>
          </View>
        )}
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
  },
  card_container: {
    marginBottom: "5%"
  },
  header: {
    fontFamily: "pro-bold",
    fontSize: getFontSize(0.023)
  }
})