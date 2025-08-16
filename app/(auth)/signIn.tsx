import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [role, setRole] = useState("User");

  const roles = ["User", "Coach", "Scanner Device"];

  const router = useRouter()

  const handleSignUp = () => {
    console.log("Harsh")
    router.replace('/signUp')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <View>

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

        <View style={styles.subContainer}>
          <View style={styles.fieldContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Phone number or email</Text>
            </View>
            <TextInput
              placeholder="Enter your phone number or email"
              style={styles.input}
              placeholderTextColor="#6b6b6b"
            />
          </View>
        </View>

        <View style={[styles.subContainer, { top: 482 }]}>
          <View style={styles.fieldContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Password</Text>
            </View>
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              placeholderTextColor="#6b6b6b"
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton}>
          <View style={styles.continueContainer}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <View style={styles.signupTextContainer}>

          <Text style={styles.signupText}>
            Don’t have an account?
            <TouchableOpacity>
              <Text
                style={styles.signupLink}
                onPress={handleSignUp}> Sign Up</Text>
            </TouchableOpacity>
          </Text>
          <View style={[]}></View>

        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    height: 844,
    width: 390,
    minHeight: 844,
  },
  logoContainer: {
    backgroundColor: "#000000",
    width: 390,
    height: 218,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000"

  },
  logo: {
    width: 390,
    height: 218
  },
  title: {
    height: 58,
    width: 390,
    top: 218,
    position: "absolute",
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  titleText: {
    width: 358,
    height: 30,
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#000000"

  },
  label: {
    width: 390,
    height: 47,
    position: "absolute",
    padding: 16,
    paddingBottom: 8
  },
  labelText: {
    width: 358,
    height: 23,
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    fontWeight: "700",
  },
  roleContainer: {
    width: 390,
    height: 56,
    top: 337,
    left: 1,
    padding: 12,
    gap: 12,
    position: "absolute",
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
  subContainer: {
    flexDirection: "row",
    width: 390,
    height: 112,
    maxWidth: 480,
    top: 382,
    position: "absolute",
    left: 1,
    padding: 16,
    paddingTop: 12,
  },
  fieldContainer: {
    width: 358,
    height: 88,
    minWidth: 160
  },
  textContainer: {
    width: 358,
    height: 32,
    paddingBottom: 8,
  },
  text: {
    width: 358,
    height: 24,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#121217",
  },
  input: {
    flexDirection: "row",
    width: 358,
    height: 56,
    backgroundColor: "#F2F0F5",
    padding: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    width: 390,
    height: 48,
    top: 601,
    position: "absolute",
    paddingHorizontal: 16,
    paddingBottom: 37,
  },
  continueButton: {
    justifyContent: "center",
    flexDirection: "row",
    width: 358,
    height: 48,
    minWidth: 84,
    maxWidth: 480,
    borderRadius: 24,
    paddingHorizontal: 20,
    backgroundColor: "#8C66E3",

  },
  continueContainer: {
    alignSelf: "center",
    width: 71,
    height: 24,

  },
  continueButtonText: {
    width: 71,
    height: 24,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0,
  },
  forgotContainer: {
    width: 140,
    overflow: "hidden",
    height: 37,
    top: 656,
    position: "absolute",
    left: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12
  },
  forgotPassword: {
    width: 358,
    height: 21,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: "#66578F",
  },
  signupContainer: {
    width: 390,
    height: 57,
    top: 787,
    position: "absolute",
  },
  signupTextContainer: {
    width: 390,
    height: 37,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  signupText: {
    textAlign: "center",
    width: 358,
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
    width: 390,
    height: 40,
    marginBottom: 50,
  }


});


