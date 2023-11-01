import { SafeAreaView, Button, StyleSheet, Text, TextInput, Platform, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/useGlobalContext'
import CalendarPicker from 'react-native-calendar-picker';
import { StatusBar } from 'expo-status-bar';
import * as Calenda from 'expo-calendar';
import { Source } from 'expo-calendar';
import Icon from '../components/icons';
import colors from '../assets/themes/colors';
import { getFontSize } from '../utils/getFontSize';

async function getDefaultCalendarSource() {
  const calendars = await Calenda.getCalendarsAsync(
    Calenda.EntityTypes.EVENT
  );
  const defaultCalendars = calendars.filter(
    (each) => each.source.name === 'Default'
  );
  return defaultCalendars.length
    ? defaultCalendars[0].source
    : calendars[0].source;
}

async function createCalendar() {
  const defaultCalendarSource =
  Platform.OS === 'ios'
    ? await getDefaultCalendarSource()
    : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calenda.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calenda.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calenda.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const Calendar = () => {
  const { appointmentDetails } = useGlobalContext();
  const [selectedStartDate, setSelectedStartDate] = useState<any | null>(null);

  const startDate = selectedStartDate ? selectedStartDate.format('YYYY-MM-DD').toString() : '';

  useEffect(() => {
    (async () => {
      const { status } = await Calenda.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calenda.getCalendarsAsync(Calenda.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />

      <Text style={styles.defaultText}>
        SET A REMINDER FOR YOUR CHECKUP
      </Text>


      <CalendarPicker 
        onDateChange={setSelectedStartDate}
        previousTitle={<Icon type="mi" name="arrow-left" size={30} color={colors.black} />}
        nextTitle={<Icon type="mi" name="arrow-right" size={30} color={colors.black} />}
        todayTextStyle={{ color: colors.white }}
        todayBackgroundColor={colors.blue}
        selectedDayStyle={{ opacity: 0.5, backgroundColor: colors.blue }}
        selectedDayTextStyle={{ color: colors.white }}
      />

      <Text style={styles.dateText}>{startDate}</Text>

      <View>
        
      </View>
    </SafeAreaView>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    fontFamily: "pro-black", 
    textAlign: "center", 
    color: colors.blue, 
    fontSize: getFontSize(0.03), 
    paddingVertical: "10%", 
    marginTop: "3%" 
  },
  dateText: {
    margin: 16,
  },
})