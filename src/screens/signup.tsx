import { SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useForm, Controller } from "react-hook-form";
import colors from '../assets/themes/colors'
import { getFontSize } from '../utils/getFontSize'
import Input from '../components/input'
import CustomButton from '../components/custom-button';
import { NavigationProps } from '../types';
import { LOGIN } from '../constants/routeName';
import { SignupFormDataProps } from '../types';
import { useCustomFonts } from '../hooks/useCustomFonts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Firebase_Auth } from '../config/firebase';

const Signup = ({ navigation }: NavigationProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignupFormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  const auth = Firebase_Auth;
  const [ loading, setLoading ] = useState(false);

  const onsubmit = async (data: SignupFormDataProps) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigation.navigate(LOGIN)
    } catch (err: any) {
      Alert.alert("Oops", err.message);
    } finally {
      setLoading(false)
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
        behavior={"padding"}
      >
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.text}>SIGNUP</Text>
        </View>

        <View>
          <Controller
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              label='Full Name'
              value={value}
              placeholder="Please enter your full name"
              style={{ marginBottom: 10 }}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
            name="name"
          />

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
            <Text style={{ paddingVertical: "3%", fontSize: getFontSize(0.02), fontFamily: "pro-light" }}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <CustomButton
            bgStyle="skyblue"
            mt={20}
            title='Signup'
            loading={loading}
            onPress={handleSubmit(onsubmit)}
          />

          <View style={styles.register}>
            <Text style={styles.register_text}>Already have an account?</Text>

            <TouchableOpacity onPress={()=>navigation.navigate(LOGIN)}>
              <Text style={styles.signup}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Signup

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