import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ContinueButton from "../../components/WideButton";
import KeyboardWrapper from "../../components/FormScreen";
import LabeledInput from "../../components/labeledInput";
import { useLogin } from "@hooks/useSignIn";

export default function LoginScreen() {
  const [role, setRole] = useState<"user" | "coach" | "scanner">("user");
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string | undefined>()
  const { mutate: login, isPending, error } = useLogin();


  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const router = useRouter()
  const roles = ["User", "Coach", "Scanner Device"];


  const handleSignUp = () => {
    console.log("SignUp")
    router.replace('/signUp')
  }


  const HandleLogin = () => {
    if(!email && !phoneNumber){
      console.warn("Fill the Field")
      return;
    }
    if(!password){
      console.warn("Fill the Field")
      return;
    }
    login({
      email: email || undefined,
      phoneNo: phoneNumber || undefined,
      password:password,
      role:role,
    });
  };

  return (
    <KeyboardWrapper>
      <ScrollView contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">


        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/5704763513866df30b54994f20a78ec4bbb793ce.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View >

        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome Back!</Text>
        </View>

        <View style={[styles.label, { top: 298 }]} >
          <Text style={styles.labelText}>Continue as</Text>
        </View>

        <View style={styles.roleContainer}>
          {roles.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.roleButton,
                role === item && styles.roleButtonActive
              ]}
              onPress={() => setRole(item)}
            >
              <Text style={styles.roleButtonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <LabeledInput
          label="Phone number or email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your phone number or email"
          onNext={() => { passwordRef.current?.focus() }}
          containerStyle={{ position: "static", top: 382 }}
        />
        <LabeledInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          inputRef={passwordRef}
          isLast
          onSubmit={() => { }}
          containerStyle={{ position: "static", top: 482 }}
        />

        <ContinueButton
          title="Sign Up"
          gradient
          onPress={HandleLogin}
          containerStyle={{ top: 601, position: "static" }}
        />


        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => { router.replace("/forgotPassword") }}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <View style={styles.signupTextContainer}>

            <Text style={styles.signupText}>
              Don’t have an account?
              <TouchableOpacity onPress={handleSignUp}>
                <Text
                  style={styles.signupLink}> Sign Up</Text>
              </TouchableOpacity>
            </Text>
            <View style={[]}></View>

          </View>
        </View>

      </ScrollView>
    </KeyboardWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 844,
    minHeight: 844,
  },
  logoContainer: {
    backgroundColor: "#000000",
    height: 218,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000"

  },
  logo: {
    // width: 390,
    height: 218
  },
  title: {
    height: 58,
    // width: "auto",
    position: "static",
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  titleText: {
    // width: "auto",
    height: 30,
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#000000"

  },
  label: {
    // width: "auto",
    height: 47,
    position: "static",
    padding: 16,
    paddingBottom: 8
  },
  labelText: {
    // width: "auto",
    height: 23,
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    fontWeight: "700",
  },
  roleContainer: {
    // width: "auto",
    height: 56,
    top: 337,
    left: 1,
    padding: 12,
    gap: 12,
    position: "static",
    flexDirection: "row",
  },
  roleButton: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#EBE8F2",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  roleButtonActive: {
    backgroundColor: "#d8cbe8"
  },
  roleButtonText: {
    height: 21,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    fontWeight: "500",
    color: "#120F1A"
  },

  forgotContainer: {
    // width: 140,
    // overflow: "hidden",
    height: 37,
    // top: 656,
    position: "static",
    left: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12
  },
  forgotPassword: {
    // width: 358,
    height: 21,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: "#66578F",
  },
  signupContainer: {
    // width: "auto",
    height: 57,
    top: 787,
    position: "static",
  },
  signupTextContainer: {
    // width: 390,
    height: 37,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  signupText: {
    textAlign: "center",
    // width: 358,
    height: 21,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: "#66578F",

  },
  signupLink: {
    top: 6,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: "#66578F"
  },
  blankContainer: {
    // width: 390,
    height: 40,
    marginBottom: 50,
  }


});


