import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft} from "@assets/icons/icons";
import {LabeledInput, HeaderBar, ContinueButton, KeyboardWrapper} from "@components/index";
import { StatusBar } from "expo-status-bar";
import { useforgotPass } from "@hooks/useSignIn";


const router = useRouter()


export default function forgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const { mutate: forgotPass, isPending, error } = useforgotPass();
  const [input, setInput] = useState("");


  const emailRef = useRef<TextInput>(null)

  const HandleForgotPass = () => {
    if (!email && !phoneNumber) {
      emailRef.current?.focus()
      return;
    }


    forgotPass({
      ...(phoneNumber ? { phoneNo: phoneNumber } : {}),
      ...(email ? { email } : {}),
    }, {
      onSuccess: () => {
        router.push({
          pathname: "/verifyOTP",
          params: {
            flow:"resetPass",
            nextPath:"/resetPassword",
            data: JSON.stringify({...(phoneNumber ? { phoneNumber: phoneNumber } : {}),
            ...(email ? { email } : {}),})
          }
        })

      }
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
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">

        <View style={styles.upperContainer}>
          <HeaderBar
            title="Forgot Password"
            LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
            onLeftPress={() => { if (router.canGoBack()) router.back() }}
          />

          <StatusBar style="auto" />

          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Enter your registered email or phone number and we’ll send you an OTP to reset your password.</Text>
          </View>

          <LabeledInput
            placeholder="Email or Phone Number"
            value={input}
            onChangeText={handleChange}
            inputRef={emailRef}
            isLast
            onSubmit={() => { console.log(forgotPassword) }}
            keyboardType="email-address"

          />

        </View>

        <View style={styles.lowerContainer}>
          <View>

            <ContinueButton
              title="Send OTP"
              onPress={HandleForgotPass}
              gradient />

          </View>

          <View style={styles.textContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => { if (router.canGoBack()) router.back() }}
              >
                <Text style={styles.text}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ height: 20 }}></View>
        </View>

      </ScrollView>
    </KeyboardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 844,
    minHeight: 844,
    justifyContent: "space-between"
  },
  upperContainer: {
    height: 240,
  },
  lowerContainer: {
    justifyContent: "flex-end",
    verticalAlign: "bottom",
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