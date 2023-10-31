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
    loading?: boolean
    disabled?: boolean
    bgStyle?: any
    mt?: any,
    style?: any,
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
    isLast: boolean,
    stepWidthProps?: any
}

// Progress bar type
export type ProgressBarProps = {
    onPress: ()=> void,
    currentStep: number,
    isLast: number,
    stepWidth?: any
    [props: string]: any
}

// Appointment type
export type AppointmentProps = {
    currentStep: number, 
    setAppointment: any, 
    setVisible: any, 
    setCurrentStep: any
}

export type TimePickerProps = {
    item: string, 
    st: Date | null, 
    sst: any, 
    onTimeChange: (time: Date) => void 
}

// Dropdown type
export type DropdownProps = {
    label: string;
    content: any
}