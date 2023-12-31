import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
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
import { Firebase_Auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useGlobalContext } from '../context/useGlobalContext';

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

  const auth = Firebase_Auth;
  const [ loading, setLoading ] = useState(false);
  const { setIsLoggedIn } = useGlobalContext();
  const getHeight = Dimensions.get("window").height;

  const onsubmit = async (data: LoginFormDataProps) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (response.user) {
        setIsLoggedIn(true);
      }
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
        style={{ flex: 1/4, justifyContent: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : getHeight - (3 * getHeight)}
      >
        <View style={{ marginBottom: 5, paddingLeft: "5%" }}>
          <Text style={styles.text}>LOGIN YOUR</Text>
          <Text style={styles.text}>ACCOUNT</Text>
        </View>

        <View style={{ justifyContent: "center", alignItems:"center" }}>
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
            <Text style={{ paddingVertical: "3%", marginLeft: "-45%", fontSize: getFontSize(0.02), fontFamily: "pro-light" }}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <CustomButton
            bgStyle="skyblue"
            mt={20}
            title='Login'
            loading={loading}
            onPress={handleSubmit(onsubmit)}
            style={{ width: "90%" }}
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