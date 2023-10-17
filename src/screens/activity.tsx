import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import GoBack from '../components/go-back'
import { useCustomFonts } from '../hooks/useCustomFonts'
import colors from '../assets/themes/colors'
import { getFontSize } from '../utils/getFontSize'
import { NavigationProps } from '../types'
import CustomButton from '../components/custom-button'

const Activity = ({ navigation }: NavigationProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [index, setIndex] = useState<number>();

  const getFormattedDate = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = monthNames[today.getMonth()]; 
    const yy = String(today.getFullYear()).slice(-2);

    return `${dd}, ${mm} ${yy}`;
  };

  const handleSave = ()=> {
    if (index) {
      
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ marginHorizontal: "5%" }} onLayout={onLayoutRootView}>
      <StatusBar style='auto' />

      <GoBack />
      <Text style={styles.activity}>NEW SEXUAL ACTIVITY</Text>

      <View style={styles.line} />
      <View style={styles.flex}>
        <Text style={styles.sub_text1}>Date</Text>
        <Text style={styles.sub_text2}>{getFormattedDate()}</Text>
      </View>

      <View style={styles.line} />
      <View style={styles.flex}>
        <Text style={styles.sub_text1}>Activity</Text>
        <Text style={styles.sub_text2}>Sex</Text>
      </View>

      <View style={styles.line} />
      <View style={styles.flex}>
        <Text style={styles.sub_text1}>Contraception</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={()=>setIndex(1)}
            style={[Platform.OS === "ios" ? styles.iosBox : styles.androidBox,
            { backgroundColor: index === 1 ? colors.blue : "rgba(31, 29, 110, 0.50)", padding: "5%", borderRadius: 10 }]}
          >
            <Text style={{ fontFamily: index === 1 ? "pro-bold" : "pro-light", fontSize: getFontSize(0.025), color: colors.white }}>Used</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setIndex(2)}
            style={[Platform.OS === "ios" ? styles.iosBox : styles.androidBox,
            { backgroundColor: index === 2 ? colors.cancelColor :"#D28774", padding: "5%", borderRadius: 10 }]} 
          >
            <Text style={{ fontFamily: index === 2 ? "pro-bold" : "pro-light", fontSize: getFontSize(0.025), color: colors.white }}>Not used</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.nav_btns}>
        <CustomButton 
          title='CANCEL'
          bgStyle="cancel"
          onPress={()=>navigation.goBack()}
          style={{ width: "48%" }}
        />

        <CustomButton 
          title='SAVE'
          bgStyle="blue"
          onPress={()=>handleSave()}
          style={{ width: "48%" }}
        />
      </View>
    </SafeAreaView>
  )
}

export default Activity
const getWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  activity: {
    color: colors.black,
    fontFamily: "pro-black",
    fontSize: getFontSize(0.045),
    textAlign: "center",
    marginTop: "3%",
    marginBottom: "15%"
  },
  line: {
    height: 1, 
    backgroundColor: colors.lineColor, 
    width: getWidth, marginHorizontal: "-5%" 
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "10%"
  },
  sub_text1: {
    color: colors.black,
    fontFamily: "pro-light",
    fontSize: getFontSize(0.025)
  },
  sub_text2: {
    color: colors.filled,
    fontFamily: "pro-bold",
    fontSize: getFontSize(0.025)
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 15
  },
  androidBox: {
    elevation: 0, 
  },
  iosBox: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  nav_btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? "45%" : "30%"
  }
})