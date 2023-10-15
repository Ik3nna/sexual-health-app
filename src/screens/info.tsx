import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCustomFonts } from '../hooks/useCustomFonts'
import Icon from '../components/icons'
import colors from '../assets/themes/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProps, StepProps } from '../types'
import { HOMEPAGE } from '../constants/routeName'
import { signOut } from 'firebase/auth'
import { Firebase_Auth } from '../config/firebase'
import { getFontSize } from '../utils/getFontSize'
import CustomButton from '../components/custom-button'
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

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

  const handleAgeClick = (index: any, view: any) => {
    if (view === 'first') {
      setSelectedAgeFirstView(index);
      setSelectedAgeSecondView(null);
    } else {
      setSelectedAgeFirstView(null);
      setSelectedAgeSecondView(index);
    }
  };

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
    if (currentStep === 2 && selectedAgeFirstView !== null || selectedAgeSecondView !== null) {
      handleNextStep()
    }
    if (currentStep === 3) {
      handleFinalStep()
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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

      <View style={styles.sub_container}>
        <TouchableOpacity 
          onPress={()=>{
            if (currentStep === 1) {
              handleSignOut()
            } else {
              handlePrevStep()
            }
          }}
        >
          <Icon type="ant" name="arrowleft" size={27} color={colors.black} />
        </TouchableOpacity>
        
        <View style={styles.step_bar_container}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Step 
                key={i} 
                isFirst={i === 0}
                isLast={i === 2}
                isFilled={currentStep >= i + 1} 
              />
          ))}
        </View>
      </View>

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
              containerStyle={{ paddingVertical:"7%", justifyContent: "center", rowGap: 30, alignItems: "flex-start" }}
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
        
        {currentStep === 3 && <Text>ehjdj</Text>}

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

function Step({ isFilled, isFirst, isLast }: StepProps) {
  const stepStyle = {
    backgroundColor: isFilled ? colors.filled : colors.empty,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }

  if (isFirst) {
    stepStyle.borderTopLeftRadius = 9;
    stepStyle.borderBottomLeftRadius = 9;
  }
  if (isLast) {
    stepStyle.borderTopRightRadius = 9;
    stepStyle.borderBottomRightRadius = 9;
  }

  return (
    <View style={[styles.step_bar, stepStyle ]} />
  );
}

const getWidth = Dimensions.get("window").width;
const getHeight = Dimensions.get("window").height;
const stepHeight = getHeight - (getHeight * 0.975);
const stepWidth = getWidth - (getWidth * 0.73);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "6%",
  },
  step_bar_container: {
    flexDirection: "row",
    paddingLeft: 14
  },
  step_bar: {
    height: stepHeight,
    width: stepWidth
  },
  wrapper_container: {
    marginTop: "20%",
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
  }
})