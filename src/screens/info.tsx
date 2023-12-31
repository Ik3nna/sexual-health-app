import { SafeAreaView, StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCustomFonts } from '../hooks/useCustomFonts'
import colors from '../assets/themes/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProps, StepProps } from '../types'
import { HOMEPAGE } from '../constants/routeName'
import { signOut } from 'firebase/auth'
import { Firebase_Auth } from '../config/firebase'
import { getFontSize } from '../utils/getFontSize'
import CustomButton from '../components/custom-button'
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import Checkbox from 'expo-checkbox'
import { useGlobalContext } from '../context/useGlobalContext'
import ProgressBar from '../components/progress-bar'

const ageRange = ["16 - 20", "21 - 24", "25 - 29", "30 - 34", "35 - 39",
"40 - 44", "45 - 49", "50 - 54", "55 - 59", "≥ 60"
];
const track = ["CHECK UPS", "TEST RESULTS", "SEXUAL ACTIVITY", "PILL REMINDER", "ALL"];

const Info = ({ navigation }: NavigationProps) => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const auth = Firebase_Auth;
  const [ currentStep, setCurrentStep ] = useState(1);
  const gender: RadioButtonProps[] = useMemo(() => ([
    {
      id: '1', 
      label: 'FEMALE',
      value: 'female',
      color: colors.filled,
      size: 30,
      labelStyle: { fontFamily: "pro-bold", fontSize: getFontSize(0.023) }
    },
    {
      id: '2',
      label: 'MALE',
      value: 'male',
      color: colors.filled,
      size: 30,
      labelStyle: { fontFamily: "pro-bold", fontSize: getFontSize(0.023) }
    },
    {
      id: '3', 
      label: 'NON-BINARY',
      value: 'non-binary',
      color: colors.filled,
      size: 30,
      labelStyle: { fontFamily: "pro-bold", fontSize: getFontSize(0.023) }
    },
    {
      id: '4',
      label: 'OTHERS',
      value: 'others',
      color: colors.filled,
      size: 30,
      labelStyle: { fontFamily: "pro-bold", fontSize: getFontSize(0.023) }
    }
  ]), []);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [selectedAgeFirstView, setSelectedAgeFirstView] = useState(null);
  const [selectedAgeSecondView, setSelectedAgeSecondView] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState<number | null>(null);
  const { setIsLoggedIn } = useGlobalContext();

  const handleAgeClick = (index: any, view: any) => {
    if (view === 'first') {
      setSelectedAgeFirstView(index);
      setSelectedAgeSecondView(null);
    } else {
      setSelectedAgeFirstView(null);
      setSelectedAgeSecondView(index);
    }
  };

  const handleCheckbox = (index: number) => {
    setSelectedCheckbox(index)

    if (index === 4) {
      setSelectedCheckbox(-1);
    }
  }

  const handleNextStep = ()=> {
    setCurrentStep((prev) => prev + 1);
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  }

  const handleFinalStep = ()=> {
    navigation.navigate(HOMEPAGE)
  }

  const handleContinue = ()=> {
    if (currentStep === 1 && selectedId !== undefined) {
      handleNextStep()
    }
    else if (currentStep === 2 && selectedAgeFirstView !== null || selectedAgeSecondView !== null) {
      handleNextStep()
    }
    else if (currentStep === 3 && selectedCheckbox !== null) {
      handleFinalStep()
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style='auto' />

      <ProgressBar 
        onPress={()=>{
          if (currentStep === 1) {
            handleSignOut()
          } else {
            handlePrevStep()
          }
        }}
        currentStep={currentStep}
        isLast={2}
      />

      <View style={styles.wrapper_container}>
        {currentStep === 1 && 
          <View>
            <View>
              <Text style={{ color: colors.black, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>WHAT IS YOUR</Text>
              <Text style={{ color: colors.black, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>GENDER?</Text>
            </View>

            <Text style={{ paddingVertical: "3%", fontSize: 16, fontFamily: "pro-light" }}>Indicate your gender to customize your experience</Text>

            <RadioGroup 
              radioButtons={gender} 
              onPress={setSelectedId}
              selectedId={selectedId}
              containerStyle={{ paddingVertical:"7%", justifyContent: "center", rowGap: Platform.OS === "ios" ? 30 : 25, alignItems: "flex-start" }}
            />
          </View>
        }

        {currentStep === 2 && 
          <View>
            <View>
              <Text style={{ color: colors.black, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>CHOOSE YOUR AGE</Text>
            </View>

            <Text style={{ paddingVertical: "3%", fontSize: 16, fontFamily: "pro-light" }}>Select age range to customize experience</Text>

            <View style={styles.age_container}>
              <View>
                {ageRange.slice(0, 5).map((item, index)=>
                  <TouchableOpacity  
                    key={index} 
                    style={[styles.age, { backgroundColor: selectedAgeFirstView === index ? colors.brown : colors.white }]} 
                    onPress={()=>handleAgeClick(index, 'first')}
                  >
                    <Text style={[styles.age_Text, { color: selectedAgeFirstView === index ? colors.white : colors.brown }]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <View>
                {ageRange.slice(5).map((item, index)=>
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.age, { backgroundColor: selectedAgeSecondView === index ? colors.brown : colors.white }]} 
                    onPress={()=>handleAgeClick(index, 'second')}
                  >
                   <Text style={[styles.age_Text, { color: selectedAgeSecondView === index ? colors.white : colors.brown }]}>
                     {item}
                   </Text>
                 </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        }
        
        {currentStep === 3 && 
          <View>
            <View>
              <Text style={{ color: colors.black, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>WHAT DO YOU WANT</Text>
              <Text style={{ color: colors.black, fontSize: getFontSize(0.05), fontFamily: "pro-bold" }}>TO TRACK?</Text>
            </View>

            <View style={{ marginTop: "4%" }}>
              {track.map((item, index)=>(
                <View key={index} style={styles.checkbox_container}>
                  <Checkbox 
                    style={styles.checkbox}
                    value={selectedCheckbox === -1 || index === selectedCheckbox}
                    onValueChange={() => handleCheckbox(index)}
                    color={selectedCheckbox === index || -1 ? colors.brown : undefined}
                  />
                  <Text style={{ fontFamily: "pro-light", fontSize: getFontSize(0.025), textAlign: "center", }}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        }

        <CustomButton 
          title='CONTINUE'
          bgStyle="blue"
          onPress={handleContinue}
          mt="30%"
        />
      </View>
    </SafeAreaView>
  )
}

export default Info;

const getWidth = Dimensions.get("window").width;
const checkboxWidth = getWidth - (getWidth * 0.93);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  wrapper_container: {
    marginTop: Platform.OS === "ios" ? "20%" : "6%",
    paddingHorizontal: "5%",
  },
  age_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "7%"
  },
  age: {
    marginBottom: "14%",
    borderWidth: 4,
    borderRadius: 14,
    borderColor: colors.brown,
    paddingHorizontal: "8%",
  },
  age_Text: {
    fontFamily: "pro-black",
    fontSize: getFontSize(0.035),
    textAlign: "center",
  }, 
  checkbox_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
    paddingVertical: Platform.OS === "ios" ? "5.7%" : "5%",
  },
  checkbox: {
    width: checkboxWidth,
    borderRadius: 7,
    height: 25
  }
})