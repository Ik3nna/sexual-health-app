import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/themes/colors'

const Cards = ({ children, style, onPress }: { children: React.ReactNode, style?: any, onPress?: ()=>void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style, Platform.OS === "ios" ? styles.iosBox : styles.androidBox ]}>
      {children}
    </TouchableOpacity>
  )
}

export default Cards

const styles = StyleSheet.create({
  container: {
    padding: "4%",
    borderColor: colors.brown,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: colors.white,
    height: 150
  },
  androidBox: {
    elevation: 4, 
  },
  iosBox: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
})
