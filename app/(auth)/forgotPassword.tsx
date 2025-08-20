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


const router = useRouter()


export default function forgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [email, setEmail] = useState<string>()

  

  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">

        <View style={styles.upperContainer}>
          <HeaderBar
            title="Forgot Password"
            LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
            onLeftPress={() => { router.replace("/signIn") }}
          />

          <StatusBar style="auto" />

          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Enter your registered email or phone number and we’ll send you an OTP to reset your password.</Text>
          </View>

          <LabeledInput
            placeholder="Email or Phone Number"
            value={email}
            onChangeText={setEmail}
            isLast
            onSubmit={() => { console.log(forgotPassword) }}

          />

        </View>

        <View style={styles.lowerContainer}>
          <View>

            <ContinueButton
              title="Send OTP"
              onPress={() => { router.replace('/verifyOTP') }}
              gradient />

          </View>

          <View style={styles.textContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => { router.replace("/signIn") }}
              >
                <Text style={styles.text}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{height:20}}></View>
        </View>

      </ScrollView>
    </KeyboardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:844,
    minHeight: 844,
    justifyContent:"space-between"
  },
  upperContainer: {
    height: 240,
  },
  lowerContainer: {
    justifyContent: "flex-end",
    verticalAlign:"bottom",
    height: 156
  },
  subHeaderContainer: {
    textAlign: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#120F1A"
  },
  text: {
    textAlign: "center",
    width: 93,
    height: 21,
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 21,
    color: "#120F1A"
  },
  buttonContainer: {
    flexDirection: "row",
    height: 40,
    minWidth: 84,
    maxWidth: 480,
    paddingHorizontal: 16
  },
  button: {
    textAlign: "center",
    height: 21
  },
  textContainer: {
    flexDirection: "row",
    alignSelf: "center",
    height: 64,
    paddingHorizontal: 16,
    paddingVertical: 12
  }

}
)