import { StyleSheet, Dimensions, View, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../assets/themes/colors'
import Icon from '../icons'
import { ProgressBarProps } from '../../types'
import Step from '../step-bar'

const ProgressBar = ({ onPress, currentStep, isLast, stepWidth, colG }: ProgressBarProps) => {

  return (
    <View style={styles.sub_container}>
        <TouchableOpacity 
          style={{ paddingLeft: "6%"}}
          onPress={onPress}>
          <Icon type="ant" name="arrowleft" size={27} color={colors.black} />
        </TouchableOpacity>
        
        <View style={[styles.step_bar_container, { columnGap: colG ? -1 : 0}]}>
          {Array(isLast + 1)
            .fill(null)
            .map((_, i) => (
              <Step 
                key={i} 
                isFirst={i === 0}
                isLast={i === isLast}
                isFilled={currentStep >= i + 1}
                stepWidthProps={stepWidth ? stepWidth : null}
                
              />
          ))}
        </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
    sub_container: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
      paddingVertical: Platform.OS === "ios" ? "6%" : "10%",
    },
    step_bar_container: {
      flexDirection: "row",
      alignItems: "center",
    }
})