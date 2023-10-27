import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ProgressBar from '../progress-bar'
import { AppointmentProps } from '../../types'
import { Image } from 'react-native'
import Cards from '../cards'
import { useCustomFonts } from '../../hooks/useCustomFonts'
import MapView, { Marker } from 'react-native-maps'
import { getFontSize } from '../../utils/getFontSize'
import Icon from '../icons'
import colors from '../../assets/themes/colors'
import CustomButton from '../custom-button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import DatePicker from '../date-picker'
import { BottomSheet } from 'react-native-btr'

// assets
import location from "../../assets/images/location-icon.png";
import map from "../../assets/images/map-icon.png";
import { useGlobalContext } from '../../context/useGlobalContext'
import Dropdown from '../dropdown'

const centres = [
    { 
        title: "New Heights Pharma", 
        subTitle: "Our business activities include wholesale, distribution, diagnostics of Pharmaceuticals in Maryland",
        address: "3, Olaide Benson Street, Lagos",
        latitude: 6.56762698706437, 
        longitude: 3.3672008470277364
    },
    { 
        title: "QDX Healthcare", 
        subTitle: "Health firm providing basic and specialized clinical, pathological and radio diagnostic services",
        address: "131, Obafemi Awolowo Way Ikeja, Lagos",
        latitude: 6.608297856738449, 
        longitude: 3.3496149675313878
    },
    { 
        title: "C. C. OBI Nigeria Limited", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos",
        address: "161, Herbert Marculey Way, Lagos",
        latitude: 6.492485653992443, 
        longitude: 3.381859469377602
    },
    { 
        title: "Radmed Diagnostics", 
        subTitle: "Our business activities include wholesale, distribution, diagnostics of Pharmaceuticals in Maryland",
        address: "3B, Ligali Ayorinde Street, Lagos",
        latitude: 6.4347002572901095, 
        longitude: 3.4400921540365954 
    },
    { 
        title: "Alpha Diagnostics Centre", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos",
        address: "24, Shekoni Street, Coker Village, Lagos",
        latitude: 6.474747816355028,  
        longitude: 3.332250367531077 
    },
    { 
        title: "Alma Clinic and Diagnostic Services", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos",
        address: "60A, Campbell Street, Lagos,",
        latitude: 5.675019590617009,   
        longitude: -0.02072495945933494 
    },
    { 
        title: "Union Diag. and Clinical Services", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos",
        address: "80, Agege Motor Road, Lagos, Lagos",
        latitude: 6.636880161671027,    
        longitude: 3.341299902226391 
    },
    { 
        title: "Barnes Diagnostic and Heart Centre", 
        subTitle: "Health in Victoria Island, Medicine in Victoria Island, Hospital in Victoria Island, Health Care in Victoria Island",
        address: "277b, Jose Adeogun Street Victoria Island, Lagos",
        latitude: 6.431066020069604,     
        longitude: 3.439155003467879 
    },
]
const tests = [
    { title: "STIs Basic labor test", price: "$15.99" },
    { title: "STIs Complete labor test", price: "$23.50" },
    { title: "HIV PoC Rapidtest", price: "$39.99" },
    { title: "HIV labor test", price: "$59.99" },
    { title: "Chlamyidien PoC Rapidtest", price: "$39.90" },
    { title: "Hepatitis B PoC Rapidtest", price: "$59.99" },
    { title: "Hepatitis B PoC Labor test", price: "$89.99" },
]
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Appointment = ({ currentStep, setAppointment, setVisible, setCurrentStep }: AppointmentProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [pressedCardIndex, setPressedCardIndex] = useState<number | null>(null)
  const getWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const { appointmentDetails } = useGlobalContext();
  const [viewBs, setViewBs] = useState(false);
  const [bsIndex, setBsIndex] = useState(0);

  const handleNextStep = (index: number)=> {
    setPressedCardIndex(index)
    setCurrentStep((prev: number)=>prev + 1)
  }

  const [appointmentDates, setAppointmentDates] = useState<any>([]);
  const numDatesToShow = 4;
  const [lastDate, setLastDate] = useState<any>(null);

  const calculateNextAppointments = (numDays: number, lastDate: any) => {
    const today = lastDate || new Date();
    const availableDates = [];

    while (availableDates.length < numDays) {
      today.setDate(today.getDate() + 1);

      // Skip Sundays
      if (today.getDay() === 0) {
        continue;
      }

      const dd = String(today.getDate()).padStart(2, '0');
      const mm = monthNames[today.getMonth()];
      const yy = String(today.getFullYear());
      const day = dayNames[today.getDay()];

      availableDates.push(`${day} ${dd}, ${mm} ${yy}`);
    }

    return { dates: availableDates, lastDate: today };
  };

  const showMoreAppointments = () => {
    const { dates, lastDate: newLastDate }= calculateNextAppointments(numDatesToShow, lastDate);
    setAppointmentDates([...appointmentDates, ...dates]);
    setLastDate(newLastDate)
  };

  useEffect(() => {
    const { dates, lastDate: newLastDate }= calculateNextAppointments(numDatesToShow, lastDate);
    setAppointmentDates(dates);
    setLastDate(newLastDate)
  }, []);

//   useFocusEffect(
//     useCallback(() => {
//       return () => {
//        setCurrentStep(1);
//       }
//     }, [navigation])
//   );
  
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} onLayout={onLayoutRootView}>
        <ProgressBar 
            onPress={()=>{
              if (currentStep === 1) {
                setAppointment(false)
                setVisible(false)
              } else {
                if (currentStep === 5) {
                    setViewBs(false);
                }
                setCurrentStep((prev: number) => prev - 1);
              }
            }}
            currentStep={currentStep}
            isLast={7}
            stepWidth={getWidth - (getWidth * 0.9)}
            colG={true}
        />

        {currentStep === 1 &&
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: "7%", marginHorizontal: "6%", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "pro-light", fontSize: getFontSize(0.023) }}>8 results</Text>
                    <TouchableOpacity onPress={()=>setToggleSwitch(prev => !prev)}>
                        <Image source={toggleSwitch ? map : location} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                </View>

                {!toggleSwitch ?
                    <View>
                        {centres.map((item, index)=>
                            <Cards onPress={()=>handleNextStep(index)} key={index} style={{ marginBottom: "6%", marginHorizontal: "6%" }}>
                                <Text style={{ fontFamily: "pro-black", fontSize: getFontSize(0.025)}}>{item.title}</Text>
                                <Text style={{ fontFamily: "pro-bold", fontSize: getFontSize(0.018), paddingVertical: "3.5%"}}>{item.subTitle}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5}}>
                                    <Icon type="ionicons" name="ios-location-outline" size={20} color={colors.black} />
                                    <Text>{item.address}</Text>
                                </View>
                            </Cards>
                        )}

                        <View style={{ marginBottom: "5%" }} />
                    </View> :
                   
                    <MapView
                        style={{ width: "100%", height: height }}
                        initialRegion={{
                            latitude: 6.56762698706437,
                            longitude: 3.3672008470277364,
                            longitudeDelta: LONGITUDE_DELTA,
                            latitudeDelta: LATITUDE_DELTA
                        }}
                    >
                        {centres.map((centre, index)=>
                            <Marker 
                                key={index}
                                coordinate={{
                                    latitude: centre.latitude,
                                    longitude: centre.longitude
                                }}
                                title={centre.title}
                                description={centre.subTitle}
                            />
                        )}
                    </MapView>
                }
            </View>
        }

        {currentStep === 2 && pressedCardIndex !== null &&
            <View style={{ marginHorizontal: "6%"  }}>
                <View style={{ rowGap: 10, marginVertical: "6%" }}>
                    <Text style={{ textAlign: "center", fontFamily: "pro-black", fontSize: getFontSize(0.027) }}>{centres[pressedCardIndex].title}</Text>
                    <Text style={{ textAlign: "center", fontFamily: "pro-bold", width: "90%", marginLeft: "auto", marginRight: "auto", fontSize: getFontSize(0.023) }}>{centres[pressedCardIndex].subTitle}</Text>
                </View>
                
                <View>
                    <Cards>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "4%" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}>
                                <Icon type="ionicons" name="ios-location-outline" size={20} color={colors.black} />
                                <Text style={{ fontFamily: "pro-bold", color: colors.black, fontSize: getFontSize(0.021) }}>Address</Text>
                            </View>
                            <Text style={{ fontFamily: "pro-black", color: "#B03A2A", fontSize: getFontSize(0.021), textDecorationLine: "underline", textDecorationColor: "#B03A2A" }}>MORE INFO</Text>
                        </View>

                        <Text style={{ fontFamily: "pro-light", color: colors.black, fontSize: getFontSize(0.021) }}>{centres[pressedCardIndex].title}</Text>
                        <Text style={{ fontFamily: "pro-light", color: colors.black, fontSize: getFontSize(0.021) }}>{centres[pressedCardIndex].address}</Text>
                    </Cards>

                    <Cards style={{ marginVertical: "6%" }}>
                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4%" }}>
                            <View style={{ flexDirection: "row", alignItems: "flex-start", columnGap: 5 }}>
                                <Icon type="ionicons" name="ios-people-outline" size={20} color={colors.black} />
                                <View>
                                    <Text style={{ fontFamily: "pro-bold", color: colors.black, fontSize: getFontSize(0.021) }}>Patient & more</Text>
                                    <Text style={{ fontFamily: "pro-bold", color: colors.black, fontSize: getFontSize(0.021) }}>Information</Text>
                                </View>
                            </View>
                            
                            <Text style={{ fontFamily: "pro-black", color: "#B03A2A", fontSize: getFontSize(0.021), textDecorationLine: "underline", textDecorationColor: "#B03A2A" }}>MORE INFO</Text>
                        </View>
                        
                        <Text style={{ fontFamily: "pro-light", color: colors.black, fontSize: getFontSize(0.021) }}>Dear Patient,</Text>
                        <Text style={{ fontFamily: "pro-light", color: colors.black, fontSize: getFontSize(0.02) }}>We are pleased to welcome you to "{centres[pressedCardIndex].title}"</Text>
                    </Cards>
                </View>
            </View>
        }

        {currentStep === 3 && pressedCardIndex !== null &&
            <View style={{ marginHorizontal: "6%" }}>
                <View style={{ rowGap: 10, marginVertical: "6%" }}>
                    <Text style={{ textAlign: "center", fontFamily: "pro-black", fontSize: getFontSize(0.027) }}>{centres[pressedCardIndex].title}</Text>
                    <Text style={{ textAlign: "center", fontFamily: "pro-bold", width: "90%", marginLeft: "auto", marginRight: "auto", fontSize: getFontSize(0.023) }}>{centres[pressedCardIndex].subTitle}</Text>
                </View>

               <View style={styles.textContainer}>
                    {tests.map((item, index)=>
                        <View key={index}>
                            <View style={{ flexDirection: "row", padding: "4.55%", alignItems: "center", justifyContent:"space-between"}}>
                                <Text style={{ fontFamily: "pro-bold", fontSize: getFontSize(0.02) }}>{item.title}</Text>
                                <Text style={{ fontFamily: "pro-bold", fontSize: getFontSize(0.018) }}>{item.price}</Text>
                            </View>
                            {index === 6 ? <View /> : <View style={{ height: 1, backgroundColor: colors.lineColor }} />}
                        </View>
                    )}
                </View>
            </View>
        }

        {currentStep === 4 && pressedCardIndex !== null &&
            <View style={{ marginHorizontal: "6%" }}>
                <View style={{ rowGap: 10, marginVertical: "6%", marginBottom: "18%" }}>
                    <Text style={{ color: colors.black, fontFamily: "pro-black", fontSize: getFontSize(0.035) }}>SELECT THE <Text style={{ color: colors.dateColor }}>DATE AND HOUR</Text></Text>
                    <Text style={{ color: colors.black, fontFamily: "pro-black", fontSize: getFontSize(0.035) }}>FOR THE APPOINTMENT</Text>
                </View>

                {appointmentDates.map((item: string, index: number)=>
                    <View key={index} style={{ marginBottom: "3%" }}>
                        <DatePicker item={item} />
                    </View>
                )}

                <TouchableOpacity style={styles.more} onPress={()=>showMoreAppointments()}>
                    <Text style={{ fontSize: getFontSize(0.023), textDecorationLine: "underline", fontFamily: "pro-bold", textAlign: "center", color: colors.black }}>MORE DATES</Text>
                </TouchableOpacity>

                <BottomSheet
                    visible={viewBs}
                    onBackButtonPress={()=>{setViewBs(!viewBs)}}
                    onBackdropPress={()=>{setViewBs(!viewBs)}}
                >
                    <View>
                        {bsIndex === 0 &&
                            <View style={styles.bottomSheet}>
                                <Text style={{ fontFamily: "pro-black", textAlign: "center", color: colors.blue, fontSize: getFontSize(0.04), paddingVertical: "7%", marginTop: "3%" }}>
                                    BEFORE BOOKING, PLEASE NOTE THE FOLLOWING
                                </Text>

                                <Text style={{fontFamily: "pro-light", textAlign: "center", color: colors.black, fontSize: getFontSize(0.025)}}>
                                    If you are unable to keep your appointment, please cancel 24 hours in advance.
                                </Text>

                                <CustomButton 
                                    title='CONTINUE'
                                    bgStyle="blue"
                                    onPress={()=>{setBsIndex(1)}}
                                    mt="10%"
                                />
                            </View>
                        }

                        {bsIndex === 1 &&
                            <View style={styles.formBs}>
                                <Text style={{ fontFamily: "pro-black", textAlign: "center", color: colors.blue, fontSize: getFontSize(0.04), paddingVertical: "7%", marginTop: "3%" }}>
                                    PLEASE, FILL OUT THE FORM
                                </Text>

                                <View>
                                    <Dropdown 
                                        label='Gender'
                                        content={[
                                            "Male",
                                            "Female",
                                            "Others"
                                        ]}
                                    />
                                </View>

                                <CustomButton 
                                    title='CONTINUE'
                                    bgStyle="blue"
                                    onPress={()=>setBsIndex(1)}
                                    mt="10%"
                                />
                            </View>
                        }
                    </View>
                </BottomSheet>
            </View>
        }

        {currentStep > 1 &&
            <CustomButton 
                title={currentStep === 2 ? "BOOK AN APPOINTMENT" : 'CONTINUE'}
                bgStyle="blue"
                onPress={()=>{
                    if (currentStep !== 4) {
                        setCurrentStep((prev: number)=> prev + 1)
                    }
                    else {
                        if (appointmentDetails.time !== undefined) {
                            setViewBs(true)
                        }
                    }
                }}
                mt={"14%"}
                style={{ marginHorizontal: "6%", }}
            />
        }
        
        {currentStep === 4 && <View style={{ marginVertical: "5%" }} />}
    </ScrollView>
  )
}

export default Appointment
const getHeight = Dimensions.get("screen").height

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: colors.tabBgColor,
        borderRadius: 15
    },
    more: {
        backgroundColor: "rgba(153, 60, 64, 0.60)",
        borderRadius: 10,
        marginVertical: "4%",
        paddingVertical: "3%"
    },
    bottomSheet: {
        backgroundColor: colors.btrColor, 
        height: getHeight - (0.6 * getHeight), 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: "3%"
    },
    formBs: {
        backgroundColor: colors.btrColor, 
        height: getHeight - (0.2 * getHeight), 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: "3%"
    }
})