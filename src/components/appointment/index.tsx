import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from '../progress-bar'
import { AppointmentProps } from '../../types'
import { Image } from 'react-native'
import Cards from '../cards'
import { useCustomFonts } from '../../hooks/useCustomFonts'
import MapView, { Marker } from 'react-native-maps'

// assets
import location from "../../assets/images/location-icon.png";
import map from "../../assets/images/map-icon.png";
import { getFontSize } from '../../utils/getFontSize'
import Icon from '../icons'
import colors from '../../assets/themes/colors'

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
        title: "Union Diagnostics and Clinical Services", 
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
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Appointment = ({ currentStep, setAppointment, setVisible, setCurrentStep }: AppointmentProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [pressedCardIndex, setPressedCardIndex] = useState<number | null>(null)
  const getWidth = Dimensions.get("window").width;

  const handleNextStep = (index: number)=> {
    setPressedCardIndex(index)
    setCurrentStep((prev: number)=>prev + 1)
  }
  
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
                setCurrentStep((prev: number) => prev - 1);
              }
            }}
            currentStep={currentStep}
            isLast={9}
            stepWidth={getWidth - (getWidth * 0.92)}
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
            <View>
                <Text>{centres[pressedCardIndex].title}</Text>
                <Text>{centres[pressedCardIndex].subTitle}</Text>
            </View>
        }
    </ScrollView>
  )
}

export default Appointment

const styles = StyleSheet.create({
    
})