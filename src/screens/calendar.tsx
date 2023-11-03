import { SafeAreaView, Alert, StyleSheet, Text, Platform, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useGlobalContext } from '../context/useGlobalContext'
import CalendarPicker from 'react-native-calendar-picker';
import { StatusBar } from 'expo-status-bar';
import * as Calenda from 'expo-calendar';
import Icon from '../components/icons';
import colors from '../assets/themes/colors';
import { getFontSize } from '../utils/getFontSize';
import CustomButton from '../components/custom-button';
import { NavigationProps } from '../types';
import { HOME } from '../constants/routeName';
import moment from 'moment-timezone';
import { useFocusEffect } from '@react-navigation/native';

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
  return newCalendarID;
}

const Calendar = ({ navigation }: NavigationProps) => {
  const { appointmentDetails, setAppointmentDetails } = useGlobalContext();
  const [selectedStartDate, setSelectedStartDate] = useState<moment.Moment | null>(
    appointmentDetails && appointmentDetails.day
      ? moment(appointmentDetails.day, moment.ISO_8601)
      : null
  );

  const startDate = selectedStartDate ? selectedStartDate.format('YYYY-MM-DD').toString() : '';
  // Set the time
  const noonTime = moment.tz(startDate, 'YYYY-MM-DD', 'Africa/Lagos')
  .set({ 
    hour: appointmentDetails ? moment(appointmentDetails.time).get('hour') : 11, 
    minute: appointmentDetails ? moment(appointmentDetails.time).get('minute') : 0, 
    second: 0, 
    millisecond: 0 
  });
  // Format the noonTime to the desired format
  const formattedStartDate = moment(noonTime).subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss.sss[Z]");
  // Display the formatted start date in a user-friendly format
  const displayFormattedStartDate = noonTime.format("MMMM D, YYYY [at] h:mm A");

  const plusIcon = {
    type: "octicons", 
    name: "plus", 
    size: 25, 
    color: colors.white 
  }

  const getAppointementDate = (date: any) => moment.utc(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ").toDate();

  const addNewEvent = async () => {
    try {
      const calendarId = await createCalendar();
      
      const res = await Calenda.createEventAsync(calendarId, {
        endDate: getAppointementDate(formattedStartDate),
        startDate: getAppointementDate(formattedStartDate),
        title: "REMINDER",
      });

      if (res) {
        Alert.alert("YOUR REMINDER IS SET!",`${displayFormattedStartDate}`)
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  const saveNewEvent = async () => {
    try {
      const calendarId = await createCalendar();

      const res = await Calenda.createEventAsync(calendarId, {
        endDate: getAppointementDate(formattedStartDate),
        startDate: getAppointementDate(formattedStartDate),
        title: "REMINDER",
      });

      if (res) {
        Alert.alert("YOUR REMINDER IS SET!",`${displayFormattedStartDate}`);
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calenda.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        await Calenda.getCalendarsAsync(Calenda.EntityTypes.EVENT);
      }
    })();
  }, []);

  useEffect(() => {
    if (appointmentDetails && appointmentDetails.day) {
      // Parse the current date format
      const parsedDate = moment(appointmentDetails.day, 'dddd DD, MMMM YYYY');

      // Set the selectedStartDate as a moment.Moment object
      setSelectedStartDate(parsedDate);
    }
  }, [appointmentDetails]);

  useFocusEffect(
    useCallback(()=>{
      return ()=> {
        setAppointmentDetails({});
        setSelectedStartDate(null);
      }
    },[navigation])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />

      {!appointmentDetails.day ?
        <Text style={styles.defaultText}>
          SET A REMINDER FOR YOUR CHECKUP
        </Text> :
        <View>
          <Text style={styles.text}>
            REMIND ME TO...
          </Text>
          <View style={{ backgroundColor: colors.lineColor, height: 1, marginBottom: "7%" }} />
        </View>
      }

      <CalendarPicker 
        onDateChange={setSelectedStartDate}
        selectedStartDate={selectedStartDate ? selectedStartDate.toDate() : undefined}
        previousTitle={<Icon type="mi" name="arrow-left" size={30} color={colors.black} />}
        nextTitle={<Icon type="mi" name="arrow-right" size={30} color={colors.black} />}
        todayTextStyle={{ color: colors.white }}
        todayBackgroundColor={colors.blue}
        selectedDayStyle={{ opacity: 0.5, backgroundColor: colors.blue }}
        selectedDayTextStyle={{ color: colors.white }}
      />

      {!appointmentDetails.day ?
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: "4%" }}>
          <CustomButton 
            title='SKIP'
            textStyle={{ color: colors.empty }}
            style={{ borderWidth: 3, borderColor: colors.empty, width: "49%" }}
            onPress={()=>navigation.navigate(HOME)}
          />

          <CustomButton 
            title='ADD A REMINDER'
            icon={plusIcon}
            bgStyle='blue'
            style={{ width: "49%"}}
            onPress={()=>addNewEvent()}
          />
        </View> :
        <CustomButton 
          title='SAVE'
          bgStyle="blue"
          style={{ marginHorizontal: "4%"}}
          onPress={()=>saveNewEvent()}
        />
      }
    </SafeAreaView>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center"
  },
  defaultText: {
    fontFamily: "pro-black", 
    textAlign: "center", 
    color: colors.blue, 
    fontSize: getFontSize(0.03), 
    paddingVertical: "10%", 
    marginTop: "3%" 
  },
  text: {
    fontFamily: "pro-light", 
    color: colors.blue, 
    fontSize: getFontSize(0.03), 
    paddingVertical: "4%", 
    marginTop: "3%",
    paddingHorizontal: "4%" 
  },
  dateText: {
    margin: 16,
  },
})