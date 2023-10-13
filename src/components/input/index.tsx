import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import React from 'react'
import colors from '../../assets/themes/colors'
import { getFontSize } from '../../utils/getFontSize'
import { InputProps } from '../../types'
import { useCustomFonts } from '../../hooks/useCustomFonts'

const Input = ({ onChange, onBlur, label, value, placeholder, style, error, ...props }: InputProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }
 
  return (
    <View onLayout={onLayoutRootView}>
      <Text style={styles.text}>{label}</Text>
      <TextInput 
        style={[styles.input, style, { borderColor: error ? colors.danger : colors.black }]}
        value={value}
        placeholder={placeholder} 
        onChangeText={onChange}
        onBlur={onBlur}
        {...props}
       />
       {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
    </View>
  )
}

export default Input

const getWidth = Dimensions.get("window").width;
const inputWidth = getWidth - (getWidth * 0.1);

const styles = StyleSheet.create({
    text: {
      fontFamily: "pro-light",
      paddingVertical: 7,
      fontSize: getFontSize(0.02)
    },
    input: {
      width: inputWidth,
      borderWidth: 1,
      borderRadius: 12,
      height: 56,
      paddingLeft: 10,
      fontSize: getFontSize(0.021)
    },
    error: {
      fontFamily: "pro-bold",
      paddingBottom: 5
    }
})