import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/themes/colors';
import { getFontSize } from '../../utils/getFontSize';
import { useCustomFonts } from '../../hooks/useCustomFonts';

const TimePicker = () => {
    const { fontsLoaded, onLayoutRootView } = useCustomFonts();
    const initialTime = new Date();
    initialTime.setHours(12, 0, 0, 0);
  
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [showMore, setShowMore] = useState<boolean>(false);
    const timeIncrement = 5; // 5 minutes increment
    const endTime = new Date(initialTime);
    endTime.setHours(14, 0, 0, 0); // 2:00 PM
  
    const generateTimes = () => {
      const times: Date[] = [];
      let currentTime = new Date(initialTime);
  
      while (currentTime <= endTime) {
        times.push(new Date(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + timeIncrement);
      }
  
      return times;
    };

    const formatTime = (time: Date) => {
        const hours = time
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        .replace(" ", "");
        return hours;
    };
      
    const handleTimeClick = (time: Date) => {
      setSelectedTime(time);
    };
  
    const renderTimeSlot = (time: Date) => {
      const isSelected = selectedTime && selectedTime.getTime() === time.getTime();
      
      return (
        <>
            <TouchableOpacity
                key={time.toString()}
                onPress={() => handleTimeClick(time)}
                style={styles.time}
            >
                <Text style={{ textAlign: "center", fontSize: getFontSize(0.02), fontFamily: "pro-bold", color: isSelected ? colors.white : colors.black }}>{formatTime(time)}</Text>
            </TouchableOpacity>
        </>
      );
    };
  
    const allTimes = generateTimes();
    const visibleTimes = showMore ? allTimes : allTimes.slice(0, 8);

    if (!fontsLoaded) {
        return null
    }
  
    return (
      <View onLayout={onLayoutRootView} > 
        <View style={styles.container}>
            {visibleTimes.map((time) => renderTimeSlot(time))}
        </View>
        
        <View style={styles.line} />
        
        {!showMore && allTimes.length > 8 && (
          <>
            <TouchableOpacity onPress={() => setShowMore(true)} style={{padding: "3%"}}>
                <Text style={{ textAlign: "center", fontSize: getFontSize(0.023), textDecorationLine: "underline", fontFamily: "pro-bold", color: colors.black }}>MORE</Text>
            </TouchableOpacity>
          </>  
        )}
      </View>
    );
}

export default TimePicker

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        marginVertical: "3%",
        rowGap: 10
    },
    line: {
        height: 1, 
        backgroundColor: colors.lineColor,
    },
    time: {
        padding: "3%",
        backgroundColor: colors.brown,
        borderRadius: 15
    }
})