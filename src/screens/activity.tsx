import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import GoBack from '../components/go-back'
import { useCustomFonts } from '../hooks/useCustomFonts'
import colors from '../assets/themes/colors'
import { getFontSize } from '../utils/getFontSize'
import { NavigationProps } from '../types'
import CustomButton from '../components/custom-button'
import { BottomSheet } from "react-native-btr";
import { useFocusEffect } from '@react-navigation/native'

const Activity = ({ navigation }: NavigationProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [index, setIndex] = useState<number>();
  const [visible, setVisible] = useState(false)
 
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

  function toggle() {
    setVisible((visible) => !visible);
  }


  const handleSave = ()=> {
    if (index) {
      setVisible(true);
    } else {
      Alert.alert("Error", "Please indicate whether you used contraception or not")
    }
  }

  useFocusEffect(
    useCallback(() => {
      return () => setIndex(0); 
    }, [navigation])
  );

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
            { backgroundColor: index === 2 ? colors.cancelColor : colors.btrColor, padding: "5%", borderRadius: 10 }]} 
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

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View style={styles.bottomSheet}>
          <Text style={{ fontFamily: "pro-bold", color: colors.black, fontSize: getFontSize(0.035), maxWidth: "100%", width: "80%", margin: "auto" }}>
            If you've had unprotected sex, it's important to get tested for sexually transmitted infections (STIs). 
            Schedule a sexual health check-up today to make sure you're healthy.
          </Text>

          <Text style={{  maxWidth: "100%", width: "80%", margin: "auto", fontFamily: "pro-black", color: colors.blue, fontSize: getFontSize(0.04), paddingVertical: "10%", }}>Would you like to book an appointment?</Text>

          <View style={styles.bottom_btns}>
            <CustomButton 
              title='LATER'
              bgStyle="cancel"
              onPress={()=>{toggle()}}
              style={{ width: "45%" }}
            />

            <CustomButton 
              title='OK'
              bgStyle="blue"
              onPress={()=>handleSave()}
              style={{ width: "45%" }}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default Activity
const getWidth = Dimensions.get("window").width;
const getHeight = Dimensions.get("screen").height;

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
  },
  bottomSheet: {
    backgroundColor: colors.btrColor, 
    height: getHeight - (0.25 * getHeight), 
    justifyContent: "center", 
    alignItems: "center",
    // paddingHorizontal: "5%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  bottom_btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 20,
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? "10%" : "5%"
  }
})