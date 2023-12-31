import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ProgressBar from '../progress-bar'
import { AppointmentProps } from '../../types'
import { Image } from 'react-native'
import Cards from '../cards'
import MapView, { Marker } from 'react-native-maps'
import { getFontSize } from '../../utils/getFontSize'
import Icon from '../icons'
import colors from '../../assets/themes/colors'
import CustomButton from '../custom-button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import DatePicker from '../date-picker'
import { useGlobalContext } from '../../context/useGlobalContext'
import Dropdown from '../dropdown'
import BTSInput from '../bts-input'
import { BottomSheet } from 'react-native-btr'
import Checkbox from 'expo-checkbox'
import { centres, tests, monthNames, dayNames } from '../../utils/data'

// assets
import location from "../../assets/images/location-icon.png";
import map from "../../assets/images/map-icon.png";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Appointment = ({ currentStep, setAppointment, setVisible, setCurrentStep, calender }: AppointmentProps) => {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [pressedCardIndex, setPressedCardIndex] = useState<number | null>(null);
  const { appointmentDetails, setAppointmentDetails } = useGlobalContext(); 
  const navigation = useNavigation()

  const [viewBs, setViewBs] = useState(false);
  const [bsIndex, setBsIndex] = useState(0);
  const [formDeets, setFormDeets] = useState({ name: "",  lastName: "" });
  const [isChecked, setIsChecked] = useState(false);

  const [appointmentDates, setAppointmentDates] = useState<any>([]);
  const numDatesToShow = 4;
  const [lastDate, setLastDate] = useState<any>(null);

  const handleNextStep = (index: number)=> {
    setPressedCardIndex(index)
    setCurrentStep((prev: number)=>prev + 1)
  }

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

  const handleChangeFormDeets = (key: string, text: string) => {
    setFormDeets({...formDeets, [key]: text})
  }

  // Get the time of appointment
  const appointmentTime = new Date(appointmentDetails.time);
  const hours = appointmentTime.getHours();
  const minutes = appointmentTime.getMinutes();

  // Determine whether it's AM or PM
  const period = hours >= 12 ? "PM" : "AM"; 
  
  //  Convert hours to 12hr format
  const formattedHours = hours > 12 ? hours - 12 : hours;

  // Format the time as "hh:mm"
  const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${" "}${period}`;

  useEffect(() => {
    const { dates, lastDate: newLastDate }= calculateNextAppointments(numDatesToShow, lastDate);
    setAppointmentDates(dates);
    setLastDate(newLastDate)
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
       setCurrentStep(1);
      }
    }, [navigation])
  );
 
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            isLast={5}
            stepWidth={width - (width * 0.87)}
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
                            <View style={{ flexDirection: "row", padding: Platform.OS === "ios" ? "4.55%" : "4.4%", alignItems: "center", justifyContent:"space-between"}}>
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

                                <View style={{ rowGap: 20 }}>
                                    <Dropdown 
                                        label='Gender'
                                        content={[
                                            "Male",
                                            "Female",
                                            "Others"
                                        ]}
                                    />

                                    <BTSInput 
                                        label='First Name'
                                        value={formDeets.name}
                                        onChange={(value: string)=> handleChangeFormDeets("name", value)}
                                    />

                                    <BTSInput 
                                        label="Last Name"
                                        value={formDeets.lastName}
                                        onChange={(value: string)=> handleChangeFormDeets("lastName", value)}
                                    />

                                    <Dropdown 
                                        label='Insurance'
                                        content={[
                                            "NHIS",
                                            "Roctor",
                                            "Others"
                                        ]}
                                    />
                                </View>

                                <CustomButton 
                                    title='CONTINUE'
                                    bgStyle="blue"
                                    disabled={formDeets.name === "" || formDeets.lastName === "" ? true : false}
                                    onPress={()=>setBsIndex(2)}
                                    mt="10%"
                                />
                            </View>
                        }

                        {bsIndex === 2 &&
                            <View style={styles.prepareBs}>
                                <Text style={{ fontFamily: "pro-black", textAlign: "center", color: colors.blue, fontSize: getFontSize(0.033), paddingVertical: "7%", marginTop: "3%" }}>
                                    HOW TO PREPARE FOR A CHECK UP?
                                </Text>

                                <Text style={{ color: colors.black, paddingHorizontal: "5%", fontFamily: "pro-light", fontSize: getFontSize(0.024) }}>
                                    Prior to the test, avoid any sexual activity for at least{" "} 
                                    <Text style={styles.boldText}>24 hours</Text>.{" "}Some tests may require longer periods of abstinence.
                                </Text>

                                <Text style={{ color: colors.white, paddingTop: "5%", paddingHorizontal: "5%", fontFamily: "pro-bold", fontSize: getFontSize(0.024) }}>
                                    To prepare for a sexual health blood test, follow these instructions:
                                </Text>

                                <View style={{ paddingHorizontal: "8%", rowGap: 5 }}>
                                    <View style={{ flexDirection: "row", columnGap: 10}}>
                                        <Text style={styles.itemText}>1.</Text>
                                        <Text style={styles.itemText}>Fast for 
                                            <Text style={styles.boldText}> 8-12 hours </Text>before the test(water is usually allowed).
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", columnGap: 10}}>
                                        <Text style={styles.itemText}>2.</Text>
                                        <Text style={styles.itemText}>Let your healthcare provider know if you are taking any
                                            <Text style={styles.boldText}> 24 hours </Text>before the test.
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", columnGap: 10}}>
                                        <Text style={styles.itemText}>3.</Text>
                                        <Text style={styles.itemText}>Avoid alcohol, fatty foods, and strenuous exercise for
                                            <Text style={styles.boldText}> medications </Text>or supplements, as some may affect the results of the test.
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", columnGap: 10}}>
                                        <Text style={styles.itemText}>4.</Text>
                                        <Text style={styles.itemText}>Be honest with your healthcare provider about your
                                            <Text style={styles.boldText}> sexual history </Text>and any 
                                            <Text style={styles.boldText}> symptoms</Text> you may be experiencing.
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", columnGap: 10}}>
                                        <Text style={styles.itemText}>5.</Text>
                                        <Text style={styles.itemText}>
                                            Follow any additional instructions provided by your healthcare provider, 
                                            such as scheduling the test for a certain time of day.
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", columnGap: 10}}>
                                        <Text style={styles.itemText}>6.</Text>
                                        <Text style={styles.itemText}>Some tests, such as a pap smear or vaginal swab, may be affected by 
                                            <Text style={styles.boldText}> menstrual blood </Text>and may need to be rescheduled.
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", paddingTop: "3%", alignItems: "center", columnGap: 10}}>
                                        <Checkbox 
                                            style={styles.checkbox}
                                            value={isChecked}
                                            onValueChange={setIsChecked}
                                            color={isChecked ? colors.brown : undefined}
                                        />
                                        
                                        <Text style={styles.itemText}>I understand and accept</Text>
                                    </View>

                                    <CustomButton 
                                        title='CONTINUE'
                                        bgStyle="blue"
                                        disabled={isChecked ? false : true}
                                        onPress={()=>setBsIndex(3)}
                                        mt="7%"
                                    />
                                </View>
                            </View>
                        }

                        {bsIndex === 3 &&
                            <View style={styles.summarizeBs}>
                                <Text style={{ fontFamily: "pro-black", textAlign: "center", color: colors.blue, fontSize: getFontSize(0.033), paddingVertical: Platform.OS === "ios" ? "7%" : "4%", marginTop: "3%" }}>
                                    LET'S SUMMARIZE
                                </Text>

                                <View style={{ paddingHorizontal: "5%", paddingVertical: "3%" }}> 
                                    <Text style={styles.itemText}>Reason for visit:</Text>

                                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: "3%", justifyContent: "space-between"}}>
                                        <Text style={[styles.boldText, { fontSize: getFontSize(0.02) }]}>STI’s Complete labor test</Text>
                                        <Text style={styles.itemText}>235€</Text>
                                    </View>

                                    <View style={{ paddingVertical: "3%" }}>
                                        <Text style={styles.itemText}>Gonorrhoe, Chlamidien, Ureaplasma,</Text>
                                        <Text style={styles.itemText}>Mycoplasma, Trichomoniasis, HIV, HCV,</Text>
                                        <Text style={styles.itemText}>Hepatitis B Screening</Text>
                                    </View>

                                </View>

                                <View style={{ backgroundColor: colors.black, height: 1 }} />

                                <View style={{ paddingHorizontal: "5%", paddingTop: "3%" }}>
                                    <Text style={[styles.boldText, { fontSize: getFontSize(0.023) }]}>{formDeets.name}{" "}{formDeets.lastName}</Text>

                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: "3%" }}>
                                        <Text>{appointmentDetails.day}</Text>
                                        <Text>{formattedTime}</Text>
                                    </View>

                                    <CustomButton 
                                        title='SET A REMINDER'
                                        bgStyle="blue"
                                        onPress={()=>calender()}
                                        mt="7%"
                                    />
                                </View>
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
                disabled={(currentStep === 4 && appointmentDetails.time === undefined) ? true : false }
                mt={Platform.OS=== "ios" ? "14%" : "5%" }
                style={{ marginHorizontal: "6%", }}
            />
        }
        
        {currentStep === 4 && <View style={{ marginVertical: "5%" }} />}
    </ScrollView>
  )
}

export default Appointment
const checkboxWidth = width - (width * 0.93);

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
        height: height - (0.6 * height), 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: "3%"
    },
    formBs: {
        backgroundColor: colors.btrColor, 
        height: height - (0.2 * height), 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: "3%"
    },
    prepareBs: {
        backgroundColor: colors.btrColor, 
        height: Platform.OS === "ios" ? height - (0.13 * height) : height - (0.27 * height), 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        position: "relative"
    },
    boldText: {
        fontFamily: "pro-bold"
    },
    itemText: {
        fontSize: getFontSize(0.02)
    },
    checkbox: {
        width: checkboxWidth,
        borderRadius: 7,
        height: 25,
        borderColor: colors.brown
    },
    summarizeBs: {
        backgroundColor: colors.btrColor, 
        height: height - (0.5 * height), 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    }
})