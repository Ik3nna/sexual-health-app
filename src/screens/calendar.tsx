import { SafeAreaView, Alert, StyleSheet, Text, Platform, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/useGlobalContext'
import CalendarPicker from 'react-native-calendar-picker';
import { StatusBar } from 'expo-status-bar';
import * as Calenda from 'expo-calendar';
import { Source } from 'expo-calendar';
import Icon from '../components/icons';
import colors from '../assets/themes/colors';
import { getFontSize } from '../utils/getFontSize';
import CustomButton from '../components/custom-button';
import { NavigationProps } from '../types';
import { HOME } from '../constants/routeName';
import moment from 'moment';

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
  const { appointmentDetails } = useGlobalContext();
  const [selectedStartDate, setSelectedStartDate] = useState<any | null>(null);

  const startDate = selectedStartDate ? selectedStartDate.format('YYYY-MM-DD').toString() : '';
  // Set the time to noon (12:00 PM)
  const noonTime = moment(startDate).set({ hour: 11, minute: 0, second: 0, millisecond: 0 });
  // Format the noonTime to the desired format
  const formattedStartDate = noonTime.format("YYYY-MM-DDTHH:mm:ss.sss[Z]");

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
        Alert.alert("YOUR REMINDER IS SET!")
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
        previousTitle={<Icon type="mi" name="arrow-left" size={30} color={colors.black} />}
        nextTitle={<Icon type="mi" name="arrow-right" size={30} color={colors.black} />}
        todayTextStyle={{ color: colors.white }}
        todayBackgroundColor={colors.blue}
        selectedDayStyle={{ opacity: 0.5, backgroundColor: colors.blue }}
        selectedDayTextStyle={{ color: colors.white }}
      />

      <Text style={styles.dateText}>{startDate}</Text>

      {!appointmentDetails.day ?
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "4%" }}>
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
          style={{ marginHorizontal: "4%" }}
          onPress={()=>console.log("")}
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