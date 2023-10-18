import { Dimensions, View } from 'react-native'
import React from 'react'
import { StepProps } from '../../types'
import colors from '../../assets/themes/colors'

const Step = ({ isFilled, isFirst, isLast, stepWidthProps }: StepProps) => {
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
        <View style={[{ height: 20, width: stepWidthProps ? stepWidthProps : stepWidth }, stepStyle ]} />
    );
}

export default Step
const getWidth = Dimensions.get("window").width
const stepWidth = getWidth - (getWidth * 0.735);
