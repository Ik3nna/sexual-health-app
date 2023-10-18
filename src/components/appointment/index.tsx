import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from '../progress-bar'
import { AppointmentProps } from '../../types'
import { Image } from 'react-native'
import Cards from '../cards'

// assets
import location from "../../assets/images/location-icon.png";
import map from "../../assets/images/map-icon.png";
import { TouchableOpacity } from 'react-native-gesture-handler'

const centres = [
    { 
        title: "New Heights Pharma", 
        subTitle: "Our business activities include wholesale, distribution, diagnostics of Pharmaceuticals in Maryland.",
        address: "3, Olaide Benson Street, Lagos"
    },
    { 
        title: "QDX Healthcare", 
        subTitle: "Health firm providing basic and specialized clinical, pathological and radio diagnostic services.",
        address: "131, Obafemi Awolowo Way Ikeja, Lagos."
    },
    { 
        title: "C. C. OBI Nigeria Limited", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos.",
        address: "161, Herbert Marculey Way, Lagos."
    },
    { 
        title: "Radmed Diagnostics", 
        subTitle: "Our business activities include wholesale, distribution, diagnostics of Pharmaceuticals in Maryland.",
        address: "3B, Ligali Ayorinde Street, Lagos."
    },
    { 
        title: "Alpha Diagnostics Centre", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos",
        address: "24, Shekoni Street, Coker Village, Lagos."
    },
    { 
        title: "Alma Clinic and Diagnostic Services", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos.",
        address: "60A, Campbell Street, Lagos,"
    },
    { 
        title: "Union Diagnostics and Clinical Services", 
        subTitle: "Health in Lagos, Hospital in Lagos, Hospital Equipment in Lagos, Diagnostic in Lagos.",
        address: "80, Agege Motor Road, Lagos, Lagos."
    },
    { 
        title: "Barnes Diagnostic and Heart Centre", 
        subTitle: "Health in Victoria Island, Medicine in Victoria Island, Hospital in Victoria Island, Health Care in Victoria Island",
        address: "277b, Jose Adeogun Street Victoria Island, Lagos."
    },
]

const Appointment = ({ currentStep, setAppointment, setVisible, setCurrentStep }: AppointmentProps) => {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const getWidth = Dimensions.get("window").width;
  
  
  return (
    <View>
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>8 results</Text>
                    <TouchableOpacity onPress={()=>setToggleSwitch(prev => !prev)}>
                        <Image source={toggleSwitch ? map : location} />
                    </TouchableOpacity>
                </View>

                {centres.map((item, index)=>
                    <Cards key={index}>

                    </Cards>
                )}
                
                <View />
            </ScrollView>
        }
    </View>
  )
}

export default Appointment

const styles = StyleSheet.create({

})