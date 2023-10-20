import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const TimePicker = () => {
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
  
      while (currentTime < endTime) {
        times.push(new Date(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + timeIncrement);
      }
  
      return times;
    };
  
    const handleTimeClick = (time: Date) => {
      setSelectedTime(time);
    };
  
    const renderTimeSlot = (time: Date) => {
      return (
        <TouchableOpacity
          key={time.toString()}
          onPress={() => handleTimeClick(time)}
        >
          <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
      );
    };
  
    const allTimes = generateTimes();
    const visibleTimes = showMore ? allTimes : allTimes.slice(0, 8);
  
    return (
      <View>
        {visibleTimes.map((time) => renderTimeSlot(time))}
        {!showMore && allTimes.length > 8 && (
          <TouchableOpacity onPress={() => setShowMore(true)}>
            <Text>Show More</Text>
          </TouchableOpacity>
        )}
        {selectedTime && (
          <Text>Selected Time: {selectedTime.toLocaleTimeString()}</Text>
        )}
      </View>
    );
}

export default TimePicker

const styles = StyleSheet.create({})