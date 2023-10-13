import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/themes/colors'
import { getFontSize } from '../../utils/getFontSize'
import { CustomButtonProps } from '../../types'

const CustomButton = ({ title, onPress, bgStyle, mt }: CustomButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, bgStyle, { marginTop: mt }]} onPress={onPress}>
        <View style={styles.btn_container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: "100%"
    },
    btn_container: {
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: colors.white,
        fontFamily: "pro-bold",
        fontSize: getFontSize(0.023)
    }
})