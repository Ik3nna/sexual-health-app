import { NavigationProp, ParamListBase } from '@react-navigation/native'


// Navigation type
export type NavigationProps = {
    navigation: NavigationProp<ParamListBase>
}

// Login form data type
export type LoginFormDataProps = {
    email: string
    password: string
}

// Signup form data type 
export type SignupFormDataProps = {
    name: string
    email: string
    password: string
}

// custom Button type
export type CustomButtonProps = {
    title: string
    loading: boolean
    bgStyle?: any
    mt?: any
    onPress: ()=> void
}

// Input type
export type InputProps = {
    label: string,
    placeholder: string
    value: string
    error?: string
    style?: any
    onChange: ()=> void
    onBlur: ()=> void
    [props: string]: any
}

// Icon type
export type IconProps = {
    [props: string]: any
}

// Step type 
export type StepProps = {
    isFilled: boolean, 
    isFirst: boolean, 
    isLast: boolean 
}