import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import LabeledInput from "@components/labeledInput";
import { useLogin } from "@hooks/useSignIn";

export default function LoginScreen() {
  const [role, setRole] = useState<"User" | "Coach" | "Scanner Device">("User");
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [input, setInput] = useState("");


  const [password, setPassword] = useState<string | undefined>()
  const { mutate: login, isPending, error } = useLogin();


  const passwordRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)

  const router = useRouter()
  type Role = "User" | "Coach" | "Scanner Device"
  const roles: Role[] = ["User", "Coach", "Scanner Device"];


  const handleSignUp = () => {
    console.log("SignUp")
    router.replace('/signUp')
  }



  const HandleLogin = () => {
    if (!email && !phoneNumber) {
      emailRef.current?.focus();
      console.log("Invalid input");
      return;
    }

    if (!password) {
      passwordRef.current?.focus();
      return;
    }

    login({
      ...(phoneNumber ? { phoneNo: phoneNumber } : {}),
      ...(email ? { email } : {}),
      password,
      role,
    });
  };



  const handleChange = (text: string) => {
      setInput(text);

    setEmail("");
    setPhoneNumber("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,15}$/;

    if (emailRegex.test(text)) {
      setEmail(text);
    } else if (phoneRegex.test(text)) {
      setPhoneNumber(text);
    }
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
          value={input}
          onChangeText={handleChange}
          placeholder="Enter your phone number or email"
          inputRef={emailRef}
          onNext={() => { passwordRef.current?.focus() }}
          containerStyle={{ position: "static", top: 382 }}
          keyboardType="email-address"
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
          title="Sign In"
          gradient
          onPress={HandleLogin}
          containerStyle={{ top: 601, position: "static" }}
        />


        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => { router.push("/forgotPassword") }}
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
    height: 218
  },
  title: {
    height: 58,
    position: "static",
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  titleText: {
    height: 30,
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#000000"

  },
  label: {
    height: 47,
    position: "static",
    padding: 16,
    paddingBottom: 8
  },
  labelText: {
    height: 23,
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    fontWeight: "700",
  },
  roleContainer: {
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
    height: 37,
    position: "static",
    left: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12
  },
  forgotPassword: {
    height: 21,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: "#66578F",
  },
  signupContainer: {
    height: 57,
    top: 787,
    position: "static",
  },
  signupTextContainer: {
    height: 37,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  signupText: {
    textAlign: "center",
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
    height: 40,
    marginBottom: 50,
  }


});


