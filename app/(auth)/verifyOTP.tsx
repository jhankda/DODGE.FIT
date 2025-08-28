import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import HeaderBar from "@components/HeaderBar";
import ArrowLeft from "@assets/icons/arrowLeft.svg";
import OtpInput from "@components/OtpInput";
import ResendTimer from "@components/resendTimer";
import { useVerify, useforgotPass, useSignUp } from "@hooks/useSignIn";


const router = useRouter()

type SignupOtpPayload = {
  email: string;
  phoneNumber: string;
  OTP: string;
  fullName: string;
  password: string;
  termsAgreed: boolean;
  role: string;
};

type ForgotOtpPayload = {
  email?: string;
  phoneNo?: string;
  OTP: string;
};

type Flow = "signup" | "forgot";




export default function verifyOTP() {
  const [otp, setOTP] = useState<string>()
  const { mutate: verifyOtp, isPending, error } = useVerify();
  const { mutate: forgotResend, isPending: isLoading1, error: iserror1 = error } = useforgotPass();
  const { mutate: signUpResend, isPending: isLoading2, error: iserror2 = error } = useforgotPass();

  const { data: datastring, flow, nextPath } = useLocalSearchParams<{ data: string; nextPath: string; flow: string }>();

  const data = JSON.parse(datastring)
  console.log("DATA", data)

  const onApiSuccess = ()=>{
    router.push(nextPath)
  }

  const handleVerify = () => {
    if (!otp) return;
    if (flow === "signUp") {
      verifyOtp({
        OTP: otp,
        ...data
      } as SignupOtpPayload,{
        onSuccess:onApiSuccess
      });
    } else if (flow === "resetPass") {
      verifyOtp({
        OTP: otp,
        ...data
      } as ForgotOtpPayload,{onSuccess:onApiSuccess});
    }
  };

  const handleResend = () => {
    if (flow === "signUp") {
      console.log("resend signUp")
      signUpResend({ ...data });
    } else if (flow === "resetPass") {
      console.log("resend forgot")
      forgotResend({ ...data });
    }
  };





  const maskedValue = data.email
    ? data.email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => `${a}${"*".repeat(b.length)}${c}`)
    : data.phoneNo
      ? data.phoneNo.replace(/.(?=.{2})/g, "*")
      : "";

  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.upperContainer}>

          <HeaderBar
            title="Verify OTP"
            LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
            onLeftPress={() => { if (router.canGoBack()) router.back() }}
          />

          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>We've sent a 6-digit OTP to your email/phone.</Text>
          </View>

          <View style={styles.subTitle}><View />
            <Text style={styles.subHeader}>{maskedValue}</Text>
          </View>

          <OtpInput
            length={6}
            onComplete={(code) => setOTP(code)}
          />

          <ResendTimer
            duration={5}
            onResend={handleResend}
          />

        </View>

        <View style={styles.lowerContainer}>
          <ContinueButton
            title={isPending ? "verifying..." : "verify"}
            gradient
            onPress={handleVerify}
          />
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
    // width: 390,
    height: 295
  },
  lowerContainer: {
    height: 92,
    justifyContent: "flex-end"
  },
  subHeaderContainer: {
    // width: 390,
    height: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4
  },
  subHeader: {
    textAlign: "center",
    // width: 358,
    height: 24,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#66578F"
  },
  subTitle: {
    // width: 390,
    height: 69,
    padding: 16,
    paddingBottom: 8
  },
  subHeaderText: {
    // width: 358,
    height: 46,
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: "center",
    color: "#120F1A"


  }

})