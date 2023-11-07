import { SafeAreaView, StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react';
import { BottomSheet } from 'react-native-btr';
import colors from '../assets/themes/colors';
import { NavigationProps } from '../types';
import { useFocusEffect } from '@react-navigation/native';
import { HOME } from '../constants/routeName';
import Icon from '../components/icons';
import { useCustomFonts } from '../hooks/useCustomFonts';
import { getFontSize } from '../utils/getFontSize';
import { Firebase_Auth } from '../config/firebase';
import { signOut } from 'firebase/auth'
import { useGlobalContext } from '../context/useGlobalContext';

const { height } = Dimensions.get("window");

const People = ({ navigation}: NavigationProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const { setIsLoggedIn } = useGlobalContext();
  const auth = Firebase_Auth

  const toggleBts = ()=> {
    setShowBottomSheet(!showBottomSheet)
    navigation.navigate(HOME);
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  useFocusEffect(
    useCallback(()=>{
      setShowBottomSheet(true);
    },[navigation])
  )

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomSheet
      visible={showBottomSheet}
      onBackButtonPress={()=>toggleBts()}
      onBackdropPress={()=>toggleBts()}
    >
      <TouchableOpacity style={styles.bottomSheet} onPress={()=>handleSignOut()}>
        <Icon type="octicons" name="people" size={25} color={colors.black} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </BottomSheet>

  )
}

export default People

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: colors.btrColor, 
    height: height - (0.8 * height), 
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 20,
    alignItems: "center"
  },
  text: {
    color: colors.black,
    fontFamily: "pro-black",
    textTransform: "uppercase",
    fontSize: getFontSize(0.03)
  }
})