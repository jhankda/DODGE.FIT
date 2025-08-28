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
import { useSignUp } from "@hooks/useSignIn";




export default function signUpScreen() {

  const emailRef = useRef<TextInput>(null)
  const fullNameRef = useRef<TextInput>(null)
  const phoneNumberRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)
  const termsRef = useRef<View>(null)

  const [role, setRole] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false)
  const { mutate: signUp, isPending, error } = useSignUp();


  const router = useRouter()

  const HandleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,15}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


    if (!role) return console.warn('Fill All the Fields');
    if (!fullName) return fullNameRef.current?.focus();
    if (!email || !emailRegex.test(email)) return emailRef.current?.focus();
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) return phoneNumberRef.current?.focus();
    if (!password || !passwordRegex.test(password)) return passwordRef.current?.focus();
    if (!confirmPassword || !passwordRegex.test(password)) return confirmPasswordRef.current?.focus();
    if (password !== confirmPassword) return confirmPasswordRef.current?.focus()
    if (!termsAgreed) return termsRef.current?.focus();



    signUp(
      {
        email,
        phoneNumber,
        password,
        fullName,
        termsAgreed,
      }, {
      onSuccess: () => {
        router.push({
          pathname: '/verifyOTP',
          params: {
            nextPath: "/tabs/userDashboard",
            flow: "signUp",
            data: JSON.stringify({ email, phoneNumber, fullName, password, role, termsAgreed })
          }
        })
      }
    }
    )
  }

  return (

    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

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
          onSelect={(value) => setRole(value)}


        />
        <LabeledInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your Full Name"
          inputRef={fullNameRef}
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

        <View ref={termsRef} style={styles.checkListContainer}>
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
          onPress={isPending ? undefined : HandleSignup}
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