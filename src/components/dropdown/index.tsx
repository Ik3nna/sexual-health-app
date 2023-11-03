import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from '../icons';
import colors from '../../assets/themes/colors';
import { getFontSize } from '../../utils/getFontSize';
import { DropdownProps } from '../../types';

const Dropdown = ({ label, content }: DropdownProps) => {
  const [selected, setSelected] = useState(false)

  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <SelectDropdown
        data={content}
        defaultButtonText={label}
        buttonStyle={[styles.dropdown, Platform.OS === "ios" ? styles.iosBox : styles.androidBox ]}
        buttonTextStyle={{ textAlign: "left", color: selected ? colors.black : "rgba(15, 12, 12, 0.50)", fontFamily: selected ? "pro-bold" : "pro-light", fontSize: getFontSize(0.02) }}
        dropdownStyle={styles.dropdownStyle}
        rowTextStyle={{ color: colors.white, fontFamily: "pro-bold", fontSize: getFontSize(0.019) }}
        renderDropdownIcon={()=> <Icon type="mi" name="arrow-drop-down" size={24} color={colors.black} />}
        onSelect={(selectedItem, index) => {
            setSelected(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
        }}
        rowTextForSelection={(item, index) => {
            return item
        }}
      />
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
    text: {
        color: colors.black,
        fontFamily: "pro-bold",
        fontSize: getFontSize(0.021),
        marginBottom: "2%"
    },
    dropdown: {
        backgroundColor: colors.formInputColor, 
        width: "100%",
        borderRadius: 5,
    },
    dropdownStyle: {
        backgroundColor: colors.brown
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
})