import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/themes/colors'
import { getFontSize } from '../../utils/getFontSize'
import { CustomButtonProps } from '../../types'
import { useCustomFonts } from '../../hooks/useCustomFonts'

const CustomButton = ({ title, onPress, bgStyle, loading, mt, style }: CustomButtonProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  const getBorderColor = () => {
    if (bgStyle === "skyblue" && !loading) {
      return colors.skyblue
    }
    if (bgStyle === "blue" && !loading) {
      return colors.blue
    }
    else if (loading) {
      return colors.grey
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={[styles.container, style, { marginTop: mt, backgroundColor: getBorderColor() }]} disabled={loading} onLayout={onLayoutRootView} onPress={onPress}>
      <View style={styles.btn_container}>
        {loading && <ActivityIndicator color={colors.white} style={{ paddingRight: 7 }} />}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
      borderRadius: 20,
    },
    btn_container: {
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: colors.white,
      fontFamily: "pro-bold",
      fontSize: getFontSize(0.023)
    }
})