import { Dimensions } from "react-native"

const deviceHeight = Dimensions.get("window").height;

export const getFontSize = (num: number) => {
    return deviceHeight * num
}