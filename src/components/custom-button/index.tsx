import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/themes/colors'
import { getFontSize } from '../../utils/getFontSize'
import { CustomButtonProps } from '../../types'
import Icon from '../icons'

const CustomButton = ({ title, onPress, bgStyle, loading, disabled, mt, textStyle, style, icon }: CustomButtonProps) => {
  const getBorderColor = () => {
    if (loading) {
      return colors.grey
    } else {
      if (bgStyle === "skyblue") {
        return colors.skyblue
      }
      if (bgStyle === "blue") {
        return colors.blue
      }
      if (bgStyle === "cancel") {
        return colors.cancelColor
      }
    }
  }

  return (
    <TouchableOpacity style={[styles.container, style, { marginTop: mt, opacity: disabled && 0.5, backgroundColor: getBorderColor() }]} disabled={disabled ? disabled : loading} onPress={onPress}>
      <View style={[styles.btn_container, { justifyContent: icon ? "space-evenly" : "center"}]}>
        {loading && <ActivityIndicator color={colors.white} style={{ paddingRight: 7 }} />}
        {icon && <Icon type={icon.type} name={icon.name} size={icon.size} color={icon.color} />}
        <Text style={[styles.text, textStyle]}>{title}</Text>
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
      alignItems: "center",
    },
    text: {
      color: colors.white,
      fontFamily: "pro-bold",
      fontSize: getFontSize(0.023)
    }
})