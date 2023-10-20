import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from '../icons'
import colors from '../../assets/themes/colors'
import TimePicker from '../time-picker'
import { useCustomFonts } from '../../hooks/useCustomFonts'
import { getFontSize } from '../../utils/getFontSize'
import { useGlobalContext } from '../../context/useGlobalContext'

const DatePicker = ({ item }: { item: string }) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [toggleArrowButton, setToggleArrowButton] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.date}>{item}</Text>
        <TouchableOpacity onPress={()=>setToggleArrowButton(prev=>!prev)}>
            <Icon type="mi" name={toggleArrowButton ? "arrow-drop-up" : "arrow-drop-down"} size={24} />
        </TouchableOpacity>
      </View>
      
      {toggleArrowButton &&
        <>
          <View style={styles.line} />

          <View>
            <TimePicker 
              item={item} 
              st={selectedTime}
              sst={setSelectedTime}
              onTimeChange={handleTimeChange}
            />
        </View> 
        </>     
      }
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(153, 60, 64, 0.60)",
    borderRadius: 10, 
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "3%"
  },
  date: {
    color: colors.black,
    fontFamily: "pro-bold",
    fontSize: getFontSize(0.022)
  },
  line: {
    height: 1, 
    backgroundColor: colors.lineColor
  }
})