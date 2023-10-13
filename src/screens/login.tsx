import { SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useForm, Controller } from "react-hook-form";
import colors from '../assets/themes/colors'
import { getFontSize } from '../utils/getFontSize'
import Input from '../components/input'
import CustomButton from '../components/custom-button';
import { NavigationProps } from '../types';
import { SIGNUP } from '../constants/routeName';
import { LoginFormDataProps } from '../types';
import { useCustomFonts } from "../hooks/useCustomFonts"
import auth from "@react-native-firebase/auth"

const Login = ({ navigation }: NavigationProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormDataProps>({
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onsubmit = async (data: LoginFormDataProps) => {
    try {
      const response = await auth().signInWithEmailAndPassword(data.email, data.password);

      if (response.user) {
        Alert.alert("Success", "Welcome!!")
      }
    } catch (err) {
      Alert.alert("Error", "Please try again");
      reset();
    }
  }

  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style='auto' />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"position"}
        keyboardVerticalOffset={-200}
      >
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.text}>LOGIN YOUR</Text>
          <Text style={styles.text}>ACCOUNT</Text>
        </View>

        <View>
          <Controller
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                message: "Please enter a valid email address"
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label='Email Address'
              value={value}
              placeholder="Please enter your email address"
              style={{ marginBottom: 10 }}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Passwords should have a minimum of 6 characters"
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label='Password'
              value={value}
              secureTextEntry
              placeholder="Please enter your password"
              style={{ marginBottom: 10 }}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
              name="password"
          />

          <TouchableOpacity>
            <Text style={{ paddingVertical: 4, fontSize: 16, fontFamily: "pro-light" }}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <CustomButton
            bgStyle={{ backgroundColor: colors.skyblue }}
            mt={20}
            title='Login'
            onPress={handleSubmit(onsubmit)}
          />

          <View style={styles.register}>
            <Text style={styles.register_text}>Don't have an account?</Text>

            <TouchableOpacity onPress={()=>navigation.navigate(SIGNUP)}>
              <Text style={styles.signup}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "5%",
  },
  text: {
    color: colors.black,
    fontFamily: "pro-black",
    fontSize: getFontSize(0.05)
  }, 
  register: {
    flexDirection: "row",
    alignSelf: "center",
    paddingVertical: 10,
  },
  register_text: {
    fontFamily: "pro-light",
    fontSize: getFontSize(0.023),
    paddingRight: 7
  },
  signup: {
    fontFamily: "pro-bold",
    fontSize: getFontSize(0.023),
    color: colors.skyblue,
  }
})