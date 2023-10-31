import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../../assets/themes/colors'
import { getFontSize } from '../../utils/getFontSize'

type BTSInputProps = {
    label: string
    value: string
    onChange: (value: string)=> void
}

const BTSInput = ({ label, value, onChange }: BTSInputProps) => {
  return (
    <View>
      <Text style={styles.text}>{label}</Text>

      <TextInput 
        style={styles.input}
        placeholder={label}
        placeholderTextColor="rgba(15, 12, 12, 0.50)"
        value={value}
        onChangeText={onChange}
      />
    </View>
  )
}

export default BTSInput

const styles = StyleSheet.create({
    text: {
        color: colors.black,
        fontFamily: "pro-bold",
        fontSize: getFontSize(0.021),
        marginBottom: "2%"
    },
    input: {
        backgroundColor: colors.formInputColor, 
        width: "100%",
        borderRadius: 5,
        paddingVertical: "4%",
        color: colors.black,
        fontFamily: "pro-bold",
        fontSize: getFontSize(0.024),
        paddingLeft: "4.5%"
    }
})