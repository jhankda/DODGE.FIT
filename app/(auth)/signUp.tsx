import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "../../assets/icons/arrowLeft.svg";
import ScrollMenu from "../../assets/icons/ScrollMenu.svg";
import DropdownInput from "../../components/dropDownMenu";
import LabeledInput from "../../components/labeledInput";
import HeaderBar from "../../components/HeaderBar";
import ContinueButton from "../../components/WideButton";
import KeyboardWrapper from "../../components/FormScreen";
import { StatusBar } from "expo-status-bar";




export default function signUpScreen() {

  const emailRef = useRef<TextInput>(null)
  const phoneNumberRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)


  const [fullName, setFullName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [termsAgreed, setTermsAgreed] = useState<Boolean>(false)

  const router = useRouter()
  return (

    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="auto" />

        <HeaderBar
          title="Create Account"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={() => { router.replace("/signIn") }}
        />

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>Register To Continue</Text>
        </View>

        <DropdownInput
          options={["Coach", "User", "Scanner Device"]}
          placeholder="Select - User/Coach/Admin"
          icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
          onSelect={(value) => console.log("Selected:", value)}


        />
        <LabeledInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your Full Name"
          onNext={() => { emailRef.current?.focus() }}
        />
        <LabeledInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          inputRef={emailRef}
          onNext={() => { phoneNumberRef.current?.focus() }}

        />
        <LabeledInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
          inputRef={phoneNumberRef}
          onNext={() => { passwordRef.current?.focus() }}
        />
        <LabeledInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          inputRef={passwordRef}
          onNext={() => { confirmPasswordRef.current?.focus() }}
        />
        <LabeledInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          inputRef={confirmPasswordRef}
          isLast
          onSubmit={() => { }}
        />

        <View style={styles.checkListContainer}>
          <View style={styles.checkList}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => { setTermsAgreed(!termsAgreed) }}
            >
              {termsAgreed &&
                <View style={styles.tick}>
                </View>
              }
            </TouchableOpacity>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>I agree to the Terms & Conditions and Privacy Policy</Text>
            </View>
          </View>
        </View>

        <ContinueButton
          title="Signup"
          gradient
        />
      </ScrollView>
    </KeyboardWrapper>

  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA",
    width: "auto",
    height: 965,
    minHeight: 844,
  },
  subHeaderContainer: {
    width: "auto",
    height: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4
  },
  subHeader: {
    textAlign: "center",
    width: "auto",
    height: 24,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#000"
  },
  checkListContainer: {
    width: "auto",
    height: 72,
    paddingHorizontal: 16
  },
  checkList: {
    flexDirection: "row",
    width: "auto",
    height: 72,
    paddingVertical: 12,
    gap: 12
  },
  checkBox: {
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D9D4E3"
  },
  termsContainer: {
    width: "auto",
    height: 48
  },
  termsText: {
    width: "auto",
    height: 48,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#120F1A"
  },
  tick: {
    alignSelf: "center",
    height: 12,
    width: 12,
    backgroundColor: "#8C66E3",
    borderRadius: 3
  }









})