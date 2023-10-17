import { TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import Icon from '../icons'
import colors from '../../assets/themes/colors'
import { useNavigation } from '@react-navigation/native'

const GoBack = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={{ paddingVertical: Platform.OS === "ios" ? "6%" : "8%" }} onPress={()=>navigation.goBack()}>
        <Icon type="ant" name="arrowleft" size={27} color={colors.black} />
    </TouchableOpacity>
  )
}

export default GoBack;