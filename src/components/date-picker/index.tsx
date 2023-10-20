import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from '../icons'
import colors from '../../assets/themes/colors'
import TimePicker from '../time-picker'

const DatePicker = ({ item, index, showMore }: { item: string, index: number, showMore: ()=>void }) => {
  const [toggleArrowButton, setToggleArrowButton] = useState(false);
  
  console.log(item)

  return (
    <View>
      <View>
        <Text>{item}</Text>
        <TouchableOpacity onPress={()=>setToggleArrowButton(prev=>!prev)}>
            <Icon type="mi" name={toggleArrowButton ? "arrow-drop-up" : "arrow-drop-down"} />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      
      {toggleArrowButton && 
        <View>
            <TimePicker />
        </View>      
      }
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
    line: {
        height: 1, 
        backgroundColor: colors.lineColor
    }
})